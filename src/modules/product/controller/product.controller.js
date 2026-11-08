import slugify from "slugify"
import productModel from "../../../../db/models/product.model.js"
import { handelError } from "../../../middleware/handelError.js"
import ApiFeature from "../../../utilis/ApiFeature.js"
import { deleteOne } from "../../handlers/apiHandler.js"

const addProduct=handelError(async(req,res)=>{
 req.body.slug=slugify(req.body.title)

 if(req.files.imgCover)req.body.imgCover=req.files.imgCover[0].filename
 if(req.files.images)req.body.images=req.files.images.map(ele=>ele.filename)
 let preProduct=new productModel(req.body)
 let addProduct=await preProduct.save()
 res.json({message:"sucsses",addProduct})
})
const getAllProduct=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(productModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.page,result})
})
const getProductById=handelError(async(req,res)=>{
    let product=await productModel.findById(req.params.id)
    res.json({message:"success",product})
}) 
const updateProduct=handelError(async(req,res)=>{
    if(req.body.title)req.body.slug=slugify(req.body.title)
    if(req.files&&req.files.imgCover)req.body.imgCover=req.files.imgCover[0].filename
    if(req.files&&req.files.images)req.body.images=req.files.images.map(ele=>ele.filename)
    let updateProduct=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateProduct&&res.json({message:"updated",updateProduct})

    !updateProduct&&res.status(404).json({message:"not found product"})

  
})
const delteProduct=deleteOne(productModel)
export{
    addProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    delteProduct
}