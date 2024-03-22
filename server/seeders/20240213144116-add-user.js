'use strict';

const { hashPass } = require('../helper/bycrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Users", [
      {
         username: "delvin",
         email: "admin@gmail.com",
         password: hashPass("delvin1234"),
         role: "Premium",
         createdAt: new Date(),
         updatedAt: new Date(),
      },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
