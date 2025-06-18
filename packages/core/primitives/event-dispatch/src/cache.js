"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.getDefaulted = getDefaulted;
exports.set = set;
exports.getParsed = getParsed;
exports.setParsed = setParsed;
exports.clear = clear;
const property_1 = require("./property");
/**
 * Map from jsaction annotation to a parsed map from event name to action name.
 */
const parseCache = {};
/**
 * Reads the jsaction parser cache from the given DOM Element.
 */
function get(element) {
    return element[property_1.Property.JSACTION];
}
/**
 * Reads the jsaction parser cache for the given DOM element. If no cache is yet present,
 * creates an empty one.
 */
function getDefaulted(element) {
    var _a;
    const cache = (_a = get(element)) !== null && _a !== void 0 ? _a : {};
    set(element, cache);
    return cache;
}
/**
 * Writes the jsaction parser cache to the given DOM Element.
 */
function set(element, actionMap) {
    element[property_1.Property.JSACTION] = actionMap;
}
/**
 * Looks up the parsed action map from the source jsaction attribute value.
 *
 * @param text Unparsed jsaction attribute value.
 * @return Parsed jsaction attribute value, if already present in the cache.
 */
function getParsed(text) {
    return parseCache[text];
}
/**
 * Inserts the parse result for the given source jsaction value into the cache.
 *
 * @param text Unparsed jsaction attribute value.
 * @param parsed Attribute value parsed into the action map.
 */
function setParsed(text, parsed) {
    parseCache[text] = parsed;
}
/**
 * Clears the jsaction parser cache from the given DOM Element.
 *
 * @param element .
 */
function clear(element) {
    if (property_1.Property.JSACTION in element) {
        delete element[property_1.Property.JSACTION];
    }
}
