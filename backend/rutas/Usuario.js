const express = require("express");
const router = express.Router();

//Debemos importar los controladores que establecen las funciones que se ejecutan en cada ruta
const UsuarioControlador = require("../controladores/Usuario");

//Importamos la funcion del middleware
const middleware = require("../middlewares/verificarToken");
//ruta de prueba
router.get("/rutaPrueba", (req, res) => {
    res.status(200).json({
        message: "La ruta de prueba funciona correctamente"
    })
});

//Rutas libres
router.post("/login", UsuarioControlador.login);

//Rutas protegidas
router.get("/listarUsuarios", middleware.verificarToken,UsuarioControlador.listar);
router.post("/registrarUsuario", middleware.verificarToken, UsuarioControlador.registro);
router.post("/editarUsuario", middleware.verificarToken, UsuarioControlador.editar);
router.delete("/borrarUsuario/:id", middleware.verificarToken, UsuarioControlador.borrar);

module.exports = router;