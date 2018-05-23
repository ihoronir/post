// var config = require('config');
module.exports = function(view, req, res, next, source) {

  var isAuthenticated = req.isAuthenticated();
  var csrftoken       = req.csrfToken();
  var user            = req.user;
  var query           = req.query;

  var variables = {
    isAuthenticated: isAuthenticated,
    csrftoken: csrftoken,
    user: user,
    query: query
  }

  // source で拡張
  Object.assign(variables, source);

  res.render(view, variables);
}