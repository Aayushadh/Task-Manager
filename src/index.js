require("./db/mongoose");

const express = require("express")
const multer = require("multer");

const user = require("./models/user");
const task = require("./models/task");

const userRoutes = require("./routers/userRoutes")
const taskRoutes = require("./routers/taskRoutes")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const port = process.env.PORT

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);



app.listen(port, () => {
    console.log("Successfully running..." + port)
})