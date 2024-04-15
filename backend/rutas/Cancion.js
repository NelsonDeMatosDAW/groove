const express = require("express");
const router = express.Router();

//Debemos importar los controladores que establecen las funciones que se ejecutan en cada ruta
const CancionControlador = require("../controladores/Cancion")
//ruta de prueba
router.get("/rutaPruebaCancion", (req, res) => {
    res.status(200).json({
        message: "La ruta de prueba funciona correctamente desde cancion"
    })
});

//Rutas
router.post("/crear", CancionControlador.crear);
router.get("/listar", CancionControlador.listar);
router.get("/uno/:id", CancionControlador.uno);
router.delete("/borrar/:id", CancionControlador.borrar);
router.put("/editar/:id", CancionControlador.editar);

module.exports = router;