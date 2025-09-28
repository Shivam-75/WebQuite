import mongoose from "mongoose";

export const db = async () => {
    try {
        mongoose.connect(process.env.URL);
        console.log("Database is connected successfully....");
        
    } catch (err) {
        console.log("Database is not connected successfully....");
    }
}