const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestSlot = db.define(
    'TestSlot',
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
//TestSlot.hasMany(models.TestOrder, { foreignKey: 'slotId' })

// module.exports = TestSlot