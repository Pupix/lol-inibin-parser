(function () {
    'use strict';

    var fileReader = require('lol-file-parser'),
        parse = require('./parse'),
        read = require('./read'),
        extract = require('./extract');

    module.exports = fileReader({

        name: 'InibinParser',

        parse: function (parser, cb) {
            parse(parser, cb);
        },

        read: function (data, cb) {
            read(data, cb);
        },

        extract: function (data, out, cb) {
            extract(data, out, cb);
        }

    });

}());
