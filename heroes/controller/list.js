const { genenarJwt } = require("../../auth/helpers/jwt");
const Usuario = require("../../auth/model/Usuario");
const Foto = require("../model/Foto");
const Heroe = require("../model/Heroe")

const listAllHeroes = async (req, res) => {

    try {
        //console.log(req)
        //console.log(req.route.path)
        const { path } = req.route;
        const { uid } = req.query;
        console.log(uid)

        //console.log('url ',url)
        if(path === '/'){

        findHeroe(uid, res);

        }else{
            findHeroe(uid, res);

        }
       
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error, comuniquese con el administrador'
        })
    }

}

const findHeroe = async (uid, res) => {


    if(uid){
        const dbUser = await Usuario.findById( uid );
        console.log(dbUser)
        const token = await genenarJwt(dbUser.id, dbUser.name);

        const dbHeroe = await Heroe.find( { uid: uid});
        //console.log(dbHeroe);
        if(dbHeroe.length ===0){
            return res.status(400).json({
                ok: false,
                msg: 'Aún no han agregado heroes, agrega uno'
            })
        }

        const newHeroe = [];
        for (let i = 0; i < dbHeroe.length; i++) {
            const dbFoto = await Foto.findOne( { id_heroe: dbHeroe[i]._id} )
        
            const heroe = {
                id: dbHeroe[i]._id,
                superheroe: dbHeroe[i].superheroe,
                aniocreacion: dbHeroe[i].aniocreacion,
                personajes: dbHeroe[i].personajes,
                peliculas: dbHeroe[i].peliculas,
                uid: dbHeroe[i].uid,
                url: dbFoto.secure_url
            }
            
            newHeroe.push(heroe);
            
        }
       
        //console.log(newHeroe)
        return res.status(201).json({
            ok: true,
            heroes: newHeroe,
            token
            //dbFoto
            
        })

    }
        
        const dbHeroeAll = await Heroe.find();
        //console.log(dbHeroeAll);
        if(dbHeroeAll.length === 0){
            return res.status(400).json({
                ok: false,
                msg: 'Aún no han agregado heroes, agrega uno'
            })
        }

           const newHeroes = [];
           

        for (let i = 0; i < dbHeroeAll.length; i++) {
      
             const fotos = await Foto.findOne({ id_heroe: dbHeroeAll[i]._id})

            // }
            
            //const element = fotos[i]; 
             console.log(dbHeroeAll[i].superheroe)
             console.log(fotos)
            //newHeroe['url']= element.url;
            const heroe = {
                id: dbHeroeAll[i]._id,
                superheroe: dbHeroeAll[i].superheroe,
                aniocreacion: dbHeroeAll[i].aniocreacion,
                personajes: dbHeroeAll[i].personajes,
                peliculas: dbHeroeAll[i].peliculas,
                uid: dbHeroeAll[i].uid,
                url: fotos.secure_url
                
            }
            newHeroes.push(heroe);
            
            
        }
       
       
        return res.status(201).json({
            ok: true,
            heroes: newHeroes,
            
            
            
        })

}



module.exports = {
    listAllHeroes
}