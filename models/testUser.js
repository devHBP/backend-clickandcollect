const { DataTypes } = require('sequelize')
const db = require('../db/db')
const TestStore = require('./testStore')
// const TestOrder = require('./testOrder')

const TestClient = db.define('Client', {
    id: {
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
      id_magasin: {
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

TestClient.belongsTo(TestStore, { foreignKey: 'id_magasin' });

// relation
// a rajouter
// Une commande (Orders) peut être passée par un utilisateur (Users).

/**
 * TestClient.hasMany(TestOrder, {
  foreignKey: 'id', //userId
  as: 'orders',
});
 */




module.exports = TestClient