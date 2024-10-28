import { Router } from "express"
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/users.controllers.js"
import { isAdmin, isAuthenticate } from "../middlewares/middlewares.js"

const router = Router()

router.get(`/`, isAuthenticate, isAdmin, getUsers)
router.get(`/:user_id`, isAuthenticate, isAdmin, getUserById)
router.post("/", createUser)
router.put("/:user_id", isAuthenticate, updateUser)
router.delete("/:user_id", isAuthenticate, deleteUser)

export default router