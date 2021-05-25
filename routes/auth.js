const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');


const { 
    login
    ,googleSignIn
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


module.exports = router;