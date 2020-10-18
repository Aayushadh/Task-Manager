const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const task = require("./task");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
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

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: "Task",
    localField: "_id",
    foreignField: "ownerid"
});


//method for generating token for object 

userSchema.methods.generateAuthToken = async function () {
    const user1 = this;
    const token = jwt.sign({
        _id: user1._id.toString()
    }, "hellobaby");
    user1.tokens = user1.tokens.concat({
        token
    });
    await user1.save();
    return token;
}

//method for generating representable data

userSchema.methods.toJSON = function () {
    const user1 = this;
    const userCopy = user1.toObject();

    delete userCopy.password;
    delete userCopy.tokens;
    delete userCopy.avatar;
    console.log(userCopy);
    return userCopy;

}


userSchema.statics.findByCredentials = async (email, password) => {

    const user1 = await User.findOne({
        email
    });
    if (!user1) {
        throw new Error("User not exists");
    }

    const isMatch = await bcrypt.compare(password, user1.password);
    if (!isMatch) {
        throw new Error("Wrong Password");
    }

    return user1;

}

//before saving 

userSchema.pre("save", async function (next) {

    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }



});
userSchema.pre("remove", async function (next) {

    const user = this;
    await task.Task.deleteMany({
        ownerid: user._id
    });

});

// creating model using schema
const User = mongoose.model('User', userSchema);


module.exports = {
    User
};