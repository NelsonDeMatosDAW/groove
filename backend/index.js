require('dotenv').config(); //Configuramos dontenv para que se busque .env
const express = require("express");
const {conexion} = require("./baseDatos/conexion");

//Conectamos la BBDD
conexion();

//Configuramos servidor
const app = express();
const puerto = process.env.PORT; //Adquirimos el puerto del archivo .env

//Requerimos cors
const cors = require("cors");

// Configuración del middleware de CORS
const corsOptions = {
    origin: ['https://groovecall.es', 'https://www.groovecall.es'], // Reemplaza con la URL de tu cliente  http://localhost:5173
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permitir credenciales
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilita preflight para todas las rutas si es necesario

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