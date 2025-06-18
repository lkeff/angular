"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllAppScopedEventListeners = exports.registerAppScopedDispatcher = exports.getAppScopedQueuedEventInfos = exports.clearAppScopedEarlyEventContract = exports.bootstrapAppScopedEarlyEventContract = exports.EventContract = exports.isCaptureEventType = exports.isEarlyEventType = exports.EventInfoWrapper = exports.registerDispatcher = exports.EventPhase = exports.EventDispatcher = exports.EventContractContainer = exports.getActionCache = exports.Attribute = void 0;
var attribute_1 = require("./src/attribute");
Object.defineProperty(exports, "Attribute", { enumerable: true, get: function () { return attribute_1.Attribute; } });
var cache_1 = require("./src/cache");
Object.defineProperty(exports, "getActionCache", { enumerable: true, get: function () { return cache_1.getDefaulted; } });
var event_contract_container_1 = require("./src/event_contract_container");
Object.defineProperty(exports, "EventContractContainer", { enumerable: true, get: function () { return event_contract_container_1.EventContractContainer; } });
var event_dispatcher_1 = require("./src/event_dispatcher");
Object.defineProperty(exports, "EventDispatcher", { enumerable: true, get: function () { return event_dispatcher_1.EventDispatcher; } });
Object.defineProperty(exports, "EventPhase", { enumerable: true, get: function () { return event_dispatcher_1.EventPhase; } });
Object.defineProperty(exports, "registerDispatcher", { enumerable: true, get: function () { return event_dispatcher_1.registerDispatcher; } });
var event_info_1 = require("./src/event_info");
Object.defineProperty(exports, "EventInfoWrapper", { enumerable: true, get: function () { return event_info_1.EventInfoWrapper; } });
var event_type_1 = require("./src/event_type");
Object.defineProperty(exports, "isEarlyEventType", { enumerable: true, get: function () { return event_type_1.isEarlyEventType; } });
Object.defineProperty(exports, "isCaptureEventType", { enumerable: true, get: function () { return event_type_1.isCaptureEventType; } });
var eventcontract_1 = require("./src/eventcontract");
Object.defineProperty(exports, "EventContract", { enumerable: true, get: function () { return eventcontract_1.EventContract; } });
var bootstrap_app_scoped_1 = require("./src/bootstrap_app_scoped");
Object.defineProperty(exports, "bootstrapAppScopedEarlyEventContract", { enumerable: true, get: function () { return bootstrap_app_scoped_1.bootstrapAppScopedEarlyEventContract; } });
Object.defineProperty(exports, "clearAppScopedEarlyEventContract", { enumerable: true, get: function () { return bootstrap_app_scoped_1.clearAppScopedEarlyEventContract; } });
Object.defineProperty(exports, "getAppScopedQueuedEventInfos", { enumerable: true, get: function () { return bootstrap_app_scoped_1.getAppScopedQueuedEventInfos; } });
Object.defineProperty(exports, "registerAppScopedDispatcher", { enumerable: true, get: function () { return bootstrap_app_scoped_1.registerAppScopedDispatcher; } });
Object.defineProperty(exports, "removeAllAppScopedEventListeners", { enumerable: true, get: function () { return bootstrap_app_scoped_1.removeAllAppScopedEventListeners; } });
