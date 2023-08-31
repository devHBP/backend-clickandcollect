const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const TableOrderProduct = db.define('TableOrderProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'orderId'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'productId'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  offre:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  formule:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  option:{
    type: DataTypes.TEXT,
    allowNull: true,
  }
}
);


module.exports = TableOrderProduct;
