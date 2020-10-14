const express = require("express")
require("./db/mongoose");
const user = require("./models/user");
const task = require("./models/task");
const userRoutes=require("./routers/userRoutes")
const taskRoutes=require("./routers/taskRoutes")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();
app.use(express.json())
// app.use((req,res,next)=>{
//     res.status(503).send("under maintence");
// });

const port = process.env.PORT || 3000
app.use(userRoutes);
app.use(taskRoutes);



const myfunc=async ()=>{
   
 const token=jwt.sign('{_id:"abc12121"}',"hellobaby");
 console.log(token);
 const ans =jwt.verify(token,"hellobaby");
 console.log(ans)

}


myfunc();

app.listen(port, () => {
    console.log("Successfully running.........")
})