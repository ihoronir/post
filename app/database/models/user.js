var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  var User = sequelize.define('users', {
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