// models/PromoCode.js

const { DataTypes } = require('sequelize');
const db = require('../db/db')

const PromoCode = db.define(
  'PromoCode',
  {
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

module.exports = PromoCode;
