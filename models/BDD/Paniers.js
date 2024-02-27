const { DataTypes } = require('sequelize')
const db = require('../../db/db')


const Paniers = db.define('Carts', {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'userId'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'actif'
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true
});


module.exports = Paniers