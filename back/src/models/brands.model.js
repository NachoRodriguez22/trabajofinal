import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Brands = sequelize.define("brand", {
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, { timestamps: true });

export default Brands;