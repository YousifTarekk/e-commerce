import express from 'express'

import { createReview,  deleteReview, getAllReview, getReviewById, updateReview } from './controller/review.controller.js';
import { allowTo, protectedRoute } from '../auth/auth.controller.js';
const reviewRoutes=express.Router()
reviewRoutes.route("/")
            .get(getAllReview)
            .post(protectedRoute,allowTo('user','admin'),createReview)

reviewRoutes.route("/:id")
             .get(getReviewById)
             .patch(protectedRoute,allowTo('user','admin'),updateReview)
             .delete(protectedRoute,allowTo('user','admin'),deleteReview)
export default reviewRoutes;
