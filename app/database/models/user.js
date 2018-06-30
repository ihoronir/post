'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize => {

  const User = sequelize.define('users', {
    // id
    id: {
      type: Sequelize.INTEGER.UNSIGNED, // data type
      field: 'id',                      // field
      autoIncrement: true,              // auto increment
      primaryKey: true,                 // primary
      allowNull: false                  // not null
    },

    // name
    name: {
      type: Sequelize.CHAR(15),
      field: 'name',
      unique: true, // unique
      allowNull: false
    },

    // screenName
    screenName: {
      type: Sequelize.STRING(50),
      field: 'screen_name',
      allowNull: false
    },

    // email
    email: {
      type: Sequelize.STRING(256),
      field: 'email',
      allowNull: false
    },

    // password
    password: {
      type: Sequelize.CHAR(64),
      field: 'password',
      allowNull: false
    },

    // passwordSalt
    passwordSalt: {
      type: Sequelize.CHAR(64),
      field: 'password_salt',
      allowNull: false
    },

    // description
    description: {
      type: Sequelize.CHAR(160),
      field: 'description',
      allowNull: false
    },

    // createdAt
    createdAt: {
      type: Sequelize.DATE(),
      field: 'created_at'
    },

    // updatedAt
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