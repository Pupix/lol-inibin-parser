/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var XP = require('expandjs');

    /**
     * Finds `value` in the given `collection` and return it's literal string.
     *
     * @param {Object} collection
     * @param {*} value
     * @return {string}
     */
    module.exports = function literalOf(collection, value) {
        XP.assertArgument(XP.isObject(collection), 1, 'Object');
        XP.assertArgument(XP.isString(value) || XP.isNumber(value), 2, 'string or number');
        return XP.mapOne(collection, function (val, i) {
            if (val === value) { return i; }
            if (XP.isObject(val)) {
                var result = literalOf(val, value);
                return result ? i + '.' + result : undefined;
            }
        });
    };

}());
