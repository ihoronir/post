'use strict';

module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: DataTypes.CHAR(20),
        field: 'name',
        unique: true,
        allowNull: false
      },

      iconImage: {
        type: DataTypes.CHAR(32 + 5), // 32文字のランダム文字列 + 拡張子（.jpeg の 5 文字）
        field: 'icon_image',
        defaultValue: '',
        allowNull: false
      }
    },
    {
      // createdAt, updatedAt
      timestamps: true,

      // テーブルネーム
      tableName: 'tags',

      // underscore
      underscored: true
    }
  );

  tag.associate = function(models) {
    tag.belongsToMany(models.game, {
      through: 'games_tags',
      as: 'games',
      foreignKey: 'tag_id',
      otherKey: 'game_id'
    });
  };

  return tag;
};
