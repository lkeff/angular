"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const angular = __importStar(require("../src/angular1"));
const downgrade_component_adapter_1 = require("../src/downgrade_component_adapter");
const common_test_helpers_1 = require("./helpers/common_test_helpers");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('DowngradeComponentAdapter', () => {
        describe('groupNodesBySelector', () => {
            it('should return an array of node collections for each selector', () => {
                const contentNodes = (0, common_test_helpers_1.nodes)('<div class="x"><span>div-1 content</span></div>' +
                    '<input type="number" name="myNum">' +
                    '<input type="date" name="myDate">' +
                    '<span>span content</span>' +
                    '<div class="x"><span>div-2 content</span></div>');
                const selectors = ['input[type=date]', 'span', '.x'];
                const projectableNodes = (0, downgrade_component_adapter_1.groupNodesBySelector)(selectors, contentNodes);
                expect(projectableNodes[0]).toEqual((0, common_test_helpers_1.nodes)('<input type="date" name="myDate">'));
                expect(projectableNodes[1]).toEqual((0, common_test_helpers_1.nodes)('<span>span content</span>'));
                expect(projectableNodes[2]).toEqual((0, common_test_helpers_1.nodes)('<div class="x"><span>div-1 content</span></div>' +
                    '<div class="x"><span>div-2 content</span></div>'));
            });
            it('should collect up unmatched nodes for the wildcard selector', () => {
                const contentNodes = (0, common_test_helpers_1.nodes)('<div class="x"><span>div-1 content</span></div>' +
                    '<input type="number" name="myNum">' +
                    '<input type="date" name="myDate">' +
                    '<span>span content</span>' +
                    '<div class="x"><span>div-2 content</span></div>');
                const selectors = ['.x', '*', 'input[type=date]'];
                const projectableNodes = (0, downgrade_component_adapter_1.groupNodesBySelector)(selectors, contentNodes);
                expect(projectableNodes[0]).toEqual((0, common_test_helpers_1.nodes)('<div class="x"><span>div-1 content</span></div>' +
                    '<div class="x"><span>div-2 content</span></div>'));
                expect(projectableNodes[1]).toEqual((0, common_test_helpers_1.nodes)('<input type="number" name="myNum">' + '<span>span content</span>'));
                expect(projectableNodes[2]).toEqual((0, common_test_helpers_1.nodes)('<input type="date" name="myDate">'));
            });
            it('should return an array of empty arrays if there are no nodes passed in', () => {
                const selectors = ['.x', '*', 'input[type=date]'];
                const projectableNodes = (0, downgrade_component_adapter_1.groupNodesBySelector)(selectors, []);
                expect(projectableNodes).toEqual([[], [], []]);
            });
            it('should return an empty array for each selector that does not match', () => {
                const contentNodes = (0, common_test_helpers_1.nodes)('<div class="x"><span>div-1 content</span></div>' +
                    '<input type="number" name="myNum">' +
                    '<input type="date" name="myDate">' +
                    '<span>span content</span>' +
                    '<div class="x"><span>div-2 content</span></div>');
                const projectableNodes = (0, downgrade_component_adapter_1.groupNodesBySelector)([], contentNodes);
                expect(projectableNodes).toEqual([]);
                const noMatchSelectorNodes = (0, downgrade_component_adapter_1.groupNodesBySelector)(['.not-there'], contentNodes);
                expect(noMatchSelectorNodes).toEqual([[]]);
            });
        });
        describe('testability', () => {
            let adapter;
            let content;
            let compiler;
            let registry;
            let element;
            class mockScope {
                constructor() {
                    this.destroyListeners = [];
                    this.$id = 'mockScope';
                }
                $new() {
                    return this;
                }
                $watch(exp, fn) {
                    return () => { };
                }
                $on(event, fn) {
                    if (event === '$destroy' && fn) {
                        this.destroyListeners.push(fn);
                    }
                    return () => { };
                }
                $destroy() {
                    let listener;
                    while ((listener = this.destroyListeners.shift()))
                        listener();
                }
                $apply(exp) {
                    return () => { };
                }
                $digest() {
                    return () => { };
                }
                $evalAsync(exp, locals) {
                    return () => { };
                }
            }
            function getAdaptor() {
                let attrs = undefined;
                let scope; // mock
                let ngModel = undefined;
                let parentInjector; // testbed
                let $compile = undefined;
                let $parse = undefined;
                let componentFactory; // testbed
                let wrapCallback = (cb) => cb;
                content = `
          <h1> new component </h1>
          <div> a great component </div>
          <comp></comp>
        `;
                element = angular.element(content);
                scope = new mockScope();
                let NewComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NewComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NewComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NewComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NewComponent = _classThis;
                })();
                let NewModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [{ provide: 'hello', useValue: 'component' }],
                            declarations: [NewComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NewModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NewModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NewModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NewModule = _classThis;
                })();
                const modFactory = compiler.compileModuleSync(NewModule);
                const testBedInjector = testing_1.TestBed.inject(core_1.Injector);
                const module = modFactory.create(testBedInjector);
                componentFactory = module.componentFactoryResolver.resolveComponentFactory(NewComponent);
                parentInjector = testBedInjector;
                return new downgrade_component_adapter_1.DowngradeComponentAdapter(element, attrs, scope, ngModel, parentInjector, $compile, $parse, componentFactory, wrapCallback, 
                /* unsafelyOverwriteSignalInputs */ false);
            }
            beforeEach(() => {
                compiler = testing_1.TestBed.inject(core_1.Compiler);
                registry = testing_1.TestBed.inject(core_1.TestabilityRegistry);
                adapter = getAdaptor();
            });
            beforeEach(() => registry.unregisterAllApplications());
            afterEach(() => registry.unregisterAllApplications());
            it('should add testabilities hook when creating components', () => {
                let registry = testing_1.TestBed.inject(core_1.TestabilityRegistry);
                adapter.createComponentAndSetup([]);
                expect(registry.getAllTestabilities().length).toEqual(1);
                adapter = getAdaptor(); // get a new adaptor to creat a new component
                adapter.createComponentAndSetup([]);
                expect(registry.getAllTestabilities().length).toEqual(2);
            });
            it('should remove the testability hook when destroy a component', () => {
                const registry = testing_1.TestBed.inject(core_1.TestabilityRegistry);
                expect(registry.getAllTestabilities().length).toEqual(0);
                adapter.createComponentAndSetup([]);
                expect(registry.getAllTestabilities().length).toEqual(1);
                element.remove();
                expect(registry.getAllTestabilities().length).toEqual(0);
            });
        });
    });
});
