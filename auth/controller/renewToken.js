const { genenarJwt } = require('../helpers/jwt');
const usuario = require('../model/Usuario');


const renovar =  async ( req, res ) => {
    const { uid } = req;
    
    //buscar el id del usuario
     const dbUser = await usuario.findById( uid );
     
     //generar nuevo token para renovar session
     const token = await genenarJwt( uid, dbUser.name );

    //console.log(dbUser);
    // responder con el usuario correcto, respectivos datos y token
    return res.json({
        ok: true,
        name: dbUser.name,
        lastname: dbUser.lastname,
        email: dbUser.email,
        img: dbUser.secure_url,
        uid: dbUser.id,
        public_id: dbUser.public_id,
        token

    })
}

const validarEmail = async ( req, res ) => {
    const { email } = req.query;
    //console.log(email)

    try {
        const dbUser = await usuario.findOne( { email });
        //console.log(dbUser)
        if(dbUser){
            return res.json({
                ok: false,
                msg: 'El email no está disponible'
            })
        }
    
        return res.json({
            ok: true,
            msg: 'El email  está disponible'
        })
    
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, por favor hablé con el administrador'
        })
        
    }

}

module.exports = {
    renovar,
    validarEmail
};
