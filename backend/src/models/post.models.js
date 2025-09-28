import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true,
    },
    
    
},{ timestamps: true });


export const Quites = mongoose.model("post", postSchema);