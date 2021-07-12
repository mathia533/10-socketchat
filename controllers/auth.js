const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const {Usuario} = require('../models');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response) => {

    try {
        const {correo, password}  = req.body;

        //verificar si el correo existe
        const usuario = await Usuario.findOne({correo});

       

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //si el usuario esta activo

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado : false'
            });
        }

        // verificar la contraseña
        const validPassword =  bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
                usuario,
                token
            
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal contacte al administrador.'
            }
            );
    }


    

}

const googleSignIn = async (req = request, res = response) => {
    
    try {
        const {id_token} = req.body;

        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            //lo creo si no existe
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
            }
            usuario = new Usuario(data);
            await usuario.save();
        }
        //se podria actualizar los datos si existe


        //si el usuario en db
        if(!usuario.estado){
            
            res.status(401).json({
                msg:'Usuario Bloqueado, contacte al administrador.'
            });
        
        }

         //generar el JWT
         const token = await generarJWT(usuario.id);


        res.json({
           usuario,
           token
        });

    } catch (error) {
        res.status(400).json({
            msg:'Token de Google no es válido'
        });
    }


}

const renovarToken = async (req = request, res = response) => {
    
    try {
        const {usuario} = req;

        //generar el JWT
         const token = await generarJWT(usuario.id);

        res.json({
           usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg:'Token de Google no es válido'
        });
    }


}

module.exports = {
    login,
    googleSignIn,
    renovarToken
}