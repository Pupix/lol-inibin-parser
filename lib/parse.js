(function () {
    'use strict';

    // Vars
    var XP = require('expandjs');

    /*********************************************************************/

    module.exports = function (parser, cb) {
        var inibin = {
                header: {},
                keys: {}
            },
            bitMask,
            offsets,
            keys,
            tell,
            boolByte = null,

            /**
             * Adds the next block of keys into the inibin structure
             * and returns the list of added keys.
             *
             * @returns {Array}
             * @private
             */
            _addKeys = function () {
                var counter = parser.uint16(),
                    keyList = [],
                    i;

                for (i = 0; i < counter; i += 1) {
                    keyList.push(parser.uint32());
                    inibin.keys[keyList[keyList.length - 1]] = undefined;
                }
                return keyList;
            };

        inibin.header.version = parser.int8();
        inibin.header.stringTableLength = parser.uint16();
        inibin.header.bitMask = parser.uint16();


        if (inibin.header.version !== 2) {
            return cb(new Error('Unknown .inibin version'), null);
        }

        //Parse the bitmask as an array for easier handling
        parser.skip(-2);
        bitMask = parser.bit16();

        // 0x0001
        if (bitMask[0]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.uint32();
            });
        }

        // 0x0002
        if (bitMask[1]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.float().toFixed(5);
            });
        }

        // 0x0004
        if (bitMask[2]) {
            XP.forEach(_addKeys() || [], function (key) {
                /**
                 * Using `parser.int8() * 0.1` creates a floating
                 * point error in the form of: 0.700000000000000001
                 */
                inibin.keys[key] = parser.int8() / 10;
            });
        }

        // 0x0008
        if (bitMask[3]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.uint16();
            });
        }

        // 0x0010
        if (bitMask[4]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = 0xff & parser.int8();
            });
        }

        // 0x0020
        if (bitMask[5]) {
            XP.forEach(_addKeys() || [], function (key, index) {
                boolByte = index % 8 === 0 ? parser.int8() : boolByte >> 1;
                inibin.keys[key] = 0x1 & boolByte;
            });
        }

        // 0x0040
        if (bitMask[6]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.int8() + ' ' + parser.int8() + ' ' + parser.int8();
            });
        }

        // 0x0080
        if (bitMask[7]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.float() + ' ' + parser.float() + ' ' + parser.float();
            });
        }

        // 0x0100
        if (bitMask[8]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.uint8() / 10 + ' ' + parser.uint8() / 10;
            });
        }

        // 0x0200
        if (bitMask[9]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.float() + ' ' + parser.float();
            });
        }

        // 0x0400
        if (bitMask[10]) {
            XP.forEach(_addKeys() || [], function (key) {
                /**
                 * Using `parser.byte() * 0.1` creates a floating
                 * point error in the form of: 0.700000000000000001
                 */
                inibin.keys[key] = parser.byte() / 10 + ' ' + parser.byte() / 10 + ' ' + parser.byte() / 10 + ' ' + parser.byte() / 10;
            });
        }

        // 0x0800
        if (bitMask[11]) {
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = parser.float() + ' ' + parser.float() + ' ' + parser.float() + ' ' + parser.float();
            });
        }

        // 0x1000
        if (bitMask[12]) {
            offsets = [];
            keys = _addKeys();

            XP.forEach(keys || [], function () {
                offsets.push(parser.uint16());
            });

            tell = parser.tell();

            XP.forEach(keys || [], function (key, index) {
                parser.seek(tell + offsets[index]);
                inibin.keys[key] = parser.string0();
            });
        }

        // 0x2000
        if (bitMask[13]) {
            console.warn('Unknown block structure');
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = null;
            });
        }

        // 0x4000
        if (bitMask[14]) {
            console.warn('Unknown block structure');
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = null;
            });
        }

        // 0x8000
        if (bitMask[15]) {
            console.warn('Unknown block structure');
            XP.forEach(_addKeys() || [], function (key) {
                inibin.keys[key] = null;
            });
        }

        cb(null, inibin);

    };

}());
