'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games_tags', {
      gameId: {
        type: Sequelize.CHAR(32),
        field: 'game_id',
        primaryKey: true,
        allowNull: false
      },

      tagId: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'tag_id',
        primaryKey: true,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE(),
        field: 'created_at',
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE(),
        field: 'updated_at',
        allowNull: false
      }
    });
  },
  down: (queryInterface /*, Sequelize*/) => {
    return queryInterface.dropTable('gameTags');
  }
};
