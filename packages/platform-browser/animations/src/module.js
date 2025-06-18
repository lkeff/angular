"use strict";
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
exports.NoopAnimationsModule = exports.BrowserAnimationsModule = void 0;
exports.provideAnimations = provideAnimations;
exports.provideNoopAnimations = provideNoopAnimations;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const index_1 = require("../../index");
const providers_1 = require("./providers");
/**
 * Exports `BrowserModule` with additional dependency-injection providers
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
let BrowserAnimationsModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            exports: [index_1.BrowserModule],
            providers: providers_1.BROWSER_ANIMATIONS_PROVIDERS,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BrowserAnimationsModule = _classThis = class {
        /**
         * Configures the module based on the specified object.
         *
         * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
         * @see {@link BrowserAnimationsModuleConfig}
         *
         * @usageNotes
         * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
         * function as follows:
         * ```ts
         * @NgModule({
         *   imports: [BrowserAnimationsModule.withConfig(config)]
         * })
         * class MyNgModule {}
         * ```
         */
        static withConfig(config) {
            return {
                ngModule: BrowserAnimationsModule,
                providers: config.disableAnimations
                    ? providers_1.BROWSER_NOOP_ANIMATIONS_PROVIDERS
                    : providers_1.BROWSER_ANIMATIONS_PROVIDERS,
            };
        }
    };
    __setFunctionName(_classThis, "BrowserAnimationsModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BrowserAnimationsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BrowserAnimationsModule = _classThis;
})();
exports.BrowserAnimationsModule = BrowserAnimationsModule;
/**
 * Returns the set of dependency-injection providers
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to enable animations in an application
 * bootstrapped using the `bootstrapApplication` function. In this scenario there
 * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
 * providers returned by this function to the `providers` list as show below.
 *
 * ```ts
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
function provideAnimations() {
    (0, core_1.ɵperformanceMarkFeature)('NgEagerAnimations');
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideAnimations` call results in app code.
    return [...providers_1.BROWSER_ANIMATIONS_PROVIDERS];
}
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
let NoopAnimationsModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            exports: [index_1.BrowserModule],
            providers: providers_1.BROWSER_NOOP_ANIMATIONS_PROVIDERS,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NoopAnimationsModule = _classThis = class {
    };
    __setFunctionName(_classThis, "NoopAnimationsModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NoopAnimationsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NoopAnimationsModule = _classThis;
})();
exports.NoopAnimationsModule = NoopAnimationsModule;
/**
 * Returns the set of dependency-injection providers
 * to disable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to bootstrap an application using
 * the `bootstrapApplication` function, but you need to disable animations
 * (for example, when running tests).
 *
 * ```ts
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideNoopAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
function provideNoopAnimations() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideNoopAnimations` call results in app code.
    return [...providers_1.BROWSER_NOOP_ANIMATIONS_PROVIDERS];
}
