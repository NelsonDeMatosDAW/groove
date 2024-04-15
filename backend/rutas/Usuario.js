const express = require("express");
const router = express.Router();

//Debemos importar los controladores que establecen las funciones que se ejecutan en cada ruta
const UsuarioControlador = require("../controladores/Usuario")
//ruta de prueba
router.get("/rutaPrueba", (req, res) => {
    res.status(200).json({
        message: "La ruta de prueba funciona correctamente"
    })
});

//Rutas
router.get("/login", UsuarioControlador.login);
router.post("/registro", UsuarioControlador.registro);
router.get("/listarUsuarios", UsuarioControlador.listar);


module.exports = router;