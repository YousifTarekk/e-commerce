import express from 'express'

import { addToWishList, getAllWishlist, removeFromWishlist} from './controller/wishlist.controller.js';
import { protectedRoute } from '../auth/auth.controller.js';
const wishlistRoutes=express.Router()
wishlistRoutes.route("/")
            .patch(protectedRoute,addToWishList)
            .delete(protectedRoute,removeFromWishlist)
            .get(protectedRoute,getAllWishlist)



export default wishlistRoutes;
