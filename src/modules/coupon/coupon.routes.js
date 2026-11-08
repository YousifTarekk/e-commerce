import express from 'express'

import { allowTo, protectedRoute } from '../auth/auth.controller.js';
import { createCoupon, delteCoupon, getAllCoupons, getCouponById, updateCoupon } from './controller/coupon.controller.js';
const couponRoutes=express.Router()
couponRoutes.route("/")
            .get(protectedRoute,allowTo('admin'),getAllCoupons)
            .post(protectedRoute,allowTo('admin'),createCoupon)

couponRoutes.route("/:id")
             .get(protectedRoute,allowTo('admin'),getCouponById)
             .patch(protectedRoute,allowTo('admin'),updateCoupon)
             .delete(protectedRoute,allowTo('admin'),delteCoupon)
export default couponRoutes;
