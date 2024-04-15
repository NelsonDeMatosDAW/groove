const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const cancionSchema = Schema({
    autor:{
        type: String,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    fecha_solicitud:{
        type: Date,
        default: Date.now
    },
    solicitante:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = model("Cancion", cancionSchema, "canciones");