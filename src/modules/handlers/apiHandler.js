import { handelError } from "../../middleware/handelError.js"

export const deleteOne=(model)=>{
return handelError(async(req,res)=>{

    let deltedItem=await model.findByIdAndDelete(req.params.id)
    deltedItem&&res.json({message:"delted",deltedItem})

    !deltedItem&&res.status(404).json({message:"not found "})


})
}
