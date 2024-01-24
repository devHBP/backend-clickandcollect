const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const Preferences = db.define('Preferences', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    preferences: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Preferences;
