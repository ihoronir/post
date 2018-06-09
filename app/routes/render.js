// var config = require('config');
module.exports = function(view, req, res, next, source) {

  const isAuthenticated = req.isAuthenticated();
  const csrftoken       = req.csrfToken();
  const user            = req.user;
  const query           = req.query;

  const variables = {
    isAuthenticated: isAuthenticated,
    csrftoken: csrftoken,
    user: user,
    query: query
  }

  // source で拡張
  Object.assign(variables, source);

  res.render(view, variables);
}