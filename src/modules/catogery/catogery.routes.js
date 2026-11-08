import express from 'express'
import { addCatogery, deleteCatogery, getAllCategories, getCategoryById, updateCatogery } from './controller/catogery.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCategorySchema, getByIdSchema, updateCategorySchema } from './controller/category.validation.js';
import { uploadSingle } from '../../utilis/fileUpload.js';
import subcatogeryRoutes from '../subcategory/subcatogery.routes.js';
import { allowTo, protectedRoute } from '../auth/auth.controller.js';
const catogeryRoutes=express.Router()
catogeryRoutes.use("/:categoryId/subcatogery",subcatogeryRoutes)
catogeryRoutes.route("/")
            .get(getAllCategories)
            .post(protectedRoute,allowTo('admin'),uploadSingle('image'),validation(addCategorySchema),addCatogery)

catogeryRoutes.route("/:id")
             .get(validation(getByIdSchema) ,getCategoryById)
             .patch(protectedRoute,allowTo('admin'),uploadSingle('image'),validation(updateCategorySchema),updateCatogery)
             .delete(protectedRoute,allowTo('admin'),validation(getByIdSchema),deleteCatogery)
export default catogeryRoutes;
