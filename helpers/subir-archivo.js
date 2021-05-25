var fs = require('fs');
const path = require('path');
//uuid sirve para generar id's
const { v4: uuidv4 } = require('uuid');

const extensionesValidasImagenes =['png','jpg','jpeg','gif'];

const subirArchivo = (files, extensionesValidas = extensionesValidasImagenes, carpeta='') => {
    return new Promise((resolve, reject) =>{
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1].toLowerCase();

        //validar extension
        if(!extensionesValidas.includes(extension)){
           return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`)
        }

        //verifico que la carpeta Uploads exista, sino la creo
        if (!fs.existsSync(path.join( __dirname , '../uploads/'))){
            fs.mkdirSync(path.join( __dirname , '../uploads/'));
        }  
        //verifico que la carpeta del parametro exista, sino la creo
        if (carpeta != '' && !fs.existsSync(path.join( __dirname , '../uploads/', carpeta))){
            fs.mkdirSync(path.join( __dirname , '../uploads/', carpeta));
        }  

        const nombreTemp = uuidv4()+'.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2
        const uploadPath = path.join( __dirname , '../uploads/', carpeta , nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
              console.log(err);
              return reject(err);
          }
          resolve(nombreTemp);
        });

    });
}

module.exports = {
    subirArchivo
}