'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ProductImages', 
      { 
        productId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        imageId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductImages');
  }
};
