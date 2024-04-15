//Importamos el modelo de la BBDD
const modeloUsuario = require("../modelos/Usuario");

//Importamos los paquetes necesarios para la encriptacion y crear el token
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//Importamos express para poder utilizar res.cookie
const express = require('express');
const dotenv = require('dotenv');

//Configuramos dotenv que nos permite acceder a las variables de entorno del archivo .env
dotenv.config();


const login= async (req, res) => {
    console.log("Has utilizado el endpoint login");
 
    //Recoger id por url
    let id = req.params.id; //Recoger parametro llega por url
    let nombreLogin = req.body?.nombre; //Recoger parámetro llega por req como json
    let contraLogin = req.body?.contra;

    /*
    console.log("nombre "+nombreLogin)
    console.log("contra "+contraLogin)
    */

    //Comprobamos que los datos esten rellenos
    if (!nombreLogin || !contraLogin) {
        return res.status(400).json({
            status: "error",
            memsaje: "Datos incompletos (rellena los datos)"
        })
    }

    try {
        const usuarioEncontrado = await modeloUsuario.findOne({ nombre: nombreLogin });

        if (!usuarioEncontrado) {
            return res.status(400).json({
                status: "error",
                mensaje: "Datos incorrectos (usuario no existente)"
            });
        }

        const loginCorrecto = await bcryptjs.compare(contraLogin, usuarioEncontrado.contra);

        if (!loginCorrecto) {
            return res.status(400).json({
                status: "error",
                mensaje: "Datos incorrectos (contraseña no coincide)"
            });
        }

        //Creamos el token
        const token = jsonwebtoken.sign(
            {nombre: usuarioEncontrado.nombre},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION}
        );

        console.log(token);

        const cookieOption = {
            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000) ,
            path: "/"
        }

        res.cookie("jwt",token,cookieOption);

        return res.status(200).json({
            status: "ok",
            mensaje: "Inicio de sesión exitoso"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

const registro = async (req, res) => {

    //Obtemos los datos de registro
    const nombreRegistro= req.body?.nombre;
    const rolRegistro = req.body?.rol;
    const contraRegistro = req.body?.contra;

    console.log("Datos "+nombreRegistro+" "+rolRegistro+" "+contraRegistro)

    try {
        //Comprobamos que se envian los datos
        if (!nombreRegistro || !contraRegistro || !rolRegistro) {
            return res.status(400).json({
                status: "error",
                memsaje: "Datos incompletos (rellena los datos)"
            })
        }

        //Comprobamos que no exista un usuario con el mismo nombre
        const usuarioEncontrado = await modeloUsuario.findOne({ nombre: nombreRegistro });
        if (usuarioEncontrado) {
            return res.status(200).json({
                status: "ok",
                mensaje: "Ya existe un usuario con ese nombre"
            })
        }

        //Encriptamos su contraseña
        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(contraRegistro, salt);
        //Creamos nuevo usuario urilizando el modelo de mongoose
        const nuevoUsuario = new modeloUsuario({
            nombre: nombreRegistro ,
            rol: rolRegistro,
            contra: hashPassword
        })

        //Guardamos al usuario en la BBDD
        try {
            
            const usuarioGuardado = await nuevoUsuario.save();

            return res.status(200).json({
                status: "ok",
                mensaje: "Usuario creado exitosamente",
                usuario: usuarioGuardado
            })
        } catch (error) {
             //Si existe algun error se devuelve status 400
             console.log("No se ha podido crear el usuario "+error)
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha creado el usuario"
            });
        }


        
    } catch (error) {
        console.log("Error en el servidor al intentar crear un usuario "+error)
    }

    return res.status(200).json({
        status: "ok",
        mensaje: "hola mundo"
    })
}

module.exports = {
    login,
    registro
}