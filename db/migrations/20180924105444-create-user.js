'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      screenName: {
        type: Sequelize.CHAR(15),
        field: 'screen_name',
        unique: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING(50),
        field: 'name',
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(254),
        field: 'email',
        allowNull: false
      },

      emailHash: {
        type: Sequelize.CHAR(64),
        field: 'email_hash',
        unique: true,
        allowNull: false
      },

      publicEmail: {
        type: Sequelize.BOOLEAN(),
        field: 'public_email',
        defaultValue: false,
        allowNull: false
      },

      passwordHash: {
        type: Sequelize.CHAR(60),
        field: 'password_hash',
        allowNull: false
      },

      description: {
        type: Sequelize.STRING(160),
        field: 'description',
        defaultValue: '',
        allowNull: false
      },

      url: {
        type: Sequelize.STRING(2100),
        field: 'url',
        defaultValue: '',
        allowNull: false
      },

      location: {
        type: Sequelize.STRING(30),
        field: 'location',
        defaultValue: '',
        allowNull: false
      },

      avaterImage: {
        type: Sequelize.CHAR(32 + 5), // 32文字のランダム文字列 + 拡張子（.jpeg の 5 文字）
        field: 'avater_image',
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
    return queryInterface.dropTable('users');
  }
};
