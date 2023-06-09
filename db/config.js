'use strict';

const config = require('config');

module.exports = {
  development: {
    username: config.mariadb.user,
    password: config.mariadb.password,
    database: config.mariadb.database,
    //host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false
  }
  /*
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
  */
};
