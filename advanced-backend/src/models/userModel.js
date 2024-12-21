import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const User = mongoose.model('User', userSchema)