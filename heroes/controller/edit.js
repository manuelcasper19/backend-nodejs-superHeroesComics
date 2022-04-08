const { genenarJwt } = require('../../auth/helpers/jwt');
const Usuario = require('../../auth/model/Usuario');
const { UploadPhotos } = require('../helpers/Photos');
const Heroe = require('../model/Heroe');

const editarHeroe = async (req, res ) => {
   

    try {
        const { id, superheroe, aniocreacion, personajes, comics, peliculas, uid } = req.body;
        
        const dbUser = await Usuario.findById( uid );
        const dbHeroe = await Heroe.findById( id );
      
        if(dbHeroe.uid === uid){
       
        const token = await genenarJwt(dbUser.id, dbUser.name);
        if(req.files){
           const rutasPhotos = await UploadPhotos(req.files, dbHeroe.id )
        }        
        
        Heroe.updateOne({ _id: id }, {
            $set: {
                superheroe: superheroe,
                aniocreacion: aniocreacion,
                personajes: personajes,
                comics: comics,
                peliculas: peliculas
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
                    msg: "Super heroe actualizado satisfactoriamente",
                    id,
                    superheroe,
                    aniocreacion,
                    personajes,
                    comics, 
                    peliculas,
                    uid,
                    token
                })
            }
    
        })
        }else{
            return res.status(400).json({
                ok: false,
                msg: "El heroe no pertenece a ese usuario"
            })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, hablé con el administrador del sistema"
        })
    }



}


module.exports = {
    editarHeroe
}