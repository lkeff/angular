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
exports.DemoAppComponent = void 0;
const core_1 = require("@angular/core");
const zippy_component_1 = require("./zippy.component");
const heavy_component_1 = require("./heavy.component");
const sample_properties_component_1 = require("./sample-properties.component");
const router_1 = require("@angular/router");
let DemoAppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-demo-component',
            templateUrl: './demo-app.component.html',
            styleUrls: ['./demo-app.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            imports: [heavy_component_1.HeavyComponent, sample_properties_component_1.SamplePropertiesComponent, router_1.RouterOutlet],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DemoAppComponent = _classThis = class {
        constructor() {
            this.zippy = (0, core_1.viewChild)(zippy_component_1.ZippyComponent);
            this.elementRef = (0, core_1.viewChild)('elementReference');
            this.inputOne = (0, core_1.input)('input one', { alias: 'input_one' });
            this.inputTwo = (0, core_1.input)('input two');
            this.outputOne = (0, core_1.output)();
            this.outputTwo = (0, core_1.output)({ alias: 'output_two' });
            this.primitiveSignal = (0, core_1.signal)(123);
            this.primitiveComputed = (0, core_1.computed)(() => this.primitiveSignal() ** 2);
            this.objectSignal = (0, core_1.signal)({ name: 'John', age: 40 });
            this.objectComputed = (0, core_1.computed)(() => {
                const original = this.objectSignal();
                return Object.assign(Object.assign({}, original), { age: original.age + 1 });
            });
        }
        getTitle() {
            var _a;
            if (!this.zippy() || !((_a = this.zippy()) === null || _a === void 0 ? void 0 : _a.visible)) {
                return '► Click to expand';
            }
            return '▼ Click to collapse';
        }
    };
    __setFunctionName(_classThis, "DemoAppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemoAppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemoAppComponent = _classThis;
})();
exports.DemoAppComponent = DemoAppComponent;
