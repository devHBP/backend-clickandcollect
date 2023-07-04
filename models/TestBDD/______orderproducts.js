const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const TestOrderProductsV6 = db.define('TestOrderProductsV6', {
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
      model: 'TestOrdersV6s',
      key: 'orderId'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ProductsTests',
      key: 'productId'
    }
  }
}, {
  // options
});

module.exports = TestOrderProductsV6;
