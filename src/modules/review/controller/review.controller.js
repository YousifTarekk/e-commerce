import { handelError } from "../../../middleware/handelError.js"
import reviewModel from "../../../../db/models/review.model.js"
import ApiFeature from "../../../utilis/ApiFeature.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import { AppError } from "../../../utilis/AppError.js"

const createReview=handelError(async(req,res,next)=>{
req.body.user=req.user._id
let isReview=await reviewModel.findOne({user:req.user._id,product:req.body.product})
if(isReview)return next(new AppError("already have review",409))
 let result=new reviewModel(req.body)
 let createReview=await result.save()
 res.json({message:"sucsses",createReview})
})
const getAllReview=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(reviewModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.page,result})
})
const getReviewById=handelError(async(req,res)=>{
    let review=await reviewModel.findById(req.params.id)
    res.json({message:"success",review})
}) 
const updateReview=handelError(async(req,res)=>{
  let {id}=req.params
  let updateReview=await reviewModel.findOneAndUpdate({_id:id,user:req.user._id},req.body,{new:true})
    updateReview&&res.json({message:"updated",updateReview})
      
    !updateReview&&res.status(404).json({message:"not found review"})

  
})
const deleteReview=handelError(async(req,res)=>{
    let filter={_id:req.params.id}
    if(req.user.role!='admin')filter.user=req.user._id
    let deltedItem=await reviewModel.findOneAndDelete(filter)
    deltedItem&&res.json({message:"delted",deltedItem})

    !deltedItem&&res.status(404).json({message:"not found review"})
})
export{
    createReview,
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview
}