/**
 * Created by Vyndee on 16/04/2017.
 */
'use strict';

import {
    BooleanType,
    NumberType,
    Ref,
    Model,
    Hook,
    Method,
    Static,
    String,
    Default,
    Validate,
    Index,
    Required,
    None,
    ArrayType,
    Date
} from '../../../../config/lib/decorators';


var mongoose = require('mongoose'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    validator = require('validator')


@Model
class Beacon {

    @String
    @Required('Uuid is required')
    @Validate('validateNotEmptyProperty', 'Please fill in the beacon uuid')
    uuid;

    @String
    @Required('Major is required')
    @Validate('validateNotEmptyProperty', 'Please fill in the beacon major')
    @Default('')
    major;

    @String
    @Required('Minor is required')
    @Validate('validateNotEmptyProperty', 'Please fill in the beacon minor')
    @Default('')
    minor;

    @Date
    @Default(Date.now)
    date;


    // ======= Methods =========
    validateNotEmptyProperty(val) {
        return val.length;
    }

}

module.exports = Beacon;
