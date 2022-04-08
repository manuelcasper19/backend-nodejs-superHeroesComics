const express = require('express');
const cors = require('cors');
const dbConection = require('./db/config');
const bodyparse = require('body-parser');

require('dotenv').config();   //para poder acceder a las variables de entorno


const app = express();

//conection BD
dbConection();

//Routes publicas
app.use( express.static('public'));

//Cors

app.use( cors());


//lectura y parseo de los datos que vienen del body (req)
//app.use(bodyparse.urlencoded( { extended: true }));
app.use( express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/heroes', require('./routes/heroes'))





// Asignar puertor

app.listen( process.env.PORT, ()=> {
    console.log(`servidor en puerto ${ process.env.PORT }`);
})