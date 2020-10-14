const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
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

    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]});
      
    userSchema.methods.generateAuthToken=async function(){
           const user1=this;
           const token= jwt.sign({_id:user1._id.toString()},"hellobaby");
        //    const decoded=jwt.verify(token,"hellobaby");
        //    console.log(decoded);
           user1.tokens=user1.tokens.concat({token});
           await user1.save();
           return token;
        
    }
    userSchema.methods.toJSON=async function(){
           const user1=this;
           const userCopy=await user1.toObject();

          await delete userCopy.password;
           await delete userCopy.tokens;
    
           return userCopy;
        
    }

    userSchema.statics.findByCredentials= async(email,password)=>{

        const user1=await User.findOne({email});
        if(!user1)
        {
            throw new Error("User not exists");
        }

        const isMatch= await bcrypt.compare(password,user1.password);
        if(!isMatch)
        {
            throw new Error("Wrong Password");
        }

        return user1;

    }
    
    userSchema.pre("save",async function(next){
       
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