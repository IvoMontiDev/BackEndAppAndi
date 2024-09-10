const db = require('../database/conexion');


const getCartInfo = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        const results = await db.query(`CALL GetCartInfo(:id_pedido)`, {
            replacements: { id_pedido }
        });
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener la información del carrito:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la información del carrito' });
    }
};

const getAllMesas = async (req, res) => {
    try {
        const products = await db.query('CALL GetAllMesas')
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCartInfo,
    getAllMesas
}


