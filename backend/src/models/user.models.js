import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require:true
    },
    isAdmin: {
        type: String,
        default: false
    }
}, { timestamps: true });


export const User = mongoose.model("register", userSchema)