"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.withIncrementalHydration = exports.withNoHttpTransferCache = exports.withI18nSupport = exports.withHttpTransferCacheOptions = exports.withEventReplay = exports.provideClientHydration = exports.HydrationFeatureKind = exports.DomSanitizer = exports.HammerModule = exports.HammerGestureConfig = exports.HAMMER_LOADER = exports.HAMMER_GESTURE_CONFIG = exports.EventManagerPlugin = exports.EventManager = exports.EVENT_MANAGER_PLUGINS = exports.REMOVE_STYLES_ON_COMPONENT_DESTROY = exports.By = exports.enableDebugTools = exports.disableDebugTools = exports.Title = exports.Meta = exports.provideProtractorTestingSupport = exports.platformBrowser = exports.createApplication = exports.BrowserModule = exports.bootstrapApplication = void 0;
var browser_1 = require("./browser");
Object.defineProperty(exports, "bootstrapApplication", { enumerable: true, get: function () { return browser_1.bootstrapApplication; } });
Object.defineProperty(exports, "BrowserModule", { enumerable: true, get: function () { return browser_1.BrowserModule; } });
Object.defineProperty(exports, "createApplication", { enumerable: true, get: function () { return browser_1.createApplication; } });
Object.defineProperty(exports, "platformBrowser", { enumerable: true, get: function () { return browser_1.platformBrowser; } });
Object.defineProperty(exports, "provideProtractorTestingSupport", { enumerable: true, get: function () { return browser_1.provideProtractorTestingSupport; } });
var meta_1 = require("./browser/meta");
Object.defineProperty(exports, "Meta", { enumerable: true, get: function () { return meta_1.Meta; } });
var title_1 = require("./browser/title");
Object.defineProperty(exports, "Title", { enumerable: true, get: function () { return title_1.Title; } });
var tools_1 = require("./browser/tools/tools");
Object.defineProperty(exports, "disableDebugTools", { enumerable: true, get: function () { return tools_1.disableDebugTools; } });
Object.defineProperty(exports, "enableDebugTools", { enumerable: true, get: function () { return tools_1.enableDebugTools; } });
var by_1 = require("./dom/debug/by");
Object.defineProperty(exports, "By", { enumerable: true, get: function () { return by_1.By; } });
var dom_renderer_1 = require("./dom/dom_renderer");
Object.defineProperty(exports, "REMOVE_STYLES_ON_COMPONENT_DESTROY", { enumerable: true, get: function () { return dom_renderer_1.REMOVE_STYLES_ON_COMPONENT_DESTROY; } });
var event_manager_1 = require("./dom/events/event_manager");
Object.defineProperty(exports, "EVENT_MANAGER_PLUGINS", { enumerable: true, get: function () { return event_manager_1.EVENT_MANAGER_PLUGINS; } });
Object.defineProperty(exports, "EventManager", { enumerable: true, get: function () { return event_manager_1.EventManager; } });
Object.defineProperty(exports, "EventManagerPlugin", { enumerable: true, get: function () { return event_manager_1.EventManagerPlugin; } });
var hammer_gestures_1 = require("./dom/events/hammer_gestures");
Object.defineProperty(exports, "HAMMER_GESTURE_CONFIG", { enumerable: true, get: function () { return hammer_gestures_1.HAMMER_GESTURE_CONFIG; } });
Object.defineProperty(exports, "HAMMER_LOADER", { enumerable: true, get: function () { return hammer_gestures_1.HAMMER_LOADER; } });
Object.defineProperty(exports, "HammerGestureConfig", { enumerable: true, get: function () { return hammer_gestures_1.HammerGestureConfig; } });
Object.defineProperty(exports, "HammerModule", { enumerable: true, get: function () { return hammer_gestures_1.HammerModule; } });
var dom_sanitization_service_1 = require("./security/dom_sanitization_service");
Object.defineProperty(exports, "DomSanitizer", { enumerable: true, get: function () { return dom_sanitization_service_1.DomSanitizer; } });
var hydration_1 = require("./hydration");
Object.defineProperty(exports, "HydrationFeatureKind", { enumerable: true, get: function () { return hydration_1.HydrationFeatureKind; } });
Object.defineProperty(exports, "provideClientHydration", { enumerable: true, get: function () { return hydration_1.provideClientHydration; } });
Object.defineProperty(exports, "withEventReplay", { enumerable: true, get: function () { return hydration_1.withEventReplay; } });
Object.defineProperty(exports, "withHttpTransferCacheOptions", { enumerable: true, get: function () { return hydration_1.withHttpTransferCacheOptions; } });
Object.defineProperty(exports, "withI18nSupport", { enumerable: true, get: function () { return hydration_1.withI18nSupport; } });
Object.defineProperty(exports, "withNoHttpTransferCache", { enumerable: true, get: function () { return hydration_1.withNoHttpTransferCache; } });
Object.defineProperty(exports, "withIncrementalHydration", { enumerable: true, get: function () { return hydration_1.withIncrementalHydration; } });
__exportStar(require("./private_export"), exports);
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
