const path = require('path');
const fs = require('fs');

var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const{subirArchivo} = require('../helpers');
const { response, request } = require("express");
const {Usuario, Producto} = require('../models');

const cargarArchivo = async (req = request, res = response) =>{
    try {
        //ejemplo
        //https://github.com/richardgirges/express-fileupload/blob/master/example/server.js

        //imagenes ya tiene predefinido las extensiones 
        const nombre  = await subirArchivo(req.files,undefined,'imgs')
        res.json({nombre});
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
}

const actualizarImagen = async (req = request, res = response) =>{
    try {
        const {id, coleccion} = req.params;
        let modelo;

        switch (coleccion) {

            case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({ 
                            msg: `No existe un usuario con el id: ${id}.`
                        });
                }
                break;

                case 'productos':
                    modelo = await Producto.findById(id);
                    if(!modelo){
                        return res.status(400).json({ 
                                msg: `No existe un producto con el id: ${id}.`
                            });
                    }
                    break;
                    
            default:
                return res.status(500).json(
                    { 
                        msg: 'No realizó la actualizacion. , contacte al administrador para validar las colecciones. '
                    }
                );
        }
        // limipiar imagenes previas 
        if(modelo.img){
            const pathImagen = path.join(__dirname, '../uploads',coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                fs.unlink(pathImagen);
            }
        }
     
        //imagenes ya tiene predefinido las extensiones 
        const nombre  = await subirArchivo(req.files,undefined,coleccion)
        modelo.img = nombre;
        await modelo.save();
        res.json(modelo);
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
}

const actualizarImagenClaudinary = async (req = request, res = response) =>{
    try {
        const {id, coleccion} = req.params;
        let modelo;

        switch (coleccion) {

            case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({ 
                            msg: `No existe un usuario con el id: ${id}.`
                        });
                }
                break;

                case 'productos':
                    modelo = await Producto.findById(id);
                    if(!modelo){
                        return res.status(400).json({ 
                                msg: `No existe un producto con el id: ${id}.`
                            });
                    }
                    break;
                    
            default:
                return res.status(500).json(
                    { 
                        msg: 'No realizó la actualizacion. , contacte al administrador para validar las colecciones. '
                    }
                );
        }
        // limipiar imagenes previas 
        if(modelo.img){
           const nombreArr = modelo.img.split('/');
           const nombre = nombreArr[ nombreArr.length -1];
           const [public_id] = nombre.split('.');
           cloudinary.uploader.destroy("RestServer NodeJs/"+public_id);
        }
        const {tempFilePath} = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath,{folder:"RestServer NodeJs"});
        modelo.img = secure_url;
        await modelo.save();
        res.json(modelo);
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
}



const mostrarImagen = async (req = request, res = response) =>{
    try {
        const {id, coleccion} = req.params;
        let modelo;

        switch (coleccion) {

            case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({ 
                            msg: `No existe un usuario con el id: ${id}.`
                        });
                }
                break;

                case 'productos':
                    modelo = await Producto.findById(id);
                    if(!modelo){
                        return res.status(400).json({ 
                                msg: `No existe un producto con el id: ${id}.`
                            });
                    }
                    break;
                    
            default:
                return res.status(500).json({ 
                        msg: 'No realizó la actualizacion. , contacte al administrador para validar las colecciones. '
                    });
        }
        // verifico que tenga el path guardado
        if(modelo.img){
            const pathImagen = path.join(__dirname, '../uploads',coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                //devuelvo la imagen
                return res.sendFile(pathImagen);
            }
        }
        
        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(pathImagen);
        
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
}


const mostrarImagenClaudinary = async (req = request, res = response) =>{
    try {
        const {id, coleccion} = req.params;
        let modelo;

        switch (coleccion) {

            case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({ 
                            msg: `No existe un usuario con el id: ${id}.`
                        });
                }
                break;

                case 'productos':
                    modelo = await Producto.findById(id);
                    if(!modelo){
                        return res.status(400).json({ 
                                msg: `No existe un producto con el id: ${id}.`
                            });
                    }
                    break;
                    
            default:
                return res.status(500).json({ 
                        msg: 'No realizó la actualizacion. , contacte al administrador para validar las colecciones. '
                    });
        }
        // verifico que tenga el path guardado
        if(modelo.img){
            return res.json(modelo.img);
        }
        
        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(pathImagen);
        
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenClaudinary,
    mostrarImagenClaudinary,
    mostrarImagen
}