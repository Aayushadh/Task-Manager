const express = require('express');
const task = require('../models/task');


const app = new express.Router();

app.post("/task", async (req, res) => {

    const obj = new task.Task(req.body);
    try {
        await obj.save();
        console.log(obj);
        res.status(201).send(obj);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

app.get("/task", async (req, res) => {

    try {
        const tasks = await task.Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }

});

app.get("/task/:id", async (req, res) => {

    const _id = req.params.id;
    try {
        const obj = await task.Task.findById(_id);
        if (!obj) {
            return res.status(404).send("NOT Found");
        }
        res.status(200).send(obj);
    } catch (e) {
        res.status(500).send(e);
    }


});
app.patch("/task/:id", async (req, res) => {

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
        const updates=Object.keys(req.body);
        const obj = await task.Task.findByIdAndUpdate(_id);

        if (!obj) {
            return res.status(404).send("NOT Found");
        }

        updates.forEach((update)=>{
            obj[update]=req.body[update];
        });

        await obj.save();

        res.status(200).send(obj);
    } catch (e) {
        res.status(500).send(e);
    }


});

app.delete("/task/:id", async (req, res) => {

    const _id = req.params.id;
    try {
        const obj = await task.Task.findByIdAndDelete(_id);
        if (!obj) {
            return res.status(404).send("NOT Found");
        }
        res.status(200).send(obj);
    } catch (e) {
        res.status(500).send(e);
    }


});

module.exports = app;