const express = require('express');
const user = require('../models/user');

// importing middleware
const auth = require("../middleware/auth");

const app = new express.Router();

app.post("/user", async (req, res) => {

    const obj = new user.User(req.body);
    try {
        const token = await obj.generateAuthToken();

        await obj.save();
        res.status(201).send({
            user: obj,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

app.get("/user/me", auth, async (req, res) => {

    const user2 = await req.user.toJSON();
    res.send({
        user: user2
    });


});

app.get("/user/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return req.token != token.token;
        })

        await req.user.save();
        res.send();

    } catch {
        res.status(500).send();

    }
});

app.get("/user/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save();
        res.send();

    } catch {
        res.status(500).send();

    }
})

app.get("/user/:id", async (req, res) => {

    const _id = req.params.id;
    try {
        const user1 = await user.User.findById(_id);
        if (!user1) {
            return res.status(404).send("Not Found");
        }
        res.status(200).send(user1);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch("/user/me", auth, async (req, res) => {

    const _id = req.user.id;
    const fields = ["name", "password", "age"];
    const updates = Object.keys(req.body);
    const isValid = updates.every((inst) => fields.includes(inst));
    if (!isValid) {
        console.log("hello");
        return res.status(400).send({
            error: "Bad Fields"
        })
    }
    try {

        const user1 = await user.User.findByIdAndUpdate(_id);
        updates.forEach((update) => user1[update] = req.body[update]);

        await user1.save();

        res.status(200).send(user1);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete("/user/me", auth, async (req, res) => {

    const _id = req.params.id;
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post("/user/login", async (req, res) => {

    try {
        const user1 = await user.User.findByCredentials(req.body.email, req.body.password);
        const token = await user1.generateAuthToken();
        //  console.log(user1);
        // const user2 = await user1.toJSON();
        res.send({
            user: user1,
            token
        });

    } catch (e) {
        res.status(400).send(e);

    }

});

module.exports = app;