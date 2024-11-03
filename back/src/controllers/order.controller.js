// controllers/orderController.js
import Product from "../models/products.model.js"; // Importar el modelo de productos

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

        // Descontar stock para cada item del carrito
        for (const item of cart.CartItems) {
            const product = await Product.findByPk(item.product_id);
            if (product) {
                if (product.stock < item.quantity) {
                    return res.status(400).json({ message: `Stock insuficiente para el producto: ${product.product_name}` });
                }
                // Descontar el stock y guardar el cambio
                product.stock -= item.quantity;
                await product.save();
            }
        }

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
