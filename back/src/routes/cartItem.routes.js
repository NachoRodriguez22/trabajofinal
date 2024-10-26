// routes/cartItemRoutes.js
import express from "express";
import { addItemToCart, removeItemFromCart } from "../controllers/cartItem.controller.js";
import { isAuthenticate } from "../middlewares/middlewares.js"

const router = express.Router();

router.post("/", isAuthenticate, addItemToCart); // Agregar producto al carrito
router.delete("/:cart_item_id/:cart_id", isAuthenticate, removeItemFromCart); // Eliminar producto del carrito

export default router;
