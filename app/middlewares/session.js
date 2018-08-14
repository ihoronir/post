'use strict';

const config = require('config');
const session = require('express-session');

// Redis Session Store
const RedisStore = require('connect-redis')(session);
const sessionStore = new RedisStore({
  host: config.redis.host,
  port: config.redis.port,
  prefix: config.redis.prefix
});

module.exports = app => {
  // express session
  app.use(
    session({
      secret: config.secret.session,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // httpOnly: true, // クライアントから見れない
        // secure: false, // https のとき
        maxAge: 30 * 60 * 1000
      }
    })
  );
};
