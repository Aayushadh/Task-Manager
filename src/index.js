const express = require("express")
require("./db/mongoose");
const user = require("./models/user");
const task = require("./models/task");
const userRoutes=require("./routers/userRoutes")
const taskRoutes=require("./routers/taskRoutes")
const bcrypt = require("bcrypt");


const app = express();

const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRoutes);
app.use(taskRoutes);

const myfunc=async ()=>{
   
    const password="Aayush";
    const hashpassword=await bcrypt.hash(password,8);
    console.log(password);
    console.log(hashpassword);
    console.log(await bcrypt.compare("",hashpassword))

}


myfunc();

app.listen(port, () => {
    console.log("Successfully running.........")
})