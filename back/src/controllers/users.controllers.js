import Users from "../models/users.model.js";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Users.findByPk(id)
        if (response) {
            return res.status(200).json(response)
        }
        res.status(400).json({ status: "Failure", message: "El usuario no existe." })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const createUser = async (req, res) => {
    const body = req.body
    try {
        const response = await Users.create(body)
        res.status(200).json({ status: "Success", message: `Usuario ID: ${response.user_id} creado.` })
    } catch (error) {
        res.status(500).json({ status: "Failure", message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const response = await Users.update(body, { where: { user_id: id } })
    try {
        if (response[0])
            return res.status(200).json({ status: "Success", message: `El usuario con id: ${id} ha sido actualizado.` })
        res.status(400).json({ status: "Warning", message: `No se ha actualizado el usuario.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar actualizar el usuario.` })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Users.destroy({ where: { user_id: id } })
        if (response)
            return res.status(200).json({ status: "Success", message: `Usuario eliminado` })
        res.status(400).json({ status: "Warning", message: `No se encontro el usuario a eliminar.` })
    } catch (error) {
        res.status(500).json({ status: "Warning", message: `Ocurrio un error al intentar eliminar el usuario.` })
    }
}