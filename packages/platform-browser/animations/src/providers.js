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
exports.BROWSER_ANIMATIONS_PROVIDERS = exports.BROWSER_NOOP_ANIMATIONS_PROVIDERS = exports.InjectableAnimationEngine = void 0;
exports.instantiateDefaultStyleNormalizer = instantiateDefaultStyleNormalizer;
exports.instantiateRendererFactory = instantiateRendererFactory;
const browser_1 = require("@angular/animations/browser");
const core_1 = require("@angular/core");
const index_1 = require("../../index");
let InjectableAnimationEngine = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = browser_1.ɵAnimationEngine;
    var InjectableAnimationEngine = _classThis = class extends _classSuper {
        // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
        // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
        // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
        constructor(doc, driver, normalizer) {
            super(doc, driver, normalizer);
        }
        ngOnDestroy() {
            this.flush();
        }
    };
    __setFunctionName(_classThis, "InjectableAnimationEngine");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectableAnimationEngine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectableAnimationEngine = _classThis;
})();
exports.InjectableAnimationEngine = InjectableAnimationEngine;
function instantiateDefaultStyleNormalizer() {
    return new browser_1.ɵWebAnimationsStyleNormalizer();
}
function instantiateRendererFactory(renderer, engine, zone) {
    return new browser_1.ɵAnimationRendererFactory(renderer, engine, zone);
}
const SHARED_ANIMATION_PROVIDERS = [
    { provide: browser_1.ɵAnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: browser_1.ɵAnimationEngine, useClass: InjectableAnimationEngine },
    {
        provide: core_1.RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [index_1.ɵDomRendererFactory2, browser_1.ɵAnimationEngine, core_1.NgZone],
    },
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
exports.BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: browser_1.AnimationDriver, useClass: browser_1.NoopAnimationDriver },
    { provide: core_1.ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' },
    ...SHARED_ANIMATION_PROVIDERS,
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
exports.BROWSER_ANIMATIONS_PROVIDERS = [
    // Note: the `ngServerMode` happen inside factories to give the variable time to initialize.
    {
        provide: browser_1.AnimationDriver,
        useFactory: () => typeof ngServerMode !== 'undefined' && ngServerMode
            ? new browser_1.NoopAnimationDriver()
            : new browser_1.ɵWebAnimationsDriver(),
    },
    {
        provide: core_1.ANIMATION_MODULE_TYPE,
        useFactory: () => typeof ngServerMode !== 'undefined' && ngServerMode ? 'NoopAnimations' : 'BrowserAnimations',
    },
    ...SHARED_ANIMATION_PROVIDERS,
];
