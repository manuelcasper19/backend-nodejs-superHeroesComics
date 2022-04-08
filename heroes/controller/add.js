const { genenarJwt } = require('../../auth/helpers/jwt');
const Heroe =  require('../model/Heroe');
const Usuario = require('../../auth/model/Usuario');
const fs = require('fs-extra');
const { UploadPhotos } = require('../helpers/Photos');


const addHeroe = async (req, res ) => {
    console.log(req)
    console.log(req.files)

     try {
 
     if(req.files.length > 5 || req.files.length===0){
        return res.status(400).json({
            ok: false,
            msg: "se pueden subir  de 1 a 5 fotos"
        })
     }
     console.log(req.body)
    
    const { superheroe, aniocreacion, personajes, comics, peliculas, uid } = req.body;    
        
    const heroes = await Heroe.find( { $and: [ { superheroe: superheroe }, { uid: uid }] });
    console.log(heroes);
     console.log(uid)
    if(heroes.length > 0) {
        
       
        for (let i = 0; i < req.files.length; i++) {
            const element = req.files[i];
            
             fs.unlink( element.path, ).then( ()=>{
                 console.log('Borrado');
             }).catch( err => {
                 console.error('error', err)
             })
        }

        return res.status(400).json({
            ok: false,
            msg: "El heroe ya existe, intente con otro nombre"
        })

    }
    
    const dbUser = await Usuario.findById( uid )
    console.log(dbUser);
    const dbHeroe = await new Heroe( req.body )
    
    const token = await genenarJwt(uid, dbUser.name);
    const dbHeroeCreado = await dbHeroe.save();
    console.log(dbHeroeCreado.id);    

    const upload = await UploadPhotos(req.files, dbHeroeCreado.id);
     


    return res.status(201).json({
        ok: true,
        id: dbHeroeCreado.id,
        superheroe,
        aniocreacion,
        personajes,
        comics,
        peliculas,
        uid,
        rutasfotos: upload,
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
    addHeroe
}