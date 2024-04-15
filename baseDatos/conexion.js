const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/groovecall";

const conexion = async() => {
    try {
        await mongoose.connect(URI);

        console.log("Conexión exitosa a la BBDD");
        
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la BBDD");
    }
}

module.exports = {
    conexion
}