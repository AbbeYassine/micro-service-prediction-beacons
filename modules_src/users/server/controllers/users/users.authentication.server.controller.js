'use strict';

/**
* Module dependencies
*/
var path = require('path'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
mongoose = require('mongoose'),
passport = require('passport'),
User = mongoose.model('User'),
jwt = require('jsonwebtoken'),
config = require('../../../../../config/config'),
FB = require('fb'),
google = require('googleapis'),
uuidV4 = require('uuid/v4');

/**
* Signup
*/
function _signup (req, res) {
  if(req.headers.secret && req.headers.secret === config.secret.jwt) {
    // For security measurement we remove the roles from the req.body object
    delete req.body.uuid;

    // Init user and add missing fields
    var user = new User(req.body);
    user.uuid = uuidV4();

    // Then save the user
    user.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {

        //user has authenticated correctly thus we create a JWT token
        var token = jwt.sign(user, config.secret.jwt);
        res.json({ user : user, token : token });
      }
    });
  } else {
    res.status(403).send({
      message: 'This api is private !'
    })
  }
}

/**
* Signin after passport authentication
*/
function _signin(req, res) {
  var uuid = req.body.uuid;

  var query = {uuid: uuid} ;

  User.findOne(query , function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user || !user.authenticate(uuid)) {
      res.status(400).send({
        message: 'Invalid uuid'
      })
    } else {
      //user has authenticated correctly thus we create a JWT token
      var token = jwt.sign(user, config.secret.jwt);
      res.json({ user : user, token : token });
    }
  });
}

var self = module.exports = {
  signup: _signup,
  signin: _signin
};
