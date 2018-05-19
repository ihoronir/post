var express = require('express');
var router = express.Router();

// var passport = require('passport');

/*
router.post('/settings', function(req, res) {
  // res.redirect('/');
});
*/

router.post('/settings', function(req, res, next) {
  console.log(req.body);
  next();
});

module.exports = router;