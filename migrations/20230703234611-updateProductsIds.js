'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('TestOrdersV5s', 'productIds', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('TestOrdersV5s', 'productIds', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    });
  }
};
