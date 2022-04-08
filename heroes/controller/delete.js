const Heroe = require('../model/Heroe');
const Foto = require('../model/Foto');
const Usuario = require('../../auth/model/Usuario');
const cloudinary =  require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  
   
})


const borrarHeroe = async (req, res) => {

    try {

        
        const { id, uid } = req.query;
        //console.log(id);
         //console.log(id, uid)
        //const dbUser = await Usuario.findById( uid );
        const dbHeroe = await Heroe.findById( id );
        // console.log(dbUser)
        // console.log(dbHeroe)
        if(!dbHeroe){
            return res.status(400).json({
                ok: false,
                msg: 'El id de heroe no existe, por favor revise'
            })

        }

        if(dbHeroe.uid === uid){        

        const dbFoto  = await Foto.find( { id_heroe: id } )

        if(dbFoto.length > 0){
        
            await Heroe.findByIdAndDelete( id )
            for (let i = 0; i < dbFoto.length; i++) {
               
                await Foto.findByIdAndDelete( dbFoto[i].id );
                await cloudinary.v2.uploader.destroy( dbFoto[i].public_id )
                
            }
        
            return res.status(201).json({
                ok: true,
                msg: `El heroe ${ dbHeroe.superheroe }, fue borrado exitosamente`
            })


        }else {
            await Heroe.findByIdAndDelete( id )
            return res.status(400).json({
                ok: false,
                msg: `El heroe con id: ${ id } no tenía fotos`
            })

        }

    }else{
        return res.status(400).json({
            ok: false,
            msg: 'solo se pueden borrar heroes propios'
        })
    }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error, por favor comuniquese con el administrador'
        })
    }
}


module.exports = {
    borrarHeroe
}