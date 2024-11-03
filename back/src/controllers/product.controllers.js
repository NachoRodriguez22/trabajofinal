import Products from "../models/products.model.js";
import Brands from "../models/brands.model.js";
import Categories from "../models/categories.model.js";
import { Sequelize } from "sequelize";

export const getProducts = async (req, res) => {
    try {
        const response = await Products.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Products.findByPk(id)
        if (response) {
            return res.status(200).json(response)
        }
        res.status(400).json({ status: "Failure", message: "El producto no existe." })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const createProduct = async (req, res) => {
    const { brand_id, category_id, ...body } = req.body;

    try {
        const brand = await Brands.findByPk(brand_id);
        const category = await Categories.findByPk(category_id);

        if (!category) {
            return res.status(400).json({ message: "Categoría no válida" });
        }
        if (!brand) {
            return res.status(400).json({ message: "Marca no válida" });
        }

        // Crear el producto
        const response = await Products.create({
            ...body,
            brand_id,
            category_id
        });

        // Enviar la respuesta con el product_id
        res.status(200).json({
            status: "Success",
            product_id: response.product_id, // Incluir product_id directamente
            message: `Producto ID: ${response.product_id} creado.`
        });
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const response = await Products.update(body, { where: { product_id: id } })
    try {
        if (response[0])
            return res.status(200).json({ status: "Success", message: `El producto con id: ${id} ha sido actualizado.` })
        res.status(400).json({ status: "Warning", message: `No se ha actualizado el producto.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar actualizar el producto.` })
    }
}

export const updateManyProducts = async (req, res) => {
    try {
        const response = await Products.update(
            { price: Sequelize.literal(`price * ${1 + 0.3}`) },
            { where: {} }
        )
        return res.status(200).json(`Se han actualizado ${response} productos`)
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: "Ocurrio un error al intentar actualizar todos los precios",
            error: error.message,
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Products.destroy({ where: { product_id: id } })
        if (response)
            return res.status(200).json({ status: "Success", message: `Producto eliminado` })
        res.status(400).json({ status: "Warning", message: `No se encontro el producto a eliminar.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar eliminar el producto.` })
    }
}