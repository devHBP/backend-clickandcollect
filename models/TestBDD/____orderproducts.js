const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestOrderProductsV4 = db.define('TestOrderProductsV4', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'TestOrdersV5s',
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

module.exports = TestOrderProductsV4
