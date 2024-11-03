// controllers/cartController.js
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

// Crear un carrito nuevo para el usuario
export const createCart = async (req, res) => {
    const { user_id } = req.body;
    try {
        const newCart = await Cart.create({ user_id });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: "Error creando el carrito", error });
    }
};
// Obtener el carrito activo del usuario
export const getActiveCart = async (req, res) => {
    const { user_id } = req.query;
    try {
        const cart = await Cart.findOne({
            where: { user_id, status: "active" },
            include: CartItem,
        });
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "No hay carrito activo" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo el carrito activo", error });
    }
};


// Obtener el carrito activo del usuario
export const getCartByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const cart = await Cart.findOne({
            where: { user_id, status: "active" },
            include: CartItem,
        });
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo el carrito", error });
    }
};

// Vaciar el carrito (eliminar todos los items del carrito)
export const emptyCart = async (req, res) => {
    const { cart_id } = req.params;
    try {
        await CartItem.destroy({ where: { cart_id } });
        await Cart.update({ total_amount: 0 }, { where: { cart_id } });
        res.json({ message: "Carrito vaciado" });
    } catch (error) {
        res.status(500).json({ message: "Error vaciando el carrito", error });
    }
};
