'use strict';

const indexRouter    = require('./pages/index');    // / (index)
const loginRouter    = require('./pages/login');    // /login
const signupRouter   = require('./pages/signup');   // /signup 
const settingsRouter = require('./pages/settings'); // /settings
const uploadRouter   = require('./pages/upload');   // /upload
const userRouter     = require('./pages/user');     // /users
const gameRouter     = require('./pages/game');     // /games

const loginController  = require('./controllers/login');  // /login
const logoutController = require('./controllers/logout'); // /logout
const signupController = require('./controllers/signup'); // /signup
const accountSettingsController  = require('./controllers/settings/account');  // /settings/account
const passwordSettingsController = require('./controllers/settings/password'); // /settings/password
const profileSettingsController  = require('./controllers/settings/profile');  // /settings/profile
const emailSettingsController    = require('./controllers/settings/email');    // /settings/email
const uploadController = require('./controllers/upload'); // /upload
const gameController   = require('./controllers/game');   // /games

const loginFilter = require('./filters/login');

module.exports = app => {
  // controller
  // ここでは application/x-www-form-urlencoded の post を扱う。
  app.use('/login', loginController);
  app.use('/logout', logoutController);
  app.use('/signup', signupController);
  app.use('/settings/account', loginFilter, accountSettingsController);
  app.use('/settings/password', loginFilter, passwordSettingsController);
  app.use('/settings/profile', loginFilter, profileSettingsController);
  app.use('/settings/email', loginFilter, emailSettingsController);
  app.use('/upload', loginFilter, uploadController);
  app.use('/games', gameController);

  // router
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/settings', loginFilter, settingsRouter);
  app.use('/upload', loginFilter, uploadRouter);
  app.use('/users', userRouter);
  app.use('/games', gameRouter);
};
