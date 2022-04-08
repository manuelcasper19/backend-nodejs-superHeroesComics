const cloudinary =  require('cloudinary');
const usuario  = require('../model/Usuario');
const fs = require('fs-extra');

const { genenarJwt } = require('../helpers/jwt');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  
   
})

const cambiarFoto = async (req, res) => {

    try {
           // console.log(req.file)

    if(!req.file){
        return res.status(400).json({
            ok: false,
            msg: 'Debe ingresar una imagen'
        })
    }
    const { path } = req.file;
    const { uid } = req.body;
    //buscar usuraio
     const dbUser = await usuario.findById( uid );
     
     if(!dbUser){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'

        })
     }

     if(dbUser.public_id && dbUser.secure_url && dbUser.url){
         await cloudinary.v2.uploader.destroy(dbUser.public_id)
     }
    
     const { secure_url, url, public_id } = await cloudinary.v2.uploader.upload( path ) 

     //modificar en la tabla
     const token = await genenarJwt(dbUser.id, dbUser.name);
     const update =  usuario.updateOne({ _id: uid }, {
        $set: {
           
            public_id,
            url,
            secure_url,
            
        }
    }, (err)=> {
        if(err){
            return  res.json({
                ok: false,
                msg: 'no se pudo actualizar'
            })
        }else{
            return res.json({
                ok: true,
                uid,
                name: dbUser.name,
                lastname: dbUser.lastname,
                email: dbUser.email,
                public_id,
                url,
                secure_url,
                token

            })
        }

    })

  
     //crear foto en el modelo
    //  const dbFoto = await new Foto( newFoto );


    //  //guardar usuario
    //  await dbFoto.save();
     
     //borramos la foto que cargo al directorio public/upload porque ya está en cloudinary
     await fs.unlink( path );
 

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, por favor comuniquese con el administrador"
        })
        
    }

}

module.exports = {
    cambiarFoto
}