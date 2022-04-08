const { Router } =  require('express');
const { check } = require('express-validator');
const { newUser,   } = require('../auth/controller/register');
const {login} = require('../auth/controller/login');
const { validarCamposCorrectos } = require('../middlewares/validar-campos');
const {renovar, validarEmail} = require('../auth/controller/renewToken');
const { validarJwt } = require('../middlewares/validar-token');
const { editarUsuario } = require('../auth/controller/edit');
const { uploadPhoto } = require('../middlewares/multer');

const router = Router();


router.post('/new', [
    check('name', 'El nombre es necesario').not().isEmpty(),
    check('lastname', 'El apellido es necesario').not().isEmpty(),
    check('email', 'El email es necesario y debe tener un formato valido').isEmail(),
    check('password', 'El password es obligatorio').isLength( { min: 6 } ),
    validarCamposCorrectos
], newUser)


router.post('/login', [
    check('email', 'El email es necesario y debe tener un formato valido').isEmail(),
    check('password', 'El password es obligatorio').isLength( { min: 6 } ),
    validarCamposCorrectos
], login )


router.put('/edit', uploadPhoto, [
    check('uid', 'El id es necesario').not().isEmpty(),
    check('name', 'El nombre es necesario').not().isEmpty(),
    check('lastname', 'El apellido es necesario').not().isEmpty(),   
    validarCamposCorrectos
], editarUsuario )


// router.put('/photos',  uploadPhoto, [ 
//     check('uid', 'El id del usuario es necesario').not().isEmpty(),
//     validarCamposCorrectos], 
//     cambiarFoto)



router.get('/renew', validarJwt, renovar)

router.get('/usuario', [
    check('email', 'El email es necesario y debe tener un formato valido').isEmail(),
    validarCamposCorrectos
], validarEmail)

module.exports = router;

// [
//     check('photo', 'la foto es necesaria').not().isEmpty(),
//     validarCamposCorrectos
// ], 
