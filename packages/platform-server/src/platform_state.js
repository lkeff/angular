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
exports.PlatformState = void 0;
exports.enableDomEmulation = enableDomEmulation;
const core_1 = require("@angular/core");
const domino_adapter_1 = require("./domino_adapter");
const tokens_1 = require("./tokens");
/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
let PlatformState = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PlatformState = _classThis = class {
        constructor(_doc) {
            this._doc = _doc;
            /* @internal */
            this._enableDomEmulation = enableDomEmulation((0, core_1.inject)(core_1.Injector));
        }
        /**
         * Renders the current state of the platform to string.
         */
        renderToString() {
            if (ngDevMode && !this._enableDomEmulation && !(window === null || window === void 0 ? void 0 : window.document)) {
                throw new Error('Disabled DOM emulation should only run in browser environments');
            }
            const measuringLabel = 'renderToString';
            (0, core_1.ɵstartMeasuring)(measuringLabel);
            const rendered = this._enableDomEmulation
                ? (0, domino_adapter_1.serializeDocument)(this._doc)
                : // In the case we run/test the platform-server in a browser environment
                    this._doc.documentElement.outerHTML;
            (0, core_1.ɵstopMeasuring)(measuringLabel);
            return rendered;
        }
        /**
         * Returns the current DOM state.
         */
        getDocument() {
            return this._doc;
        }
    };
    __setFunctionName(_classThis, "PlatformState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlatformState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlatformState = _classThis;
})();
exports.PlatformState = PlatformState;
function enableDomEmulation(injector) {
    return injector.get(tokens_1.ENABLE_DOM_EMULATION, true);
}
