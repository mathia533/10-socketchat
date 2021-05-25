const { response, request } = require("express");
const {Categoria} = require('../models');

const crearCategoria = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({nombre});

        if(categoriaDB){
            return res.status(400).json({
                msg:`La categoria ${categoriaDB.nombre}, ya existe`
            });
        }
    
        //generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }
    
        const categoria = new Categoria(data);
        //guardar en db
        await categoria.save();
        res.status(201).json(categoria);

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al crear la categoria, contacte al administrador.'
            }
        );
    }

}
//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req = request, res=response) => {
    try {
        //const {q,nombre='no name',page=10, limit} = req.query;
    
        const {limit = 5, desde =0} = req.query;
        const query = {estado: true};
    
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario','nombre')
                .skip(Number(desde))
                .limit(Number(limit)),
        ])
        res.json({ 
            total,
            categorias         
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al obtener las categorias, contacte al administrador.'
            }
        );
    }

}
//obtenerCategoria  - populate{}

const obtenerCategoria = async(req = request, res=response) => {
    try {
        
        const {id} = req.params;
        const categoria = await Categoria.findById(id).populate('usuario','nombre');
        res.json(categoria);

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al obtener la categoria, contacte al administrador.'
            }
        );
    }

}
//actualizarCategoria
const actualizarCategoria = async(req = request, res=response) => {
    try {
        const {id, nombre} = req.params;
        const { estado, usuario, ...data} = req.body

        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        //busco la categoria         
        const categoriaDB = await Categoria.findOne({nombre});
        //valido si existe
        if(categoriaDB){
            return res.status(400).json({
                msg: 'La categoria ya se encuentra registrada en la DB.'
            });
        }

        //si la categoria esta activa

        if(categoriaDB && !categoriaDB.estado){
            return res.status(400).json({
                msg: 'La categoria ya se encuentra elimininada en la DB - estado : false'
            });
        }
        //actualizo los datos
        const categoria = await Categoria.findByIdAndUpdate(id, data,{new: true});
    
        res.json(categoria);
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al actualizar la categoria, contacte al administrador.'
            }
        );
    }
    
}
//borrarCategoria - estado: false

const borrarCategoria = async (req = request, res=response) => {
    try {
        const {id} = req.params;
        //const categoria = await Categoria.findByIdAndDelete(id);
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new: true});
        res.status(200).json(categoria);
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al eliminar la categoria, contacte al administrador.'
            }
        );
    }
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}