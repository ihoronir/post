const express = require('express');
const router = express.Router();

const render = require('../render');

router.get('/', function(req, res, next) {

  render('index', req, res, next);

});

module.exports = router;
