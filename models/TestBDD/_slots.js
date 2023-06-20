const { DataTypes } = require('sequelize')
const db = require('../../db/db')
const TestOrders = require('./_orders')

const TestSlots = db.define(
    'TestSlots',
    {
        slotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          slot_time: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          slot_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
    }
  );


// relation
// a rajouter
// Un créneau horaire (Slots) peut être associé à plusieurs commandes (Orders).
//TestSlots.hasMany(TestOrders, { foreignKey: 'slotId' })

module.exports = TestSlots