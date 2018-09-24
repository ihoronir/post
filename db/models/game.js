'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize => {
  const Game = sequelize.define(
    'games',
    {
      id: {
        type: Sequelize.CHAR(32),
        field: 'id',
        primaryKey: true,
        allowNull: false
      },

      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'user_id',
        allowNull: false
      },

      title: {
        type: Sequelize.STRING(50),
        field: 'title',
        allowNull: false
      },

      description: {
        type: Sequelize.STRING(2000),
        field: 'description',
        defaultValue: '',
        allowNull: false
      },

      publicLevel: {
        type: Sequelize.ENUM('private', 'semi-public', 'public'),
        field: 'public_level',
        defaultValue: 'private',
        allowNull: false
      },

      source: {
        type: Sequelize.STRING(32),
        field: 'source',
        defaultValue: '',
        allowNull: false
      },

      thumbnailImage: {
        type: Sequelize.CHAR(32 + 5), // 32文字のランダム文字列 + 拡張子（.jpeg の 5 文字）
        field: 'thumbnail_image',
        defaultValue: '',
        allowNull: false
      }
    },
    {
      // createdAt, updatedAt
      timestamps: true,

      // テーブルネーム
      tableName: 'games',

      // underscore
      underscored: true
    }
  );

  return Game;
};
