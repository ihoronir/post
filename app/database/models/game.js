var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  var Game = Sequelize.define('games', {
    // id
    id: {
      type: Sequelize.INTEGER.UNSIGNED, // data type
      field: 'id',                      // field
      autoIncrement: true,              // auto increment
      primaryKey: true,                 // primary
      allowNull: false                  // not null
    }
  }, {
    // createdAt, updatedAt
    timestamps: true,

    // テーブルネーム
    tableName: 'games',

    // underscore
    underscored: true,
  });

  return Game;
};