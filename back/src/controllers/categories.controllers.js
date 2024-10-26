import Categories from "../models/categories.model.js";

export const getCategories = async (req, res) => {
    try {
        const response = await Categories.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const getCategoriesById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Categories.findByPk(id)
        if (response) {
            return res.status(200).json(response)
        }
        res.status(400).json({ status: "Failure", message: "la categoria no existe." })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const createCategories = async (req, res) => {
    const { category_name } = req.body
    try {
        const existingCategory = await Categories.findOne({ where: { category_name } })
        if (existingCategory) {
            return res.status(400).json({ status: "Failure", message: "La categoria ya existe." });
        }
        const response = await Categories.create(body)
        res.status(200).json({ status: "Success", message: `Categoria ID: ${response.category_id} creado.` })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const updateCategories = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const response = await Categories.update(body, { where: { category_id: id } })
    try {
        if (response[0])
            return res.status(200).json({ status: "Success", message: `La categoria con id: ${id} ha sido actualizado.` })
        res.status(400).json({ status: "Warning", message: `No se ha actualizado la categoria.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar actualizar la categoria.` })
    }
}

export const deleteCategories = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Categories.destroy({ where: { category_id: id } })
        if (response)
            return res.status(200).json({ status: "Success", message: `Usuario eliminado` })
        res.status(400).json({ status: "Warning", message: `No se encontro la categoria a eliminar.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar eliminar la categoria.` })
    }
}