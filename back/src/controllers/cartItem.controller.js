// controllers/cartItemController.js
import CartItem from "../models/cartItem.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

// Agregar un producto al carrito
export const addItemToCart = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;

    // Comprobamos el contenido de req.body
    console.log("Datos recibidos en addItemToCart:", req.body);

    // Validar que cart_id y product_id estén presentes
    if (!cart_id || !product_id) {
        return res.status(400).json({ message: "Faltan cart_id o product_id en la solicitud." });
    }

    try {
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const price = product.price;

        const existingItem = await CartItem.findOne({ where: { cart_id, product_id } });
        if (existingItem) {
            // Si el producto ya está en el carrito, actualizar cantidad y precio total
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
        console.error("Error en addItemToCart:", error); // Log detallado
        res.status(500).json({ message: "Error agregando producto al carrito", error });
    }
};

// Eliminar un producto del carrito
export const removeItemFromCart = async (req, res) => {
    const { cart_item_id, cart_id } = req.params;

    try {
        await CartItem.destroy({ where: { cart_item_id } });

        // Actualizar el total del carrito solo si quedan elementos
        const items = await CartItem.findAll({ where: { cart_id } });
        const total = items.length > 0 ? items.reduce((sum, item) => sum + item.total_price, 0) : 0;
        await Cart.update({ total_amount: total }, { where: { cart_id } });

        res.json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error en removeItemFromCart:", error); // Log detallado
        res.status(500).json({ message: "Error eliminando producto del carrito", error });
    }
};
