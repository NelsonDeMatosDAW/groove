const express = require("express");
const router = express.Router();

//Debemos importar los controladores que establecen las funciones que se ejecutan en cada ruta
const CancionControlador = require("../controladores/Cancion")

//Importamos la funcion del middleware
const middleware = require("../middlewares/verificarToken");

//ruta de prueba
router.get("/rutaPruebaCancion", (req, res) => {
    res.status(200).json({
        message: "La ruta de prueba funciona correctamente desde cancion"
    })
});

//Rutas protegidas
router.post("/crearCancion", middleware.verificarToken, CancionControlador.crear);
router.get("/listar",  middleware.verificarToken, CancionControlador.listar);
router.get("/uno/:id", middleware.verificarToken, CancionControlador.uno);
router.delete("/borrar/:id", middleware.verificarToken, CancionControlador.borrar);
router.put("/editar/:id", middleware.verificarToken, CancionControlador.editar);
router.get("/ordenar/:ordenarPor", CancionControlador.ordenar);

module.exports = router;