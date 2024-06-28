import express from 'express'
import routesProduct from './product.js'
import routerAuth from './auth.js'
import routesCategory from './category.js'
const router = express.Router()
router.use("/product", routesProduct)
router.use("/auth", routerAuth)
router.use("/category", routesCategory)

export default router