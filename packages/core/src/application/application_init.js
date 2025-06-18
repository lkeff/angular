"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationInitStatus = exports.APP_INITIALIZER = void 0;
exports.provideAppInitializer = provideAppInitializer;
const di_1 = require("../di");
const errors_1 = require("../errors");
const lang_1 = require("../util/lang");
/**
 * A DI token that you can use to provide
 * one or more initialization functions.
 *
 * The provided functions are injected at application startup and executed during
 * app initialization. If any of these functions returns a Promise or an Observable, initialization
 * does not complete until the Promise is resolved or the Observable is completed.
 *
 * You can, for example, create a factory function that loads language data
 * or an external configuration, and provide that function to the `APP_INITIALIZER` token.
 * The function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * @deprecated from v19.0.0, use provideAppInitializer instead
 *
 * @see {@link ApplicationInitStatus}
 * @see {@link provideAppInitializer}
 *
 * @usageNotes
 *
 * The following example illustrates how to configure a multi-provider using `APP_INITIALIZER` token
 * and a function returning a promise.
 * ### Example with NgModule-based application
 * ```ts
 *  function initializeApp(): Promise<any> {
 *    const http = inject(HttpClient);
 *    return firstValueFrom(
 *      http
 *        .get("https://someUrl.com/api/user")
 *        .pipe(tap(user => { ... }))
 *    );
 *  }
 *
 *  @NgModule({
 *   imports: [BrowserModule],
 *   declarations: [AppComponent],
 *   bootstrap: [AppComponent],
 *   providers: [{
 *     provide: APP_INITIALIZER,
 *     useValue: initializeApp,
 *     multi: true,
 *    }]
 *   })
 *  export class AppModule {}
 * ```
 *
 * ### Example with standalone application
 * ```ts
 * function initializeApp() {
 *   const http = inject(HttpClient);
 *   return firstValueFrom(
 *     http
 *       .get("https://someUrl.com/api/user")
 *       .pipe(tap(user => { ... }))
 *   );
 * }
 *
 * bootstrapApplication(App, {
 *   providers: [
 *     provideHttpClient(),
 *     {
 *       provide: APP_INITIALIZER,
 *       useValue: initializeApp,
 *       multi: true,
 *     },
 *   ],
 * });

 * ```
 *
 *
 * It's also possible to configure a multi-provider using `APP_INITIALIZER` token and a function
 * returning an observable, see an example below. Note: the `HttpClient` in this example is used for
 * demo purposes to illustrate how the factory function can work with other providers available
 * through DI.
 *
 * ### Example with NgModule-based application
 * ```ts
 * function initializeApp() {
 *   const http = inject(HttpClient);
 *   return firstValueFrom(
 *     http
 *       .get("https://someUrl.com/api/user")
 *       .pipe(tap(user => { ... }))
 *   );
 * }
 *
 * @NgModule({
 *   imports: [BrowserModule, HttpClientModule],
 *   declarations: [AppComponent],
 *   bootstrap: [AppComponent],
 *   providers: [{
 *     provide: APP_INITIALIZER,
 *     useValue: initializeApp,
 *     multi: true,
 *   }]
 * })
 * export class AppModule {}
 * ```
 *
 * ### Example with standalone application
 * ```ts
 * function initializeApp() {
 *   const http = inject(HttpClient);
 *   return firstValueFrom(
 *     http
 *       .get("https://someUrl.com/api/user")
 *       .pipe(tap(user => { ... }))
 *   );
 * }
 *
 * bootstrapApplication(App, {
 *   providers: [
 *     provideHttpClient(),
 *     {
 *       provide: APP_INITIALIZER,
 *       useValue: initializeApp,
 *       multi: true,
 *     },
 *   ],
 * });
 * ```
 *
 * @publicApi
 */
exports.APP_INITIALIZER = new di_1.InjectionToken(ngDevMode ? 'Application Initializer' : '');
/**
 * @description
 * The provided function is injected at application startup and executed during
 * app initialization. If the function returns a Promise or an Observable, initialization
 * does not complete until the Promise is resolved or the Observable is completed.
 *
 * You can, for example, create a function that loads language data
 * or an external configuration, and provide that function using `provideAppInitializer()`.
 * The function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * Previously, this was achieved using the `APP_INITIALIZER` token which is now deprecated.
 *
 * @see {@link APP_INITIALIZER}
 *
 * @usageNotes
 * The following example illustrates how to configure an initialization function using
 * `provideAppInitializer()`
 * ```ts
 * bootstrapApplication(App, {
 *   providers: [
 *     provideAppInitializer(() => {
 *       const http = inject(HttpClient);
 *       return firstValueFrom(
 *         http
 *           .get("https://someUrl.com/api/user")
 *           .pipe(tap(user => { ... }))
 *       );
 *     }),
 *     provideHttpClient(),
 *   ],
 * });
 * ```
 *
 * @publicApi
 */
function provideAppInitializer(initializerFn) {
    return (0, di_1.makeEnvironmentProviders)([
        {
            provide: exports.APP_INITIALIZER,
            multi: true,
            useValue: initializerFn,
        },
    ]);
}
/**
 * A class that reflects the state of running {@link APP_INITIALIZER} functions.
 *
 * @publicApi
 */
let ApplicationInitStatus = (() => {
    let _classDecorators = [(0, di_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ApplicationInitStatus = _classThis = class {
        constructor() {
            var _a;
            this.initialized = false;
            this.done = false;
            this.donePromise = new Promise((res, rej) => {
                this.resolve = res;
                this.reject = rej;
            });
            this.appInits = (_a = (0, di_1.inject)(exports.APP_INITIALIZER, { optional: true })) !== null && _a !== void 0 ? _a : [];
            this.injector = (0, di_1.inject)(di_1.Injector);
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && !Array.isArray(this.appInits)) {
                throw new errors_1.RuntimeError(-209 /* RuntimeErrorCode.INVALID_MULTI_PROVIDER */, 'Unexpected type of the `APP_INITIALIZER` token value ' +
                    `(expected an array, but got ${typeof this.appInits}). ` +
                    'Please check that the `APP_INITIALIZER` token is configured as a ' +
                    '`multi: true` provider.');
            }
        }
        /** @internal */
        runInitializers() {
            if (this.initialized) {
                return;
            }
            const asyncInitPromises = [];
            for (const appInits of this.appInits) {
                const initResult = (0, di_1.runInInjectionContext)(this.injector, appInits);
                if ((0, lang_1.isPromise)(initResult)) {
                    asyncInitPromises.push(initResult);
                }
                else if ((0, lang_1.isSubscribable)(initResult)) {
                    const observableAsPromise = new Promise((resolve, reject) => {
                        initResult.subscribe({ complete: resolve, error: reject });
                    });
                    asyncInitPromises.push(observableAsPromise);
                }
            }
            const complete = () => {
                // @ts-expect-error overwriting a readonly
                this.done = true;
                this.resolve();
            };
            Promise.all(asyncInitPromises)
                .then(() => {
                complete();
            })
                .catch((e) => {
                this.reject(e);
            });
            if (asyncInitPromises.length === 0) {
                complete();
            }
            this.initialized = true;
        }
    };
    __setFunctionName(_classThis, "ApplicationInitStatus");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApplicationInitStatus = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApplicationInitStatus = _classThis;
})();
exports.ApplicationInitStatus = ApplicationInitStatus;
