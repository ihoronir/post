var express = require('express');
var router = express.Router();

var render = require('../render');

router.get('/', function(req, res, next) {

  render('index', req, res);

});

module.exports = router;
