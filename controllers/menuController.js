const productos = require('../models/Products');
const db = require('../database/conexion');

const getAllProducts = async (req, res) => {
    try {
        const product = await productos.findAll();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const [results, metadata] = await db.query('CALL GetProductById(:productId)', {
            replacements: { productId },
            type: db.QueryTypes.SELECT
        });

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        const productDetails = results[0];
        res.json(productDetails);
    } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        res.status(500).json({ error: 'Error al obtener detalles de la película' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_categoria, id_subcategoria, vegano, celiaco, vegetariano } = req.body;
        
        // Crear el nuevo producto en la base de datos
        const nuevoProducto = await productos.create({
            nombre,
            descripcion,
            precio,
            id_categoria,
            id_subcategoria,
            vegano,
            celiaco,
            vegetariano
        });
        
        res.status(201).json({
            message: 'Producto creado exitosamente',
            producto: nuevoProducto
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al crear el producto',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    const productoId = req.params.id;
    const {
        nombre,
        descripcion,
        precio,
        id_categoria,
        id_subcategoria,
        vegano,
        celiaco,
        vegetariano
    } = req.body;

    try {
        let producto = await productos.findByPk(productoId);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar solo los campos que se hayan enviado en la solicitud
        if (nombre) producto.nombre = nombre;
        if (descripcion) producto.descripcion = descripcion;
        if (precio) producto.precio = precio;
        if (id_categoria) producto.id_categoria = id_categoria;
        if (id_subcategoria) producto.id_subcategoria = id_subcategoria;
        if (vegano !== undefined) producto.vegano = vegano;
        if (celiaco !== undefined) producto.celiaco = celiaco;
        if (vegetariano !== undefined) producto.vegetariano = vegetariano;

        await producto.save();
        producto = await productos.findByPk(productoId); // Recargar el producto actualizado

        res.status(200).json(producto);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query('CALL DeleteProduct(:productoId)', {
            replacements: { productoId: id }
        });

        res.status(204).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(404).json({ error: 'Producto no encontrado o tiene relaciones dependientes.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
