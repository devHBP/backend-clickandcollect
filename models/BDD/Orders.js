const { DataTypes } = require('sequelize');
const db = require('../../db/db');
const TestStoresV2 = require('./Stores')

const Orders = db.define('Orders', {
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
  //chaine de caractères
  productIds: {
    type: DataTypes.STRING,
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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en attente'
  },
  delivery: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  heure: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.ENUM('online', 'onsite'),
    allowNull: false,
    defaultValue: 'online'
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
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
  cartString: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// generéation numéro de commande
Orders.beforeValidate((order, options) => {
    if (!order.numero_commande) {
        return TestStoresV2.findOne({ where: { storeId: order.storeId } }) // Récupérer le magasin associé
        .then(store => {
          if(!store) {
            throw new Error('Le magasin associé à la commande est introuvable.');
          }
          const reference_magasin = store.reference_magasin; // Utilisez la propriété 'reference_magasin' du magasin
          return Orders.max('orderId') // Récupérer l'ID maximal
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

module.exports = Orders