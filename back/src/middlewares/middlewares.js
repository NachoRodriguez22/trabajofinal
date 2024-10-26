export const isAuthenticate = (req, res, next) => {
    console.log(req.session.username);

    if (req.session.username) return next();
    res.status(403).json({ status: "failure", message: "Debes iniciar sesion para acceder aqui." })
};

export const isAdmin = (req, res, next) => {
    if (req.session.username.role === "admin") return next();
    res.status(403).json({ status: "failure", message: "No eres admin para acceder aqui." });
};
