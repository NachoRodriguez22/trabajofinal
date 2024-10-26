// controllers/orderController.js
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

// Crear una orden desde un carrito
export const createOrder = async (req, res) => {
    const { cart_id, user_id } = req.body;
    try {
        const cart = await Cart.findOne({ where: { cart_id }, include: CartItem });
        if (!cart || cart.status !== "active") {
            return res.status(400).json({ message: "Carrito inválido o ya procesado" });
        }

        // Crear la orden
        const newOrder = await Order.create({
            user_id,
            total_amount: cart.total_amount,
            status: "pending",
        });

        // Cambiar el estado del carrito a "completed"
        await Cart.update({ status: "completed" }, { where: { cart_id } });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creando la orden", error });
    }
};

// Obtener todas las órdenes de un usuario
export const getOrdersByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const orders = await Order.findAll({ where: { user_id } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo las órdenes", error });
    }
};
