import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";
import Users from "./users.model.js";

const Cart = sequelize.define("cart", {
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "user_id",
        },
    },
    total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("active", "pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "active",
    },
}, { timestamps: true });

Users.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(Users, { foreignKey: "user_id" });

export default Cart;
