//Middlewares creados por mi
const ValidarCampos  = require('../middlewares/validar-campos');
const ValidarJWT     = require('../middlewares/validar-jwt');
const ValidarRoles   = require('../middlewares/validar-roles');
const ValidarArchivo = require('../middlewares/validar-archivo');


module.exports={
    ...ValidarCampos,
    ...ValidarJWT,
    ...ValidarRoles,
    ...ValidarArchivo,
}