(function () {
    'use strict';

    // Vars
    var XP  = require('expandjs'),
        matchHash = require('./util/matchHash');

    /*********************************************************************/

    module.exports = function (data, cb) {
        var readable = {},
            match,
            category,
            key;

        XP.forOwn(data.keys, function (value, hash) {
            match = matchHash(hash).split('.');
            category = match[0];
            key = match[1];

            readable[category] = readable[category] || {};
            readable[category][key] = value;
        });

        cb(null, readable);

    };

}());
