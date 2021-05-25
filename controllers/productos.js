const { response, request } = require("express");
const {Producto} = require('../models');

const crearProducto = async (req = request, res = response) => {
    try {
        const {estado, usuario, ...body} = req.body;
        const productoDB = await Producto.findOne({nombre: body.nombre});

        if(productoDB){
            return res.status(400).json({
                msg:`La producto ${productoDB.nombre}, ya existe`
            });
        }
    
        //generar la data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }
    
        const producto = new Producto(data);
        //guardar en db
        await producto.save();
        res.status(201).json(producto);

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al crear la producto, contacte al administrador.'
            }
        );
    }

}
//obtenerProductos - paginado - total - populate
const obtenerProductos = async(req = request, res=response) => {
    try {
        //const {q,nombre='no name',page=10, limit} = req.query;
    
        const {limit = 5, desde =0} = req.query;
        const query = {estado: true};
    
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario','nombre')
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit(Number(limit)),
        ])
        res.json({ 
            total,
            productos         
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al obtener las productos, contacte al administrador.'
            }
        );
    }

}
//obtenerProducto  - populate{}

const obtenerProducto = async(req = request, res=response) => {
    try {
        
        const {id} = req.params;
        const producto = await Producto.findById(id)
            .populate('usuario','nombre')
            .populate('categoria','nombre');
        res.json(producto);

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al obtener la producto, contacte al administrador.'
            }
        );
    }

}
//actualizarProducto
const actualizarProducto = async(req = request, res=response) => {
    try {
        const {id, nombre} = req.params;
        const { estado, usuario, ...data} = req.body
        if(data.nombre){
            data.nombre = data.nombre.toUpperCase();
        }
        data.usuario = req.usuario._id;

        //busco la producto         
        const productoDB = await Producto.findOne({nombre});
        //valido si existe
        if(productoDB){
            return res.status(400).json({
                msg: 'La producto ya se encuentra registrada en la DB.'
            });
        }

        //si la producto esta activa

        if(productoDB && !productoDB.estado){
            return res.status(400).json({
                msg: 'La producto ya se encuentra elimininada en la DB - estado : false'
            });
        }
        //actualizo los datos
        const producto = await Producto.findByIdAndUpdate(id, data,{new: true});
    
        res.json(producto);
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al actualizar la producto, contacte al administrador.'
            }
        );
    }
    
}
//borrarProducto - estado: false

const borrarProducto = async (req = request, res=response) => {
    try {
        const {id} = req.params;
        //const producto = await Producto.findByIdAndDelete(id);
        const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new: true});
        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            { 
                msg: 'Algo salio mal al eliminar la producto, contacte al administrador.'
            }
        );
    }
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}