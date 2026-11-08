
import couponModel from "../../../../db/models/coupon.model.js"
import { handelError } from "../../../middleware/handelError.js"
import ApiFeature from "../../../utilis/ApiFeature.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import QrCode from "qrcode"
const createCoupon=handelError(async(req,res)=>{
 req.body.createdBy=req.user._id
 let result=new couponModel(req.body)
 let createCoupon=await result.save()
 res.json({message:"sucsses",createCoupon})
})
const getAllCoupons=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(couponModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",result})
})
const getCouponById=handelError(async(req,res)=>{
    let coupon=await couponModel.findById(req.params.id)
    if(!coupon) return res.status(404).json({message:"not found coupon"})
    let url=await QrCode.toDataURL(coupon.code)
    res.json({message:"success",coupon,url})
}) 
const updateCoupon=handelError(async(req,res)=>{
  let {id}=req.params
  let updateCoupon=await couponModel.findOneAndUpdate({_id:id,createdBy:req.user._id},req.body,{new:true})
    updateCoupon&&res.json({message:"updated",updateCoupon})

    !updateCoupon&&res.status(404).json({message:"not found coupon"})

  
})
const delteCoupon=deleteOne(couponModel)
export{
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    delteCoupon
}