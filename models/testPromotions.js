const { DataTypes } = require('sequelize');
const db = require('../db/db')
// const TestOrder = require('./testOrder')

const Promotion = db.define(
  'Promos',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    percentage: {
      type: DataTypes.FLOAT,
    },
    durationInDays: {
      type: DataTypes.INTEGER, // Utilisez INTEGER pour représenter la durée en jours
    },
    active: {
        type: DataTypes.BOOLEAN, // Utilisez BOOLEAN pour représenter le statut "actif" ou "non actif"
        defaultValue: true, // Par défaut, le code promo est actif
      },
  }
);

// relation
// a rajouter
// Une promotion (Promotions) peut être appliquée à plusieurs commandes (Orders).
//Promotion.hasMany(TestOrder, { foreignKey: 'id' }) //promotionId

module.exports = Promotion;
