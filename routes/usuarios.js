//modulos
const { Router } = require('express');
const { check } = require('express-validator');

// //Middlewares creados por mi
const{
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

//validaciones personalizadas de la DB
const { 
    esRoleValido, 
    existeEmail, 
    existeUsuarioById 
} = require('../helpers/db-validators');


const {
     usuariosGet,
     usuariosPut,
     usuariosPost,
     usuariosDelete,
     usuariosPatch
    }  = require ('../controllers/usuarios');


const router = Router();

//GET
router.get('/',  usuariosGet);

// PUT
router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

//POST
router.post('/',[
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password es obligatorio, debe ser mas de 6 letras.').isLength({min: 6}),
    check('correo', 'El correo no es válido.').isEmail(),
    check('correo').custom( existeEmail ),
    check('rol').custom( esRoleValido ),
    validarCampos  
], usuariosPost );

//DELETE
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
],usuariosDelete );

//PATCH
router.patch('/', usuariosPatch);



module.exports = router;