import mongoose from "mongoose";
const schema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,'title is too short'],
        maxLength:[100,'title is too long'],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    logo:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})
const brandModel=mongoose.model("Brand",schema)
export default brandModel