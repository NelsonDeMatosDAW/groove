//Importamos los paquetes necesarios para la encriptacion y crear el token
const bcryptjs = require('bcryptjs');

const encriptar = async (contra) => {
    console.log("Usando la funcion encriptar");

    //Encriptamos su contraseña
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(contra, salt);
    
    //Devolvemos contraseña encriptada
    return hashPassword;
}


module.exports = encriptar;
