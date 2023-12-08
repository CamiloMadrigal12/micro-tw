const { request, response } = require('express');
const Cliente = require('../models/cliente');

/**
 * Crear cliente
 */
const createCliente = async (req = request, res = response) => {
    try {
        const { nombre, email } = req.body;

        const clienteBD = await Cliente.findOne({ email });

        if (clienteBD) { // Ya existe
            return res.status(400).json({ msg: 'Ya existe un cliente con ese email' });
        }

        const datos = {
            nombre,
            email,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        }

        const cliente = new Cliente(datos);

        await cliente.save();

        return res.status(201).json(cliente);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Consultar todos los clientes
 */
const getClientes = async (req, res = response) => {
    try {
        const clientesBD = await Cliente.find();
        return res.json(clientesBD);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Consultar cliente por ID
 */
const getClientePorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const clienteBD = await Cliente.findOne(query);
        return res.json(clienteBD);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Actualizar cliente por ID
 */
const updateClientePorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, email } = req.body;
        const data = {
            nombre,
            email,
            fechaActualizacion: new Date()
        }

        const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json(cliente);
    } catch (e) {
        return res.status(500).json({ msj: e.message });
    }
}

/**
 * Borrar cliente por ID
 */
// const deleteClienteByID = async (req = request, res = response) => {
//   try {
//     const { id } = req.params;
//     const cliente = await Cliente.findByIdAndDelete(id);
//     res.status(204).json(cliente);
//   } catch (e) {
//     return res.status(500).json({ msj: e.message });
//   }
// }

module.exports = {
    createCliente,
    getClientes,
    getClientePorId,
    updateClientePorId
    
}