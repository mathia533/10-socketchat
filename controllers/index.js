const auth = require('./auth');
const Categorias = require('./categorias');
const Productos = require('./productos');
const Usuarios = require('./usuarios');
const buscar = require('./buscar');

module.exports = {
    ...auth,
    ...Categorias,
    ...Productos,
    ...Usuarios,
    ...buscar,
}