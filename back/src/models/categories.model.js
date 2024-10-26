import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Categories = sequelize.define("category", {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, { timestamps: true });

export default Categories;