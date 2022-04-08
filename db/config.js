const mongoose = require('mongoose');

const dbConection = async () => {

    try {

        await mongoose.connect(process.env.DB_MONGOOSE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Conexion exitosa, BD online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD, reinicie')
        
    }

}


module.exports = dbConection;

