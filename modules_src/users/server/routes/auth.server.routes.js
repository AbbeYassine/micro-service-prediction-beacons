'use strict';

/**
 * Module dependencies
 */
var passport = require('passport');

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users authentication api
  app.route('/api/users/auth/signup').post(users.signup);
  app.route('/api/users/auth/signin').post(users.signin);
  
};
