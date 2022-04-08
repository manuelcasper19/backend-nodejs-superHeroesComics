
const Usuario = require('../model/Usuario');
const bcrypt  =  require('bcryptjs');
const { genenarJwt } = require('../helpers/jwt');

const newUser =  async( req, res ) => {
    
    const { name, lastname, email, password } = req.body;
   
        
    try {
        
    //Buscar que no exista el email
    const usuario = await Usuario.findOne( { email });

    if(usuario){
        return res.status(400).json({
            ok: false,
            msg: "El correo ya existe, inicie sessión"
        })
    }

 
    // crear el usuario en el modelo
    const dbUser = await new Usuario( req.body );

    //hashear password
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt);

    //generar jwt
     const token = await genenarJwt(dbUser.id, name);
     
    //guardar usuario
    await dbUser.save();

    //responder exitosamente

    return res.status(201).json({
        ok: true,
        name,
        lastname,
        email,
        token
       
    })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Error, por favor comuniquese con el administrador"
        })
        
    }


} 

module.exports = {
    newUser    
    
}