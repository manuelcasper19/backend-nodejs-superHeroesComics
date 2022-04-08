const jwt = require('jsonwebtoken');


const validarJwt = (req, res, next ) =>{

    const token = req.header('x-api-key');
          if(!token){
              return res.status(401).json({
                  ok: false,
                  msg: 'Error en el token'
              })
          }

          try {
              
            const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED);
                   req.uid = uid;

              
          } catch (error) {
              console.log(error);
              return res.status(401).json({
                  ok: false,
                  msg: 'El token no es valido'
              })
              
          }
          
          next();

}

module.exports = {
    validarJwt
}