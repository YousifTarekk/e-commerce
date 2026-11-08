import mongoose from "mongoose";
const productschema =new mongoose.Schema({
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
    description:{
        type:String,
        required:true,
        minLength:[3,'description is too short'],
        maxLength:[300,'description is too long'],
     lowercase:true
    },
   price:{
    type:Number,
    min:0,
    required:true
   },
   priceAfterDiscount:{
    type:Number,
    min:0,
    required:true
   },
   category:{
    type:mongoose.Types.ObjectId,
    ref:"Catogery"
},
  subcategory:{
    type:mongoose.Types.ObjectId,
    ref:"SubCatogery"
},
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand"
    },
    
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
},
    images:[String],
    imgCover:String,
    sold:{
        type:Number,
        required:true,
        default:0
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    rateCount:Number,
    rateAvg:{
        type:Number,
        min:0,
        max:5
    }
},{
    timestamps:true,
    toJSON:{virtuals:true}
})
productschema.post("init",function(doc){
   if(doc.imgCover) doc.imgCover=process.env.BASEURL+"uploads/"+doc.imgCover
   if(doc.images) doc.images=doc.images.map(ele=>process.env.BASEURL+"uploads/"+ele)

})
productschema.virtual('myReviews',{
    ref:"review",
    localField:"_id",
    foreignField:"product"
})
productschema.pre(/^find/,function(){
    this.populate("myReviews")
})
const productModel=mongoose.model("Product",productschema)
export default productModel