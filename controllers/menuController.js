const productos = require('../models/Products');
const db = require('../database/conexion');

const getAllProducts = async (req, res) => {
    try {
        const products = await db.query('CALL GetAllProducts')
        res.json(products);
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

module.exports = {
    getAllProducts,
    getProductById
};
