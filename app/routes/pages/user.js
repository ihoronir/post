var express = require('express');
var router = express.Router();

var User = require('../../database/database').user;

var render = require('../render');

router.get('/:name', function(req, res, next) {
  User.findOne({
    where: {
      name: req.params.name
    }
  }).then(function(user) {
    render('user', req, res, {
      profile: user
    });
  }).catch(function(err) {
    next(err);
  })
})

module.exports = router;
