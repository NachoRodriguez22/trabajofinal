import { Router } from "express"
import { loginUser, logoutUser } from "../controllers/login.controllers.js"

const router = Router()

router.post("/login", loginUser)
router.post("/logout", logoutUser)

export default router