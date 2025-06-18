"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUtil = patchUtil;
const events_1 = require("../common/events");
const utils_1 = require("../common/utils");
const browser_util_1 = require("./browser-util");
const property_descriptor_1 = require("./property-descriptor");
function patchUtil(Zone) {
    Zone.__load_patch('util', (global, Zone, api) => {
        // Collect native event names by looking at properties
        // on the global namespace, e.g. 'onclick'.
        const eventNames = (0, property_descriptor_1.getOnEventNames)(global);
        api.patchOnProperties = utils_1.patchOnProperties;
        api.patchMethod = utils_1.patchMethod;
        api.bindArguments = utils_1.bindArguments;
        api.patchMacroTask = utils_1.patchMacroTask;
        // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS`
        // to define which events will not be patched by `Zone.js`. In newer version (>=0.9.0), we
        // change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep the name consistent with
        // angular repo. The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be
        // supported for backwards compatibility.
        const SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
        const SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
        if (global[SYMBOL_UNPATCHED_EVENTS]) {
            global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
        }
        if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
            Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
                global[SYMBOL_BLACK_LISTED_EVENTS];
        }
        api.patchEventPrototype = events_1.patchEventPrototype;
        api.patchEventTarget = events_1.patchEventTarget;
        api.isIEOrEdge = utils_1.isIEOrEdge;
        api.ObjectDefineProperty = utils_1.ObjectDefineProperty;
        api.ObjectGetOwnPropertyDescriptor = utils_1.ObjectGetOwnPropertyDescriptor;
        api.ObjectCreate = utils_1.ObjectCreate;
        api.ArraySlice = utils_1.ArraySlice;
        api.patchClass = utils_1.patchClass;
        api.wrapWithCurrentZone = utils_1.wrapWithCurrentZone;
        api.filterProperties = property_descriptor_1.filterProperties;
        api.attachOriginToPatched = utils_1.attachOriginToPatched;
        api._redefineProperty = Object.defineProperty;
        api.patchCallbacks = browser_util_1.patchCallbacks;
        api.getGlobalObjects = () => ({
            globalSources: events_1.globalSources,
            zoneSymbolEventNames: events_1.zoneSymbolEventNames,
            eventNames,
            isBrowser: utils_1.isBrowser,
            isMix: utils_1.isMix,
            isNode: utils_1.isNode,
            TRUE_STR: utils_1.TRUE_STR,
            FALSE_STR: utils_1.FALSE_STR,
            ZONE_SYMBOL_PREFIX: utils_1.ZONE_SYMBOL_PREFIX,
            ADD_EVENT_LISTENER_STR: utils_1.ADD_EVENT_LISTENER_STR,
            REMOVE_EVENT_LISTENER_STR: utils_1.REMOVE_EVENT_LISTENER_STR,
        });
    });
}
