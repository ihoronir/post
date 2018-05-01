var express = require('express');
var router = express.Router();

var variables = require('../variables');

router.get('/', function(req, res, next) {
  res.render('index', variables(req, {
    user: 'Useruser',
    custom: 'Custom Object'
  }));

  console.log(req.user);
});

module.exports = router;
