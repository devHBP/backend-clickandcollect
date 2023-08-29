const { DataTypes } = require('sequelize')
const db = require('../../db/db')


const Formule = db.define('Formule', {
    idFormule: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option1: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    price1: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    option2: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    price2: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    option3: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    price3: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    addOns: {
        type: DataTypes.STRING, 
        allowNull: true
    }
});
module.exports = Formule
