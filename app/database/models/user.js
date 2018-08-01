'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize => {

  const User = sequelize.define('users', {

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
      allowNull: false,
    },

    name: {
      type: Sequelize.STRING(50),
      field: 'name',
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
      type: Sequelize.CHAR(64),
      field: 'password',
      allowNull: false
    },
  
    passwordSalt: {
      type: Sequelize.CHAR(64),
      field: 'password_salt',
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
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE(),
      field: 'created_at'
    },

    updatedAt: {
      type: Sequelize.DATE(),
      field: 'updated_at'
    }
  }, {
    // createdAt, updatedAt
    timestamps: true,

    // テーブルネーム
    tableName: 'users',

    // underscore
    underscored: true,
  });
  
  return User;
};
