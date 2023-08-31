const { DataTypes } = require('sequelize');
const db = require('../../db/db')
const ProductDetail = db.define('DetailProduct', {
  
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', 
      key: 'productId',
    },
  },
  descriptionProduit: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  option1:{
        type: DataTypes.TEXT,
        allowNull: true,
  },
  option2:{
    type: DataTypes.TEXT,
    allowNull: true,
}
});

module.exports = ProductDetail
