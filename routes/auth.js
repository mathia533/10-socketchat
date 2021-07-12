const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');


const { 
    login
    ,googleSignIn
    ,renovarToken
 } = require('../controllers');


const router = Router();

router.post('/login',[
    check('correo', 'El correo obligatorio.').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos  
], login );


router.post('/google',[
    check('id_token', 'id_token obligatorio.').not().isEmpty(),
    validarCampos  
], googleSignIn );

router.get('/', validarJWT, renovarToken );


module.exports = router;