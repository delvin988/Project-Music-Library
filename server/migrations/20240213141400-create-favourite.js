'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistName: {
        type: Sequelize.STRING
      },
      genres: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      lyric: {
        type: Sequelize.TEXT
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      preview: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favourites');
  }
};