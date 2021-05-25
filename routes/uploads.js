const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenClaudinary, mostrarImagenClaudinary } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c,['usuarios','productos'])),
    validarCampos
],mostrarImagenClaudinary);
//],mostrarImagen);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c,['usuarios','productos'])),
    validarCampos
],actualizarImagenClaudinary);
//],actualizarImagen);


module.exports = router;

