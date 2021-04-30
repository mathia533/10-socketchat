const { response, request } = require('express');

const usuariosGet = (req = request, res=response) => {

    const {q,nombre='no name',page=10, limit} = req.query;


    res.json({ 
        msg: 'GET API - controlador',
        q,
        nombre,
        page,
        limit
        
    });
}

const usuariosPut = (req = request, res=response) => {
    
    const id = req.params.id;

    res.json({ 
        msg: 'PUT API - controlador',
        id,
        
    });
}


const usuariosPost = (req = request, res=response) => {

    const {nombre,edad} = req.body;

    res.json({ 
        msg: 'POST API - controlador',
        nombre,
        edad 
        
    });
}

const usuariosDelete = (req = request, res=response) => {

    res.json({ msg: 'API DELETE - controlador'});
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