const usuario = require('../model/Usuario');
const bcrypt  = require('bcryptjs');
const { genenarJwt } = require('../helpers/jwt')

const login = async (req, res ) => {
    const {  email, password } = req.body;

    try {
            //validar email

      const dbUser = await usuario.findOne( { email });
            if(!dbUser){
                return res.status(400).json({
                    ok: false,
                    msg: 'Error de inicio de sessión, por favor verifique'
                })

            }  

       //validar password, que coincidadn
      const validaPassword = await bcrypt.compareSync( password, dbUser.password);
            if(!validaPassword){
                return res.status(400).json({
                    ok: false,
                    msg: 'Error de inicio de sessión, por favor verifique'
                })                

            }

   
      const token = await genenarJwt( dbUser.id, dbUser.name );
    //genera jwt

    //respuesta exitosa
        console.log(dbUser)
    return res.status(201).json({
        ok: true,
        name: dbUser.name,
        lastname: dbUser.lastname,
        email,
        img: dbUser.url,
        uid: dbUser.id,
        public_id: dbUser.public_id,
        token
       
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, por favor hablé con el administrador'
        })
        
    }

}


module.exports = { 
    login
};