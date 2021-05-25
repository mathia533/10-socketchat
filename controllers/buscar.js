const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const {Usuario,Producto,Categoria} = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
];


const buscarCategorias = async( termino = '', res = response) =>{
    const esMoongoID = ObjectId.isValid(termino) ;
    if(esMoongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] :[]
        });
    }
    const regex = new RegExp(termino, 'i' );
    const categorias = await Categoria.find({nombre : regex, estado : true});
     
    return res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response) =>{
    const esMoongoID = ObjectId.isValid(termino) ;
    if(esMoongoID){
        const producto = await Producto.findById(termino)
            .populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] :[]
        });
    }
    const regex = new RegExp(termino, 'i' );
    const productos = await Producto.find({nombre : regex, estado : true})
        .populate('categoria','nombre');
     
    return res.json({
        results: productos
    });

}

const buscarUsuarios = async( termino = '', res = response) =>{
    const esMoongoID = ObjectId.isValid(termino) ;
    if(esMoongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] :[]
        });
    }
    const regex = new RegExp(termino, 'i' );
    const usuarios = await Usuario.find({ 
        $or:    [{nombre : regex},{correo : regex}],
        $and: [{estado : true}]
    });
     
    return res.json({
        results: usuarios
    });   
}



const buscar = (req = request, res=response) => {
    try {
        const {coleccion, termino} = req.params;
        if(!coleccionesPermitidas.includes(coleccion)){
            return res.status(400).json(
                { 
                    msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
                }
            );
        }

        switch (coleccion) {
            case 'categorias':
                buscarCategorias(termino, res);
                break;
            
            case 'productos':
                buscarProductos(termino, res);
                break;

            case 'usuarios':
                buscarUsuarios(termino, res);
                break;
                    
            default:
                return res.status(500).json(
                    { 
                        msg: 'No realizó la busqueda. , contacte al administrador para validar las colecciones. '
                    }
                );
        }

      
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al obtener las categorias, contacte al administrador.'
            }
        );
    }


    
}


module.exports = {
        buscar
}