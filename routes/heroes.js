const { Router } = require('express');
const { check } = require('express-validator');
const { addHeroe } = require('../heroes/controller/add');

const { borrarHeroe } = require('../heroes/controller/delete');
const { editarHeroe } = require('../heroes/controller/edit');
const { listAllHeroes } = require('../heroes/controller/list');
const { searchHeroe, verHeroe } = require('../heroes/controller/search');
const { uploadPhoto, uploadPhotos } = require('../middlewares/multer');
const { validarCamposCorrectos, validarCamposImagen } = require('../middlewares/validar-campos');

const router = Router();


router.post('/add', uploadPhotos, [ 
    check('superheroe', 'El nombre del heroe es necesario').not().isEmpty(), 
    check('aniocreacion', 'El año de publicación es necesario').not().isEmpty(),
    check('personajes', 'Los personajes son necesarios').not().isEmpty(),
    check('comics', 'El comics al que pertenece es requerido').not().isEmpty(),
    check('peliculas', 'Las peliculas en las que aparece son necesaria').not().isEmpty(),
    check('uid', 'El id del usuario es necesario').not().isEmpty(),
validarCamposCorrectos], 
addHeroe);


router.get('/search', [
    check('superheroe', 'El nombre del heroe es necesario').not().isEmpty(),
    check('uid', 'El id del usuario es necesario').not().isEmpty(),
    validarCamposCorrectos
], searchHeroe)

router.put('/edit', uploadPhotos, [ 
    check('id', 'El ID del heroe es necesario').not().isEmpty(),
    check('superheroe', 'El nombre del heroe es necesario').not().isEmpty(), 
    check('aniocreacion', 'El año de publicación es necesario').not().isEmpty(),
    check('personajes', 'Los personajes son necesarios').not().isEmpty(),
    check('comics', 'El comics al que pertenece es requerido').not().isEmpty(),
    check('peliculas', 'Las peliculas en las que aparece son necesaria').not().isEmpty(),
    check('uid', 'El id del usuario es necesario').not().isEmpty(),
validarCamposCorrectos], editarHeroe)

router.get('/', listAllHeroes)

router.get('/ver', [
    check('id', 'El ID del heroe es necesario').not().isEmpty(),
    check('uid', 'El id del usuario es necesario').not().isEmpty(),
    validarCamposCorrectos
], verHeroe)

router.get('/list', [
check('uid', 'El id del usuario es necesario').not().isEmpty(),
validarCamposCorrectos],
listAllHeroes)

router.delete('/delete', [
    check('id', 'El id del Heroe es necesario').not().isEmpty(),
    check('uid', 'El id del usuario es necesario').not().isEmpty(),
validarCamposCorrectos], 
borrarHeroe )

module.exports = router;


