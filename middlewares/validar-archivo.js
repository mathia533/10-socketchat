const { request, response } = require('express');

//funcionan con 3 parametros req, res y next
const validarArchivoSubir = (req = request, res = response, next) =>{
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay archivos para subir - validarARchivoSubir'});
    }

    //esta funcion se utiliza para que una vez terminado se ejecute 
    //el proximo  middleware
    next();
}

module.exports = {
    validarArchivoSubir
}