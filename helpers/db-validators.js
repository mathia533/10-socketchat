//Importacion de clases
const Role = require('../models/role');
const Usuario = require('../models/usuario');



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



module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,

}