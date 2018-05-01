var config = require('config');

var User = require('../database/database').user;

var safe = function(obj, source) {
  Array.prototype.forEach.call(arguments, function(source) {
    for (var property in source) {
      if (this[property] === undefined) this[property] = source[property];
    }
  }, this);
  return this;
}

module.exports = function(req, obj) {

  var user;
  User.findOne({
    where: {
      id: req.user
    }
  }).then(function(user) {
    user = user;
    console.log(user);
  }).catch(function(err) {
    console.log(err);
  });

  var variables = {
    user: user
  }

  if (obj) {
    variables = safe(obj, variables);
  }

  return variables;
}