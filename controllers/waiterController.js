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

const callWaiter = async (req, res) => {
    try {
        const { id_mesa } = req.body;

        // Llamar al SP CallWaiter para actualizar el campo CallW
        await db.query(`CALL CallWaiter(${id_mesa})`);

        res.status(200).json({ message: 'Mozo llamado correctamente' });
    } catch (error) {
        console.error('Error al llamar al mozo:', error);
        res.status(500).json({ error: 'Ocurrió un error al llamar al mozo' });
    }
};

const requestBill = async (req, res) => {
    try {
        const { id_mesa } = req.body;

        // Llamar al SP RequestBill para actualizar el campo cuenta
        await db.query(`CALL RequestBill(${id_mesa})`);

        res.status(200).json({ message: 'Cuenta solicitada correctamente' });
    } catch (error) {
        console.error('Error al solicitar la cuenta:', error);
        res.status(500).json({ error: 'Ocurrió un error al solicitar la cuenta' });
    }
};

const updateNotifications = async (req, res) => {
    try {
        const { id_mesa } = req.body;

        // Llamar al SP UpdateNotifications para resetear los campos CallW y cuenta
        await db.query(`CALL UpdateNotifications(${id_mesa})`);

        res.status(200).json({ message: 'Notificaciones reseteadas correctamente' });
    } catch (error) {
        console.error('Error al resetear las notificaciones:', error);
        res.status(500).json({ error: 'Ocurrió un error al resetear las notificaciones' });
    }
};



module.exports = {
    createWaiter,
    updateWaiter,
    getAllWaiters,
    callWaiter,
    requestBill,
    updateNotifications
}