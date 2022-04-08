const Heroe = require('../model/Heroe');
const Foto = require('../model/Foto');
const { genenarJwt } = require('../../auth/helpers/jwt');
const Usuario = require('../../auth/model/Usuario');

const searchHeroe = async (req, res) => {
 try {

  
  const { superheroe, uid } = req.query;
//  const id = '62259bd6d29d2a842580fad2'
//   console.log(superheroe)
//   const dbHeroe = await Heroe.find( { superheroe: superheroe })
//   const dbUusario = await Usuario.findById(id)
//   console.log(dbHeroe)
//   console.log(dbUusario)

//     res.status(201).json({
//       ok: true,
//       dbHeroe,
//       // superheroe: result[0].superheroe,
//       // aniocreacion: result[0].aniocreacion,
//       // personajes: result[0].personajes,
//       // comics: result[0].comics,
//       // peliculas: result[0].peliculas,
//       // uid:  result[0].uid,
//       //token,
//       //arrayFoto
//   })
  const result = await  Heroe.aggregate([
      {
        '$search': {
          'autocomplete': {
            'path': 'superheroe', 
            'query': superheroe, 
            'fuzzy': {
              'maxEdits': 1, 
              'prefixLength': 1, 
              'maxExpansions': 256,
              
            }, 
            'tokenOrder': 'any'
          }
        }
      }, 
       {
        '$limit': 5
      }
    ]);

    console.log(result)

    if(result.length >= 0){
      const dbUusario = await Usuario.findById(uid)
      console.log(dbUusario)
      const arrayHeroes = [];
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        //console.log(element)
   
     //
   
     //const dbFoto = await Foto.find( { id_heroe: result[i]._id })
      
     const heroeSearch = {
       id: result[i]._id,
       superheroe:  result[i].superheroe,
       aniocreacion:  result[i].aniocreacion,
       personajes:  result[i].personajes,
       comics:  result[i].comics,
       peliculas:  result[i].peliculas,
       uid:   result[i].uid,
     }
    
    arrayHeroes.push(heroeSearch)

    //  for (let i = 0; i < dbFoto.length; i++) {
    //      const element = dbFoto[i];
         
         
    //      arrayFoto.push(element)
         
    //  }   
      }
      const token = await genenarJwt(uid, dbUusario.name);

    return res.status(201).json({
         ok: true,
         arrayHeroes,
         token
        //  //result,
        //  id: result[i]._id,
        //  superheroe:  result[i].superheroe,
        //  aniocreacion:  result[i].aniocreacion,
        //  personajes:  result[i].personajes,
        //  comics:  result[i].comics,
        //  peliculas:  result[i].peliculas,
        //  uid:   result[i].uid,
         
         
     })

    
  }

   
 } catch (error) {
   return res.status(500).json({
     ok: false,
     msg: "Error, por favor comuniquese con el administrador"
   })
   
 }
}

const verHeroe = async (req, res) => {

  try {
    const { id, uid } = req.query;
 
    const dbHeroe = await Heroe.findById( id );
   
    const dbUser = await Usuario.findById( {_id: uid  } )

    const token = await genenarJwt(uid, dbUser.name );
  
    console.log(dbUser)
    console.log( id, uid )
    const dbFoto = await Foto.find( { id_heroe: id })

    return res.status(201).json({
      ok: true,
      id,
      superheroe    : dbHeroe.superheroe,
      aniocreacion  : dbHeroe.aniocreacion,
      personajes    : dbHeroe.personajes,
      comics        : dbHeroe.comics,
      peliculas     : dbHeroe.peliculas,
      uid           : dbHeroe.uid,           
      fotos         : dbFoto,
      token
  })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: "Error, por favor comuniquese con el administrador"
    })
  }

}




module.exports = {
    searchHeroe,
    verHeroe
}