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
exports.AnimationDriver = exports.NoopAnimationDriver = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("../../../src/animations");
const core_1 = require("@angular/core");
const shared_1 = require("./shared");
/**
 * @publicApi
 *
 * `AnimationDriver` implentation for Noop animations
 */
let NoopAnimationDriver = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NoopAnimationDriver = _classThis = class {
        /**
         * @returns Whether `prop` is a valid CSS property
         */
        validateStyleProperty(prop) {
            return (0, shared_1.validateStyleProperty)(prop);
        }
        /**
         *
         * @returns Whether elm1 contains elm2.
         */
        containsElement(elm1, elm2) {
            return (0, shared_1.containsElement)(elm1, elm2);
        }
        /**
         * @returns Rhe parent of the given element or `null` if the element is the `document`
         */
        getParentElement(element) {
            return (0, shared_1.getParentElement)(element);
        }
        /**
         * @returns The result of the query selector on the element. The array will contain up to 1 item
         *     if `multi` is  `false`.
         */
        query(element, selector, multi) {
            return (0, shared_1.invokeQuery)(element, selector, multi);
        }
        /**
         * @returns The `defaultValue` or empty string
         */
        computeStyle(element, prop, defaultValue) {
            return defaultValue || '';
        }
        /**
         * @returns An `NoopAnimationPlayer`
         */
        animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
            return new animations_1.NoopAnimationPlayer(duration, delay);
        }
    };
    __setFunctionName(_classThis, "NoopAnimationDriver");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NoopAnimationDriver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NoopAnimationDriver = _classThis;
})();
exports.NoopAnimationDriver = NoopAnimationDriver;
/**
 * @publicApi
 */
class AnimationDriver {
}
exports.AnimationDriver = AnimationDriver;
/**
 * @deprecated Use the NoopAnimationDriver class.
 */
AnimationDriver.NOOP = new NoopAnimationDriver();
