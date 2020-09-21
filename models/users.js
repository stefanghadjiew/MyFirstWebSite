const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
});

userSchema.pre("save",async function(next) {
    try{
        if(!this.isModified("password")){
            return next();
        }
        let hashPass = bcrypt.hashSync(this.password,10);
        this.password = hashPass;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(userPassword,next){
    try {
        let isMatch = await bcrypt.compareSync(userPassword,this.password)
        return isMatch;
    } catch(err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema)
module.exports = User;