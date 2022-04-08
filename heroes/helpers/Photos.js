const cloudinary =  require('cloudinary');
const fs = require('fs-extra');
const path = require('path');
const Foto = require('../model/Foto');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  
   
})


const UploadPhotos =  async (files, idHeroe) => {
    
    const rutasfotos = [];
 
    for (let i = 0; i <files.length; i++) {
        const element = files[i];

        const subida = await cloudinary.v2.uploader.upload( element.path )
        //cloudinary.image()
        //console.log(subida);
        const newFoto = {
            id_heroe: idHeroe,
            public_id : subida.public_id,
            url: subida.url,
            secure_url: subida.secure_url,
            created_at: subida.created_at
        }
        rutasfotos.push(newFoto);
        const dbFoto = await new Foto( newFoto );

        await dbFoto.save();
        //console.log(element.path);
        //await fs.unlink( element.path );
        fs.unlink( element.path, ).then( ()=>{
            console.log('Borrado');
        }).catch( err => {
            console.error('error', err)
        })
        
    } 

    return rutasfotos
}


module.exports = {
    UploadPhotos
}