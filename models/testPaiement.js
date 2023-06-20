const { DataTypes } = require('sequelize')
const db = require('../db/db')
// const TestOrder = require('./testOrder')

const TestPaiement = db.define(
    'TestPaiement',
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
//TestPaiment.hasMany(TestOrder, { foreignKey: 'paymentId' });

// module.exports = TestPaiement