import authRoutes from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRoutes from "./cart/cart.routes.js"
import catogeryRoutes from "./catogery/catogery.routes.js"
import couponRoutes from "./coupon/coupon.routes.js"
import orderRoutes from "./order/order.routes.js"
import productRouters from "./product/product.routes.js"
import reviewRoutes from "./review/review.routes.js"
import subcatogeryRoutes from "./subcategory/subcatogery.routes.js"
import userRoutes from "./user/user.routes.js"
import wishlistRoutes from "./wishlist/wishlist.routes.js"

export const allRoutes=(app)=>{
    app.use('/api/v1/catogery',catogeryRoutes)
    app.use('/api/v1/subcatogery',subcatogeryRoutes)
    app.use('/api/v1/brand',brandRouter)
    app.use('/api/v1/product',productRouters)
    app.use('/api/v1/user',userRoutes)
    app.use('/api/v1/auth',authRoutes)
    app.use('/api/v1/review',reviewRoutes)
    app.use('/api/v1/wishlist',wishlistRoutes)
    app.use('/api/v1/coupon',couponRoutes)
    app.use('/api/v1/order',orderRoutes)
    app.use('/api/v1/cart',cartRoutes)



    
    

}