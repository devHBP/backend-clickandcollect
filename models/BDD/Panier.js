const { DataTypes } = require('sequelize')
const db = require('../../db/db')


const Panier = db.define('Panier', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'userId'
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deletionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      option: {
        type: DataTypes.STRING,
        allowNull: true,
      }

      // ajouter les options : antigaspi - offre3+1 - baguette gratuite - solanid ...
})



//module.exports = Panier