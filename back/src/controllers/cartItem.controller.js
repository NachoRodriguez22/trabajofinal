// controllers/cartItemController.js
import CartItem from "../models/cartItem.model.js";
import Cart from "../models/cart.model.js";

// Agregar un producto al carrito
export const addItemToCart = async (req, res) => {
    const { cart_id, product_id, quantity, price } = req.body;
    try {
        const existingItem = await CartItem.findOne({ where: { cart_id, product_id } });
        if (existingItem) {
            // Si el producto ya está en el carrito, actualizar cantidad
            existingItem.quantity += quantity;
            existingItem.total_price = existingItem.quantity * price;
            await existingItem.save();
        } else {
            // Si no, agregarlo al carrito
            await CartItem.create({ cart_id, product_id, quantity, price, total_price: quantity * price });
        }

        // Actualizar el total del carrito
        const items = await CartItem.findAll({ where: { cart_id } });
        const total = items.reduce((sum, item) => sum + item.total_price, 0);
        await Cart.update({ total_amount: total }, { where: { cart_id } });

        res.status(201).json({ message: "Producto agregado al carrito" });
    } catch (error) {
        res.status(500).json({ message: "Error agregando producto al carrito", error });
    }
};

// Eliminar un producto del carrito
export const removeItemFromCart = async (req, res) => {
    const { cart_item_id, cart_id } = req.params;
    try {
        await CartItem.destroy({ where: { cart_item_id } });

        // Actualizar el total del carrito
        const items = await CartItem.findAll({ where: { cart_id } });
        const total = items.reduce((sum, item) => sum + item.total_price, 0);
        await Cart.update({ total_amount: total }, { where: { cart_id } });

        res.json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando producto del carrito", error });
    }
};
