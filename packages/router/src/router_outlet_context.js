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
exports.ChildrenOutletContexts = exports.OutletContext = void 0;
const core_1 = require("@angular/core");
const config_1 = require("./utils/config");
/**
 * Store contextual information about a `RouterOutlet`
 *
 * @publicApi
 */
class OutletContext {
    get injector() {
        var _a, _b;
        return (_b = (0, config_1.getClosestRouteInjector)((_a = this.route) === null || _a === void 0 ? void 0 : _a.snapshot)) !== null && _b !== void 0 ? _b : this.rootInjector;
    }
    constructor(rootInjector) {
        this.rootInjector = rootInjector;
        this.outlet = null;
        this.route = null;
        this.attachRef = null;
        this.children = new ChildrenOutletContexts(this.rootInjector);
    }
}
exports.OutletContext = OutletContext;
/**
 * Store contextual information about the children (= nested) `RouterOutlet`
 *
 * @publicApi
 */
let ChildrenOutletContexts = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildrenOutletContexts = _classThis = class {
        /** @nodoc */
        constructor(rootInjector) {
            this.rootInjector = rootInjector;
            // contexts for child outlets, by name.
            this.contexts = new Map();
        }
        /** Called when a `RouterOutlet` directive is instantiated */
        onChildOutletCreated(childName, outlet) {
            const context = this.getOrCreateContext(childName);
            context.outlet = outlet;
            this.contexts.set(childName, context);
        }
        /**
         * Called when a `RouterOutlet` directive is destroyed.
         * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
         * re-created later.
         */
        onChildOutletDestroyed(childName) {
            const context = this.getContext(childName);
            if (context) {
                context.outlet = null;
                context.attachRef = null;
            }
        }
        /**
         * Called when the corresponding route is deactivated during navigation.
         * Because the component get destroyed, all children outlet are destroyed.
         */
        onOutletDeactivated() {
            const contexts = this.contexts;
            this.contexts = new Map();
            return contexts;
        }
        onOutletReAttached(contexts) {
            this.contexts = contexts;
        }
        getOrCreateContext(childName) {
            let context = this.getContext(childName);
            if (!context) {
                context = new OutletContext(this.rootInjector);
                this.contexts.set(childName, context);
            }
            return context;
        }
        getContext(childName) {
            return this.contexts.get(childName) || null;
        }
    };
    __setFunctionName(_classThis, "ChildrenOutletContexts");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildrenOutletContexts = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildrenOutletContexts = _classThis;
})();
exports.ChildrenOutletContexts = ChildrenOutletContexts;
