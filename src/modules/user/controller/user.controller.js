import { handelError } from "../../../middleware/handelError.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import userModel from "../../../../db/models/user.model.js"
import ApiFeature from "../../../utilis/ApiFeature.js"
import { AppError } from "../../../utilis/AppError.js"

const createUser=handelError(async(req,res,next)=>{
 let user=await userModel.findOne({email:req.body.email})
 if(user)return next(new AppError("duplicate email",409))
 let preUser= new userModel(req.body)
 let createUser=await preUser.save()
 res.json({message:"sucsses",createUser})
})
const getAllUser=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(userModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.page,result})
})
const getUserById=handelError(async(req,res)=>{
    let user=await userModel.findById(req.params.id)
    res.json({message:"success",user})
}) 
const updateUser=handelError(async(req,res)=>{
    delete req.body.password
    let updateUser=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateUser&&res.json({message:"updated",updateUser})

    !updateUser&&res.status(404).json({message:"not found user"})

  
})
const deletUser=deleteOne(userModel)
const changePassword=handelError(async(req,res,next)=>{
     let {id}=req.params
    if(req.user.role!='admin'&&req.user._id.toString()!=id) return next(new AppError("not authirzied",403))
    if(!req.body.password) return next(new AppError("password is required",400))
    let changePass=await userModel.findByIdAndUpdate({_id:id},{password:req.body.password,changePasswordAt:Date.now()},{new:true})
    changePass&&res.json({message:"updated",changePass})

    !changePass&&res.status(404).json({message:"not found user"})

  
})
export{
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deletUser,
    changePassword
}