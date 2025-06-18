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
exports.HOST_TAG_NAME = exports.HostAttributeToken = exports.InjectionToken = exports.INJECTOR = exports.ɵɵinvalidFactoryDep = exports.inject = exports.ɵɵinject = exports.ENVIRONMENT_INITIALIZER = exports.provideEnvironmentInitializer = exports.makeEnvironmentProviders = exports.importProvidersFrom = exports.EnvironmentInjector = exports.Injector = exports.Injectable = exports.resolveForwardRef = exports.forwardRef = exports.ɵɵdefineInjector = exports.defineInjectable = exports.ɵɵdefineInjectable = exports.runInInjectionContext = exports.assertInInjectionContext = void 0;
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
__exportStar(require("./metadata"), exports);
var contextual_1 = require("./contextual");
Object.defineProperty(exports, "assertInInjectionContext", { enumerable: true, get: function () { return contextual_1.assertInInjectionContext; } });
Object.defineProperty(exports, "runInInjectionContext", { enumerable: true, get: function () { return contextual_1.runInInjectionContext; } });
var defs_1 = require("./interface/defs");
Object.defineProperty(exports, "\u0275\u0275defineInjectable", { enumerable: true, get: function () { return defs_1.ɵɵdefineInjectable; } });
Object.defineProperty(exports, "defineInjectable", { enumerable: true, get: function () { return defs_1.defineInjectable; } });
Object.defineProperty(exports, "\u0275\u0275defineInjector", { enumerable: true, get: function () { return defs_1.ɵɵdefineInjector; } });
var forward_ref_1 = require("./forward_ref");
Object.defineProperty(exports, "forwardRef", { enumerable: true, get: function () { return forward_ref_1.forwardRef; } });
Object.defineProperty(exports, "resolveForwardRef", { enumerable: true, get: function () { return forward_ref_1.resolveForwardRef; } });
var injectable_1 = require("./injectable");
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return injectable_1.Injectable; } });
var injector_1 = require("./injector");
Object.defineProperty(exports, "Injector", { enumerable: true, get: function () { return injector_1.Injector; } });
var r3_injector_1 = require("./r3_injector");
Object.defineProperty(exports, "EnvironmentInjector", { enumerable: true, get: function () { return r3_injector_1.EnvironmentInjector; } });
var provider_collection_1 = require("./provider_collection");
Object.defineProperty(exports, "importProvidersFrom", { enumerable: true, get: function () { return provider_collection_1.importProvidersFrom; } });
Object.defineProperty(exports, "makeEnvironmentProviders", { enumerable: true, get: function () { return provider_collection_1.makeEnvironmentProviders; } });
Object.defineProperty(exports, "provideEnvironmentInitializer", { enumerable: true, get: function () { return provider_collection_1.provideEnvironmentInitializer; } });
var initializer_token_1 = require("./initializer_token");
Object.defineProperty(exports, "ENVIRONMENT_INITIALIZER", { enumerable: true, get: function () { return initializer_token_1.ENVIRONMENT_INITIALIZER; } });
var injector_compatibility_1 = require("./injector_compatibility");
Object.defineProperty(exports, "\u0275\u0275inject", { enumerable: true, get: function () { return injector_compatibility_1.ɵɵinject; } });
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return injector_compatibility_1.inject; } });
Object.defineProperty(exports, "\u0275\u0275invalidFactoryDep", { enumerable: true, get: function () { return injector_compatibility_1.ɵɵinvalidFactoryDep; } });
var injector_token_1 = require("./injector_token");
Object.defineProperty(exports, "INJECTOR", { enumerable: true, get: function () { return injector_token_1.INJECTOR; } });
var injection_token_1 = require("./injection_token");
Object.defineProperty(exports, "InjectionToken", { enumerable: true, get: function () { return injection_token_1.InjectionToken; } });
var host_attribute_token_1 = require("./host_attribute_token");
Object.defineProperty(exports, "HostAttributeToken", { enumerable: true, get: function () { return host_attribute_token_1.HostAttributeToken; } });
var host_tag_name_token_1 = require("./host_tag_name_token");
Object.defineProperty(exports, "HOST_TAG_NAME", { enumerable: true, get: function () { return host_tag_name_token_1.HOST_TAG_NAME; } });
