var express = require('express');
var router = express.Router();

// var render = require('../render');

router.get('/', function(req, res, next) {
  res.send('Setting!!!');
});

module.exports = router;
