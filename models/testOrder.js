const { DataTypes } = require('sequelize')
const db = require('../db/db')
const Test = require('../testUser.js')

const TestOrder = db.define('TestOrder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_commande: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname_client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prix_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    magasin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    heure: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //clés étrangères
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  });

  TestOrder.associate = function(models) {
    TestOrder.belongsTo(models.Test, { foreignKey: 'userId', as: 'user' });
    TestOrder.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
  };


  
  //une fois OK
//   module.exports = {TestOrder};