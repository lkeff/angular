"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropType = void 0;
const protocol_1 = require("protocol");
const utils_1 = require("../utils");
const commonTypes = {
    boolean: protocol_1.PropType.Boolean,
    bigint: protocol_1.PropType.BigInt,
    function: protocol_1.PropType.Function,
    number: protocol_1.PropType.Number,
    string: protocol_1.PropType.String,
    symbol: protocol_1.PropType.Symbol,
};
/**
 * Determines the devtools-PropType of a component's property
 * @param prop component's property
 * @returns PropType
 * @see `devtools/projects/protocol`
 */
const getPropType = (prop) => {
    if ((0, utils_1.isSignal)(prop)) {
        prop = prop();
    }
    if (prop === undefined) {
        return protocol_1.PropType.Undefined;
    }
    if (prop === null) {
        return protocol_1.PropType.Null;
    }
    if (prop instanceof HTMLElement) {
        return protocol_1.PropType.HTMLNode;
    }
    const type = typeof prop;
    if (type in commonTypes) {
        return commonTypes[type];
    }
    if (type === 'object') {
        if (Array.isArray(prop)) {
            return protocol_1.PropType.Array;
        }
        else if (prop instanceof Set) {
            return protocol_1.PropType.Set;
        }
        else if (prop instanceof Map) {
            return protocol_1.PropType.Map;
        }
        else if (Object.prototype.toString.call(prop) === '[object Date]') {
            return protocol_1.PropType.Date;
        }
        else if (prop instanceof Node) {
            return protocol_1.PropType.HTMLNode;
        }
        else {
            return protocol_1.PropType.Object;
        }
    }
    return protocol_1.PropType.Unknown;
};
exports.getPropType = getPropType;
