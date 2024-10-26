import { Router } from "express"
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/users.controllers.js"
import { isAdmin, isAuthenticate } from "../middlewares/middlewares.js"

const router = Router()

router.get(`/`, isAuthenticate, isAdmin, getUsers)
router.get(`/:id`, isAuthenticate, isAdmin, getUserById)
router.post("/", createUser)
router.put("/:id", isAuthenticate, updateUser)
router.delete("/:id", isAuthenticate, deleteUser)

export default router