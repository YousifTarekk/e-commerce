import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utilis/fileUpload.js';
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from '../controller/brand.controller.js';
import {getByIdSchema, addBrandSchema, updateBrandSchema } from '../controller/brand.validation.js';
const brandRouter=express.Router()
brandRouter.route("/")
            .get(getAllBrands)
            .post(uploadSingle('logo'),validation(addBrandSchema),addBrand)
            
brandRouter.route("/:id")
             .get(validation(getByIdSchema) ,getBrandById)
             .patch(uploadSingle('logo'),validation(updateBrandSchema),updateBrand)
             .delete(validation(getByIdSchema),deleteBrand)
export default brandRouter;