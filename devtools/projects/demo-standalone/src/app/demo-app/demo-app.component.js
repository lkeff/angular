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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = exports.DemoAppComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const elements_1 = require("@angular/elements");
const router_1 = require("@angular/router");
const ng_devtools_backend_1 = require("ng-devtools-backend");
const zone_unaware_iframe_message_bus_1 = require("../../../../../src/zone-unaware-iframe-message-bus");
const heavy_component_1 = require("./heavy.component");
const zippy_component_1 = require("./zippy.component");
let DemoAppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-demo-component',
            templateUrl: './demo-app.component.html',
            styleUrls: ['./demo-app.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            imports: [heavy_component_1.HeavyComponent, router_1.RouterOutlet, common_1.JsonPipe],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _zippy_decorators;
    let _zippy_initializers = [];
    let _zippy_extraInitializers = [];
    let _elementRef_decorators;
    let _elementRef_initializers = [];
    let _elementRef_extraInitializers = [];
    let _inputOne_decorators;
    let _inputOne_initializers = [];
    let _inputOne_extraInitializers = [];
    let _inputTwo_decorators;
    let _inputTwo_initializers = [];
    let _inputTwo_extraInitializers = [];
    let _outputOne_decorators;
    let _outputOne_initializers = [];
    let _outputOne_extraInitializers = [];
    let _outputTwo_decorators;
    let _outputTwo_initializers = [];
    let _outputTwo_extraInitializers = [];
    var DemoAppComponent = _classThis = class {
        constructor() {
            this.zippy = __runInitializers(this, _zippy_initializers, void 0);
            this.elementRef = (__runInitializers(this, _zippy_extraInitializers), __runInitializers(this, _elementRef_initializers, void 0));
            this.inputOne = (__runInitializers(this, _elementRef_extraInitializers), __runInitializers(this, _inputOne_initializers, 'input one'));
            this.inputTwo = (__runInitializers(this, _inputOne_extraInitializers), __runInitializers(this, _inputTwo_initializers, 'input two'));
            this.outputOne = (__runInitializers(this, _inputTwo_extraInitializers), __runInitializers(this, _outputOne_initializers, new core_1.EventEmitter()));
            this.outputTwo = (__runInitializers(this, _outputOne_extraInitializers), __runInitializers(this, _outputTwo_initializers, new core_1.EventEmitter()));
            this.primitiveSignal = (__runInitializers(this, _outputTwo_extraInitializers), (0, core_1.signal)(123));
            this.primitiveComputed = (0, core_1.computed)(() => this.primitiveSignal() ** 2);
            this.objectSignal = (0, core_1.signal)({ name: 'John', age: 40 });
            this.objectComputed = (0, core_1.computed)(() => {
                const original = this.objectSignal();
                return Object.assign(Object.assign({}, original), { age: original.age + 1 });
            });
            this.test = [(0, core_1.signal)(3)];
            const el = (0, elements_1.createCustomElement)(zippy_component_1.ZippyComponent, { injector: (0, core_1.inject)(core_1.Injector) });
            customElements.define('app-zippy', el);
        }
        getTitle() {
            if (!this.zippy || !this.zippy.visible) {
                return '► Click to expand';
            }
            return '▼ Click to collapse';
        }
    };
    __setFunctionName(_classThis, "DemoAppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _zippy_decorators = [(0, core_1.ViewChild)(zippy_component_1.ZippyComponent)];
        _elementRef_decorators = [(0, core_1.ViewChild)('elementReference')];
        _inputOne_decorators = [(0, core_1.Input)('input_one')];
        _inputTwo_decorators = [(0, core_1.Input)()];
        _outputOne_decorators = [(0, core_1.Output)()];
        _outputTwo_decorators = [(0, core_1.Output)('output_two')];
        __esDecorate(null, null, _zippy_decorators, { kind: "field", name: "zippy", static: false, private: false, access: { has: obj => "zippy" in obj, get: obj => obj.zippy, set: (obj, value) => { obj.zippy = value; } }, metadata: _metadata }, _zippy_initializers, _zippy_extraInitializers);
        __esDecorate(null, null, _elementRef_decorators, { kind: "field", name: "elementRef", static: false, private: false, access: { has: obj => "elementRef" in obj, get: obj => obj.elementRef, set: (obj, value) => { obj.elementRef = value; } }, metadata: _metadata }, _elementRef_initializers, _elementRef_extraInitializers);
        __esDecorate(null, null, _inputOne_decorators, { kind: "field", name: "inputOne", static: false, private: false, access: { has: obj => "inputOne" in obj, get: obj => obj.inputOne, set: (obj, value) => { obj.inputOne = value; } }, metadata: _metadata }, _inputOne_initializers, _inputOne_extraInitializers);
        __esDecorate(null, null, _inputTwo_decorators, { kind: "field", name: "inputTwo", static: false, private: false, access: { has: obj => "inputTwo" in obj, get: obj => obj.inputTwo, set: (obj, value) => { obj.inputTwo = value; } }, metadata: _metadata }, _inputTwo_initializers, _inputTwo_extraInitializers);
        __esDecorate(null, null, _outputOne_decorators, { kind: "field", name: "outputOne", static: false, private: false, access: { has: obj => "outputOne" in obj, get: obj => obj.outputOne, set: (obj, value) => { obj.outputOne = value; } }, metadata: _metadata }, _outputOne_initializers, _outputOne_extraInitializers);
        __esDecorate(null, null, _outputTwo_decorators, { kind: "field", name: "outputTwo", static: false, private: false, access: { has: obj => "outputTwo" in obj, get: obj => obj.outputTwo, set: (obj, value) => { obj.outputTwo = value; } }, metadata: _metadata }, _outputTwo_initializers, _outputTwo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemoAppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemoAppComponent = _classThis;
})();
exports.DemoAppComponent = DemoAppComponent;
exports.ROUTES = [
    {
        path: '',
        component: DemoAppComponent,
        children: [
            {
                path: '',
                loadChildren: () => Promise.resolve().then(() => __importStar(require('./todo/todo-app.component'))).then((m) => m.ROUTES),
            },
        ],
    },
];
(0, ng_devtools_backend_1.initializeMessageBus)(new zone_unaware_iframe_message_bus_1.ZoneUnawareIFrameMessageBus('angular-devtools-backend', 'angular-devtools', () => window.parent));
