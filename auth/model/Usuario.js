const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
    }    ,
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
        }
})


module.exports = model('Usuario', usuarioSchema );