import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";
import Users from "./users.model.js";

const Order = sequelize.define("order", {
    order_id: {
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
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
}, { timestamps: true });

Users.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(Users, { foreignKey: "user_id" });

export default Order;
