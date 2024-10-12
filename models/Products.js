const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const Producto = sequelize.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true // Cambia a false si la descripción es obligatoria
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias', // Nombre de la tabla de categorías
            key: 'id_categoria'
        }
    },
    id_subcategoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'subcategorias', // Nombre de la tabla de subcategorías
            key: 'id_subcategoria'
        }
    },
    vegano: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: false
    },
    celiaco: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: false
    },
    vegetariano: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: false
    },
    stock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    plato_del_dia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }

}, {
    tableName: 'productos',
    timestamps: false
});

module.exports = Producto;
