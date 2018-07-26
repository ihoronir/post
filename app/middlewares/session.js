'use strict';

const config = require('config');
const session  = require('express-session');

// sessionStore 用 DB
const Sequelize = require('sequelize');
const sessionStoreDB = new Sequelize(
  config.mariadb.sessionStore, // データベース
  config.mariadb.user,         // ユーザー
  config.mariadb.password,     // パスワード
  { dialect: 'mysql',          // mysql
    operatorsAliases: false,   // operatorAliase は今の所使わない
    logging: false,
  }
);
sessionStoreDB.sync({force: false}); // 同期

// sessionStore
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
  db: sessionStoreDB
});

module.exports = app => {
  // express session
  app.use(session({
    secret: config.secret.session,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // httpOnly: true, // クライアントから見れない
      // secure: false, // https のとき 
      maxAge: 30 * 60 * 1000
    }
  }));
};
