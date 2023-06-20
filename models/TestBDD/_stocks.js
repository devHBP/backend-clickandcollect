const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestStocks = db.define('TestStocks', {
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

module.exports = TestStocks