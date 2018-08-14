'use strict';

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login', {
      notFoundUser: req.flash('notFoundUser')[0],
      notMatchedPassword: req.flash('notMatchedPassword')[0]
    });
  }
};
