import { Router } from "express"
import { getCategories, getCategoriesById, createCategories, updateCategories, deleteCategories } from "../controllers/categories.controllers.js"
import { isAdmin, isAuthenticate } from "../middlewares/middlewares.js"

const router = Router()

router.get(`/`, getCategories)
router.get(`/:id`, getCategoriesById)
router.post("/", isAuthenticate, isAdmin, createCategories)
router.put("/:id", isAuthenticate, isAdmin, updateCategories)
router.delete("/:id", isAuthenticate, isAdmin, deleteCategories)

export default router