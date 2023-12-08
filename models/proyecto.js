const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Debe colocar un número'],
        unique: [true, 'Consecutivo del proyecto debe ser único']
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    fechaIniciacion: {
        type: Date,
        default: new Date()
    },
    fechaEntrega: {
        type: Date,
        default: new Date()
    },
    valor: {
        type: Number,
        default: 0  
    },
    fechaCreacion: {
    type: Date,
    default: new Date()
    },
    fechaActualizacion: {
    type: Date,
    default: new Date()
    }
});

module.exports = model('Proyecto', ProyectoSchema);
