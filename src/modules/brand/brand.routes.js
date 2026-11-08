import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utilis/fileUpload.js';
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from './controller/brand.controller.js';
import {getByIdSchema, addBrandSchema, updateBrandSchema } from './controller/brand.validation.js';
import { allowTo, protectedRoute } from '../auth/auth.controller.js';
const brandRouter=express.Router()
brandRouter.route("/")
            .get(getAllBrands)
            .post(protectedRoute,allowTo('admin'),uploadSingle('logo'),validation(addBrandSchema),addBrand)

brandRouter.route("/:id")
             .get(validation(getByIdSchema) ,getBrandById)
             .patch(protectedRoute,allowTo('admin'),uploadSingle('logo'),validation(updateBrandSchema),updateBrand)
             .delete(protectedRoute,allowTo('admin'),validation(getByIdSchema),deleteBrand)
export default brandRouter;
