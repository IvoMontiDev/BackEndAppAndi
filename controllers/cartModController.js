const db = require('../database/conexion');
const moment = require('moment-timezone');


const createOrder = async (req, res) => {
    try {
        const { id_cliente, id_mesa } = req.body;
        const tipo_pedido = 'mesa';

        // Obtener la fecha actual en la zona horaria de Buenos Aires
        const nowUtc = moment.utc(); // Hora en UTC
        const nowBuenosAires = nowUtc.subtract(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        

        // Ejecutar el stored procedure
        await db.query(`CALL CreateOrder(${id_cliente}, ${id_mesa}, '${nowBuenosAires}', '${tipo_pedido}', @orderId)`);

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
        const { orderId, id_producto, cantidad } = req.body;

        // Llamar al SP AddProductToOrder para agregar el producto a la orden existente
        await db.query(`CALL AddProductToOrder(${orderId}, ${id_producto}, ${cantidad})`);

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


const updateOrderStatus = async (req, res) => {
    try {
        const { id_pedido, estado } = req.body; // Se espera que id_pedido y estado vengan en el body
        const results = await db.query(`CALL UpdateOrderStatus(:id_pedido, :estado)`, {
            replacements: { id_pedido, estado }
        });
        res.status(200).json({ message: 'Estado del pedido actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el estado del pedido' });
    }
};

const updateOrderDetail = async (req, res) => {
    try {
        // Obtener los datos desde el cuerpo de la solicitud (id_pedido, id_producto, cantidad)
        const { id_pedido, id_producto, cantidad } = req.body;

        // Ejecutar el stored procedure
        const result = await db.query(`CALL UpdateOrderDetail(:id_pedido, :id_producto, :cantidad)`, {
            replacements: {
                id_pedido,
                id_producto,
                cantidad
            }
        });

        // Enviar respuesta de éxito
        res.status(200).json({
            message: 'Detalle del pedido actualizado correctamente',
            result
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar el detalle del pedido:', error);
        res.status(500).json({
            message: 'Hubo un error al actualizar el detalle del pedido',
            error
        });
    }
};

const putProductsAsOld = async (req, res) => {
    try {
        const { orderId } = req.body;

        // Llamar al SP PutProductsAsOld para marcar los productos como "viejos"
        await db.query(`CALL PutProductsAsOld(${orderId})`);

        res.status(200).json({ message: 'Productos marcados como viejos correctamente' });
    } catch (error) {
        console.error('Error al marcar los productos como viejos:', error);
        res.status(500).json({ error: 'Ocurrió un error al marcar los productos como viejos' });
    }
};





module.exports = {
    createOrder,
    addProductToOrder,
    removeCartItem,
    removeOrder,
    updateOrderStatus, 
    updateOrderDetail,
    putProductsAsOld
}