import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
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
    created_date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("User", userSchema)


export default User;