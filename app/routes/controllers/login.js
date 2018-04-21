var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;
