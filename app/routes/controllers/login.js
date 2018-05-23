var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/',
  passport.authenticate('local', {
    // successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect(decodeURIComponent(req.body.redirect_to));
});

module.exports = router;
