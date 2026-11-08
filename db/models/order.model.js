import mongoose from "mongoose";
const orderSchema =new mongoose.Schema({
   user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
   },
   cartItems:[{
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        default:1
    },
    price:Number
   }],
   totalPrice:Number,
   discount:Number,
   totalPriceAfterDiscount:Number,
   paymentMethod:{
    type:String,
    enum:['cache','credit'],
    default:'cache'
   },
   shippingAddress:{
    city:String,
    street:String
   },
   isPaid:Boolean,
   paidAt:Date,
   isDelivered:Boolean


   }
   
    
    ,{timestamps:true}
)
const orderModel=mongoose.model("Order",orderSchema)
export default orderModel