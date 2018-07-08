'use strict';

const path   = require('path');
const Config = require('./config');
const config = new Config();


config.addFromPath('mariadb', path.join(__dirname, './environment/devMariaDB'))
      .addFromPath('secret' , path.join(__dirname, './environment/devSecrets'));


module.exports = config;