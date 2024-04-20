import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
    },
    stocks:[
        {
            symbol:String,
            buyPrice: Number,
            quantity: Number,
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    
});


const Admin = mongoose.model("admin", adminSchema);

export default Admin;