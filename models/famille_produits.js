const { DataTypes } = require('sequelize')
const db = require('../db/db')
const Product = require('./testProduct.js')

const famille_produit = db.define('Famille_produit', {
    id_famille_produit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_famille_produit: {
        type: DataTypes.STRING,
        allowNull: false,
      }
})

Product.belongsTo(famille_produit, {
  foreignKey: 'id_famille_produit'
})
famille_produit.hasMany(Product, {
  foreignKey:'id_famille_produit'
})


module.exports = famille_produit