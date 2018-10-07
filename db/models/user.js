'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      screenName: {
        type: DataTypes.CHAR(15),
        field: 'screen_name',
        unique: true,
        allowNull: false
      },

      name: {
        type: DataTypes.STRING(50),
        field: 'name',
        allowNull: false
      },

      email: {
        type: DataTypes.STRING(254),
        field: 'email',
        allowNull: false
      },

      emailHash: {
        type: DataTypes.CHAR(64),
        field: 'email_hash',
        unique: true,
        allowNull: false
      },

      publicEmail: {
        type: DataTypes.BOOLEAN(),
        field: 'public_email',
        defaultValue: false,
        allowNull: false
      },

      passwordHash: {
        type: DataTypes.CHAR(64),
        field: 'password',
        allowNull: false
      },

      passwordSalt: {
        type: DataTypes.CHAR(64),
        field: 'password_salt',
        allowNull: false
      },

      description: {
        type: DataTypes.STRING(160),
        field: 'description',
        defaultValue: '',
        allowNull: false
      },

      url: {
        type: DataTypes.STRING(2100),
        field: 'url',
        defaultValue: '',
        allowNull: false
      },

      location: {
        type: DataTypes.STRING(30),
        field: 'location',
        defaultValue: '',
        allowNull: false
      },

      avaterImage: {
        type: DataTypes.CHAR(32 + 5), // 32文字のランダム文字列 + 拡張子（.jpeg の 5 文字）
        field: 'avater_image',
        defaultValue: '',
        allowNull: false
      }
    },
    {
      // createdAt, updatedAt
      timestamps: true,

      // テーブルネーム
      tableName: 'users',

      // underscore
      underscored: true
    }
  );

  user.associate = function(models) {
    user.hasMany(models.game, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'games'
    });
  };

  return user;
};
