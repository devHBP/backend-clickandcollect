// modèle : TestOrderProduct
const { DataTypes } = require('sequelize')
const db = require('../../db/db')

//table d'association
const TestOrderProducts = db.define(
    'TestOrderProducts',
    {
        orderId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'TestOrder', // Nom du modèle de la table Orders
              key: 'id',
            }
          },
          productId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Products', // Nom du modèle de la table Products
              key: 'id',
            }
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: 1
            }
          }
    }
  );
// clé étrangères (2)
// orderId, productId


// relation
// a rajouter
// Cette table fait le lien entre les commandes (Orders) et les produits (Products).
// Elle permet de savoir quels produits sont inclus dans chaque commande et en quelle quantité.

module.exports = TestOrderProducts

