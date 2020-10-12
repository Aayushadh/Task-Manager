const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value <= 0) {
                throw new Error("NOT VALID AGE");
            }

        }
    },
    password: {
        type: String,
        required: true,
        trim: true

    }});
    
    userSchema.pre("save",async function(){
       
        const user=this;
        if(user.isModified("password"))
        {
            user.password=await bcrypt.hash(user.password,8);
        }
          

    });
const User = mongoose.model('User',userSchema);

module.exports = {
    User
};