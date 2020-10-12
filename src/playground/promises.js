require("../db/mongoose");
const user = require("../models/user");

// user.User.findByIdAndUpdate("5f82860fb3769d196ddd49de",{age:1}).then((res)=>{

//     console.log(res);
//     return user.User.countDocuments({age:1});
// }).then((result)=>{
//     console.log(result);
// });

const updateByID= async (id,age)=>{

    const user1= await user.User.findByIdAndUpdate(id,{age});
    const count =await user.User.countDocuments({age});
    return count;
}

updateByID("5f82860fb3769d196ddd49de",2).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});