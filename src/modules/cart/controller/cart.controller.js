
import cartModel from "../../../../db/models/cart.model.js";
import couponModel from "../../../../db/models/coupon.model.js";
import productModel from "../../../../db/models/product.model.js";
import { handelError } from "../../../middleware/handelError.js";
import { AppError } from "../../../utilis/AppError.js";


function calcPrice(cart) {
    let totalPrice=0;
    cart.cartItems.forEach(element => {
        totalPrice+=element.quantity*element.price

    });
    cart.totalPrice=totalPrice
    if(cart.discount)cart.totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*cart.discount)/100
}

const createCart=handelError(async(req,res,next)=>{
let product=await productModel.findById(req.body.product).select("price")
if(!product) return next(new AppError("product not found",404))
req.body.price=product.price
let isCartExist=await cartModel.findOne({user:req.user._id})
if(!isCartExist){
    let cart=new cartModel({
        user:req.user._id,
        cartItems:[req.body]
    })
    calcPrice(cart)
    await cart.save()
    return res.status(200).json({message:"created",cart})
}
let item=isCartExist.cartItems.find((ele)=>ele.product==req.body.product)
if(item){
    item.quantity+=req.body.quantity||1
}else{
    isCartExist.cartItems.push(req.body)
}
calcPrice(isCartExist)
await isCartExist.save()
res.json({message:"done",isCartExist})

})
const getCart=handelError(async(req,res)=>{
    let result=await cartModel.findOne({user:req.user._id})

    res.json({message:"success",result})
})
const removeCart=handelError(async(req,res,next)=>{
    let result=await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    if(!result) return next(new AppError("cart not found",404))
    calcPrice(result)
    await result.save()
    res.json({message:"success",result})
})
const updateCart=handelError(async(req,res,next)=>{
    let product=await productModel.findById(req.body.product).select("price")
    if(!product) return next(new AppError("product not found",404))
    req.body.price=product.price
    let isCartExist=await cartModel.findOne({user:req.user._id})
    if(!isCartExist) return next(new AppError("cart not found",404))

    let item=isCartExist.cartItems.find((ele)=>ele.product==req.body.product)
    if(!item) return next(new AppError("invalid item",404))
    item.quantity=req.body.quantity
    calcPrice(isCartExist)
    await isCartExist.save()
    res.json({message:"done",isCartExist})

    })

const applyCoupon=handelError(async(req,res,next)=>{
let code=await couponModel.findOne({code:req.params.code})
if(!code) return next(new AppError("invalid coupon",404))
if(new Date(code.expires)<new Date()) return next(new AppError("coupon expired",400))
let cart=await cartModel.findOne({user:req.user._id})
if(!cart) return next(new AppError("cart not found",404))
cart.discount=code.discount
calcPrice(cart)
await cart.save()
res.json({message:"done",cart})


})
export{
    createCart,
    getCart,
    removeCart,
    updateCart,
    applyCoupon

}
