const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
     validarJWT, 
     esAdminRole 
    } = require('../middlewares');

const { 
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers');

const { existeCategoriaById } = require('../helpers');

const router = Router();

//obtener todas las categorias  - publico 
router.get('/', obtenerCategorias);

//obtener una categoria por id - publico 
router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token válido 
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    ], crearCategoria
 );

//Actualizar - privado - cualquier persona con un token válido 
router.put('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCategoria);

//Borrar categoria - privado - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos,
], borrarCategoria);



module.exports = router;