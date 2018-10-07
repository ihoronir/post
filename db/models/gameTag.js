'use strict';

module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'gameTag',
    {
      gameId: {
        type: DataTypes.CHAR(32),
        field: 'game_id',
        primaryKey: true,
        allowNull: false
      },

      tagId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'tag_id',
        primaryKey: true,
        allowNull: false
      }
    },
    {
      // createdAt, updatedAt
      timestamps: true,

      // テーブルネーム
      tableName: 'games_tags',

      // underscore
      underscored: true
    }
  );

  /*
  tag.associate = function(models) {};
  */

  return tag;
};
