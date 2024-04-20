import mongoose from "mongoose";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    stocks:[
        {
            symbol:String,
            quantity: Number,
            buyPrice: Number,
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    cashinHand:{
        type: Number,
        default: 5000
    }
},{timestamps: true,}
);


const User = mongoose.model("user", userSchema);

export default User;