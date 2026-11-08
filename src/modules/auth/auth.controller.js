import userModel from "../../../db/models/user.model.js";
import { handelError } from "../../middleware/handelError.js";
import { AppError } from "../../utilis/AppError.js";
import bcrypt from"bcrypt"
import jwt from "jsonwebtoken"
export const signUp=handelError(async(req,res,next)=>{
    let isFound=await userModel.findOne({email:req.body.email})
    if(isFound) return next(new AppError("email is already is exist",409))
        delete req.body.role
        let user=new userModel(req.body)
    await user.save()
    res.json({message:"added",user})
})
export const login=handelError(async(req,res,next)=>{
   
    let {email,password}=req.body
    let isFound=await userModel.findOne({email})
    if(isFound&&bcrypt.compareSync(password,isFound.password)){
        let token=jwt.sign({name:isFound.name,userId:isFound._id,role:isFound.role},"secretKey")
       return res.json({message:"success",token})
    }
    next(new AppError("incorrect mail or password",401))})

export const protectedRoute=handelError(async(req,res,next)=>{

        let {token}=req.headers
        if(!token) return next(new AppError("please provide token",401))
        let decoded
        try{
            decoded=jwt.verify(token,"secretKey")
        }catch(err){
            return next(new AppError("invalid token",401))
        }
        let user=await userModel.findById(decoded.userId)
        if(!user) return next(new AppError("invalid user",404))
        if(user.changePasswordAt){    
        let changePassTime=parseInt(user.changePasswordAt.getTime()/1000)  
        if(changePassTime>decoded.iat)  return next(new AppError("invalid token",401))
        }
    req.user=user
    next()


    })
    export const allowTo=(...roles)=>{
       return handelError(async(req,res,next)=>{
      
        if(!roles.includes(req.user.role)) return next(new AppError("not authirzied",403))
       
 
    next()
 
    })
}