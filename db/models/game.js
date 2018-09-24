'use strict';

module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define(
    'game',
    {
      id: {
        type: DataTypes.CHAR(32),
        field: 'id',
        primaryKey: true,
        allowNull: false
      },

      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id',
        allowNull: false
      },

      title: {
        type: DataTypes.STRING(50),
        field: 'title',
        allowNull: false
      },

      description: {
        type: DataTypes.STRING(2000),
        field: 'description',
        defaultValue: '',
        allowNull: false
      },

      publicLevel: {
        type: DataTypes.ENUM('private', 'semi-public', 'public'),
        field: 'public_level',
        defaultValue: 'private',
        allowNull: false
      },

      source: {
        type: DataTypes.STRING(32),
        field: 'source',
        defaultValue: '',
        allowNull: false
      },

      thumbnailImage: {
        type: DataTypes.CHAR(32 + 5), // 32文字のランダム文字列 + 拡張子（.jpeg の 5 文字）
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
  /*
  game.associate = function(models) {
    // associations can be defined here
  };
  */
  return game;
};
