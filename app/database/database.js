var Sequelize = require('sequelize');

module.exports = function(config) {

  var sequelize = new Sequelize(
    config.mariadb.database,    // データベース
    config.mariadb.user,        // ユーザー
    config.mariadb.password,    // パスワード
    { dialect: 'mysql',         // mysql
      operatorsAliases: false   // operatorAliase は今の所使わない
      //logging: false,
    }
  );

  
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

  sequelize.sync({force: true}).then(function(err) {
    User.build({
      id: 1,
      name: 'shioleap',
      screenName: 'shioleap_view',
      email: 'shiotsuka.iroha@gmail.com',
      password: 'password'
    }).save().then(function(err) {
      User.findAll().then(function(users) {
        console.log(users[0].name);
      });
    });
  }).catch(function(err) {
    console.log('An error occurred while creating the table:', err);
  });
};