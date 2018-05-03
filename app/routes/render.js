var config = require('config');

var User = require('../database/database').user;

module.exports = function(view, req, res) {

  isAuthenticated = req.isAuthenticated();

  User.findOne({
    where: {
      id: req.user
    }
  }).then(function(user) {

    var variables = {
      isAuthenticated: isAuthenticated,
      user: user
    }

    res.render(view, variables);

  }).catch(function(err) {
    console.log(err);
  });
}