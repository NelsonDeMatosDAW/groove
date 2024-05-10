const jsonwebtoken = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtener el token del header de la solicitud
    const token = req.headers['authorization'];

    // Verificar si hay token
    if (!token) {
        return res.status(401).json({
            status: "error",
            mensaje: "Acceso denegado. No se proporcionó token."
        });
    }

    try {
        // Verificar el token
        const verificado = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next(); // Continuar hacia la ruta protegida
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Token inválido"
        });
    }
};

module.exports = {
    verificarToken
}