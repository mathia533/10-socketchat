const dbValidators  = require('./db-validators');
const Funciones     = require('./funciones');
const JWT           = require('./generar-jwt');
const GoogleVerify  = require('./google-verify');
const subirArchivo  = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...Funciones,
    ...JWT,
    ...GoogleVerify,
    ...subirArchivo,
}