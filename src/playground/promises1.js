require("../db/mongoose");
const task = require("../models/task");

// task.Task.findByIdAndDelete("5f82930cd24318262c6c01f8").then((res)=>{

//     console.log(res);
//     return task.Task.countDocuments({completed:false});
// }).then((result)=>{
//     console.log(result);
// });

const findDelete = async (id)=>{
    const obj =await task.Task.findByIdAndDelete(id);
    const value = await task.Task.countDocuments({completed:false});
    return value;

};

findDelete("5f82930cd24318262c6c01f8").then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})
