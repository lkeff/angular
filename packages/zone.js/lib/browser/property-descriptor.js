"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProperties = filterProperties;
exports.patchFilteredProperties = patchFilteredProperties;
exports.getOnEventNames = getOnEventNames;
exports.propertyDescriptorPatch = propertyDescriptorPatch;
const utils_1 = require("../common/utils");
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
        return onProperties;
    }
    const tip = ignoreProperties.filter((ip) => ip.target === target);
    if (tip.length === 0) {
        return onProperties;
    }
    const targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    (0, utils_1.patchOnProperties)(target, filteredProperties, prototype);
}
/**
 * Get all event name properties which the event name startsWith `on`
 * from the target object itself, inherited properties are not considered.
 */
function getOnEventNames(target) {
    return Object.getOwnPropertyNames(target)
        .filter((name) => name.startsWith('on') && name.length > 2)
        .map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global) {
    if (utils_1.isNode && !utils_1.isMix) {
        return;
    }
    if (Zone[api.symbol('patchEvents')]) {
        // events are already been patched by legacy patch.
        return;
    }
    const ignoreProperties = _global['__Zone_ignore_on_properties'];
    // for browsers that we can patch the descriptor:  Chrome & Firefox
    let patchTargets = [];
    if (utils_1.isBrowser) {
        const internalWindow = window;
        patchTargets = patchTargets.concat([
            'Document',
            'SVGElement',
            'Element',
            'HTMLElement',
            'HTMLBodyElement',
            'HTMLMediaElement',
            'HTMLFrameSetElement',
            'HTMLFrameElement',
            'HTMLIFrameElement',
            'HTMLMarqueeElement',
            'Worker',
        ]);
        const ignoreErrorProperties = [];
        // In older browsers like IE or Edge, event handler properties (e.g., `onclick`)
        // may not be defined directly on the `window` object but on its prototype (`WindowPrototype`).
        // To ensure complete coverage, we use the prototype when checking
        // for and patching these properties.
        patchFilteredProperties(internalWindow, getOnEventNames(internalWindow), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, (0, utils_1.ObjectGetPrototypeOf)(internalWindow));
    }
    patchTargets = patchTargets.concat([
        'XMLHttpRequest',
        'XMLHttpRequestEventTarget',
        'IDBIndex',
        'IDBRequest',
        'IDBOpenDBRequest',
        'IDBDatabase',
        'IDBTransaction',
        'IDBCursor',
        'WebSocket',
    ]);
    for (let i = 0; i < patchTargets.length; i++) {
        const target = _global[patchTargets[i]];
        (target === null || target === void 0 ? void 0 : target.prototype) &&
            patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
    }
}
