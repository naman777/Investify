// name stocks description 

import mongoose from "mongoose";

const investorsSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description:{
        type: String,
    },
    stocks:[
        {
            symbol:String,
            amount: String,
        }
    ],
    investedAmount:{
        type: String,
    },
    yearlyChange:{
        type:String,
    },
    quaterlyChange:{
        type:String,
    }
});


const Investors = mongoose.model("investors", investorsSchema);

export default Investors;