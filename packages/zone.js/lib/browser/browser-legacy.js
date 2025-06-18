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
 * @suppress {missingRequire}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchBrowserLegacy = patchBrowserLegacy;
const define_property_1 = require("./define-property");
const event_target_legacy_1 = require("./event-target-legacy");
const property_descriptor_legacy_1 = require("./property-descriptor-legacy");
const register_element_1 = require("./register-element");
function patchBrowserLegacy() {
    const _global = typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
                ? self
                : {};
    const symbolPrefix = _global['__Zone_symbol_prefix'] || '__zone_symbol__';
    function __symbol__(name) {
        return symbolPrefix + name;
    }
    _global[__symbol__('legacyPatch')] = function () {
        const Zone = _global['Zone'];
        Zone.__load_patch('defineProperty', (global, Zone, api) => {
            api._redefineProperty = define_property_1._redefineProperty;
            (0, define_property_1.propertyPatch)();
        });
        Zone.__load_patch('registerElement', (global, Zone, api) => {
            (0, register_element_1.registerElementPatch)(global, api);
        });
        Zone.__load_patch('EventTargetLegacy', (global, Zone, api) => {
            (0, event_target_legacy_1.eventTargetLegacyPatch)(global, api);
            (0, property_descriptor_legacy_1.propertyDescriptorLegacyPatch)(api, global);
        });
    };
}
