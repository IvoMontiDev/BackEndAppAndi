const db = require('../database/conexion');
const moment = require('moment');



const createOrder = async (req, res) => {
    try {
        const { id_cliente, id_mesa, id_mozo } = req.body;
        const tipo_pedido = 'mesa';
        const now = moment().format('YYYY-MM-DD HH:mm:ss');

        // Ejecutar el stored procedure
        await db.query(`CALL CreateOrder(${id_cliente}, ${id_mesa}, ${id_mozo}, '${now}', '${tipo_pedido}', @orderId)`);

        // Recuperar el orderId generado
        const [results] = await db.query('SELECT @orderId AS orderId');
        const orderId = results[0].orderId;

        res.status(200).json({ message: 'Orden creada exitosamente', orderId });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear la orden' });
    }
};


const addProductToOrder = async (req, res) => {
    try {
        const { orderId, id_producto, cantidad, p_del_dia } = req.body;

        // Llamar al SP AddProductToOrder para agregar el producto a la orden existente
        await db.query(`CALL AddProductToOrder(${orderId}, ${id_producto}, ${cantidad}, ${p_del_dia})`);

        res.status(200).json({ message: 'Producto agregado a la orden exitosamente' });
    } catch (error) {
        console.error('Error al agregar el producto a la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto a la orden' });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { id_detalle } = req.params;
        await db.query(`CALL RemoveCartItem(:id_detalle)`, {
            replacements: { id_detalle }
        });
        res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el producto del carrito' });
    }
};


const removeOrder = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        await db.query(`CALL RemoveOrder(:id_pedido)`, {
            replacements: { id_pedido }
        });
        res.status(200).json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el pedido' });
    }
};




module.exports = {
    createOrder,
    addProductToOrder,
    removeCartItem,
    removeOrder
}