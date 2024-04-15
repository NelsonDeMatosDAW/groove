//Importamos el modelo de la BBDD
const modeloCancion = require("../modelos/Cancion");

const crear = async (req, res) => {

    //Recoger parametros enviados desde el form
    let parametros = req.body;
    let autorForm = req.body?.autor;
    let tituloForm = req.body?.titulo;
    let estadoForm = "pendiente";
    //El solicitante tendremos que recogerlo del token
    let solicitanteForm = "661d4152bcc214de4b2567d8";

    //Comprobamos que se han enviado todos los datos
    if(!autorForm || !tituloForm || !estadoForm || !solicitanteForm){
        res.status(400).json({
            status: "error",
            mensaje: "Datos incompletos. Rellena correctamente el formulario"
        })
    }

    //Creamos el objeto a guardar
    const cancion = new modeloCancion({
        autor: autorForm,
        titulo: tituloForm,
        estado: estadoForm,
        solicitante: solicitanteForm
    })

    try {
        const cancionGuardada = await cancion.save();

        //Si se guarda correctamente
        return res.status(200).json({
            status: "ok",
            mensaje: "La cancion se ha enviado correctamente",
            cancion: cancionGuardada
        })
    } catch (error) {
        //Si existe algun error
        console.log("Error al intentar guardar una cancion "+error)
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha guardado la canción"
        });
    }

}

const listar = async (req, res) => {
    /**
    * guardamos en consulta el resultado de la consulta a la BBDD para así
    * poder utilizar esta consulta con diferentes métodos, como ordenar, filtrar cierto número de artículos etc
    */
    let consulta = modeloCancion.find({});
        console.log("Se está ejecutando el método listar");

        if(req.params.ultimos){
            consulta.limit(req.params.ultimos);
        }

    consulta.sort({fecha: 1}).then(cancionesBBDD => {
        return res.status(200).send({
            status: "ok",
            parametro_url: req.params.ultimos,
            número_artículos: cancionesBBDD.length,
            cancionesBBDD
        })
    }).catch(err => {
        return res.satus(404).json({
            status: "error",
            mensaje: "No se han encontrado canciones"
        })
    })

}

const uno = (req, res) => {
    //recoger un id por la url
    console.log("Has utilizado el endPoint uno");
    let id = req.params.id;

    //Buscar el artículo
    let consulta = modeloCancion.findById(id).then(cancion_uno => {
        //Si existe devolver resultado
        return res.status(200).json({
            status: "ok",
            cancion_uno
        })
    //Si no existe devolver error
    }).catch(err => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se ha encontrado la cancion solicitada"
        })
    })
}

const borrar = (req, res) => {

    let cancion_id = req.params.id;
    console.log("Se esta ejecutando el método borrar")

    modeloCancion.findOneAndDelete({_id: cancion_id}).then(cancionBorrada => {
        //Si se borra devolver resultado
        return res.status(200).json({
            status: "ok",
            mensaje: "El artículo ha sido eliminado",
            cancion: cancionBorrada
        });

    }).catch(err => {
        //Si no se borra
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido eliminar la canción"
        });
    })
        

}

const editar = async (req, res) => {

    console.log("Se ha utilizado la función editar");

    try {
        // Recoger id
        const cancionId = req.params.id;

        // Recoger datos del body
        const parametros = req.body;


        if (!parametros) {
            return res.status(400).json({
                status: "error",
                mensaje: "Faltan datos por enviar o los datos no son válidos",
            });
        }

        // Buscar y actualizar artículo
        const cancionActualizada = await modeloCancion.findOneAndUpdate({_id: cancionId}, parametros, { new: true });

        if (!cancionActualizada) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar la canción"
            });
        }

        // Devolver respuesta
        return res.status(200).json({
            status: "ok",
            mensaje: "Canción actualizada correctamente",
            cancion: cancionActualizada
        });
    } catch (error) {
        console.log("Se ha producido un error "+error)
        return res.status(400).json({
            status: "error",
            mensaje: "Error interno del servidor",
        });
    }
    
}


module.exports = {
    crear,
    listar,
    uno,
    borrar,
    editar
}