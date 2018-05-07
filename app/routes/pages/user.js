var express = require('express');
var router = express.Router();

var User = require('../../database/database').user;

router.get('/:name', function(req, res, next) {
  User.findOne({
    where: {
      name: req.params.name
    }
  }).then(function(user) {
    res.send(user.screenName);
  }).catch(function(err) {
    next(err);
  })
})

module.exports = router;
