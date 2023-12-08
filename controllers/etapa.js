const { request, response } = require('express');
const Etapa = require('../models/etapa');

/**
 * Crear etapa
 */
const createEtapa = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const etapaBD = await Etapa.findOne({ nombre });

        if (etapaBD) { // Ya existe
            return res.status(400).json({ msg: 'Ya existe una etapa con ese nombre' });
        }

        const datos = {
            nombre,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        }

        const etapa = new Etapa(datos);

        await etapa.save();

        return res.status(201).json(etapa);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Consultar todas las etapas
 */
const getEtapas = async (req, res = response) => {
    try {
        const etapasBD = await Etapa.find();
        return res.json(etapasBD);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Consultar etapa por ID
 */
const getEtapaPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const etapaBD = await Etapa.findOne(query);
        return res.json(etapaBD);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Actualizar etapa por ID
 */
const updateEtapaPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const data = {
            nombre,
            fechaActualizacion: new Date()
        }

        const etapa = await Etapa.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json(etapa);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Borrar etapa por ID
 */
// const deleteEtapaByID = async (req = request, res = response) => {
//   try {
//     const { id } = req.params;
//     const etapa = await Etapa.findByIdAndDelete(id);
//     res.status(204).json(etapa);
//   } catch (e) {
//     return res.status(500).json({ msj: e.message });
//   }
// }

module.exports = {
    createEtapa,
    getEtapas,
    getEtapaPorId,
    updateEtapaPorId
    
}