import express from 'express'

import { protectedRoute } from '../auth/auth.controller.js';
import { applyCoupon, createCart, getCart, removeCart, updateCart } from '../cart/controller/cart.controller.js';
const cartRoutes=express.Router()
cartRoutes.route("/")
            .get(protectedRoute,getCart)
            .post(protectedRoute,createCart)
cartRoutes.post("/applyCoupon/:code",protectedRoute,applyCoupon)

cartRoutes.route("/:id")
             .patch(protectedRoute,updateCart)
             .delete(protectedRoute,removeCart)
             
export default cartRoutes;