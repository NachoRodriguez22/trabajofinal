// routes/cartRoutes.js
import express from "express";
import { createCart, getCartByUser, emptyCart, getActiveCart } from "../controllers/cart.controller.js";
import { isAuthenticate } from "../middlewares/middlewares.js"

const router = express.Router();

router.post("/", isAuthenticate, createCart); // Crear carrito
router.get("/:user_id", isAuthenticate, getCartByUser); // Obtener carrito por usuario
router.delete("/:cart_id", isAuthenticate, emptyCart); // Vaciar carrito
router.get("/cart/active", isAuthenticate, getActiveCart);

export default router;
