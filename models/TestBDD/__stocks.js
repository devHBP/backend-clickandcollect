const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestStocksV2 = db.define('TestStocksV2', {
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

  TestStocksV2.associate = function(models) {
    TestStocksV2.belongsTo(models.TestProductsV4, { foreignKey: 'productId' });
  };
  //chaque stock appartient à un produit

module.exports = TestStocksV2