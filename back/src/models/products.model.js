import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";
import Brands from "./brands.model.js";
import Categories from "./categories.model.js";

const Products = sequelize.define("product", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: 'category_id',
        },
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brands,
            key: 'brand_id',
        },
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    }
}, { timestamps: true });

// Sincronizar tablas y establecer relaciones
Brands.hasMany(Products, { foreignKey: 'brand_id' });
Products.belongsTo(Brands, { foreignKey: 'brand_id' });

Categories.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Categories, { foreignKey: 'category_id' });

export default Products;
