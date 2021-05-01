const { response, request } = require('express');
const { hashContraseña } = require('../helpers/funciones');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res=response) => {

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

}

const usuariosPut = async(req = request, res=response) => {
    
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    //TODO validar contra base de datos
    if(password){
        resto.password = await  hashContraseña(password);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}


const usuariosPost = async  (req = request, res=response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol});

    // Encriptar la contraseña
     usuario.password = await hashContraseña(password);

    //Guardar en DB    
    try {
        await usuario.save();
        res.json({ 
            usuario,            
        });
    } catch (error) {
        console.log(error);
    }
    
}

const usuariosDelete = async (req = request, res=response) => {
    const {id} = req.params;
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json(usuario);
}

const usuariosPatch = (req = request, res=response) => {

    res.json({ msg: 'API PATCH - controlador'});
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}