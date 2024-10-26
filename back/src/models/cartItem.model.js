import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";
import Cart from "./cart.model.js";
import Products from "./products.model.js";

const CartItem = sequelize.define("cart_item", {
    cart_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: "cart_id",
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: "product_id",
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, { timestamps: true });

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Products.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Products, { foreignKey: "product_id" });

export default CartItem;
