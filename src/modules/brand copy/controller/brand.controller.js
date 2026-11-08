import slugify from "slugify"
import brandModel from "../../../db/models/brand.model.js"
import { handelError } from "../../middleware/handelError.js"
import ApiFeature from "../../utilis/ApiFeature.js"
import { deleteOne } from "../handlers/apiHandler.js"

const addBrand=handelError(async(req,res)=>{
 req.body.slug=slugify(req.body.title)
 if(req.body.file)req.body.logo=req.file.filename
 let preBrand=new brandModel(req.body)
 let addBrand=await preBrand.save()
 res.json({message:"sucsses",addBrand})
})
const getAllBrands=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(brandModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.page,result})
})
const getBrandById=handelError(async(req,res)=>{
    let brand=await brandModel.findById(req.params.id)
    res.json({message:"success",brand})
}) 
const updateBrand=handelError(async(req,res)=>{
    req.body.slug=slugify(req.body.title)
   if(req.body.file)req.body.logo=req.file.filename
    let updateBrand=await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateBrand&&res.json({message:"updated",updateBrand})
      
    !updateBrand&&res.json({message:"not found category"})

  
})
const deleteBrand=deleteOne(brandModel)
export{
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}