/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var XP = require('expandjs'),
        map = require('lol-hash-table'),
        literalOf = require('./literalOf');

    /**************************************************************************/

    /**
     * Matches a given inibin hash against the hash-table.
     *
     * @param {string} hash
     * @return {Object}
     */
    module.exports = function matchHash(hash) {
        var literal = literalOf(map, XP.toNumber(hash));
        if (!XP.isDefined(literal)) { literal = 'Unknown.' + hash; }

        return literal;
    };

}());
