'use strict'

const express = require('express');

const res = express.response;

res.originalRender = res.render;

res.render = function(view, opts, fn) {
  const isAuthenticated = this.req.isAuthenticated();
  const csrftoken       = this.req.csrfToken();
  const user            = this.req.user;
  const query           = this.req.query;

  const variables = {
    isAuthenticated: isAuthenticated,
    csrftoken: csrftoken,
    user: user,
    query: query
  }

  // source で拡張
  Object.assign(variables, opts);

  res.originalRender.call(this, view, variables, fn);
};

module.exports = app => {
  app.set('view engine', 'jade');
}