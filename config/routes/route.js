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