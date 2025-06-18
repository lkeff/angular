"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵDomSanitizerImpl = exports.ɵSharedStylesHost = exports.ɵKeyEventsPlugin = exports.ɵHammerGesturesPlugin = exports.ɵDomEventsPlugin = exports.ɵDomRendererFactory2 = exports.ɵBrowserGetTestability = exports.ɵBrowserDomAdapter = exports.ɵgetDOM = void 0;
var common_1 = require("@angular/common");
Object.defineProperty(exports, "\u0275getDOM", { enumerable: true, get: function () { return common_1.ɵgetDOM; } });
var browser_adapter_1 = require("./browser/browser_adapter");
Object.defineProperty(exports, "\u0275BrowserDomAdapter", { enumerable: true, get: function () { return browser_adapter_1.BrowserDomAdapter; } });
var testability_1 = require("./browser/testability");
Object.defineProperty(exports, "\u0275BrowserGetTestability", { enumerable: true, get: function () { return testability_1.BrowserGetTestability; } });
var dom_renderer_1 = require("./dom/dom_renderer");
Object.defineProperty(exports, "\u0275DomRendererFactory2", { enumerable: true, get: function () { return dom_renderer_1.DomRendererFactory2; } });
var dom_events_1 = require("./dom/events/dom_events");
Object.defineProperty(exports, "\u0275DomEventsPlugin", { enumerable: true, get: function () { return dom_events_1.DomEventsPlugin; } });
var hammer_gestures_1 = require("./dom/events/hammer_gestures");
Object.defineProperty(exports, "\u0275HammerGesturesPlugin", { enumerable: true, get: function () { return hammer_gestures_1.HammerGesturesPlugin; } });
var key_events_1 = require("./dom/events/key_events");
Object.defineProperty(exports, "\u0275KeyEventsPlugin", { enumerable: true, get: function () { return key_events_1.KeyEventsPlugin; } });
var shared_styles_host_1 = require("./dom/shared_styles_host");
Object.defineProperty(exports, "\u0275SharedStylesHost", { enumerable: true, get: function () { return shared_styles_host_1.SharedStylesHost; } });
var dom_sanitization_service_1 = require("./security/dom_sanitization_service");
Object.defineProperty(exports, "\u0275DomSanitizerImpl", { enumerable: true, get: function () { return dom_sanitization_service_1.DomSanitizerImpl; } });
