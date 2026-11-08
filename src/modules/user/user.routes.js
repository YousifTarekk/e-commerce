import express from 'express'
import { validation } from '../../middleware/validation.js';
import { changePassword, createUser, deletUser, getAllUser, getUserById, updateUser } from './controller/user.controller.js';
import { allowTo, protectedRoute } from '../auth/auth.controller.js';
const userRoutes=express.Router()
userRoutes.route("/")
            .get(protectedRoute,allowTo('admin'),getAllUser)
            .post(protectedRoute,allowTo('admin'),createUser)

userRoutes.route("/:id")
             .get(protectedRoute,allowTo('admin'),getUserById)
             .patch(protectedRoute,allowTo('admin'),updateUser)
             .delete(protectedRoute,allowTo('admin'),deletUser)
userRoutes.patch("/changePassword/:id",protectedRoute,allowTo('user','admin'),changePassword)


export default userRoutes;
