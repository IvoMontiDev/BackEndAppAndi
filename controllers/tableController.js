const db = require('../database/conexion');


const getAllTables = async (req, res) => {
    try {
        const tables = await db.query('CALL GetAllMesas')
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserAndPasswByTable = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query(`CALL GetUserAndPasswByTable(:tableId)`,{
            replacements: { tableId: id }
        })
        if (result != 0) {
            res.status(200).json({ usuario: result.nombre, clave: result.clave });
        }
    } catch (error) {
        console.error('Error al obtener el usuario y clave:', error);
        res.status(404).json({ message: 'No se encontró usuario para esta mesa' });
    }
};

const updateTableStatus = async (req, res) => {
    try {
        const { id_mesa, estado } = req.body; // Se espera que el id_mesa y el nuevo estado vengan en el body
        const results = await db.query(`CALL UpdateTableStatus(:id_mesa, :estado)`, {
            replacements: { id_mesa, estado }
        });
        res.status(200).json({ message: 'Estado de la mesa actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el estado de la mesa:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el estado de la mesa' });
    }
};

const updateOrderAndTableStatus = async (req, res) => {
    try {
        const { id_pedido, estado } = req.body; // Se espera que id_pedido y estado vengan en el body

        // Ejecutamos el stored procedure
        const results = await db.query(`CALL UpdateOrderAndTableStatus(:id_pedido, :estado)`, {
            replacements: { id_pedido, estado }
        });

        res.status(200).json({ message: 'Estado del pedido y de la mesa actualizado correctamente', results });
    } catch (error) {
        console.error('Error al actualizar el estado del pedido y de la mesa:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el estado del pedido y/o de la mesa' });
    }
};


module.exports = {
    getAllTables,
    getUserAndPasswByTable,
    updateTableStatus,
    updateOrderAndTableStatus
}