/**
 * Created by Vyndee on 16/04/2017.
 */
'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    Beacon = mongoose.model('Beacon'),
    uuidV4 = require('uuid/v4'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    gcm = require('node-gcm'),
    config = require(path.resolve('./config/config')),
    QRCode = require('qrcode'),
    _ = require('underscore');


/**
 * List Beacons
 */
exports.list = function (req, res) {

    Beacon.find(function (err, beacons) {
        if (err || !beacons) {
            res.status(400).send({
                message: 'Error'
            })
        } else {
            res.json(beacons)
        }
    })
};

/**
 * Create a Beacon
 */
exports.create = function (req, res) {
    var beacon = new Beacon(req.body);
    console.log(beacon);
    beacon.date = new Date();
    beacon.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: "Beacon exist"
            });
        } else {
            res.json(beacon);
        }
    });

};

/**
 * Show Beacon
 */
exports.read = function (req, res) {
    var beacon = req.beacon;

    console.log(beacon);

    res.json(beacon)
};

/**
 * Update a Beacon
 */
exports.update = function (req, res) {
    var beacon = req.beacon;
    console.log(beacon);
    if (beacon) {
        // Update whitelisted fields only
        //beacon = _.extend(beacon, _.pick(req.body, whitelistedFields));

        beacon.save(function (err) {
            if (err) {
                return res.status(422).send({
                    message: "Cannot update Beacon"
                });
            } else {
                res.json(beacon);
            }
        });

    } else {
        res.status(401).send({
            message: 'Beacon not found'
        });
    }

};


/**
 * Delete a Beacon
 */
exports.delete = function (req, res) {
    var beacon = req.beacon;

    beacon.remove(function (err) {
        if (err) {
            return res.status(422).send({
                message: "Cannot delete beacon"
            });
        } else {
            res.json(beacon);
        }
    });

};


/**
 * Beacon middleware
 */
exports.beconById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Beacon is invalid'
        });
    }

    Beacon.findById(id).exec(function (err, beacon) {
        if (err) {
            return next(err);
        } else if (!beacon) {
            return res.status(404).send({
                message: 'No Beacon with that identifier has been found'
            });
        } else {
            req.beacon = beacon;
            next();
        }
    });
};

