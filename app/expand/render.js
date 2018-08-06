'use strict';

const express = require('express');
const config = require('config');

const res = express.response;

res.originalRender = res.render;

res.render = function(view, opts, fn) {

  const variables = {
    isAuthenticated: this.req.isAuthenticated(),
    csrftoken      : this.req.csrfToken ? this.req.csrfToken() : '',
    user           : this.req.user,
    query          : this.req.query,
    string         : this.req.string,
    originalUrl    : this.req.originalUrl,
    config         : config
  };

  Object.assign(variables, opts);

  res.originalRender.call(this, view, variables, fn);
};

module.exports = app => {
  app.set('view engine', 'pug');
};
