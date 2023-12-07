const { DataTypes } = require("sequelize");
const db = require("../../db/db");

const Token = db.define("Token", {
  tokenId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Le token FCM lui-même
  fcmToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Identifiant de l'utilisateur associé
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Nom de la table des utilisateurs
      key: "userId",
    },
  },
  // Type de l'appareil (optionnel)
  deviceType: {
    type: DataTypes.ENUM("ios", "android"),
    allowNull: true,
  },
  // Date de création du token
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  // Date de mise à jour du token
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Token;
