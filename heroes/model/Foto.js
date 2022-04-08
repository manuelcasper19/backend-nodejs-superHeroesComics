const { Schema, model } = require('mongoose');

const fotoHeroe = Schema({
    id_heroe: {
        type: String,
        require: true,
        },
    public_id:{
        type: String,
        require: true,
        },
    url:{
        type: String,
        require: true,
        },
    secure_url:{
        type: String,
        require: true,
        },
   created_at: {
        type: Date,
        require: true,

   }

})

module.exports = model('Fotos', fotoHeroe);