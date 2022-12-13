'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('user', [
      {
        email: 'test1@gmail.com',
        password: 'anhhungth',
        username: 'heroit8x',
      },
      {
        email: 'test2@gmail.com',
        password: 'anhhungth',
        username: 'heroit8x',
      },
      {
        email: 'test3@gmail.com',
        password: 'anhhungth',
        username: 'heroit8x',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
