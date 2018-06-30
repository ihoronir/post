'use strict';

const jade = require('jade');

module.exports = app => {
  app.engine('originalRender', (view, opts, fn) => {
    //console.log('Hello');

    const req = opts.req;
    
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
    Object.assign(variables, opts);

    console.log(view);
    fn('Hello');
    //return jade.__express(view, opts, fn);
  });
}