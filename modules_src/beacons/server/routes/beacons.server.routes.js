/**
 * Created by Vyndee on 16/04/2017.
 */
'use strict';

/**
 * Module dependencies
 */
var beacons = require('../controllers/beacons.server.controller');

module.exports = function (app) {
    // Beacon collection routes
    app.route('/api/beacons')
        .get(beacons.list)
        .post(beacons.create);

    // Single Beacon routes
    app.route('/api/beacons/:beaconId')
        .get(beacons.read)
        .put(beacons.update)
        .delete(beacons.delete);

    app.param('beaconId', beacons.beconById);
};
