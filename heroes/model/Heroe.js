const { Schema, model} = require('mongoose');


const heroeSchema =  Schema({
    superheroe: {
        type: String,
        require: true,
        
    },
    aniocreacion: {
        type: Date,
        require: true
    },
    personajes: {
        type: String,        
        require: true
    },
    comics: {
        type: String,
        require: true,
    },
    peliculas:{
        type: String,
        require: true,
    },
    uid:{
        type: String,
        require: true,
    }
})

module.exports = model('Heroe', heroeSchema);