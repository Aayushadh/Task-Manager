const express = require('express');
const task = require('../models/task');
const auth = require('../middleware/auth');


const app = new express.Router();

app.post("/task", auth, async (req, res) => {

    const obj = new task.Task({
        ...req.body,
        ownerid: req.user._id
    });
    try {
        await obj.save();
        console.log(obj);
        res.status(201).send(obj);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

app.get("/task", auth, async (req, res) => {

    try {
        const tasks = await task.Task.find({
            ownerid: req.user._id
        });
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }

});

app.get("/task/:id", auth, async (req, res) => {

    const _id = req.params.id;
    try {
        const obj = await task.Task.findOne({
            _id,
            ownerid: req.user._id
        });
        if (!obj) {
            return res.status(404).send("NOT Found");
        }
        res.status(200).send(obj);
    } catch (e) {
        res.status(500).send(e);
    }


});
app.patch("/task/:id", auth, async (req, res) => {

    const _id = req.params.id;
    const fields = ["description", "completed"];
    const updates = Object.keys(req.body);
    const isValid = updates.every((inst) => fields.includes(inst));
    if (!isValid) {
        return res.status(400).send({
            error: "Bad Fields"
        })
    }

    try {
        const updates = Object.keys(req.body);
        const obj = await task.Task.findOne({
            _id,
            ownerid: req.user._id
        });

        if (!obj) {
            return res.status(404).send("NOT Found");
        }

        updates.forEach((update) => {
            obj[update] = req.body[update];
        });

        await obj.save();

        res.status(200).send(obj);
    } catch (e) {
        res.status(500).send(e);
    }


});

app.delete("/task/:id", auth, async (req, res) => {

    const _id = req.params.id;
    try {
        const obj = await task.Task.findOneAndDelete({
            _id,
            ownerid: req.user._id
        });
        if (!obj) {
            return res.status(404).send("NOT Found");
        }
        res.status(200).send(obj);
    } catch (e) {
        res.status(500).send(e);
    }


});

module.exports = app;