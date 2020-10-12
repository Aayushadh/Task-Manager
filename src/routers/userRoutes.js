const express=require('express');
const user=require('../models/user');

const app=new express.Router();

app.post("/user", async (req, res) => {

    const obj = new user.User(req.body);
    try {

        await obj.save();
        res.status(201).send(obj);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

app.get("/user", async (req, res) => {

    try {

        const users = await user.User.find({});
        res.status(200).send(users);

    } catch (e) {
        res.status(500).send(e);
    }


});

app.get("/user/:id", async (req, res) => {

    const _id = req.params.id;
    try {
        const user1 = await user.User.findById(_id);
        if (!user1) {
            return res.status(404).send("Not Found");
        }
        res.status(200).send(user1);
    } catch (e) {
        res.status(500).send(e);
    }
});
app.patch("/user/:id", async (req, res) => {

    const _id = req.params.id;
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
        updates.forEach((update)=>user1[update]=req.body[update]);

        await user1.save();

        res.status(200).send(user1);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.delete("/user/:id", async (req, res) => {

    const _id = req.params.id;
    try {
        const user1 = await user.User.findByIdAndDelete(_id);
        if (!user1) {
            return res.status(404).send("Not Found");
        }
        res.status(200).send(user1);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports=app;