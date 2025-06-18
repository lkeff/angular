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
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const static_test_helpers_1 = require("./static_test_helpers");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('change-detection', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        it('should not break if a $digest is already in progress', (0, testing_1.waitForAsync)(() => {
            const element = (0, common_test_helpers_1.html)('<my-app></my-app>');
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [AppComponent], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
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
                .directive('myApp', (0, static_1.downgradeComponent)({ component: AppComponent }));
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const $rootScope = upgrade.$injector.get('$rootScope');
                const ngZone = upgrade.ngZone;
                // Wrap in a setTimeout to ensure all bootstrap operations have completed.
                setTimeout(
                // Run inside the Angular zone, so that operations such as emitting
                // `onMicrotaskEmpty` do not trigger entering/existing the zone (and thus another
                // `$digest`). This also closer simulates what would happen in a real app.
                () => ngZone.run(() => {
                    const digestSpy = spyOn($rootScope, '$digest').and.callThrough();
                    // Step 1: Ensure `$digest` is run on `onMicrotaskEmpty`.
                    ngZone.onMicrotaskEmpty.emit(null);
                    expect(digestSpy).toHaveBeenCalledTimes(1);
                    digestSpy.calls.reset();
                    // Step 2: Cause the issue.
                    $rootScope.$apply(() => ngZone.onMicrotaskEmpty.emit(null));
                    // With the fix, `$digest` will only be run once (for `$apply()`).
                    // Without the fix, `$digest()` would have been run an extra time
                    // (`onMicrotaskEmpty`).
                    expect(digestSpy).toHaveBeenCalledTimes(1);
                    digestSpy.calls.reset();
                    // Step 3: Ensure that `$digest()` is still executed on `onMicrotaskEmpty`.
                    ngZone.onMicrotaskEmpty.emit(null);
                    expect(digestSpy).toHaveBeenCalledTimes(1);
                }), 0);
            });
        }));
        it('should interleave scope and component expressions', (0, testing_1.waitForAsync)(() => {
            const log = [];
            const l = (value) => {
                log.push(value);
                return value + ';';
            };
            let Ng1aComponent = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1a',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = static_1.UpgradeComponent;
                var Ng1aComponent = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1a', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1aComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1aComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1aComponent = _classThis;
            })();
            let Ng1bComponent = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1b',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = static_1.UpgradeComponent;
                var Ng1bComponent = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1b', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1bComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1bComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1bComponent = _classThis;
            })();
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: `{{ l('2A') }}<ng1a></ng1a>{{ l('2B') }}<ng1b></ng1b>{{ l('2C') }}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.l = l;
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
                        declarations: [Ng1aComponent, Ng1bComponent, Ng2Component],
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
                .directive('ng1a', () => ({ template: "{{ l('ng1a') }}" }))
                .directive('ng1b', () => ({ template: "{{ l('ng1b') }}" }))
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }))
                .run(($rootScope) => {
                $rootScope['l'] = l;
                $rootScope['reset'] = () => (log.length = 0);
            });
            const element = (0, common_test_helpers_1.html)("<div>{{reset(); l('1A');}}<ng2>{{l('1B')}}</ng2>{{l('1C')}}</div>");
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect(document.body.textContent).toEqual('1A;2A;ng1a;2B;ng1b;2C;1C;');
                expect(log).toEqual(['1A', '1C', '2A', '2B', '2C', 'ng1a', 'ng1b']);
            });
        }));
        it('should propagate changes to a downgraded component inside the ngZone', (0, testing_1.waitForAsync)(() => {
            const element = (0, common_test_helpers_1.html)('<my-app></my-app>');
            let appComponent;
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '<my-child [value]="value"></my-child>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        appComponent = this;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            let ChildComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-child',
                        template: '<div>{{ valueFromPromise }}</div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_value_decorators;
                var ChildComponent = _classThis = class {
                    set value(v) {
                        expect(core_1.NgZone.isInAngularZone()).toBe(true);
                    }
                    constructor(zone) {
                        this.zone = (__runInitializers(this, _instanceExtraInitializers), zone);
                    }
                    ngOnChanges(changes) {
                        if (changes['value'].isFirstChange())
                            return;
                        this.zone.onMicrotaskEmpty.subscribe(() => {
                            expect(element.textContent).toEqual('5');
                        });
                        // Create a micro-task to update the value to be rendered asynchronously.
                        queueMicrotask(() => (this.valueFromPromise = changes['value'].currentValue));
                    }
                };
                __setFunctionName(_classThis, "ChildComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_value_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComponent = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [AppComponent, ChildComponent],
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
                .directive('myApp', (0, static_1.downgradeComponent)({ component: AppComponent }));
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                appComponent.value = 5;
            });
        }));
        // This test demonstrates https://github.com/angular/angular/issues/6385
        // which was invalidly fixed by https://github.com/angular/angular/pull/6386
        // it('should not trigger $digest from an async operation in a watcher', async(() => {
        //      @Component({selector: 'my-app', template: ''})
        //      class AppComponent {
        //      }
        //      @NgModule({declarations: [AppComponent], imports: [BrowserModule]})
        //      class Ng2Module {
        //      }
        //      const adapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => Ng2Module));
        //      const ng1Module = angular.module_('ng1', []).directive(
        //          'myApp', adapter.downgradeNg2Component(AppComponent));
        //      const element = html('<my-app></my-app>');
        //      adapter.bootstrap(element, ['ng1']).ready((ref) => {
        //        let doTimeout = false;
        //        let timeoutId: number;
        //        ref.ng1RootScope.$watch(() => {
        //          if (doTimeout && !timeoutId) {
        //            timeoutId = window.setTimeout(function() {
        //              timeoutId = null;
        //            }, 10);
        //          }
        //        });
        //        doTimeout = true;
        //      });
        //    }));
    });
});
