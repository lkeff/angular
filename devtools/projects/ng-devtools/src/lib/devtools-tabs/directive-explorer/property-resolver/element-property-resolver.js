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
exports.ElementPropertyResolver = void 0;
const core_1 = require("@angular/core");
const directive_property_resolver_1 = require("./directive-property-resolver");
let ElementPropertyResolver = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ElementPropertyResolver = _classThis = class {
        constructor(_messageBus) {
            this._messageBus = _messageBus;
            this._directivePropertiesController = new Map();
        }
        clearProperties() {
            this._directivePropertiesController = new Map();
        }
        setProperties(indexedNode, data) {
            this._flushDeletedProperties(data);
            Object.keys(data).forEach((key) => {
                const controller = this._directivePropertiesController.get(key);
                if (controller) {
                    controller.updateProperties(data[key]);
                    return;
                }
                const position = {
                    element: indexedNode.position,
                    directive: undefined,
                };
                if (!indexedNode.component || indexedNode.component.name !== key) {
                    position.directive = indexedNode.directives.findIndex((d) => d.name === key);
                }
                this._directivePropertiesController.set(key, new directive_property_resolver_1.DirectivePropertyResolver(this._messageBus, data[key], position));
            });
        }
        _flushDeletedProperties(data) {
            const currentProps = [...this._directivePropertiesController.keys()];
            const incomingProps = new Set(Object.keys(data));
            for (const prop of currentProps) {
                if (!incomingProps.has(prop)) {
                    this._directivePropertiesController.delete(prop);
                }
            }
        }
        getExpandedProperties() {
            const result = {};
            for (const [directive] of this._directivePropertiesController) {
                const controller = this._directivePropertiesController.get(directive);
                if (!controller) {
                    console.error('Unable to find nested properties controller for', directive);
                    continue;
                }
                result[directive] = controller.getExpandedProperties();
            }
            return result;
        }
        getDirectiveController(directive) {
            return this._directivePropertiesController.get(directive);
        }
    };
    __setFunctionName(_classThis, "ElementPropertyResolver");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ElementPropertyResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ElementPropertyResolver = _classThis;
})();
exports.ElementPropertyResolver = ElementPropertyResolver;
