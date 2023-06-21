const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const TestProductsV5 = require('./______products.js')

const TestStocksV3 = db.define('TestStocksV3', {
    stockId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_reapprovisionnement: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  TestStocksV3.associate = function(models) {
    TestStocksV3.belongsTo(models.TestProductsV5, { foreignKey: 'productId' });
  };
  //chaque stock appartient à un produit

module.exports = TestStocksV3