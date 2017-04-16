'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User');

/**
 * Send User
 */
exports.me = function (req, res) {
  User.findOne({_id: req.user._doc._id}).populate('polls', null, null, { populate: 'questions'}).exec(function(err, user) {
    if(err || !user) {
      res.status(400).send(err)
    } else {
      res.json(user)
    }
  })
};
