'use strict';

const avaterSettingsController = require('./controllers/settings/avater');  // /settings/avater
const loginFilter = require('./filters/login');

module.exports = app => {

  // ここでは multipart/form-data の post を扱う。
  app.use('/settings/avater', loginFilter, avaterSettingsController);

};
