"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerEnvironmentInitializer = exports.INTERNAL_APPLICATION_ERROR_HANDLER = exports.ErrorHandler = void 0;
exports.provideBrowserGlobalErrorListeners = provideBrowserGlobalErrorListeners;
const initializer_token_1 = require("./di/initializer_token");
const injection_token_1 = require("./di/injection_token");
const injector_compatibility_1 = require("./di/injector_compatibility");
const provider_collection_1 = require("./di/provider_collection");
const r3_injector_1 = require("./di/r3_injector");
const document_1 = require("./document");
const destroy_ref_1 = require("./linker/destroy_ref");
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * // Provide in standalone apps
 * bootstrapApplication(AppComponent, {
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 *
 * // Provide in module-based apps
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * @publicApi
 */
class ErrorHandler {
    constructor() {
        /**
         * @internal
         */
        this._console = console;
    }
    handleError(error) {
        this._console.error('ERROR', error);
    }
}
exports.ErrorHandler = ErrorHandler;
/**
 * `InjectionToken` used to configure how to call the `ErrorHandler`.
 */
exports.INTERNAL_APPLICATION_ERROR_HANDLER = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'internal error handler' : '', {
    providedIn: 'root',
    factory: () => {
        // The user's error handler may depend on things that create a circular dependency
        // so we inject it lazily.
        const injector = (0, injector_compatibility_1.inject)(r3_injector_1.EnvironmentInjector);
        let userErrorHandler;
        return (e) => {
            userErrorHandler !== null && userErrorHandler !== void 0 ? userErrorHandler : (userErrorHandler = injector.get(ErrorHandler));
            userErrorHandler.handleError(e);
        };
    },
});
exports.errorHandlerEnvironmentInitializer = {
    provide: initializer_token_1.ENVIRONMENT_INITIALIZER,
    useValue: () => void (0, injector_compatibility_1.inject)(ErrorHandler),
    multi: true,
};
const globalErrorListeners = new injection_token_1.InjectionToken(ngDevMode ? 'GlobalErrorListeners' : '', {
    providedIn: 'root',
    factory: () => {
        if (typeof ngServerMode !== 'undefined' && ngServerMode) {
            return;
        }
        const window = (0, injector_compatibility_1.inject)(document_1.DOCUMENT).defaultView;
        if (!window) {
            return;
        }
        const errorHandler = (0, injector_compatibility_1.inject)(exports.INTERNAL_APPLICATION_ERROR_HANDLER);
        const rejectionListener = (e) => {
            errorHandler(e.reason);
            e.preventDefault();
        };
        const errorListener = (e) => {
            errorHandler(e.error);
            e.preventDefault();
        };
        const setupEventListeners = () => {
            window.addEventListener('unhandledrejection', rejectionListener);
            window.addEventListener('error', errorListener);
        };
        // Angular doesn't have to run change detection whenever any asynchronous tasks are invoked in
        // the scope of this functionality.
        if (typeof Zone !== 'undefined') {
            Zone.root.run(setupEventListeners);
        }
        else {
            setupEventListeners();
        }
        (0, injector_compatibility_1.inject)(destroy_ref_1.DestroyRef).onDestroy(() => {
            window.removeEventListener('error', errorListener);
            window.removeEventListener('unhandledrejection', rejectionListener);
        });
    },
});
/**
 * Provides an environment initializer which forwards unhandled errors to the ErrorHandler.
 *
 * The listeners added are for the window's 'unhandledrejection' and 'error' events.
 *
 * @publicApi
 */
function provideBrowserGlobalErrorListeners() {
    return (0, provider_collection_1.makeEnvironmentProviders)([
        (0, provider_collection_1.provideEnvironmentInitializer)(() => void (0, injector_compatibility_1.inject)(globalErrorListeners)),
    ]);
}
