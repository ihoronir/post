'use strict';

const indexRouter    = require('./pages/index');    // / (index)
const userRouter     = require('./pages/user');     // /user
const loginRouter    = require('./pages/login');    // /login
const signupRouter   = require('./pages/signup');   // /signup 
const settingsRouter = require('./pages/settings'); // /settings

const loginController    = require('./controllers/login');        // login
const logoutController   = require('./controllers/logout');
const signupController   = require('./controllers/signup');       // signup
const settingsController = require('./controllers/settings');     // settings
const onlyLoggedIn       = require('./controllers/onlyLoggedIn'); // onlyLoggedIn 

module.exports = app => {

  // / (index)
  app.use('/', indexRouter);

  // /user
  app.use('/user', userRouter);

  // /login
  app.use('/login', loginRouter);
  app.use('/login', loginController);

  // /logout
  app.use('/logout', logoutController);

  // /signup
  app.use('/signup', signupRouter);
  app.use('/signup', signupController);

  // /settings
  app.use('/settings', onlyLoggedIn, settingsRouter);
  app.use('/settings', onlyLoggedIn, settingsController);
  
};
