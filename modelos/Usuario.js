const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    rol:{
        type: String,
        required: true
    },
    contra:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    }
});

module.exports = model("Usuario", usuarioSchema, "usuarios");