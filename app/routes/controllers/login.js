var express = require('express');
var router = express.Router();

var passport = require('passport');

/*
router.post('/',
  passport.authenticate('local', {
    // successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect(decodeURIComponent(req.body.redirect_to));
});
*/

router.post('/', function(req, res, next) {
  var redirectURL = decodeURIComponent(req.body.redirect_to) || '/';
  passport.authenticate('local', {
    successRedirect: redirectURL,
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
