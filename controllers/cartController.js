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

const getOrderDetailByOrderId = async (req, res) => {

    try {
        const { id_pedido } = req.params;
        const result = await db.query(`CALL GetOrderDetailByOrderId(:id_pedido)`,{
            replacements: { id_pedido }
        });
        
        res.status(200).json({ detalles: result});
    } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
        res.status(500).json({ error: 'Error al obtener detalles del pedido' });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const results = await db.query(`CALL GetAllOrders`)
        res.json(results);
    } catch(error){
        res.status(500).json({ error: error.message})
    }
};

const getOrderByTable = async (req, res) => {
    try{
        const { id_table } = req.params;
        const result = await db.query(`CALL GetOrderByTable(:id_table)`, {
            replacements : {id_table}
    })
    res.status(200).json({result})
    }catch (error){
        console.error(`Error al obtener el carro de la mesa ${id_table}`, error);
    }
}


module.exports = {
    getCartInfo,
    getOrderDetailByOrderId,
    getAllOrders, 
    getOrderByTable
}


