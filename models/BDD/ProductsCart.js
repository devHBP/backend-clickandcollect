const { DataTypes } = require("sequelize");
const db = require("../../db/db");
const Users = require('./Users')
const Carts = require('./Carts')
const Products = require('./Produits')

const ProductsCart = db.define("ProductsCart", {
    cartItemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Carts",
      key: "cartId",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Null si c'est une formule globale
    references: {
      model: "Products",
      key: "productId",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true, // ('simple', 'antigaspi', 'free', 'formule', 'offreSUN', 'offre31', petitePizza)
  },
  option1ProductId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Products",
      key: "productId",
    },
  },
  option2ProductId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Products",
      key: "productId",
    },
  },
  option3ProductId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Products",
      key: "productId",
    },
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    allowNull: true, //pour les articles gratuits dans des offres (par ex. 3+1 ou la baguette sun)
  },
  offerId: {
    type: DataTypes.INTEGER,
    allowNull: true, // pour differencier les offre3+1
  },
  typeProduit: {
    type: DataTypes.STRING,
    allowNull: true, // pour la baguette sun = offreSUN
  },
  libelle: {
    type: DataTypes.STRING,
    allowNull: true, // pour differencier les formules par exemple
  },
  key: {
    type: DataTypes.STRING,
    allowNull: true, // pour formuleKey
  },
  product: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
});

// A user can have multiple carts
Users.hasMany(Carts, { foreignKey: 'userId' });
Carts.belongsTo(Users, { foreignKey: 'userId' });

// A cart can contain multiple items
Carts.hasMany(ProductsCart, { foreignKey: 'cartId' });
ProductsCart.belongsTo(Carts, { foreignKey: 'cartId' });

// A product can be part of multiple cart items (and thus multiple carts)
Products.hasMany(ProductsCart, { foreignKey: 'productId' });
ProductsCart.belongsTo(Products, { foreignKey: 'productId' });


ProductsCart.belongsTo(Products, { as: 'Option1', foreignKey: 'option1ProductId' });
ProductsCart.belongsTo(Products, { as: 'Option2', foreignKey: 'option2ProductId' });
ProductsCart.belongsTo(Products, { as: 'Option3', foreignKey: 'option3ProductId' });

// Assurez-vous que ces associations sont bien configurées dans les deux sens si nécessaire
Products.hasMany(ProductsCart, { as: 'Option1Products', foreignKey: 'option1ProductId' });
Products.hasMany(ProductsCart, { as: 'Option2Products', foreignKey: 'option2ProductId' });
Products.hasMany(ProductsCart, { as: 'Option3Products', foreignKey: 'option3ProductId' });

module.exports = ProductsCart

