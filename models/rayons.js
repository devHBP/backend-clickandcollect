const { DataTypes } = require('sequelize')
const db = require('../db/db')
const Product = require('./testProduct.js')

const rayons = db.define('Rayons', {
    id_rayon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_rayon: {
        type: DataTypes.STRING,
        allowNull: false,
      }
})


Product.belongsTo(rayons, {
    foreignKey: 'id_rayon'
  })
  rayons.hasMany(Product, {
    foreignKey:'id_rayon'
  })


module.exports = rayons