
const { request, response } = require('express');
const Proyecto = require('../models/proyecto');
const TipoProyecto = require('../models/tipoProyecto')
const Cliente = require('../models/cliente')

/**
 * crea
 */
const createProyecto = async (req = request, res = response) => {
     try{
         const data = req.body
         const { cliente, tipoProyecto, ...resto } = data
 
         const tipoProyectoBD = await TipoProyecto.findOne({
             _id: tipoProyecto._id
         })
         if(!tipoProyectoBD){
             return res.status(400).json({
                 msj: 'No existe tipo Proyecto'
             })
         }
         const clienteBD = await Cliente.findOne({
             _id: cliente._id
         })
         if(!clienteBD){
             return res.status(400).json({
                 msj: 'No existe cliente'
             })
         }
         const proyecto = new Proyecto(data);
         await proyecto.save();
         return res.status(201).json(proyecto);
     }catch(e){
         return res.status(500).json({
             error: e
         });
     }
 }
 
/**
 * Consultar todos
 */
const getProyectos = async (req, res = response) => {
    try{
        const proyectosBD = await Proyecto.find()
        .populate({
            path: 'cliente'
        })
        .populate({
            path: 'tipoProyecto'
        })
        return res.json(proyectosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar todos inventarios
 */
 const getInventarioByID = async (req = request, res = response) => {
   /* try{
        const { id } = req.params;
        const query = { _id: id};
        const inventarioBD = await Inventario.findOne(query).populate({
            path: 'usuario',
            match: { estado: true }
        });
        // TODO: personalizar error de no encontrado
        res.json(inventarioBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }*/
}


const updateInventario = async (req = request, res = response) => {
   /* try{
        const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
    
        const inventarioBD = await Inventario.findOne({ _id: id});
       // TODO: VALIDAR QUE EXISTEN Y ESTAN ACTIVOS: ESTADO, USUARIO, MARCA, ...
       if(!inventarioBD){
        return res.status(400).json({
            msj: 'No existe este inventario'
        });
       } 
        const inventario = await Inventario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(inventario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }*/
}


module.exports = { 
    createProyecto,
    getProyectos
}