import mongoose from "mongoose";
const reviewschema =new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true
    },
    
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    rating:{
        type:Number,
        max:5,
        min:1
    }

},{
    timestamps:true
})
reviewschema.pre(/^find/,function () {
    this.populate('user','name')
})
const reviewModel=mongoose.model("review",reviewschema)
export default reviewModel