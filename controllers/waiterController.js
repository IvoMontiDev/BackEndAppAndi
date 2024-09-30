const db = require('../database/conexion');


const createWaiter = async (req, res) => {
    try {
        const { nombre, turno } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!nombre || !turno) {
            return res.status(400).json({ error: 'Nombre y turno son requeridos' });
        }

        // Asumiendo que 'db' es tu instancia de conexión a la base de datos
        const result = await db.query('CALL CreateWaiter (:nombre, :turno)', {
            replacements: { nombre, turno }
        });
            res.status(201).json({ message: 'Mozo creado exitosamente' });

    } catch (error) {
        console.error('Error al crear el mozo', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const updateWaiter = async (req, res) => {
    try {
        const {id_mozo, nombre, turno } = req.body; // Obtener los datos del cuerpo de la petición
        const result = await db.query(`CALL UpdateWaiter(:id_mozo, :nombre, :turno)`, {
            replacements: { id_mozo, nombre, turno }
        });
        res.status(200).json({ message: 'Mozo actualizado exitosamente', result });
    } catch (error) {
        console.error(`Error al actualizar el mozo con id ${id_mozo}:`, error);
        res.status(500).json({ error: 'Error al actualizar el mozo' });
    }
};


const getAllWaiters = async (req, res) => {
    try {
        const result = await db.query('CALL GetAllWaiters()');
        res.status(200).json(result); // Enviamos el resultado de la consulta
    } catch (error) {
        console.error('error en el SP', error);
        res.status(500).json({ error: 'Error al obtener los mozos' });
    }
};


module.exports = {
    createWaiter,
    updateWaiter,
    getAllWaiters
}