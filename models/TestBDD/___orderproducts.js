const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestOrderProductsV3 = db.define('TestOrderProductsV3', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'TestOrdersV4s',
      key: 'orderId',
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'ProductsTests',
      key: 'productId',
    }
  }
}, {
  // options
});

module.exports = TestOrderProductsV3;
