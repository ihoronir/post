var indexRouter  = require('./pages/index');  // / (index)
var userRouter   = require('./pages/user');   // /user
var loginRouter  = require('./pages/login');  // /login
var signupRouter = require('./pages/signup'); // /signup 

var loginController  = require('./controllers/login');  // login
var signupController = require('./controllers/signup'); // signup

var passport = require('passport');


module.exports = function(app) {

  // / (index)
  app.use('/', indexRouter);

  // /user
  app.use('/user', userRouter);

  // /login
  app.use('/login', loginRouter);

  // /login (post)
  app.post('/login', loginController);

  // /signup
  app.use('/signup', signupRouter);
  
  // /signup (post)
  app.post('/signup', signupController);
  
};