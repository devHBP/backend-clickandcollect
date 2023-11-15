'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Orders',  
      'cartString',  
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'cartString');
  }
};

