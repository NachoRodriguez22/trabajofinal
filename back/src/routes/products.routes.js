import { Router } from "express"
import { getProducts, getProductById, createProduct, updateProduct, updateManyProducts, deleteProduct } from "../controllers/product.controllers.js"
import { isAdmin, isAuthenticate } from "../middlewares/middlewares.js"

const router = Router()

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", isAuthenticate, isAdmin, createProduct)
router.put("/:id", isAuthenticate, isAdmin, updateProduct)
router.put("/update/many/prices", isAuthenticate, isAdmin, updateManyProducts)
router.delete("/:id", isAuthenticate, isAdmin, deleteProduct)


export default router