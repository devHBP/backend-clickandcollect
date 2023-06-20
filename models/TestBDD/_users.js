const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const TestStores = require('./_stores')
const TestOrders = require('./_orders')

const TestUsers = db.define('TestUsers', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type:DataTypes.STRING,
        allowNull : false,
        defaultValue : 'client'
        // rôles: admin, gestionnaire, employe, client
      },
      //modif ici id_magasin = storeId
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null, // Définit la valeur par défaut sur null
      },
      adresse:{
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      cp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ville: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telephone:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      //ajout 
      date_naissance: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Si la date de naissance peut être nulle
      },
      commentaires:{
        type: DataTypes.STRING,
        allowNull: true,
      }
      
})

//TestUsers.belongsTo(TestStores, { foreignKey: 'id_magasin' });
/**TestUsers.hasMany(TestOrders, {
    foreignKey: 'userId', 
    as: 'orders',
  });
*/
// Une commande (Orders) peut être passée par un utilisateur (Users).

module.exports = TestUsers