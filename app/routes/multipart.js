'use strict';

const avaterSettingsController = require('./controllers/settings/avater');  // /settings/avater
const onlyLoggedIn = require('./controllers/onlyLoggedIn'); // onlyLoggedIn 

module.exports = app => {

  // ここでは multipart/form-data の post を扱う。
  app.use('/settings/avater', onlyLoggedIn, avaterSettingsController);

};
