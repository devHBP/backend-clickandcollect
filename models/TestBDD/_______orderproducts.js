const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const TestOrderProductsV7 = db.define('TestOrderProductsV7', {
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
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  // options
});

module.exports = TestOrderProductsV7;
