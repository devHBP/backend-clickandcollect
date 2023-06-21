const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const TestUsers = require('./_users')
const TestStores = require('./_stores')
const TestProducts = require('./_products')
const TestSlots = require('./_slots')
const TestPayments = require('./_payments')
const TestPromotions = require('./_promotions')

const TestOrders = db.define('TestOrder', {
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
    lastname_client: {
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
    //inutila, nous avons déja le storeid pour identifier le magasin
    // magasin: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
      allowNull: true,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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


// generéation numéro de commande
// changer le format 
TestOrders.beforeValidate((order, options) => {
    if (!order.numero_commande) {
        return Promise.all([
          TestOrders.max('orderId'), // Récupérer l'ID maximal
          TestOrders.belongsTo(TestStores, { foreignKey: 'storeId' }).getAssociation('TestStores').target.key, // Récupérer la clé étrangère de TestStores
        ])
        .then(([maxId, reference_magasin]) => {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          const lastOrderId = maxId || 0;
          const sequentialId = String(lastOrderId + 1).padStart(5, '0');
          const numero_commande = `${reference_magasin}_${day}${month}${year}_${sequentialId}`;
          order.numero_commande = numero_commande;
        })
        .catch((error) => {
          throw new Error('Erreur lors de la génération du numéro de commande');
        });
      }
});
  
  //une fois OK
 module.exports = TestOrders