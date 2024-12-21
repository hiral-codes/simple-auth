import mongoose from "mongoose";

// Connecting MongoDB
export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error Connecting Database : ", error);
    }
}