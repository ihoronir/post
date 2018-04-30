var config = require('config');

var User = require('../database/database').user;

var safe = function(source) {
  Array.prototype.forEach.call(arguments, function(source) {
    for (var property in source) {
      if (this[property] === undefined) this[property] = source[property];
    }
  }, this);
  return this;
}

module.exports = function(req, obj) {

  var authenticated = req.isAuthenticated();
  var user;
  User.findOne({
    where: {
      id: req.user
    }
  }).then(function(user) {
    user = user;
  }).catch(function(err) {
    console.log(err);
  });

  var variables = obj.safe({
    authenticated: authenticated,
    user: user
  });

  return variables;
}