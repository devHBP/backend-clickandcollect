const { DataTypes } = require('sequelize')
const db = require('../db/db')
const Product = require('./testProduct.js')

const marques = db.define('Marques', {
    id_marque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_marque: {
        type: DataTypes.STRING,
        allowNull: false,
      }
})

Product.belongsTo(marques, {
    foreignKey: 'id_marque'
  })
  marques.hasMany(Product, {
    foreignKey:'id_marque'
  })

module.exports = marques