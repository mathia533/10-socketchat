//se instancian los modulos
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');

class Server {
    constructor(){
        //instancio el modulo de express
        this.app = express();
        //variables de entorno que se guardan en el archivo .nv
        this.port = process.env.PORT;

        //esto lo utilizo para poder usar io
        this.server = createServer(this.app);
        //socket io
        this.io     =  require('socket.io')(this.server);

        //se crean los paths que utilizaremos en el router
        this.paths = {
            auth :          '/api/auth',
            buscar:         '/api/buscar',    
            categorias:    '/api/categorias',
            productos:     '/api/productos',
            usuarios:      '/api/usuarios',
            uploads:      '/api/uploads',
        };
       
        
        // conectar a base de datos
        this.conectarDB();

        //Middlewares 
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //escuchar eventos de sockets
        this.sockets();
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

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            //createParentPath: true, //esto sirve para que permita crear la carpeta sino existe.. yo lo hago de otra manera
        }));

    }

    routes(){
        //se definen las rutas que se van a llamar pasando los paths instanciados mas arriba.
        this.app.use(this.paths.auth,       require('../routes/auth'));  
        this.app.use(this.paths.buscar,     require('../routes/buscar'));  
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos,  require('../routes/productos'));
        this.app.use(this.paths.usuarios,   require('../routes/usuarios'));
        this.app.use(this.paths.uploads,   require('../routes/uploads'));
    }

    sockets(){
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) );
    }

    listen(){
        //aca cambie app por server para utilizar socket io
        this.server.listen(this.port, () => {
            //esto es para verificar en consola que esta corriendo sin problemas y en que puerto la aplicacion.
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        });
  
    }

}

module.exports = Server;