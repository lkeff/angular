"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyPatch = propertyPatch;
exports._redefineProperty = _redefineProperty;
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
let zoneSymbol;
let _defineProperty;
let _getOwnPropertyDescriptor;
let _create;
let unconfigurablesKey;
function propertyPatch() {
    zoneSymbol = Zone.__symbol__;
    _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
    _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
        Object.getOwnPropertyDescriptor;
    _create = Object.create;
    unconfigurablesKey = zoneSymbol('unconfigurables');
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError("Cannot assign to read only property '" + prop + "' of " + obj);
        }
        const originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        for (const sym of Object.getOwnPropertySymbols(props)) {
            const desc = Object.getOwnPropertyDescriptor(props, sym);
            // Since `Object.getOwnPropertySymbols` returns *all* symbols,
            // including non-enumerable ones, retrieve property descriptor and check
            // enumerability there. Proceed with the rewrite only when a property is
            // enumerable to make the logic consistent with the way regular
            // properties are retrieved (via `Object.keys`, which respects
            // `enumerable: false` flag). More information:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#retrieval
            if (desc === null || desc === void 0 ? void 0 : desc.enumerable) {
                Object.defineProperty(obj, sym, props[sym]);
            }
        }
        return obj;
    };
    Object.create = function (proto, propertiesObject) {
        if (typeof propertiesObject === 'object' && !Object.isFrozen(propertiesObject)) {
            Object.keys(propertiesObject).forEach(function (prop) {
                propertiesObject[prop] = rewriteDescriptor(proto, prop, propertiesObject[prop]);
            });
        }
        return _create(proto, propertiesObject);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        const desc = _getOwnPropertyDescriptor(obj, prop);
        if (desc && isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    const originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(),
            // let's retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                let swallowError = false;
                if (prop === 'createdCallback' ||
                    prop === 'attachedCallback' ||
                    prop === 'detachedCallback' ||
                    prop === 'attributeChangedCallback') {
                    // We only swallow the error in registerElement patch
                    // this is the work around since some applications
                    // fail if we throw the error
                    swallowError = true;
                }
                if (!swallowError) {
                    throw error;
                }
                // TODO: @JiaLiPassion, Some application such as `registerElement` patch
                // still need to swallow the error, in the future after these applications
                // are updated, the following logic can be removed.
                let descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log(`Attempting to configure '${prop}' with descriptor '${descJson}' on object '${obj}' and got error, giving up: ${error}`);
            }
        }
        else {
            throw error;
        }
    }
}
