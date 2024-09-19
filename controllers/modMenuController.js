const productos = require('../models/Products');
const db = require('../database/conexion');

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


const createCategory = async (req, res) => {
    try{
        const{nombre} = req.body;
        const newCategory = await db.query("CALL CreateCategory(:nombre)",{
            replacements: { nombre: nombre }
        });

        res.status(201).json({
            message: 'Categoria creada exitosamente',
            producto: newCategory
        });

    }catch (error) {
    res.status(500).json({
        message: 'Hubo un error al crear la categoria',
        error: error.message
    });
}}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query('CALL DeleteCategory(:p_id_categoria)', {
            replacements: { p_id_categoria: id }
        });

        res.status(204).json({ message: 'Categoria eliminado exitosamente' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(404).json({ error: 'Producto no encontrado o tiene relaciones dependientes.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};


const updateStock = async (req, res) => {
    const { id_producto, stock } = req.body;

    if (id_producto == null || stock == null) {
        return res.status(400).json({ message: 'Se requiere id_producto y stock.' });
    }

    try {
        await db.query('CALL PutModStock(:id_producto, :stock)', {
            replacements: { id_producto: id_producto,
                            stock: stock}
        });

        res.status(200).json({ message: 'Stock actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar stock:', error);
        res.status(500).json({ message: 'Error al actualizar stock.' });
    }
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    deleteCategory,
    updateStock
} 