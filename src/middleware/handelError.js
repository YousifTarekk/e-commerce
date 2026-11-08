import { AppError } from "../utilis/AppError.js"

export const handelError=(fn)=>{
 return (req,res,next)=>{
    fn(req,res,next).catch(err=>next(new AppError(err.message,err.statusCode||500)))
 }
}
