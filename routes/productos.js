const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
     validarJWT, 
     esAdminRole 
    } = require('../middlewares');

const { 
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers');

const { existeProductoById,existeCategoriaById } = require('../helpers');

const router = Router();

//obtener todas las productos  - publico 
router.get('/', obtenerProductos);

//obtener una producto por id - publico 
router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
],obtenerProducto);

//Crear producto - privado - cualquier persona con un token válido 
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos,
    ], crearProducto
 );

//Actualizar - privado - cualquier persona con un token válido 
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un ID válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos,
], actualizarProducto);

//Borrar producto - privado - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos,
], borrarProducto);



module.exports = router;