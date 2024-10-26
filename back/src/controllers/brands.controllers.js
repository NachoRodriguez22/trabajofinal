import Brands from "../models/brands.model.js";

export const getBrands = async (req, res) => {
    try {
        const response = await Brands.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const getBrandsById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Brands.findByPk(id)
        if (response) {
            return res.status(200).json(response)
        }
        res.status(400).json({ status: "Failure", message: "La marca no existe." })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const createBrands = async (req, res) => {
    const { brand_name } = req.body
    try {
        const existingBrand = await Brands.findOne({ where: { brand_name } })

        if (existingBrand) {
            return res.status(400).json({ status: "Failure", message: "La marca ya existe." });
        }
        const response = await Brands.create(body)
        res.status(200).json({ status: "Success", message: `Marca ID: ${response.brand_id} creada.` })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const updateBrands = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const response = await Brands.update(body, { where: { brand_id: id } })
    try {
        if (response[0])
            return res.status(200).json({ status: "Success", message: `La marca con id: ${id} ha sido actualizado.` })
        res.status(400).json({ status: "Warning", message: `No se ha actualizado la marca.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar actualizar la marca.` })
    }
}

export const deleteBrands = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Brands.destroy({ where: { brand_id: id } })
        if (response)
            return res.status(200).json({ status: "Success", message: `Marca eliminada` })
        res.status(400).json({ status: "Warning", message: `No se encontro la marca a eliminar.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar eliminar la marca.` })
    }
}