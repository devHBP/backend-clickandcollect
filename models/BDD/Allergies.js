const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const Allergies = db.define('Allergies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    allergies: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Allergies;
