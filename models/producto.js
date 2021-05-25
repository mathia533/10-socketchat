const {Schema, model}= require('mongoose');
const ProductoSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required:  [true, 'El estado es obligatorio']
    },
    categoria : {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required:  [true, 'El categoria es obligatorio']
    },
    precio:{
        type: Number,
        default:0
    },
    descripcion:{
        type: String,
    },
    disponible:{
        type: Boolean,
        default: true,
    },
    img:{
        type: String,
    },
    usuario : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:  [true, 'El usuario es obligatorio']
    }
    
});

ProductoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model('Producto', ProductoSchema);