(function () {
    'use strict';

    // Vars
    var XP  = require('expandjs'),
        mkdirp = require('mkdirp'),
        fs = require('xp-fs'),
        path = require('path');

    /*********************************************************************/

    module.exports = function (data, output, cb) {
        var fileContents = '';

        XP.forOwn(data, function (value, category) {
            fileContents += '[' + category + ']\n';

            XP.forOwn(value, function (value, key) {
                fileContents += key + ' = ' + value + '\n';
            });

            fileContents += '\n';
        });

        mkdirp(path.dirname(output), function (err) {
            if (err) { return cb(err, null); }

            fs.writeFile(output, fileContents, 'UTF-8', function (err) {
                cb(err || null, fileContents);
            });
        });

    };

}());
