const { DataTypes } = require('sequelize')
const db = require('../db/db')
const Store = require('./magasins')

const User = db.define('Users', {
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
        allowNull: false,
      },
      
})
User.belongsTo(Store, { foreignKey: 'id_magasin' });
module.exports = User