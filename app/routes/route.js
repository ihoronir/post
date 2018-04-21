var indexRouter  = require('./pages/index');  // / (index)
var loginRouter  = require('./pages/login');  // /login
var signupRouter = require('./pages/signup'); // /signup 

var loginController  = require('./controllers/login');  // login
var signupController = require('./controllers/signup'); // signup

var passport = require('passport');


module.exports = function(app) {

  var outhello = 'Hello';
  // / (index)
  app.use('/', indexRouter);

  // /login
  app.use('/login', loginRouter);

  // /login (post)
  app.post('/login', loginController);

  // /signup
  app.use('/signup', signupRouter);
  
  // /signup (post)
  app.post('/signup', signupController);
};