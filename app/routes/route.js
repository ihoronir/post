var indexRouter = require('./index'); // / (index)
var loginRouter = require('./login'); // /login
var passport = require('passport');
//var usersRouter = require('./routes/users');


module.exports = function(app) {
  // / (index)
  app.use('/', indexRouter);

  // /login
  app.use('/login', loginRouter);

  // /login (post)
  app.post(
    '/login', 
    passport.authenticate('local'),
    function(req, res) {
      res.redirect('/');
    }
  );
};