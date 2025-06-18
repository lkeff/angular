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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityContext = exports.provideBrowserGlobalErrorListeners = exports.ErrorHandler = exports.EventEmitter = exports.Type = exports.ApplicationModule = exports.MissingTranslationStrategy = exports.DEFAULT_CURRENCY_CODE = exports.LOCALE_ID = exports.TRANSLATIONS_FORMAT = exports.TRANSLATIONS = exports.setTestabilityGetter = exports.TestabilityRegistry = exports.Testability = exports.getDebugNode = exports.asNativeElements = exports.DebugNode = exports.DebugEventListener = exports.DebugElement = exports.provideAppInitializer = exports.ApplicationInitStatus = exports.APP_INITIALIZER = exports.CSP_NONCE = exports.ANIMATION_MODULE_TYPE = exports.PLATFORM_ID = exports.PLATFORM_INITIALIZER = exports.PACKAGE_ROOT_URL = exports.APP_ID = exports.isDevMode = exports.enableProdMode = exports.provideCheckNoChangesConfig = exports.PendingTasks = exports.provideZonelessChangeDetection = exports.provideZoneChangeDetection = exports.providePlatformInitializer = exports.getPlatform = exports.destroyPlatform = exports.assertPlatform = exports.createPlatformFactory = exports.createPlatform = exports.PlatformRef = exports.APP_BOOTSTRAP_LISTENER = exports.NgProbeToken = exports.ApplicationRef = exports.model = exports.viewChildren = exports.viewChild = exports.contentChildren = exports.contentChild = exports.input = void 0;
exports.provideNgReflectAttributes = exports.DOCUMENT = exports.RESPONSE_INIT = exports.REQUEST_CONTEXT = exports.REQUEST = exports.numberAttribute = exports.booleanAttribute = exports.TransferState = exports.makeStateKey = exports.mergeApplicationConfig = exports.twoWayBinding = exports.outputBinding = exports.inputBinding = exports.afterNextRender = exports.afterEveryRender = exports.ɵpublishExternalGlobalUtil = exports.isStandalone = exports.reflectComponentType = exports.createComponent = exports.createEnvironmentInjector = exports.createNgModuleRef = exports.createNgModule = exports.Sanitizer = void 0;
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
__exportStar(require("./authoring"), exports);
// Authoring functions are exported separately as this file is exempted from
// JSCompiler's conformance requirement for inferred const exports. See:
// https://docs.google.com/document/d/1RXb1wYwsbJotO1KBgSDsAtKpduGmIHod9ADxuXcAvV4/edit?tab=t.0
var input_1 = require("./authoring/input/input");
Object.defineProperty(exports, "input", { enumerable: true, get: function () { return input_1.input; } });
var queries_1 = require("./authoring/queries");
Object.defineProperty(exports, "contentChild", { enumerable: true, get: function () { return queries_1.contentChild; } });
Object.defineProperty(exports, "contentChildren", { enumerable: true, get: function () { return queries_1.contentChildren; } });
Object.defineProperty(exports, "viewChild", { enumerable: true, get: function () { return queries_1.viewChild; } });
Object.defineProperty(exports, "viewChildren", { enumerable: true, get: function () { return queries_1.viewChildren; } });
var model_1 = require("./authoring/model/model");
Object.defineProperty(exports, "model", { enumerable: true, get: function () { return model_1.model; } });
__exportStar(require("./metadata"), exports);
__exportStar(require("./version"), exports);
__exportStar(require("./di"), exports);
var application_ref_1 = require("./application/application_ref");
Object.defineProperty(exports, "ApplicationRef", { enumerable: true, get: function () { return application_ref_1.ApplicationRef; } });
Object.defineProperty(exports, "NgProbeToken", { enumerable: true, get: function () { return application_ref_1.NgProbeToken; } });
Object.defineProperty(exports, "APP_BOOTSTRAP_LISTENER", { enumerable: true, get: function () { return application_ref_1.APP_BOOTSTRAP_LISTENER; } });
var platform_ref_1 = require("./platform/platform_ref");
Object.defineProperty(exports, "PlatformRef", { enumerable: true, get: function () { return platform_ref_1.PlatformRef; } });
var platform_1 = require("./platform/platform");
Object.defineProperty(exports, "createPlatform", { enumerable: true, get: function () { return platform_1.createPlatform; } });
Object.defineProperty(exports, "createPlatformFactory", { enumerable: true, get: function () { return platform_1.createPlatformFactory; } });
Object.defineProperty(exports, "assertPlatform", { enumerable: true, get: function () { return platform_1.assertPlatform; } });
Object.defineProperty(exports, "destroyPlatform", { enumerable: true, get: function () { return platform_1.destroyPlatform; } });
Object.defineProperty(exports, "getPlatform", { enumerable: true, get: function () { return platform_1.getPlatform; } });
Object.defineProperty(exports, "providePlatformInitializer", { enumerable: true, get: function () { return platform_1.providePlatformInitializer; } });
var ng_zone_scheduling_1 = require("./change_detection/scheduling/ng_zone_scheduling");
Object.defineProperty(exports, "provideZoneChangeDetection", { enumerable: true, get: function () { return ng_zone_scheduling_1.provideZoneChangeDetection; } });
var zoneless_scheduling_impl_1 = require("./change_detection/scheduling/zoneless_scheduling_impl");
Object.defineProperty(exports, "provideZonelessChangeDetection", { enumerable: true, get: function () { return zoneless_scheduling_impl_1.provideZonelessChangeDetection; } });
var pending_tasks_1 = require("./pending_tasks");
Object.defineProperty(exports, "PendingTasks", { enumerable: true, get: function () { return pending_tasks_1.PendingTasks; } });
var provide_check_no_changes_config_1 = require("./change_detection/provide_check_no_changes_config");
Object.defineProperty(exports, "provideCheckNoChangesConfig", { enumerable: true, get: function () { return provide_check_no_changes_config_1.provideCheckNoChangesConfig; } });
var is_dev_mode_1 = require("./util/is_dev_mode");
Object.defineProperty(exports, "enableProdMode", { enumerable: true, get: function () { return is_dev_mode_1.enableProdMode; } });
Object.defineProperty(exports, "isDevMode", { enumerable: true, get: function () { return is_dev_mode_1.isDevMode; } });
var application_tokens_1 = require("./application/application_tokens");
Object.defineProperty(exports, "APP_ID", { enumerable: true, get: function () { return application_tokens_1.APP_ID; } });
Object.defineProperty(exports, "PACKAGE_ROOT_URL", { enumerable: true, get: function () { return application_tokens_1.PACKAGE_ROOT_URL; } });
Object.defineProperty(exports, "PLATFORM_INITIALIZER", { enumerable: true, get: function () { return application_tokens_1.PLATFORM_INITIALIZER; } });
Object.defineProperty(exports, "PLATFORM_ID", { enumerable: true, get: function () { return application_tokens_1.PLATFORM_ID; } });
Object.defineProperty(exports, "ANIMATION_MODULE_TYPE", { enumerable: true, get: function () { return application_tokens_1.ANIMATION_MODULE_TYPE; } });
Object.defineProperty(exports, "CSP_NONCE", { enumerable: true, get: function () { return application_tokens_1.CSP_NONCE; } });
var application_init_1 = require("./application/application_init");
Object.defineProperty(exports, "APP_INITIALIZER", { enumerable: true, get: function () { return application_init_1.APP_INITIALIZER; } });
Object.defineProperty(exports, "ApplicationInitStatus", { enumerable: true, get: function () { return application_init_1.ApplicationInitStatus; } });
Object.defineProperty(exports, "provideAppInitializer", { enumerable: true, get: function () { return application_init_1.provideAppInitializer; } });
__exportStar(require("./zone"), exports);
__exportStar(require("./render"), exports);
__exportStar(require("./linker"), exports);
__exportStar(require("./linker/ng_module_factory_loader_impl"), exports);
var debug_node_1 = require("./debug/debug_node");
Object.defineProperty(exports, "DebugElement", { enumerable: true, get: function () { return debug_node_1.DebugElement; } });
Object.defineProperty(exports, "DebugEventListener", { enumerable: true, get: function () { return debug_node_1.DebugEventListener; } });
Object.defineProperty(exports, "DebugNode", { enumerable: true, get: function () { return debug_node_1.DebugNode; } });
Object.defineProperty(exports, "asNativeElements", { enumerable: true, get: function () { return debug_node_1.asNativeElements; } });
Object.defineProperty(exports, "getDebugNode", { enumerable: true, get: function () { return debug_node_1.getDebugNode; } });
var testability_1 = require("./testability/testability");
Object.defineProperty(exports, "Testability", { enumerable: true, get: function () { return testability_1.Testability; } });
Object.defineProperty(exports, "TestabilityRegistry", { enumerable: true, get: function () { return testability_1.TestabilityRegistry; } });
Object.defineProperty(exports, "setTestabilityGetter", { enumerable: true, get: function () { return testability_1.setTestabilityGetter; } });
__exportStar(require("./change_detection"), exports);
__exportStar(require("./platform/platform_core_providers"), exports);
var tokens_1 = require("./i18n/tokens");
Object.defineProperty(exports, "TRANSLATIONS", { enumerable: true, get: function () { return tokens_1.TRANSLATIONS; } });
Object.defineProperty(exports, "TRANSLATIONS_FORMAT", { enumerable: true, get: function () { return tokens_1.TRANSLATIONS_FORMAT; } });
Object.defineProperty(exports, "LOCALE_ID", { enumerable: true, get: function () { return tokens_1.LOCALE_ID; } });
Object.defineProperty(exports, "DEFAULT_CURRENCY_CODE", { enumerable: true, get: function () { return tokens_1.DEFAULT_CURRENCY_CODE; } });
Object.defineProperty(exports, "MissingTranslationStrategy", { enumerable: true, get: function () { return tokens_1.MissingTranslationStrategy; } });
var application_module_1 = require("./application/application_module");
Object.defineProperty(exports, "ApplicationModule", { enumerable: true, get: function () { return application_module_1.ApplicationModule; } });
var type_1 = require("./interface/type");
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return type_1.Type; } });
var event_emitter_1 = require("./event_emitter");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return event_emitter_1.EventEmitter; } });
var error_handler_1 = require("./error_handler");
Object.defineProperty(exports, "ErrorHandler", { enumerable: true, get: function () { return error_handler_1.ErrorHandler; } });
Object.defineProperty(exports, "provideBrowserGlobalErrorListeners", { enumerable: true, get: function () { return error_handler_1.provideBrowserGlobalErrorListeners; } });
__exportStar(require("./core_private_export"), exports);
__exportStar(require("./core_render3_private_export"), exports);
__exportStar(require("./core_reactivity_export"), exports);
__exportStar(require("./resource"), exports);
var security_1 = require("./sanitization/security");
Object.defineProperty(exports, "SecurityContext", { enumerable: true, get: function () { return security_1.SecurityContext; } });
var sanitizer_1 = require("./sanitization/sanitizer");
Object.defineProperty(exports, "Sanitizer", { enumerable: true, get: function () { return sanitizer_1.Sanitizer; } });
var ng_module_ref_1 = require("./render3/ng_module_ref");
Object.defineProperty(exports, "createNgModule", { enumerable: true, get: function () { return ng_module_ref_1.createNgModule; } });
Object.defineProperty(exports, "createNgModuleRef", { enumerable: true, get: function () { return ng_module_ref_1.createNgModuleRef; } });
Object.defineProperty(exports, "createEnvironmentInjector", { enumerable: true, get: function () { return ng_module_ref_1.createEnvironmentInjector; } });
var component_1 = require("./render3/component");
Object.defineProperty(exports, "createComponent", { enumerable: true, get: function () { return component_1.createComponent; } });
Object.defineProperty(exports, "reflectComponentType", { enumerable: true, get: function () { return component_1.reflectComponentType; } });
var def_getters_1 = require("./render3/def_getters");
Object.defineProperty(exports, "isStandalone", { enumerable: true, get: function () { return def_getters_1.isStandalone; } });
var global_utils_1 = require("./render3/util/global_utils");
Object.defineProperty(exports, "\u0275publishExternalGlobalUtil", { enumerable: true, get: function () { return global_utils_1.publishExternalGlobalUtil; } });
var hooks_1 = require("./render3/after_render/hooks");
Object.defineProperty(exports, "afterEveryRender", { enumerable: true, get: function () { return hooks_1.afterEveryRender; } });
Object.defineProperty(exports, "afterNextRender", { enumerable: true, get: function () { return hooks_1.afterNextRender; } });
var dynamic_bindings_1 = require("./render3/dynamic_bindings");
Object.defineProperty(exports, "inputBinding", { enumerable: true, get: function () { return dynamic_bindings_1.inputBinding; } });
Object.defineProperty(exports, "outputBinding", { enumerable: true, get: function () { return dynamic_bindings_1.outputBinding; } });
Object.defineProperty(exports, "twoWayBinding", { enumerable: true, get: function () { return dynamic_bindings_1.twoWayBinding; } });
var application_config_1 = require("./application/application_config");
Object.defineProperty(exports, "mergeApplicationConfig", { enumerable: true, get: function () { return application_config_1.mergeApplicationConfig; } });
var transfer_state_1 = require("./transfer_state");
Object.defineProperty(exports, "makeStateKey", { enumerable: true, get: function () { return transfer_state_1.makeStateKey; } });
Object.defineProperty(exports, "TransferState", { enumerable: true, get: function () { return transfer_state_1.TransferState; } });
var coercion_1 = require("./util/coercion");
Object.defineProperty(exports, "booleanAttribute", { enumerable: true, get: function () { return coercion_1.booleanAttribute; } });
Object.defineProperty(exports, "numberAttribute", { enumerable: true, get: function () { return coercion_1.numberAttribute; } });
var platform_tokens_1 = require("./application/platform_tokens");
Object.defineProperty(exports, "REQUEST", { enumerable: true, get: function () { return platform_tokens_1.REQUEST; } });
Object.defineProperty(exports, "REQUEST_CONTEXT", { enumerable: true, get: function () { return platform_tokens_1.REQUEST_CONTEXT; } });
Object.defineProperty(exports, "RESPONSE_INIT", { enumerable: true, get: function () { return platform_tokens_1.RESPONSE_INIT; } });
var document_1 = require("./document");
Object.defineProperty(exports, "DOCUMENT", { enumerable: true, get: function () { return document_1.DOCUMENT; } });
var ng_reflect_1 = require("./ng_reflect");
Object.defineProperty(exports, "provideNgReflectAttributes", { enumerable: true, get: function () { return ng_reflect_1.provideNgReflectAttributes; } });
const global_1 = require("./util/global");
if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    // This helper is to give a reasonable error message to people upgrading to v9 that have not yet
    // installed `@angular/localize` in their app.
    // tslint:disable-next-line: no-toplevel-property-access
    (_a = global_1.global.$localize) !== null && _a !== void 0 ? _a : (global_1.global.$localize = function () {
        throw new Error('It looks like your application or one of its dependencies is using i18n.\n' +
            'Angular 9 introduced a global `$localize()` function that needs to be loaded.\n' +
            'Please run `ng add @angular/localize` from the Angular CLI.\n' +
            "(For non-CLI projects, add `import '@angular/localize/init';` to your `polyfills.ts` file.\n" +
            'For server-side rendering applications add the import to your `main.server.ts` file.)');
    });
}
