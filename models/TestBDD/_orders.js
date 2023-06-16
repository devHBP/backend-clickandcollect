const { DataTypes } = require('sequelize')
const db = require('../db/db')
const TestUsers = require('./_users')
const TestStores = require('./_stores')
const TestProducts = require('./_products')
const TestSlots = require('./_slots')
const TestPayments = require('./_payments')
const TestPromotions = require('./_promotions')

const TestOrders = db.define('TestOrders', {
    orderId: {
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
    //clés étrangères (5)
    //rajouter dans la nouvelle table
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  });

  //revoir ces relations et les corriger
  TestOrders.associate = function(models) {
    TestOrders.belongsTo(models.TestUsers, { foreignKey: 'userId'}); //id = userId
    TestOrders.belongsTo(models.TestStores, { foreignKey: 'storeId'}); //id_magasin= storeId
    TestOrders.belongsTo(models.TestSlots, { foreignKey: 'slotId'}); //slotId
    TestOrders.belongsTo(models.TestPayments, { foreignKey: 'paymentId'}); //paymentId
    TestOrders.belongsTo(models.TestPromotions, { foreignKey: 'promotionId'}); //promotionId
    TestOrders.belongsToMany(models.TestProducts, { 
      through: 'TestOrderProducts', 
      foreignKey: 'orderId', //orderId
      otherKey: 'productId' //productId
    });
  };

  // relation
  // a rajouter
  // Une commande (Orders) peut être passée par un utilisateur (Users), dans un magasin (Stores),
  //  à un créneau horaire spécifique (Slots), peut avoir une méthode de paiement spécifique (Payments), 
  // et peut avoir une promotion appliquée (Promotions). Une commande (Orders) peut contenir plusieurs 
  // produits (Products) via la table OrderProducts.

  
  //une fois OK
// module.exports = TestOrders