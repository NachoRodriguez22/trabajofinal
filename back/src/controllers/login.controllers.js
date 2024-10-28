import Users from "../models/users.model.js";

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ where: { username, password } });

        if (!user) {
            return res.status(401).json({ status: "Error", message: "Credenciales incorrectas." });
        }

        // Almacena el nombre de usuario y el rol en la sesión
        req.session.username = user.username; // Nombre de usuario
        req.session.role = user.role; // Rol del usuario

        res.status(200).json({
            status: "Success",
            message: "Inicio de sesión exitoso.",
            user: { username: user.username, id: user.id, role: user.role },
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ status: "Error", message: "Error al iniciar sesión." });
    }
};

export const logoutUser = async (req, res) => {
    console.log(req.session.destroy)
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error al cerrar la sesión." });
        }
        return res.status(200).json({ message: "Sesión cerrada exitosamente." });
    });
};
