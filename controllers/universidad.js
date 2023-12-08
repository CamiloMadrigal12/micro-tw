const { request, response } = require('express');
const TipoProyecto = require('../models/tipoProyecto');

/**
 * Crear tipo de proyecto
 */
const createTipoProyecto = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const tipoProyectoBD = await TipoProyecto.findOne({ nombre });

        if (tipoProyectoBD) { // Ya existe
            return res.status(400).json({ msg: 'Ya existe tipo de proyecto con ese nombre' });
        }

        const datos = {
            nombre
        };

        const tipoProyecto = new TipoProyecto(datos);

        await tipoProyecto.save();

        return res.status(201).json(tipoProyecto);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
};

/**
 * Consultar todos los tipos de proyectos
 */
const getTiposProyectos = async (req, res = response) => {
    try {
        const tiposProyectosBD = await TipoProyecto.find();
        return res.json(tiposProyectosBD);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
};

/**
 * Consultar tipo de proyecto por ID
 */
const getTipoProyectoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const tipoProyectoBD = await TipoProyecto.findOne(query);
        return res.json(tipoProyectoBD);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
};

/**
 * Actualizar tipo de proyecto por ID
 */
const updateTipoProyectoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const data = {
            nombre,
            fechaActualizacion: new Date()
        };

        const tipoProyecto = await TipoProyecto.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json(tipoProyecto);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
};

/**
 * Borrar tipo de proyecto por ID
 */
// const deleteTipoProyectoByID = async (req = request, res = response) => {
//     try {
//         const { id } = req.params;
//         const tipoProyecto = await TipoProyecto.findByIdAndDelete(id);
//         res.status(204).json(tipoProyecto);
//     } catch (e) {
//         return res.status(500).json({ msj: e.message });
//     }
// };

module.exports = {
    createTipoProyecto,
    getTiposProyectos,
    getTipoProyectoPorId,
    updateTipoProyectoPorId
    
};