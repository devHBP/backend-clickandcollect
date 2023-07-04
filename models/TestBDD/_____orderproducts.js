const { DataTypes } = require('sequelize')
const db = require('../../db/db')

//attention nom pas incrémenté V4 mais voir V5
const TestOrderProductsV5 = db.define('TestOrderProductsV4', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'TestOrdersV6s',
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

module.exports = TestOrderProductsV5
