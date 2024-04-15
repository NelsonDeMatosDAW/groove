//Creamos obje mongoose
const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/groovecall";

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB conectada');
});