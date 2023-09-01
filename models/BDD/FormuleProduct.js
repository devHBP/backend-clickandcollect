const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const FormuleProduct = db.define('FormuleProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dessert: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    boisson: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = FormuleProduct;
