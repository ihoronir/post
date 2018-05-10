// var config = require('config');

var User = require('../database/database').user;

module.exports = function(view, req, res, next, source) {

  var isAuthenticated = req.isAuthenticated();
  var csrftoken       = req.csrfToken();

  User.findOne({
    where: {
      id: req.user
    }
  }).then(function(user) {

    var variables = {
      isAuthenticated: isAuthenticated,
      csrftoken: csrftoken,
      user: user
    }

    // source で拡張
    Object.assign(variables, source);

    res.render(view, variables);

  }).catch(function(err) {
    next(err)
  });
}