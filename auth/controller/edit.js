const usuario = require('../model/Usuario');
const bcrypt  = require('bcryptjs');
const { genenarJwt } = require('../helpers/jwt');
const cloudinary =  require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  
   
})

const editarUsuario =  async (req, res ) => {
    const { uid, name, lastname  } = req.body;
   
    console.log(req.body)
    console.log(req.file)

    try {
        
        const dbUser = await usuario.findById( uid );
     
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'

            })
        }
       
        const token = await genenarJwt(dbUser.id, name);
        if( req.file ){
            const { path } = req.file;
            if(dbUser.public_id && dbUser.secure_url && dbUser.url){
                await cloudinary.v2.uploader.destroy(dbUser.public_id)       

             }

             const { secure_url, url, public_id } = await cloudinary.v2.uploader.upload( path )
             actualizar(uid, name, lastname,  res, secure_url, url,  public_id, token);
             await fs.unlink( path );
        } else {
            actualizar(uid, name, lastname,  res, dbUser.secure_url, dbUser.url,  dbUser.public_id, token);
        }
 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, hablé con el administrador del sistema"
        })
        
    }


}

const actualizar =  (uid, name, lastname,  res, secure_url, url, public_id, token) => {

     const update = usuario.updateOne({ _id: uid }, {
        $set: {
            name: name,
            lastname: lastname,
            public_id: public_id,
            secure_url: secure_url,
            url: url           
            
        }
    }, (err)=> {
        if(err){
            return  res.status(400).json({
                ok: false,
                msg: 'no se pudo actualizar'
            })
        }else{
            return res.status(201).json({
                ok: true,
                name,
                lastname,
                secure_url,
                url, 
                public_id,
                token

            })
        }

    })

    //console.log(update);
}



module.exports = {
    editarUsuario,
    actualizar
}