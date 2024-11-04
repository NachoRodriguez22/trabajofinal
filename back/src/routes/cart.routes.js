// routes/cartRoutes.js
import express from "express";
import { createCart, getCartByUser, emptyCart, getActiveCart } from "../controllers/cart.controller.js";
import { isAuthenticate } from "../middlewares/middlewares.js"

const router = express.Router();

router.post("/", createCart); // Crear carrito
router.get("/:user_id", getCartByUser); // Obtener carrito por usuario
router.delete("/:cart_id", emptyCart); // Vaciar carrito
router.get("/cart/active", getActiveCart);

export default router;
