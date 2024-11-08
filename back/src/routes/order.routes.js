// routes/orderRoutes.js
import express from "express";
import { createOrder, getOrdersByUser } from "../controllers/order.controller.js";
import { isAuthenticate } from "../middlewares/middlewares.js"

const router = express.Router();

router.post("/", createOrder); // Crear orden
router.get("/:user_id", getOrdersByUser); // Obtener órdenes por usuario

export default router;