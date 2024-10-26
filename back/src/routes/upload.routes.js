import { Router } from "express"
import { uploadImage } from "../controllers/upload.controllers.js"

const router = Router()

router.post("/:id", uploadImage)

export default router