'use strict';

const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
  config.mariadb.database,    // データベース
  config.mariadb.user,        // ユーザー
  config.mariadb.password,    // パスワード
  { dialect: 'mysql',         // mysql
    operatorsAliases: false,  // operatorAliase は今の所使わない
    logging: false,
  }
);

module.exports = {
  sequelize: sequelize,
  user: require('./models/user')(sequelize),
  games: require('./models/game')(sequelize)
};
