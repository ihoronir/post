var indexRouter  = require('./pages/index');  // / (index)
var loginRouter  = require('./pages/login');  // /login
var signupRouter = require('./pages/signup'); // /signup 

var loginController = require('./controllers/login') // login

var passport = require('passport');


module.exports = function(app) {
  // / (index)
  app.use('/', indexRouter);

  // /login
  app.use('/login', loginRouter);
  
  // /login (post)
  app.post('/login', loginController);
};