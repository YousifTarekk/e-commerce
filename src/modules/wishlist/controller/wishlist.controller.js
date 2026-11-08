
import userModel from "../../../../db/models/user.model.js"
import { handelError } from "../../../middleware/handelError.js"
import { AppError } from "../../../utilis/AppError.js"

const addToWishList=handelError(async(req,res,next)=>{

 let whishlist=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true}).populate('wishlist')

 !whishlist&&next(new AppError("whishlist not found",404))
 whishlist&&res.json({message:"success",whishlist:whishlist.wishlist})

})
const removeFromWishlist=handelError(async(req,res,next)=>{
    let {product}=req.body
    let result=await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:product}},{new:true}).populate('wishlist')
   !result&&next(new AppError("not found wishlist",404))
   result&&res.json({message:"done",result:result.wishlist})

   })
   const getAllWishlist=handelError(async(req,res,next)=>{

    let result=await userModel.findOne({_id:req.user._id}).populate('wishlist')
   !result&&next(new AppError("not found wishlist",404))
   result&&res.json({message:"done",result:result.wishlist})

   })


export{
    addToWishList,
    removeFromWishlist,
    getAllWishlist

}
