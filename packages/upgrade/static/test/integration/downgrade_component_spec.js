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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const static_1 = require("../../../static");
const angular = __importStar(require("../../../src/common/src/angular1"));
const constants_1 = require("../../../src/common/src/constants");
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const static_test_helpers_1 = require("./static_test_helpers");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('downgrade ng2 component', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        it('should bind properties, events', (0, testing_1.waitForAsync)(() => {
            const ng1Module = angular.module_('ng1', []).run(($rootScope) => {
                $rootScope['name'] = 'world';
                $rootScope['dataA'] = 'A';
                $rootScope['dataB'] = 'B';
                $rootScope['modelA'] = 'initModelA';
                $rootScope['modelB'] = 'initModelB';
                $rootScope['eventA'] = '?';
                $rootScope['eventB'] = '?';
            });
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        inputs: ['literal', 'interpolate', 'oneWayA', 'oneWayB', 'twoWayA', 'twoWayB'],
                        outputs: [
                            'eventA',
                            'eventB',
                            'twoWayAEmitter: twoWayAChange',
                            'twoWayBEmitter: twoWayBChange',
                        ],
                        template: 'ignore: {{ignore}}; ' +
                            'literal: {{literal}}; interpolate: {{interpolate}}; ' +
                            'oneWayA: {{oneWayA}}; oneWayB: {{oneWayB}}; ' +
                            'twoWayA: {{twoWayA}}; twoWayB: {{twoWayB}}; ({{ngOnChangesCount}})',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.ngOnChangesCount = 0;
                        this.ignore = '-';
                        this.literal = '?';
                        this.interpolate = '?';
                        this.oneWayA = '?';
                        this.oneWayB = '?';
                        this.twoWayA = '?';
                        this.twoWayB = '?';
                        this.eventA = new core_1.EventEmitter();
                        this.eventB = new core_1.EventEmitter();
                        this.twoWayAEmitter = new core_1.EventEmitter();
                        this.twoWayBEmitter = new core_1.EventEmitter();
                    }
                    ngOnChanges(changes) {
                        const assert = (prop, value) => {
                            const propVal = this[prop];
                            if (propVal != value) {
                                throw new Error(`Expected: '${prop}' to be '${value}' but was '${propVal}'`);
                            }
                        };
                        const assertChange = (prop, value) => {
                            assert(prop, value);
                            if (!changes[prop]) {
                                throw new Error(`Changes record for '${prop}' not found.`);
                            }
                            const actualValue = changes[prop].currentValue;
                            if (actualValue != value) {
                                throw new Error(`Expected changes record for'${prop}' to be '${value}' but was '${actualValue}'`);
                            }
                        };
                        switch (this.ngOnChangesCount++) {
                            case 0:
                                assert('ignore', '-');
                                assertChange('literal', 'Text');
                                assertChange('interpolate', 'Hello world');
                                assertChange('oneWayA', 'A');
                                assertChange('oneWayB', 'B');
                                assertChange('twoWayA', 'initModelA');
                                assertChange('twoWayB', 'initModelB');
                                this.twoWayAEmitter.emit('newA');
                                this.twoWayBEmitter.emit('newB');
                                this.eventA.emit('aFired');
                                this.eventB.emit('bFired');
                                break;
                            case 1:
                                assertChange('twoWayA', 'newA');
                                assertChange('twoWayB', 'newB');
                                break;
                            case 2:
                                assertChange('interpolate', 'Hello everyone');
                                break;
                            default:
                                throw new Error('Called too many times! ' + JSON.stringify(changes));
                        }
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            ng1Module.directive('ng2', (0, static_1.downgradeComponent)({
                component: Ng2Component,
            }));
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const element = (0, common_test_helpers_1.html)(`
           <div>
             <ng2 literal="Text" interpolate="Hello {{name}}"
                 bind-one-way-a="dataA" [one-way-b]="dataB"
                 bindon-two-way-a="modelA" [(two-way-b)]="modelB"
                 on-event-a='eventA=$event' (event-b)="eventB=$event"></ng2>
             | modelA: {{modelA}}; modelB: {{modelB}}; eventA: {{eventA}}; eventB: {{eventB}};
           </div>`);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ignore: -; ' +
                    'literal: Text; interpolate: Hello world; ' +
                    'oneWayA: A; oneWayB: B; twoWayA: newA; twoWayB: newB; (2) | ' +
                    'modelA: newA; modelB: newB; eventA: aFired; eventB: bFired;');
                (0, static_test_helpers_1.$apply)(upgrade, 'name = "everyone"');
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ignore: -; ' +
                    'literal: Text; interpolate: Hello everyone; ' +
                    'oneWayA: A; oneWayB: B; twoWayA: newA; twoWayB: newB; (3) | ' +
                    'modelA: newA; modelB: newB; eventA: aFired; eventB: bFired;');
            });
        }));
        it('should bind properties to signal inputs', (0, testing_1.waitForAsync)(() => {
            const ng1Module = angular.module_('ng1', []).run(($rootScope) => {
                $rootScope['name'] = 'world';
            });
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        inputs: ['message'],
                        template: 'Message: {{message()}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.message = (0, core_1.input)('');
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            // Hack to wire up the `input()` signal correctly, since our JIT tests don't run with the
            // transform which supports `input()`.
            Ng2Component.ɵcmp.inputs.message = ['message', /* InputFlags.SignalBased */ 1];
            ng1Module.directive('ng2', (0, static_1.downgradeComponent)({
                component: Ng2Component,
            }));
            const element = (0, common_test_helpers_1.html)(`
        <div>
          <ng2 literal="Text" message="Hello {{name}}"></ng2>
        </div>`);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('Message: Hello world');
                (0, static_test_helpers_1.$apply)(upgrade, 'name = "everyone"');
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('Message: Hello everyone');
            });
        }));
        it('should bind properties to onpush components', (0, testing_1.waitForAsync)(() => {
            const ng1Module = angular.module_('ng1', []).run(($rootScope) => {
                $rootScope['dataB'] = 'B';
            });
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        inputs: ['oneWayB'],
                        template: 'oneWayB: {{oneWayB}}',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.ngOnChangesCount = 0;
                        this.oneWayB = '?';
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            ng1Module.directive('ng2', (0, static_1.downgradeComponent)({
                component: Ng2Component,
            }));
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const element = (0, common_test_helpers_1.html)(`
          <div>
            <ng2 [one-way-b]="dataB"></ng2>
          </div>`);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('oneWayB: B');
                (0, static_test_helpers_1.$apply)(upgrade, 'dataB= "everyone"');
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('oneWayB: everyone');
            });
        }));
        it('should support two-way binding and event listener', (0, testing_1.waitForAsync)(() => {
            const listenerSpy = jasmine.createSpy('$rootScope.listener');
            const ng1Module = angular.module_('ng1', []).run(($rootScope) => {
                $rootScope['value'] = 'world';
                $rootScope['listener'] = listenerSpy;
            });
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: `model: {{ model }};`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _model_decorators;
                let _model_initializers = [];
                let _model_extraInitializers = [];
                let _modelChange_decorators;
                let _modelChange_initializers = [];
                let _modelChange_extraInitializers = [];
                var Ng2Component = _classThis = class {
                    ngOnChanges(changes) {
                        switch (this.ngOnChangesCount++) {
                            case 0:
                                expect(changes['model'].currentValue).toBe('world');
                                this.modelChange.emit('newC');
                                break;
                            case 1:
                                expect(changes['model'].currentValue).toBe('newC');
                                break;
                            default:
                                throw new Error('Called too many times! ' + JSON.stringify(changes));
                        }
                    }
                    constructor() {
                        this.ngOnChangesCount = 0;
                        this.model = __runInitializers(this, _model_initializers, '?');
                        this.modelChange = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _modelChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _modelChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _model_decorators = [(0, core_1.Input)()];
                    _modelChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
                    __esDecorate(null, null, _modelChange_decorators, { kind: "field", name: "modelChange", static: false, private: false, access: { has: obj => "modelChange" in obj, get: obj => obj.modelChange, set: (obj, value) => { obj.modelChange = value; } }, metadata: _metadata }, _modelChange_initializers, _modelChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            ng1Module.directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const element = (0, common_test_helpers_1.html)(`
          <div>
            <ng2 [(model)]="value" (model-change)="listener($event)"></ng2>
            | value: {{value}}
          </div>
        `);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toEqual('model: newC; | value: newC');
                expect(listenerSpy).toHaveBeenCalledWith('newC');
            });
        }));
        it('should run change-detection on every digest (by default)', (0, testing_1.waitForAsync)(() => {
            let ng2Component;
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '{{ value1 }} | {{ value2 }}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value1_decorators;
                let _value1_initializers = [];
                let _value1_extraInitializers = [];
                let _value2_decorators;
                let _value2_initializers = [];
                let _value2_extraInitializers = [];
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.value1 = __runInitializers(this, _value1_initializers, -1);
                        this.value2 = (__runInitializers(this, _value1_extraInitializers), __runInitializers(this, _value2_initializers, -1));
                        __runInitializers(this, _value2_extraInitializers);
                        ng2Component = this;
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value1_decorators = [(0, core_1.Input)()];
                    _value2_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value1_decorators, { kind: "field", name: "value1", static: false, private: false, access: { has: obj => "value1" in obj, get: obj => obj.value1, set: (obj, value) => { obj.value1 = value; } }, metadata: _metadata }, _value1_initializers, _value1_extraInitializers);
                    __esDecorate(null, null, _value2_decorators, { kind: "field", name: "value2", static: false, private: false, access: { has: obj => "value2" in obj, get: obj => obj.value2, set: (obj, value) => { obj.value2 = value; } }, metadata: _metadata }, _value2_initializers, _value2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }))
                .run(($rootScope) => {
                $rootScope['value1'] = 0;
                $rootScope['value2'] = 0;
            });
            const element = (0, common_test_helpers_1.html)('<ng2 [value1]="value1" value2="{{ value2 }}"></ng2>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const $rootScope = upgrade.$injector.get('$rootScope');
                expect(element.textContent).toBe('0 | 0');
                // Digest should invoke CD
                $rootScope.$digest();
                $rootScope.$digest();
                expect(element.textContent).toBe('0 | 0');
                // Internal changes should be detected on digest
                ng2Component.value1 = 1;
                ng2Component.value2 = 2;
                $rootScope.$digest();
                expect(element.textContent).toBe('1 | 2');
                // Digest should propagate change in prop-bound input
                $rootScope.$apply('value1 = 3');
                expect(element.textContent).toBe('3 | 2');
                // Digest should propagate change in attr-bound input
                ng2Component.value1 = 4;
                $rootScope.$apply('value2 = 5');
                expect(element.textContent).toBe('4 | 5');
                // Digest should propagate changes that happened before the digest
                $rootScope['value1'] = 6;
                expect(element.textContent).toBe('4 | 5');
                $rootScope.$digest();
                expect(element.textContent).toBe('6 | 5');
            });
        }));
        it('should not run change-detection on every digest when opted out', (0, testing_1.waitForAsync)(() => {
            let ng2Component;
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '{{ value1 }} | {{ value2 }}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value1_decorators;
                let _value1_initializers = [];
                let _value1_extraInitializers = [];
                let _value2_decorators;
                let _value2_initializers = [];
                let _value2_extraInitializers = [];
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.value1 = __runInitializers(this, _value1_initializers, -1);
                        this.value2 = (__runInitializers(this, _value1_extraInitializers), __runInitializers(this, _value2_initializers, -1));
                        __runInitializers(this, _value2_extraInitializers);
                        ng2Component = this;
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value1_decorators = [(0, core_1.Input)()];
                    _value2_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value1_decorators, { kind: "field", name: "value1", static: false, private: false, access: { has: obj => "value1" in obj, get: obj => obj.value1, set: (obj, value) => { obj.value1 = value; } }, metadata: _metadata }, _value1_initializers, _value1_extraInitializers);
                    __esDecorate(null, null, _value2_decorators, { kind: "field", name: "value2", static: false, private: false, access: { has: obj => "value2" in obj, get: obj => obj.value2, set: (obj, value) => { obj.value2 = value; } }, metadata: _metadata }, _value2_initializers, _value2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest: false }))
                .run(($rootScope) => {
                $rootScope['value1'] = 0;
                $rootScope['value2'] = 0;
            });
            const element = (0, common_test_helpers_1.html)('<ng2 [value1]="value1" value2="{{ value2 }}"></ng2>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const $rootScope = upgrade.$injector.get('$rootScope');
                expect(element.textContent).toBe('0 | 0');
                // Digest should not invoke CD
                $rootScope.$digest();
                $rootScope.$digest();
                expect(element.textContent).toBe('0 | 0');
                // Digest should not invoke CD, even if component values have changed (internally)
                ng2Component.value1 = 1;
                ng2Component.value2 = 2;
                $rootScope.$digest();
                expect(element.textContent).toBe('0 | 0');
                // Digest should invoke CD, if prop-bound input has changed
                $rootScope.$apply('value1 = 3');
                expect(element.textContent).toBe('3 | 2');
                // Digest should invoke CD, if attr-bound input has changed
                ng2Component.value1 = 4;
                $rootScope.$apply('value2 = 5');
                expect(element.textContent).toBe('4 | 5');
                // Digest should invoke CD, if input has changed before the digest
                $rootScope['value1'] = 6;
                $rootScope.$digest();
                expect(element.textContent).toBe('6 | 5');
            });
        }));
        it('should still run normal Angular change-detection regardless of `propagateDigest`', (0, testing_1.fakeAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '{{ value }}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.value = 'foo';
                        setTimeout(() => (this.value = 'bar'), 1000);
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2A', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest: true }))
                .directive('ng2B', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest: false }));
            const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a> | <ng2-b></ng2-b>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect(element.textContent).toBe('foo | foo');
                (0, testing_1.tick)(1000);
                expect(element.textContent).toBe('bar | bar');
            });
        }));
        it('should initialize inputs in time for `ngOnChanges`', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: ` ngOnChangesCount: {{ ngOnChangesCount }} | firstChangesCount:
          {{ firstChangesCount }} | initialValue: {{ initialValue }}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.ngOnChangesCount = 0;
                        this.firstChangesCount = 0;
                        this.foo = __runInitializers(this, _foo_initializers, '');
                        this.initialValue = (__runInitializers(this, _foo_extraInitializers), this.foo);
                    }
                    ngOnChanges(changes) {
                        this.ngOnChangesCount++;
                        if (this.ngOnChangesCount === 1) {
                            this.initialValue = this.foo;
                        }
                        if (changes['foo'] && changes['foo'].isFirstChange()) {
                            this.firstChangesCount++;
                        }
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foo_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            const element = (0, common_test_helpers_1.html)(`
           <ng2 [foo]="'foo'"></ng2>
           <ng2 foo="bar"></ng2>
           <ng2 [foo]="'baz'" ng-if="true"></ng2>
           <ng2 foo="qux" ng-if="true"></ng2>
         `);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const nodes = element.querySelectorAll('ng2');
                const expectedTextWith = (value) => `ngOnChangesCount: 1 | firstChangesCount: 1 | initialValue: ${value}`;
                expect((0, common_test_helpers_1.multiTrim)(nodes[0].textContent)).toBe(expectedTextWith('foo'));
                expect((0, common_test_helpers_1.multiTrim)(nodes[1].textContent)).toBe(expectedTextWith('bar'));
                expect((0, common_test_helpers_1.multiTrim)(nodes[2].textContent)).toBe(expectedTextWith('baz'));
                expect((0, common_test_helpers_1.multiTrim)(nodes[3].textContent)).toBe(expectedTextWith('qux'));
            });
        }));
        it('should bind to ng-model', (0, testing_1.waitForAsync)(() => {
            const ng1Module = angular.module_('ng1', []).run(($rootScope) => {
                $rootScope['modelA'] = 'A';
            });
            let ng2Instance;
            let Ng2 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '<span>{{_value}}</span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2 = _classThis = class {
                    constructor() {
                        this._value = '';
                        this._onChangeCallback = () => { };
                        this._onTouchedCallback = () => { };
                        ng2Instance = this;
                    }
                    writeValue(value) {
                        this._value = value;
                    }
                    registerOnChange(fn) {
                        this._onChangeCallback = fn;
                    }
                    registerOnTouched(fn) {
                        this._onTouchedCallback = fn;
                    }
                    doTouch() {
                        this._onTouchedCallback();
                    }
                    doChange(newValue) {
                        this._value = newValue;
                        this._onChangeCallback(newValue);
                    }
                };
                __setFunctionName(_classThis, "Ng2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2 = _classThis;
            })();
            ng1Module.directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2 }));
            const element = (0, common_test_helpers_1.html)(`<div><ng2 ng-model="modelA"></ng2> | {{modelA}}</div>`);
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            (0, platform_browser_dynamic_1.platformBrowserDynamic)()
                .bootstrapModule(Ng2Module)
                .then((ref) => {
                const adapter = ref.injector.get(static_1.UpgradeModule);
                adapter.bootstrap(element, [ng1Module.name]);
                const $rootScope = adapter.$injector.get('$rootScope');
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('A | A');
                $rootScope.modelA = 'B';
                $rootScope.$apply();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('B | B');
                ng2Instance.doChange('C');
                expect($rootScope.modelA).toBe('C');
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('C | C');
                const downgradedElement = document.body.querySelector('ng2');
                expect(downgradedElement.classList.contains('ng-touched')).toBe(false);
                ng2Instance.doTouch();
                $rootScope.$apply();
                expect(downgradedElement.classList.contains('ng-touched')).toBe(true);
            });
        }));
        it('should properly run cleanup when ng1 directive is destroyed', (0, testing_1.waitForAsync)(() => {
            let destroyed = false;
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '<ul><li>test1</li><li>test2</li></ul>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    ngOnDestroy() {
                        destroyed = true;
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng1', () => {
                return { template: '<div ng-if="!destroyIt"><ng2></ng2></div>' };
            })
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            const element = (0, common_test_helpers_1.html)('<ng1></ng1>');
            (0, platform_browser_dynamic_1.platformBrowserDynamic)()
                .bootstrapModule(Ng2Module)
                .then((ref) => {
                const adapter = ref.injector.get(static_1.UpgradeModule);
                adapter.bootstrap(element, [ng1Module.name]);
                const ng2Element = angular.element(element.querySelector('ng2'));
                const ng2Descendants = Array.from(element.querySelectorAll('ng2 li')).map(angular.element);
                let ng2ElementDestroyed = false;
                let ng2DescendantsDestroyed = [false, false];
                ng2Element.data('test', 42);
                ng2Descendants.forEach((elem, i) => elem.data('test', i));
                ng2Element.on('$destroy', () => (ng2ElementDestroyed = true));
                ng2Descendants.forEach((elem, i) => elem.on('$destroy', () => (ng2DescendantsDestroyed[i] = true)));
                expect(element.textContent).toBe('test1test2');
                expect(destroyed).toBe(false);
                expect(ng2Element.data('test')).toBe(42);
                ng2Descendants.forEach((elem, i) => expect(elem.data('test')).toBe(i));
                expect(ng2ElementDestroyed).toBe(false);
                expect(ng2DescendantsDestroyed).toEqual([false, false]);
                const $rootScope = adapter.$injector.get('$rootScope');
                $rootScope.$apply('destroyIt = true');
                expect(element.textContent).toBe('');
                expect(destroyed).toBe(true);
                expect(ng2Element.data('test')).toBeUndefined();
                ng2Descendants.forEach((elem) => expect(elem.data('test')).toBeUndefined());
                expect(ng2ElementDestroyed).toBe(true);
                expect(ng2DescendantsDestroyed).toEqual([true, true]);
            });
        }));
        it('should properly run cleanup with multiple levels of nesting', (0, testing_1.waitForAsync)(() => {
            let destroyed = false;
            let Ng2OuterComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2-outer',
                        template: '<div *ngIf="!destroyIt"><ng1></ng1></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _destroyIt_decorators;
                let _destroyIt_initializers = [];
                let _destroyIt_extraInitializers = [];
                var Ng2OuterComponent = _classThis = class {
                    constructor() {
                        this.destroyIt = __runInitializers(this, _destroyIt_initializers, false);
                        __runInitializers(this, _destroyIt_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Ng2OuterComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _destroyIt_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _destroyIt_decorators, { kind: "field", name: "destroyIt", static: false, private: false, access: { has: obj => "destroyIt" in obj, get: obj => obj.destroyIt, set: (obj, value) => { obj.destroyIt = value; } }, metadata: _metadata }, _destroyIt_initializers, _destroyIt_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2OuterComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2OuterComponent = _classThis;
            })();
            let Ng2InnerComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2-inner',
                        template: 'test',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2InnerComponent = _classThis = class {
                    ngOnDestroy() {
                        destroyed = true;
                    }
                };
                __setFunctionName(_classThis, "Ng2InnerComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2InnerComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2InnerComponent = _classThis;
            })();
            let Ng1ComponentFacade = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = static_1.UpgradeComponent;
                var Ng1ComponentFacade = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1ComponentFacade");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1ComponentFacade = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1ComponentFacade = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng1ComponentFacade, Ng2InnerComponent, Ng2OuterComponent],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng1', () => ({ template: '<ng2-inner></ng2-inner>' }))
                .directive('ng2Inner', (0, static_1.downgradeComponent)({ component: Ng2InnerComponent }))
                .directive('ng2Outer', (0, static_1.downgradeComponent)({ component: Ng2OuterComponent }));
            const element = (0, common_test_helpers_1.html)('<ng2-outer [destroy-it]="destroyIt"></ng2-outer>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect(element.textContent).toBe('test');
                expect(destroyed).toBe(false);
                (0, static_test_helpers_1.$apply)(upgrade, 'destroyIt = true');
                expect(element.textContent).toBe('');
                expect(destroyed).toBe(true);
            });
        }));
        it('should destroy the AngularJS app when `PlatformRef` is destroyed', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '<span>NG2</span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng2Component],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .component('ng1', { template: '<ng2></ng2>' })
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            const element = (0, common_test_helpers_1.html)('<div><ng1></ng1></div>');
            const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
            platformRef.bootstrapModule(Ng2Module).then((ref) => {
                const upgrade = ref.injector.get(static_1.UpgradeModule);
                upgrade.bootstrap(element, [ng1Module.name]);
                const $rootScope = upgrade.$injector.get(constants_1.$ROOT_SCOPE);
                const rootScopeDestroySpy = spyOn($rootScope, '$destroy');
                const appElem = angular.element(element);
                const ng1Elem = angular.element(element.querySelector('ng1'));
                const ng2Elem = angular.element(element.querySelector('ng2'));
                const ng2ChildElem = angular.element(element.querySelector('ng2 span'));
                // Attach data to all elements.
                appElem.data('testData', 1);
                ng1Elem.data('testData', 2);
                ng2Elem.data('testData', 3);
                ng2ChildElem.data('testData', 4);
                // Verify data can be retrieved.
                expect(appElem.data('testData')).toBe(1);
                expect(ng1Elem.data('testData')).toBe(2);
                expect(ng2Elem.data('testData')).toBe(3);
                expect(ng2ChildElem.data('testData')).toBe(4);
                expect(rootScopeDestroySpy).not.toHaveBeenCalled();
                // Destroy `PlatformRef`.
                platformRef.destroy();
                // Verify `$rootScope` has been destroyed and data has been cleaned up.
                expect(rootScopeDestroySpy).toHaveBeenCalled();
                expect(appElem.data('testData')).toBeUndefined();
                expect(ng1Elem.data('testData')).toBeUndefined();
                expect(ng2Elem.data('testData')).toBeUndefined();
                expect(ng2ChildElem.data('testData')).toBeUndefined();
            });
        }));
        it('should work when compiled outside the dom (by fallback to the root ng2.injector)', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: 'test',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng1', [
                '$compile',
                ($compile) => {
                    return {
                        link: function ($scope, $element, $attrs) {
                            // here we compile some HTML that contains a downgraded component
                            // since it is not currently in the DOM it is not able to "require"
                            // an ng2 injector so it should use the `moduleInjector` instead.
                            const compiled = $compile('<ng2></ng2>');
                            const template = compiled($scope);
                            $element.append(template);
                        },
                    };
                },
            ])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            const element = (0, common_test_helpers_1.html)('<ng1></ng1>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                // the fact that the body contains the correct text means that the
                // downgraded component was able to access the moduleInjector
                // (since there is no other injector in this system)
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('test');
            });
        }));
        it('should allow attribute selectors for downgraded components', (0, testing_1.waitForAsync)(() => {
            let WorksComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: '[itWorks]',
                        template: 'It works',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WorksComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "WorksComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WorksComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WorksComponent = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [WorksComponent], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('worksComponent', (0, static_1.downgradeComponent)({ component: WorksComponent }));
            const element = (0, common_test_helpers_1.html)('<works-component></works-component>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('It works');
            });
        }));
        it('should allow attribute selectors for components in ng2', (0, testing_1.waitForAsync)(() => {
            let WorksComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: '[itWorks]',
                        template: 'It works',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WorksComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "WorksComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WorksComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WorksComponent = _classThis;
            })();
            let RootComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-component',
                        template: '<span itWorks></span>!',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "RootComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComponent = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [RootComponent, WorksComponent],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('rootComponent', (0, static_1.downgradeComponent)({ component: RootComponent }));
            const element = (0, common_test_helpers_1.html)('<root-component></root-component>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('It works!');
            });
        }));
        it('should respect hierarchical dependency injection for ng2', (0, testing_1.waitForAsync)(() => {
            let ParentComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: 'parent(<ng-content></ng-content>)',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentComponent = _classThis;
            })();
            let ChildComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: 'child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildComponent = _classThis = class {
                    constructor(parent) { }
                };
                __setFunctionName(_classThis, "ChildComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComponent = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [ParentComponent, ChildComponent],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('parent', (0, static_1.downgradeComponent)({ component: ParentComponent }))
                .directive('child', (0, static_1.downgradeComponent)({ component: ChildComponent }));
            const element = (0, common_test_helpers_1.html)('<parent><child></child></parent>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('parent(child)');
            });
        }));
        it('should be compiled synchronously, if possible', (0, testing_1.waitForAsync)(() => {
            let Ng2ComponentA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2A',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2ComponentA = _classThis = class {
                };
                __setFunctionName(_classThis, "Ng2ComponentA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2ComponentA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2ComponentA = _classThis;
            })();
            let Ng2ComponentB = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2B',
                        template: "{{ 'Ng2 template' }}",
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2ComponentB = _classThis = class {
                };
                __setFunctionName(_classThis, "Ng2ComponentB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2ComponentB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2ComponentB = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng2ComponentA, Ng2ComponentB],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2A', (0, static_1.downgradeComponent)({ component: Ng2ComponentA }))
                .directive('ng2B', (0, static_1.downgradeComponent)({ component: Ng2ComponentB }));
            const element = (0, common_test_helpers_1.html)('<ng2-a><ng2-b></ng2-b></ng2-a>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                expect(element.textContent).toBe('Ng2 template');
            });
        }));
        it('should work with ng2 lazy loaded components', (0, testing_1.waitForAsync)(() => {
            let componentInjector;
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor(injector) {
                        componentInjector = injector;
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng2Component],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                    constructor(module) {
                        this.module = module;
                    }
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LazyLoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedModule = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const modInjector = upgrade.injector;
                // Emulate the router lazy loading a module and creating a component
                const compiler = modInjector.get(core_1.Compiler);
                const modFactory = compiler.compileModuleSync(LazyLoadedModule);
                const childMod = modFactory.create(modInjector);
                const cmpFactory = childMod.componentFactoryResolver.resolveComponentFactory(LazyLoadedComponent);
                const lazyCmp = cmpFactory.create(componentInjector);
                expect(lazyCmp.instance.module.injector === childMod.injector).toBe(true);
            });
        }));
        it('should throw if `downgradedModule` is specified', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng2Component],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, downgradedModule: 'foo' }));
            const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                throw new Error('Expected bootstraping to fail.');
            }, (err) => expect(err.message).toBe("Error while instantiating component 'Ng2Component': 'downgradedModule' " +
                'unexpectedly specified.\n' +
                "You should not specify a value for 'downgradedModule', unless you are " +
                "downgrading more than one Angular module (via 'downgradeModule()')."));
        }));
    });
    describe('standalone', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        it('should downgrade a standalone component using NgModule APIs', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'ng2', standalone: true, template: 'Hi from Angular!' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule, Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                expect(element.textContent).toBe('Hi from Angular!');
            });
        }));
    });
});
