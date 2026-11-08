import slugify from "slugify"
import catogeryModel from "../../../../db/models/catogery.model.js"
import { handelError } from "../../../middleware/handelError.js"
import ApiFeature from "../../../utilis/ApiFeature.js"
import { deleteOne } from "../../handlers/apiHandler.js"

const addCatogery=handelError(async(req,res)=>{
 req.body.slug=slugify(req.body.title)
 if(req.file)req.body.image=req.file.filename
 let preCatogery=new catogeryModel(req.body)
 let addCatogery=await preCatogery.save()
 res.json({message:"sucsses",addCatogery})
})
const getAllCategories=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(catogeryModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.page,result})
})
const getCategoryById=handelError(async(req,res)=>{
    let category=await catogeryModel.findById(req.params.id)
    res.json({message:"success",category})
}) 
const updateCatogery=handelError(async(req,res)=>{
    if(req.body.title)req.body.slug=slugify(req.body.title)
    if(req.file)req.body.image=req.file.filename
    let updateCatogery=await catogeryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateCatogery&&res.json({message:"updated",updateCatogery})

    !updateCatogery&&res.status(404).json({message:"not found category"})

  
})
const deleteCatogery=deleteOne(catogeryModel)
export{
    addCatogery,
    getAllCategories,
    getCategoryById,
    updateCatogery,
    deleteCatogery
}