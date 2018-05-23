var indexRouter    = require('./pages/index');    // / (index)
var userRouter     = require('./pages/user');     // /user
var loginRouter    = require('./pages/login');    // /login
var signupRouter   = require('./pages/signup');   // /signup 
var settingsRouter = require('./pages/settings'); // /settings

var loginController    = require('./controllers/login');        // login
var signupController   = require('./controllers/signup');       // signup
var settingsController = require('./controllers/settings');     // settings
var onlyLoggedIn       = require('./controllers/onlyLoggedIn'); // onlyLoggedIn 

module.exports = function(app) {

  // / (index)
  app.use('/', indexRouter);

  // /user
  app.use('/user', userRouter);

  // /login
  app.use('/login', loginRouter);
  app.use('/login', loginController);

  // /signup
  app.use('/signup', signupRouter);
  app.use('/signup', signupController);

  // /settings
  app.use('/settings', onlyLoggedIn, settingsRouter);
  app.use('/settings', onlyLoggedIn, settingsController);
  
};