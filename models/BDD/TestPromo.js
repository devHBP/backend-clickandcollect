const { DataTypes } = require('sequelize');
const db = require('../../db/db');

const TestPromo = db.define(
  'TestPromo',
  {
    promotionId: {
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
      // S'assurer que si 'percentage' est défini, 'fixedAmount' ne l'est pas
      validate: {
        customValidator(value) {
          if (value != null && this.fixedAmount != null) {
            throw new Error("peut etre defini que le pourcentage ou le montant fixe seul, pas en même temps.");
          }
        }
      }
    },
    fixedAmount: {
      type: DataTypes.FLOAT,
      // S'assurer que si 'fixedAmount' est défini, 'percentage' ne l'est pas
      validate: {
        customValidator(value) {
          if (value != null && this.percentage != null) {
            throw new Error("peut etre defini que le pourcentage ou le montant fixe seul, pas en même temps.");
          }
        }
      }
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



module.exports = TestPromo;
