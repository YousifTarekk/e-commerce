import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utilis/fileUpload.js';
import { addSubCategory, deletSubCategory, getAllSubCategories, getsubCategoryById, updateSubCategory } from './controller/subcatogery.controller.js';
import {addSubCategorySchema,updateSubCategorySchema, getByIdSchema } from '../subcategory/controller/subcategory.validation.js';
import { allowTo, protectedRoute } from '../auth/auth.controller.js';
const subcatogeryRoutes=express.Router({mergeParams:true})
subcatogeryRoutes.route("/")
            .get(getAllSubCategories)
            .post(protectedRoute,allowTo('admin'),uploadSingle('image'),validation(addSubCategorySchema),addSubCategory)

subcatogeryRoutes.route("/:id")
             .get(validation(getByIdSchema) ,getsubCategoryById)
             .patch(protectedRoute,allowTo('admin'),uploadSingle('image'),validation(updateSubCategorySchema),updateSubCategory)
             .delete(protectedRoute,allowTo('admin'),validation(getByIdSchema),deletSubCategory)
export default subcatogeryRoutes;
