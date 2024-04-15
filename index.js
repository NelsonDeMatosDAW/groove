const express = require("express");
const {conexion} = require("./baseDatos/conexion");

//Conectamos la BBDD
conexion();

//Configuramos servidor
const app = express();
const puerto = 3900;

//Requerimos cors
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Importamos rutas
const rutasUsuario = require("./rutas/Usuario");
const rutasCancion = require("./rutas/Cancion");

//Cargamos las rutas
app.use("/api", rutasUsuario);
app.use("/api", rutasCancion);

//Crear servidor y escuchar las peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto);
})