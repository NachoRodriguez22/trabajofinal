export const isAuthenticate = (req, res, next) => {
    console.log("Usuario en sesión:", req.session.username);
    
    // Comprueba si hay un nombre de usuario en la sesión
    if (req.session.username) {
        return next();
    }
    return res.status(403).json({ status: "failure", message: "Debes iniciar sesión para acceder aquí." });
};

export const isAdmin = (req, res, next) => {
    // Comprueba si hay un nombre de usuario en la sesión y si es un admin
    if (req.session.username && req.session.role === "admin") {
        return next();
    }
    return res.status(403).json({ status: "failure", message: "No eres admin para acceder aquí." });
};