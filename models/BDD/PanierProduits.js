const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const Users = require('./Users')
const Paniers = require('./Paniers')
const Products = require('./Produits')


const PanierProduits = db.define('CartItems', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts', 
        key: 'cartId'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', 
        key: 'productId'
      }
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    antigaspi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    formule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
  });
  
// A user can have multiple carts
Users.hasMany(Paniers, { foreignKey: 'userId' });
Paniers.belongsTo(Users, { foreignKey: 'userId' });

// A cart can contain multiple items
Paniers.hasMany(PanierProduits, { foreignKey: 'cartId' });
PanierProduits.belongsTo(Paniers, { foreignKey: 'cartId' });

// A product can be part of multiple cart items (and thus multiple carts)
Products.hasMany(PanierProduits, { foreignKey: 'productId' });
PanierProduits.belongsTo(Products, { foreignKey: 'productId' });


module.exports = PanierProduits