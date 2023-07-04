const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const TestUsers = require('./_users')
const TestStoresV2 = require('./__stores')
const TestProducts = require('./_products')
const TestSlots = require('./_slots')
const TestPayments = require('./_payments')
const TestPromotions = require('./_promotions')

const TestOrdersV5 = db.define('TestOrdersV5', {
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
    productIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
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
    //en attente, preparation, livrée ...
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'en attente'
    },
    delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    heure: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentMethod:{
        type: DataTypes.ENUM('online','onsite'),
        allowNull:false,
        defaultValue:'online'
    },
    paid:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:false
    },
    //clés étrangères (5)
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
      allowNull: true,
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  });

  //revoir ces relations et les corriger
  // TestOrders.associate = function(models) {
  //   TestOrders.belongsTo(models.TestUsers, { foreignKey: 'userId'}); //id = userId
  //   TestOrders.belongsTo(models.TestStores, { foreignKey: 'storeId'}); //id_magasin= storeId
  //   TestOrders.belongsTo(models.TestSlots, { foreignKey: 'slotId'}); //slotId
  //   TestOrders.belongsTo(models.TestPayments, { foreignKey: 'paymentId'}); //paymentId
  //   TestOrders.belongsTo(models.TestPromotions, { foreignKey: 'promotionId'}); //promotionId
  //   TestOrders.belongsToMany(models.TestProducts, { 
  //     through: 'TestOrderProducts', 
  //     foreignKey: 'orderId', //orderId
  //     otherKey: 'productId' //productId
  //   });
  // };

  // relation
  // a rajouter
  // Une commande (Orders) peut être passée par un utilisateur (Users), dans un magasin (Stores),
  //  à un créneau horaire spécifique (Slots), peut avoir une méthode de paiement spécifique (Payments), 
  // et peut avoir une promotion appliquée (Promotions). Une commande (Orders) peut contenir plusieurs 
  // produits (Products) via la table OrderProducts.


// generéation numéro de commande
TestOrdersV5.beforeValidate((order, options) => {
  if (!order.numero_commande) {
      return TestStoresV2.findOne({ where: { storeId: order.storeId } }) // Récupérer le magasin associé
      .then(store => {
        if(!store) {
          throw new Error('Le magasin associé à la commande est introuvable.');
        }
        const reference_magasin = store.reference_magasin; // Utilisez la propriété 'reference_magasin' du magasin
        return TestOrdersV5.max('orderId') // Récupérer l'ID maximal
        .then(maxId => {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          const lastOrderId = maxId || 0;
          const sequentialId = String(lastOrderId + 1).padStart(5, '0');
          const numero_commande = `${reference_magasin}_${day}${month}${year}_${sequentialId}`;
          order.numero_commande = numero_commande;
        });
      })
      .catch((error) => {
        throw new Error('Erreur lors de la génération du numéro de commande : ' + error.message);
      });
  }
});

  
  //une fois OK
 //module.exports = TestOrdersV5