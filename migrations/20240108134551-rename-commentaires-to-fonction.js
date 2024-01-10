'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'commentaires', 'fonction');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'fonction', 'commentaires');
  }
};

