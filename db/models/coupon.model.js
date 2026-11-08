import mongoose from "mongoose";
const schema =new mongoose.Schema({
    code:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    discount:{
      type:Number,
      min:0
    },
    expires:{
        type:String,
        required:[true,'coupon date required']
    }
    ,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }

},{
    timestamps:true
})
const couponModel=mongoose.model("Coupon",schema)
export default couponModel