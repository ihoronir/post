var express = require('express');
var router = express.Router();

var render = require('../render');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    render('signup', req, res, {
      flashmessage: req.flash('signup')
    })
  }
});

module.exports = router;
