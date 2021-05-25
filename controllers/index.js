const auth = require('./auth');
const Categorias = require('./categorias');
const Productos = require('./productos');
const Usuarios = require('./usuarios');
const buscar = require('./buscar');
const Uploads = require('./uploads');
module.exports = {
    ...auth,
    ...Categorias,
    ...Productos,
    ...Usuarios,
    ...buscar,
    ...Uploads,
}