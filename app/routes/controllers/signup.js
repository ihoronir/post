var express = require('express');
var router = express.Router();

var User = require('../../database/database').user;

router.post('/signup', function(req, res) {
  console.log(req.body);
  User.build({
    name: req.body.name,
    screenName: req.body.screen_name,
    email: req.body.email,
    password: req.body.password
  }).save().catch(function(err) {
    console.log(err);
  });;
});

module.exports = router;
