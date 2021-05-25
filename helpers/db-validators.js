//Importacion de clases
const { Categoria, Role, Usuario, Producto } = require('../models');

//Validaciones
const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const existeEmail = async( correo = '' ) =>{
     //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El correo: ${ correo }, ya está registrado.`);
    }
 }

 const existeUsuarioById = async( id = ''  ) =>{
    //verificar si el correo existe
   const existeUsuario = await Usuario.findById(id);
   if(!existeUsuario){
       throw new Error(`El id: ${ id }, no existe.`);
   }
}

const existeCategoriaById = async( id = ''  ) =>{
    //verificar si el correo existe
   const existeCategoria = await Categoria.findById(id);
   if(!existeCategoria){
       throw new Error(`El id: ${ id }, no existe.`);
   }
}

const existeProductoById = async( id = ''  ) =>{
    //verificar si el correo existe
   const existeProducto = await Producto.findById(id);
   if(!existeProducto){
       throw new Error(`El id: ${ id }, no existe.`);
   }
}

const coleccionesPermitidas = ( coleccion = '', colecciones=[]) =>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida - ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById,
    coleccionesPermitidas
}