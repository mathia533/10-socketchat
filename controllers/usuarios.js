const { response, request } = require('express');
const { hashContraseña } = require('../helpers/funciones');

//Obtengo el modelo del objeto
const {Usuario} = require('../models');


const usuariosGet = async(req = request, res=response) => {

    try {
        //const {q,nombre='no name',page=10, limit} = req.query;
    
        const {limit = 5, desde =0} = req.query;
        const query = {estado: true};
    
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limit)),
        ])
        res.json({ 
            total,
            usuarios         
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al obtener el usuario, contacte al administrador.'
            }
        );
    }

}

const usuariosPut = async(req = request, res=response) => {
    try {
        const {id} = req.params;
        const {_id, password, google, correo, ...resto} = req.body;
        //TODO validar contra base de datos
        if(password){
            resto.password = await  hashContraseña(password);
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
        res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al actualizar el usuario, contacte al administrador.'
            }
        );
    }
    
}


const usuariosPost = async  (req = request, res=response) => {

    try {
        const {nombre, correo, password, rol} = req.body;
        const usuario = new Usuario( {nombre, correo, password, rol});
    
        // Encriptar la contraseña
         usuario.password = await hashContraseña(password);
    
        //Guardar en DB    
        await usuario.save();
        res.json({ 
            usuario,            
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al Crear el usuario, contacte al administrador.'
            }
        );
    }
    
}

const usuariosDelete = async (req = request, res=response) => {
    try {
        
        const {id} = req.params;
        //const uid = req.uid;
        
        
        //const usuario = await Usuario.findByIdAndDelete(id);
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
        res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al eliminar el usuario, contacte al administrador.'
            }
        );
    }
}

const usuariosPatch = (req = request, res=response) => {
    try {
        res.json({ msg: 'API PATCH - controlador'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al realizar el llamado patch  del usuario, contacte al administrador.'
            }
        );
    }
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}