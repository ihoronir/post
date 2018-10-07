'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.CHAR(20),
        field: 'name',
        unique: true,
        allowNull: false
      },

      iconImage: {
        type: Sequelize.CHAR(32 + 5), // 32文字のランダム文字列 + 拡張子（.jpeg の 5 文字）
        field: 'icon_image',
        defaultValue: '',
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
    return queryInterface.dropTable('tags');
  }
};
