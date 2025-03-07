import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return value.toString().length === 10;
            },
            message: "Phone number must be exactly 10 digits",
        },
    },
    photo:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        },
    },
    education:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum:["user","admin"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8,
        validate: {
            validator: function (value) {
                return /(?=.*[A-Za-z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value);
            },
            message: "Password must contain at least one alphabet and one special character",
        },
    },
    token:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
}); 

export const User = mongoose.model("User",userSchema);