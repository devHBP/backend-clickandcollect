'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Products',
    'categorie',
    {
      type:Sequelize.STRING,
      allowNull : true,
      // categories: Viennoiseries, Pâtisseries, Pains, Formules, Desserts, Sandwichs, Salades et Bowls, Boissons
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Products');
  }
};
