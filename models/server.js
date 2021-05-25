//se instancian los modulos
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        //instancio el modulo de express
        this.app = express();
        //variables de entorno que se guardan en el archivo .nv
        this.port = process.env.PORT;

        //se crean los paths que utilizaremos en el router
        this.paths = {
            auth :          '/api/auth',
            buscar:         '/api/buscar',    
            categorias:    '/api/categorias',
            productos:     '/api/productos',
            usuarios:      '/api/usuarios',
        };
       
        
        // conectar a base de datos
        this.conectarDB();

        //Middlewares 
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );
        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes(){
        //se definen las rutas que se van a llamar pasando los paths instanciados mas arriba.
        this.app.use(this.paths.auth,       require('../routes/auth'));  
        this.app.use(this.paths.buscar,     require('../routes/buscar'));  
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos,  require('../routes/productos'));
        this.app.use(this.paths.usuarios,   require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            //esto es para verificar en consola que esta corriendo sin problemas y en que puerto la aplicacion.
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
  
    }

}

module.exports = Server;