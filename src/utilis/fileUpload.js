import mongoose from "mongoose"
import { AppError } from "./AppError.js"
import multer from "multer"

const uploadaFile=()=>{
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
    filename(req, file, cb) {
      cb(null,new mongoose.Types.ObjectId+"_"+file.originalname)
    }
  })
  
  function fileFilter (req, file, cb) {


  
 if(file.mimetype.startsWith("image")){
    cb(null, true)
 }else{
    cb(new AppError('invalid image Type',401),false)
 }
    
  
  }

  const upload = multer({ storage: storage,fileFilter })
  return upload
}
export const uploadSingle=(fieldName)=>uploadaFile().single(fieldName)
export const uploadArray=(fieldName)=>uploadaFile().array(fieldName,10)
export const uploadFieldes=(fieldName)=>uploadaFile().fields(fieldName)
