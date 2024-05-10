//Importamos el modelo de la BBDD
const modeloUsuario = require("../modelos/Usuario");

//Importamos los paquetes necesarios para la encriptacion y crear el token
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//Importamos el helper para encriptar contraseña
const encriptar = require("../helpers/Encriptar");

//Importamos express para poder utilizar res.cookie
const express = require('express');
const dotenv = require('dotenv');

//Configuramos dotenv que nos permite acceder a las variables de entorno del archivo .env
dotenv.config();


const login= async (req, res) => {
    console.log("Has utilizado el endpoint login");
 
    //Recoger id por url
    let id = req.params.id; //Recoger parametro llega por url
    let emailLogin = req.body?.email; //Recoger parámetro llega por req como json
    let contraLogin = req.body?.contra;

    //Comprobamos que los datos esten rellenos
    if (!emailLogin || !contraLogin) {
        return res.status(400).json({
            status: "error",
            mensaje: "Datos incompletos (rellena los datos)"
        })
    }

    try {
        const usuarioEncontrado = await modeloUsuario.findOne({ email: emailLogin });

        if (!usuarioEncontrado) {
            return res.status(400).json({
                status: "error",
                mensaje: "Datos incorrectos (usuario no existente)"
            });
        }

        //Comparamos la contraseña del formulario con la encriptada
        const loginCorrecto = await bcryptjs.compare(contraLogin, usuarioEncontrado.contra);

        if (!loginCorrecto) {
            return res.status(400).json({
                status: "error",
                mensaje: "Datos incorrectos (contraseña no coincide)"
            });
        }

        //Creamos el token
        const token = jsonwebtoken.sign(
            {
                id: usuarioEncontrado._id,
                email: usuarioEncontrado.email,
                rol:usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre
            },
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION}
        );

        return res.status(200).json({
            status: "ok",
            mensaje: "Inicio de sesión exitoso",
            token: token
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

    console.log("Ejecutando endPoint registro de usuarios")

    //Obtemos los datos de registro
    const nombreRegistro= req.body?.nombre;
    const rolRegistro = req.body?.rol;
    const emailRegistro = req.body?.email;
    const contraRegistro = req.body?.contra;

    console.log("Datos "+nombreRegistro+" "+rolRegistro+" "+contraRegistro+" y "+emailRegistro);

    try {
        //Comprobamos que se envian los datos
        if (!nombreRegistro || !contraRegistro || !rolRegistro || !emailRegistro) {
            return res.status(400).json({
                status: "error",
                memsaje: "Datos incompletos (rellena los datos)"
            })
        }

        //Comprobamos que no exista un usuario con el mismo nombre
        const usuarioEncontrado = await modeloUsuario.findOne({ email: emailRegistro });
        if (usuarioEncontrado) {
            return res.status(400).json({
                status: "error",
                mensaje: "Ya existe un usuario con ese email"
            })
        }

        //Encriptamos su contraseña
        const hashPassword = await encriptar(contraRegistro);
        //Creamos nuevo usuario urilizando el modelo de mongoose
        const nuevoUsuario = new modeloUsuario({
            nombre: nombreRegistro ,
            email: emailRegistro,
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

}

const listar = async (req, res) => {
    /**
    * guardamos en consulta el resultado de la consulta a la BBDD para así
    * poder utilizar esta consulta con diferentes métodos, como ordenar, filtrar cierto número de artículos etc
    */
    let consulta = modeloUsuario.find({}).select('-contra');
        console.log("Se está ejecutando el método listar usuarios");

        if(req.params.ultimos){
            consulta.limit(req.params.ultimos);
        }

    consulta.sort({fecha: 1}).then(usuariosBBDD => {
        return res.status(200).send({
            status: "ok",
            parametro_url: req.params.ultimos,
            número_artículos: usuariosBBDD.length,
            usuariosBBDD
        })
    }).catch(err => {
        return res.satus(404).json({
            status: "error",
            mensaje: "No se han encontrado usuarios"
        })
    })

}

const editar = async (req, res) => {
    console.log("Ejecutando método para editar usuario (contraseña)");

    //Recoger nuevaContra 
    let nuevaContra = req.body?.nuevaContra; //Recoger parametro llega por body

    if (!nuevaContra) {
        return res.status(400).json({
            status: "error",
            mensaje: "El campo contraseña debe tener contenido"
        })
    }

    try {
        let usuarioId = req.body?.usuarioId;
        //Antes de actualizalo utilizar método de cifrado de contraseña
        let contraEncriptada = await encriptar(nuevaContra);

        // Buscar y actualizar usuario
        const usuarioActualizado = await modeloUsuario.findOneAndUpdate(
            {_id: usuarioId}, 
            {$set: {contra: contraEncriptada}}, 
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al cambiar la contraseña del usuario"
            });
        }

        // Devolver respuesta
        return res.status(200).json({
            status: "ok",
            mensaje: "Contraseña cambiada correctamente",
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log("Error servidor al intentar cambiar contraseña: "+error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor al intentar cambiar la contraseña"
        });
    }

}

const borrar = async (req, res) => {
    console.log("Ejecutando método para eliminar usuario");

    //Adquirimos el usuario a eliminar que llega por la url
    let usuarioId = req.params.id;

    try {
        //comprobamos que el usuario exista
        const usuarioExiste = await modeloUsuario.findOne({_id: usuarioId});

        if(!usuarioExiste){
            return res.status(400).json({
                status: "error",
                mensaje: "Usando no existe. Recarga la página"
            })
        }

        //Realizamos borrado del usuario
        const usuarioBorrado = await modeloUsuario.findOneAndDelete({_id: usuarioId});

        if(!usuarioBorrado){
            return res.status(500).json({
                status: "error",
                mensaje: "El usuario no ha podido eliminarse."
            })
        }

        return res.status(200).json({
            status: "ok",
            mensaje: "Usuario eliminado correctamente"
        })
    } catch (error) {
        console.log("Error al intentar eliminar usuario: "+error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error interno del servidor. El usuario no ha podido eliminarse."
        })
    }
}

const prueba = async (req, res) => {

    console.log("Se está ejecutando el método prueba usuarios");

    return res.status(200).send({
        status: "ok",
        mensaje: "El método prueba funciona correctamente"
    })

}

module.exports = {
    login,
    registro,
    listar,
    editar,
    borrar,
    prueba
}