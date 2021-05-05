const { response, request } = require('express');
const jwt = require('jsonwebtoken');

//obtengo el modelo del usuario
const Usuario = require('../models/usuario');

//funcionan con 3 parametros req, res y next
const validarJWT = async (req = request, res = response, next) =>{
    
    //aca especifico el nombre de la variable que va acontener 
    //el token en el header en este caso el prof uso x-token

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        // verifica el token comparando con la clave secreta guardada en el archivo env
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //obtengo usuario que corresponde al uid y
        //lo paso como parametro
         const usuario = await Usuario.findById(uid);

         // verifico  si existe el usuario en la DB
         if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe DB'
            })
         }
         
         //verificar si el estado del usuario esta en true
         if(!usuario.estado){
             return res.status(401).json({
                 msg: 'Token no valido - usuario eliminado'
             })
         }
         
         req.usuario = usuario;
         //esta funcion se utiliza para que una vez terminado se ejecute 
         //el proximo  middleware
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
        
    }

}

module.exports = {
    validarJWT
}