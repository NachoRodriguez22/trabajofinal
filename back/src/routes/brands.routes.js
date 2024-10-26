import { Router } from "express"
import { getBrands, getBrandsById, createBrands, updateBrands, deleteBrands} from "../controllers/brands.controllers.js"
import { isAdmin, isAuthenticate } from "../middlewares/middlewares.js"

const router = Router()

router.get("/", getBrands)
router.get("/:id", getBrandsById)
router.post("/", isAuthenticate, isAdmin, createBrands)
router.put("/:id", isAuthenticate, isAdmin, updateBrands)
router.delete("/:id", isAuthenticate, isAdmin, deleteBrands)

export default router