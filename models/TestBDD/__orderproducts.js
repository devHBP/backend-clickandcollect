const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestOrderProductsV2 = db.define('TestOrderProductsV2', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'TestOrdersV4',
      key: 'orderId',
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'ProductsTest',
      key: 'productId',
    }
  }
}, {
  // options
});

//module.exports = TestOrderProductsV2;
