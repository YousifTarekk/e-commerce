import express from 'express'

import { protectedRoute } from '../auth/auth.controller.js';
import { createCacheOrder, createOnineOrder, getOrder } from './controller/order.controller.js';
const orderRoutes=express.Router()
orderRoutes.route("/")
            .get(protectedRoute,getOrder)
            
            
orderRoutes.route("/:id")
.post(protectedRoute,createCacheOrder)
             
orderRoutes.post("/online/:id",protectedRoute,createOnineOrder)             
export default orderRoutes;