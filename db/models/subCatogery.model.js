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
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Catogery"
    },
   image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})
schema.post("init",function(doc){
    if(doc.image)doc.image=process.env.BASEURL+"uploads/"+doc.image
})
const subCatogeryModel=mongoose.model("SubCatogery",schema)
export default subCatogeryModel