const { DataTypes } = require('sequelize')
const db = require('../db/db')
const TestOrders = require('./_orders')

const TestPayments = db.define(
    'TestPayments',
    {
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transactionId: {
            type: DataTypes.STRING,
            allowNull: true, // Permettre la valeur null car tous les paiements n'auront pas un ID de transaction (par exemple, les paiements en espèces)
        },
    }
  );
// relation
// a rajouter
// Une méthode de paiement (Payments) peut être associée à plusieurs commandes (Orders).
TestPayments.hasMany(TestOrders, { foreignKey: 'paymentId' });

// module.exports = TestPayments