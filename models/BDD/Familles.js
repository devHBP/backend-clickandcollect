const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const Products = require('./Produits')

const FamillyProducts = db.define('FamillyProducts', {
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

Products.belongsTo(FamillyProducts, {
  foreignKey: 'id_famille_produit'
})
FamillyProducts.hasMany(Products, {
  foreignKey:'id_famille_produit'
})


module.exports = FamillyProducts