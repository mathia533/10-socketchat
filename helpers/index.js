const DBValidators = require('./db-validators');
const Funciones = require('./funciones');
const JWT = require('./generar-jwt');
const GoogleVerify = require('./google-verify');

module.exports = {
    ...DBValidators,
    ...Funciones,
    ...JWT,
    ...GoogleVerify,
}