const { request, response } = require('express');
const { validationResult } = require('express-validator');

//funcionan con 3 parametros req, res y next
const validarCampos = (req = request, res = response, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    //esta funcion se utiliza para que una vez terminado se ejecute 
    //el proximo  middleware
    next();
}

module.exports = {
    validarCampos
}