'use strict';

const indexRouter    = require('./pages/index');    // / (index)
const loginRouter    = require('./pages/login');    // /login
const signupRouter   = require('./pages/signup');   // /signup 
const settingsRouter = require('./pages/settings'); // /settings
const uploadRouter   = require('./pages/upload');
const userRouter     = require('./pages/user');     // /:screen_name

const loginController  = require('./controllers/login');  // /login
const logoutController = require('./controllers/logout'); // /logout
const signupController = require('./controllers/signup'); // /signup
const accountSettingsController  = require('./controllers/settings/account');  // /settings/account
const passwordSettingsController = require('./controllers/settings/password'); // /settings/password
const profileSettingsController  = require('./controllers/settings/profile');  // /settings/profile
const emailSettingsController    = require('./controllers/settings/email');    // /settings/email
const onlyLoggedIn = require('./controllers/onlyLoggedIn'); // onlyLoggedIn 

module.exports = app => {

  // router
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/settings', onlyLoggedIn, settingsRouter);
  app.use('/upload', uploadRouter);

  // :screen_name
  app.use('/', userRouter);

  // controller
  // ここでは application/x-www-form-urlencoded の post を扱う。
  app.use('/login', loginController);
  app.use('/logout', logoutController);
  app.use('/signup', signupController);
  app.use('/settings/account', onlyLoggedIn, accountSettingsController);
  app.use('/settings/password', onlyLoggedIn, passwordSettingsController);
  app.use('/settings/profile', onlyLoggedIn, profileSettingsController);
  app.use('/settings/email', onlyLoggedIn, emailSettingsController);

};
