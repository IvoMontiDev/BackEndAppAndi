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
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productDetails = results[0];
        res.json(productDetails);
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        res.status(500).json({ error: 'Error al obtener detalles del producto' });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await db.query('CALL GetAllCategories')
        res.json(categories);
    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const [results, metadata] = await db.query('CALL GetSubcategoriesByCategoryId(:categoryId)', {
            replacements: { categoryId },
            type: db.QueryTypes.SELECT
        });

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json(results);
    } catch (error) {
        console.error("Error al obtener categorías: ", error);
        res.status(500).json({ error: "Error al obtener detalles de las categorías" });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getAllCategories,
    getSubCategoriesByCategoryId

};
