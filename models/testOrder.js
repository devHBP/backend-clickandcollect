const { DataTypes } = require('sequelize')
const db = require('../db/db')
const TestClient = require('../testUser.js')
// const TestStore = require('../testStore.js')
// const Product = require('../testProduct.js')
// const TestSlot = require('../testSlot.js')
// const TestPaiment = require('../testPaiment.js')
// const TestPromotion = require('../testPromotions.js')

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
    // rajouter les clés étrangères : slotId, paymentId, promotionId

  });

  //revoir ces relations et les corriger
  TestOrder.associate = function(models) {
    TestOrder.belongsTo(models.TestClient, { foreignKey: 'id'}); //id = userId
    TestOrder.belongsTo(models.TestStore, { foreignKey: 'id_magasin'}); //id_magasin= storeId
    TestOrder.belongsTo(models.TestSlot, { foreignKey: 'slotId'}); //slotId
    TestOrder.belongsTo(models.TestPaiment, { foreignKey: 'paymentId'}); //paymentId
    TestOrder.belongsTo(models.TestPromotion, { foreignKey: 'id'}); //promotionId
    TestOrder.belongsToMany(models.Product, { 
      through: 'TestOrderProduct', 
      foreignKey: 'id', //orderId
      otherKey: 'id_produit' //productId
    });
  };

  // relation
  // a rajouter
  // Une commande (Orders) peut être passée par un utilisateur (Users), dans un magasin (Stores),
  //  à un créneau horaire spécifique (Slots), peut avoir une méthode de paiement spécifique (Payments), 
  // et peut avoir une promotion appliquée (Promotions). Une commande (Orders) peut contenir plusieurs 
  // produits (Products) via la table OrderProducts.

  
  //une fois OK
//   module.exports = {TestOrder};