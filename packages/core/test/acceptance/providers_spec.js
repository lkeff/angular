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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const state_1 = require("../../src/render3/state");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('providers', () => {
    describe('inheritance', () => {
        it('should NOT inherit providers', () => {
            const SOME_DIRS = new core_1.InjectionToken('someDirs');
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        providers: [{ provide: SOME_DIRS, useClass: SuperDirective, multi: true }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[sub-dir]',
                        providers: [{ provide: SOME_DIRS, useClass: SubDirective, multi: true }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var SubDirective = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let OtherDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[other-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherDirective = _classThis = class {
                    constructor(dirs) {
                        this.dirs = dirs;
                    }
                };
                __setFunctionName(_classThis, "OtherDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-comp',
                        template: `<div other-dir sub-dir></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [SuperDirective, SubDirective, OtherDirective, App],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const otherDir = fixture.debugElement.query(platform_browser_1.By.css('div')).injector.get(OtherDirective);
            (0, matchers_1.expect)(otherDir.dirs.length).toEqual(1);
            (0, matchers_1.expect)(otherDir.dirs[0] instanceof SubDirective).toBe(true);
        });
    });
    describe('lifecycles', () => {
        it('should inherit ngOnDestroy hooks on providers', () => {
            const logs = [];
            let SuperInjectableWithDestroyHook = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperInjectableWithDestroyHook = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy');
                    }
                };
                __setFunctionName(_classThis, "SuperInjectableWithDestroyHook");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperInjectableWithDestroyHook = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperInjectableWithDestroyHook = _classThis;
            })();
            let SubInjectableWithDestroyHook = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperInjectableWithDestroyHook;
                var SubInjectableWithDestroyHook = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubInjectableWithDestroyHook");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubInjectableWithDestroyHook = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubInjectableWithDestroyHook = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [SubInjectableWithDestroyHook],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(foo) { }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(logs).toEqual(['OnDestroy']);
        });
        it('should not call ngOnDestroy for providers that have not been requested', () => {
            const logs = [];
            let InjectableWithDestroyHook = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHook = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHook");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHook = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHook = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [InjectableWithDestroyHook],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(logs).toEqual([]);
        });
        it('should only call ngOnDestroy once for multiple instances', () => {
            const logs = [];
            let InjectableWithDestroyHook = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHook = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHook");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHook = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHook = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    constructor(foo) { }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <my-cmp></my-cmp>
          <my-cmp></my-cmp>
        `,
                        providers: [InjectableWithDestroyHook],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyComponent] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(logs).toEqual(['OnDestroy']);
        });
        it('should call ngOnDestroy when providing same token via useClass', () => {
            const logs = [];
            let InjectableWithDestroyHook = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHook = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHook");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHook = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHook = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [{ provide: InjectableWithDestroyHook, useClass: InjectableWithDestroyHook }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(foo) { }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(logs).toEqual(['OnDestroy']);
        });
        it('should only call ngOnDestroy of value when providing via useClass', () => {
            const logs = [];
            let InjectableWithDestroyHookToken = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHookToken = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy Token');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHookToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHookToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHookToken = _classThis;
            })();
            let InjectableWithDestroyHookValue = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHookValue = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy Value');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHookValue");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHookValue = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHookValue = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [
                            { provide: InjectableWithDestroyHookToken, useClass: InjectableWithDestroyHookValue },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(foo) { }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(logs).toEqual(['OnDestroy Value']);
        });
        it('should only call ngOnDestroy of value when providing via useExisting', () => {
            const logs = [];
            let InjectableWithDestroyHookToken = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHookToken = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy Token');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHookToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHookToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHookToken = _classThis;
            })();
            let InjectableWithDestroyHookExisting = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHookExisting = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy Existing');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHookExisting");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHookExisting = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHookExisting = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [
                            InjectableWithDestroyHookExisting,
                            { provide: InjectableWithDestroyHookToken, useExisting: InjectableWithDestroyHookExisting },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(foo1, foo2) { }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(logs).toEqual(['OnDestroy Existing']);
        });
        it('should invoke ngOnDestroy with the correct context when providing a type provider multiple times on the same node', () => {
            const resolvedServices = [];
            const destroyContexts = [];
            let parentService;
            let childService;
            let DestroyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DestroyService = _classThis = class {
                    constructor() {
                        resolvedServices.push(this);
                    }
                    ngOnDestroy() {
                        destroyContexts.push(this);
                    }
                };
                __setFunctionName(_classThis, "DestroyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DestroyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DestroyService = _classThis;
            })();
            let DirOne = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-one]',
                        providers: [DestroyService],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirOne = _classThis = class {
                    constructor(service) {
                        childService = service;
                    }
                };
                __setFunctionName(_classThis, "DirOne");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirOne = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirOne = _classThis;
            })();
            let DirTwo = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-two]',
                        providers: [DestroyService],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirTwo = _classThis = class {
                    constructor(service) {
                        childService = service;
                    }
                };
                __setFunctionName(_classThis, "DirTwo");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirTwo = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirTwo = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir-one dir-two></div>',
                        providers: [DestroyService],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(service) {
                        parentService = service;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, DirOne, DirTwo] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(parentService).toBeDefined();
            (0, matchers_1.expect)(childService).toBeDefined();
            (0, matchers_1.expect)(parentService).not.toBe(childService);
            (0, matchers_1.expect)(resolvedServices).toEqual([parentService, childService]);
            (0, matchers_1.expect)(destroyContexts).toEqual([parentService, childService]);
        });
        it('should invoke ngOnDestroy with the correct context when providing a class provider multiple times on the same node', () => {
            const resolvedServices = [];
            const destroyContexts = [];
            const token = new core_1.InjectionToken('token');
            let parentService;
            let childService;
            let DestroyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DestroyService = _classThis = class {
                    constructor() {
                        resolvedServices.push(this);
                    }
                    ngOnDestroy() {
                        destroyContexts.push(this);
                    }
                };
                __setFunctionName(_classThis, "DestroyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DestroyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DestroyService = _classThis;
            })();
            let DirOne = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-one]',
                        providers: [{ provide: token, useClass: DestroyService }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirOne = _classThis = class {
                    constructor(service) {
                        childService = service;
                    }
                };
                __setFunctionName(_classThis, "DirOne");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirOne = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirOne = _classThis;
            })();
            let DirTwo = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-two]',
                        providers: [{ provide: token, useClass: DestroyService }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirTwo = _classThis = class {
                    constructor(service) {
                        childService = service;
                    }
                };
                __setFunctionName(_classThis, "DirTwo");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirTwo = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirTwo = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir-one dir-two></div>',
                        providers: [{ provide: token, useClass: DestroyService }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(service) {
                        parentService = service;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, DirOne, DirTwo] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(parentService).toBeDefined();
            (0, matchers_1.expect)(childService).toBeDefined();
            (0, matchers_1.expect)(parentService).not.toBe(childService);
            (0, matchers_1.expect)(resolvedServices).toEqual([parentService, childService]);
            (0, matchers_1.expect)(destroyContexts).toEqual([parentService, childService]);
        });
        describe('ngOnDestroy on multi providers', () => {
            it('should invoke ngOnDestroy on multi providers with the correct context', () => {
                const destroyCalls = [];
                const SERVICES = new core_1.InjectionToken('SERVICES');
                let DestroyService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DestroyService = _classThis = class {
                        ngOnDestroy() {
                            destroyCalls.push(this);
                        }
                    };
                    __setFunctionName(_classThis, "DestroyService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DestroyService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DestroyService = _classThis;
                })();
                let OtherDestroyService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OtherDestroyService = _classThis = class {
                        ngOnDestroy() {
                            destroyCalls.push(this);
                        }
                    };
                    __setFunctionName(_classThis, "OtherDestroyService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherDestroyService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherDestroyService = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div></div>',
                            providers: [
                                { provide: SERVICES, useClass: DestroyService, multi: true },
                                { provide: SERVICES, useClass: OtherDestroyService, multi: true },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor(s) { }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                fixture.destroy();
                (0, matchers_1.expect)(destroyCalls).toEqual([
                    jasmine.any(DestroyService),
                    jasmine.any(OtherDestroyService),
                ]);
            });
            it('should invoke destroy hooks on multi providers with the correct context, if only some have a destroy hook', () => {
                const destroyCalls = [];
                const SERVICES = new core_1.InjectionToken('SERVICES');
                let Service1 = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Service1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Service1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Service1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Service1 = _classThis;
                })();
                let Service2 = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Service2 = _classThis = class {
                        ngOnDestroy() {
                            destroyCalls.push(this);
                        }
                    };
                    __setFunctionName(_classThis, "Service2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Service2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Service2 = _classThis;
                })();
                let Service3 = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Service3 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Service3");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Service3 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Service3 = _classThis;
                })();
                let Service4 = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Service4 = _classThis = class {
                        ngOnDestroy() {
                            destroyCalls.push(this);
                        }
                    };
                    __setFunctionName(_classThis, "Service4");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Service4 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Service4 = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div></div>',
                            providers: [
                                { provide: SERVICES, useClass: Service1, multi: true },
                                { provide: SERVICES, useClass: Service2, multi: true },
                                { provide: SERVICES, useClass: Service3, multi: true },
                                { provide: SERVICES, useClass: Service4, multi: true },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor(s) { }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                fixture.destroy();
                (0, matchers_1.expect)(destroyCalls).toEqual([jasmine.any(Service2), jasmine.any(Service4)]);
            });
            it('should not invoke ngOnDestroy on multi providers created via useFactory', () => {
                let destroyCalls = 0;
                const SERVICES = new core_1.InjectionToken('SERVICES');
                let DestroyService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DestroyService = _classThis = class {
                        ngOnDestroy() {
                            destroyCalls++;
                        }
                    };
                    __setFunctionName(_classThis, "DestroyService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DestroyService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DestroyService = _classThis;
                })();
                let OtherDestroyService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OtherDestroyService = _classThis = class {
                        ngOnDestroy() {
                            destroyCalls++;
                        }
                    };
                    __setFunctionName(_classThis, "OtherDestroyService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherDestroyService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherDestroyService = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div></div>',
                            providers: [
                                { provide: SERVICES, useFactory: () => new DestroyService(), multi: true },
                                { provide: SERVICES, useFactory: () => new OtherDestroyService(), multi: true },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor(s) { }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                fixture.destroy();
                (0, matchers_1.expect)(destroyCalls).toBe(0);
            });
        });
        it('should call ngOnDestroy if host component is destroyed', () => {
            const logs = [];
            let InjectableWithDestroyHookToken = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectableWithDestroyHookToken = _classThis = class {
                    ngOnDestroy() {
                        logs.push('OnDestroy Token');
                    }
                };
                __setFunctionName(_classThis, "InjectableWithDestroyHookToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectableWithDestroyHookToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectableWithDestroyHookToken = _classThis;
            })();
            let CompWithProvider = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp-with-provider',
                        template: '',
                        providers: [InjectableWithDestroyHookToken],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CompWithProvider = _classThis = class {
                    constructor(token) { }
                };
                __setFunctionName(_classThis, "CompWithProvider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CompWithProvider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CompWithProvider = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: '<comp-with-provider *ngIf="condition"></comp-with-provider>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.condition = true;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, CompWithProvider],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(logs).toEqual(['OnDestroy Token']);
        });
    });
    describe('components and directives', () => {
        class MyService {
            constructor() {
                this.value = 'some value';
            }
        }
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(svc) {
                    this.svc = svc;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        let MyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[some-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir = _classThis = class {
                constructor(svc) {
                    this.svc = svc;
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        it('should support providing components in tests without @Injectable', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-comp',
                        template: '<my-comp></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComp, MyComp],
                // providing MyComp is unnecessary but it shouldn't throw
                providers: [MyComp, MyService],
            });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const myCompInstance = fixture.debugElement.query(platform_browser_1.By.css('my-comp')).injector.get(MyComp);
            (0, matchers_1.expect)(myCompInstance.svc.value).toEqual('some value');
        });
        it('should support providing directives in tests without @Injectable', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-comp',
                        template: '<div some-dir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComp, MyDir],
                // providing MyDir is unnecessary but it shouldn't throw
                providers: [MyDir, MyService],
            });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const myCompInstance = fixture.debugElement.query(platform_browser_1.By.css('div')).injector.get(MyDir);
            (0, matchers_1.expect)(myCompInstance.svc.value).toEqual('some value');
        });
        // TODO(alxhub): find a way to isolate this test from running in a dirty
        // environment where a current LView exists (probably from some other test
        // bootstrapping and then not cleaning up).
        xdescribe('injection without bootstrapping', () => {
            beforeEach(() => {
                // Maybe something like this?
                while (!(0, state_1.specOnlyIsInstructionStateEmpty)()) {
                    (0, state_1.leaveView)();
                }
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp], providers: [MyComp, MyService] });
            });
            it('should support injecting without bootstrapping', (0, testing_1.waitForAsync)((0, testing_1.inject)([MyComp, MyService], (comp, service) => {
                (0, matchers_1.expect)(comp.svc.value).toEqual('some value');
            })));
        });
    });
    describe('forward refs', () => {
        it('should support forward refs in provider deps', () => {
            class MyService {
                constructor(dep) {
                    this.dep = dep;
                }
            }
            class OtherService {
                constructor() {
                    this.value = 'one';
                }
            }
            let AppComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-comp',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComp = _classThis = class {
                    constructor(myService) {
                        this.myService = myService;
                    }
                };
                __setFunctionName(_classThis, "AppComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComp = _classThis;
            })();
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [
                            OtherService,
                            {
                                provide: MyService,
                                useFactory: (dep) => new MyService(dep),
                                deps: [(0, core_1.forwardRef)(() => OtherService)],
                            },
                        ],
                        declarations: [AppComp],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyModule = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const fixture = testing_1.TestBed.createComponent(AppComp);
            (0, matchers_1.expect)(fixture.componentInstance.myService.dep.value).toBe('one');
        });
        it('should support forward refs in useClass when impl version is also provided', () => {
            let SomeProvider = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root', useClass: (0, core_1.forwardRef)(() => SomeProviderImpl) })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeProvider = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeProvider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeProvider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeProvider = _classThis;
            })();
            let SomeProviderImpl = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SomeProvider;
                var SomeProviderImpl = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SomeProviderImpl");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeProviderImpl = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeProviderImpl = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(foo) {
                        this.foo = foo;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            // We don't configure the `SomeProvider` in the TestingModule so that it uses the
            // tree-shakable provider given in the `@Injectable` decorator above, which makes use of the
            // `forwardRef()`.
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.foo).toBeInstanceOf(SomeProviderImpl);
        });
        it('should support forward refs in useClass when token is provided', () => {
            let SomeProvider = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeProvider = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeProvider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeProvider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeProvider = _classThis;
            })();
            let SomeProviderImpl = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SomeProvider;
                var SomeProviderImpl = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SomeProviderImpl");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeProviderImpl = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeProviderImpl = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(foo) {
                        this.foo = foo;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App],
                providers: [{ provide: SomeProvider, useClass: (0, core_1.forwardRef)(() => SomeProviderImpl) }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.foo).toBeInstanceOf(SomeProviderImpl);
        });
    });
    describe('flags', () => {
        class MyService {
            constructor(value) {
                this.value = value;
            }
        }
        class OtherService {
        }
        it('should support Optional flag in deps', () => {
            const injector = core_1.Injector.create({
                providers: [{ provide: MyService, deps: [[new core_1.Optional(), OtherService]] }],
            });
            (0, matchers_1.expect)(injector.get(MyService).value).toBe(null);
        });
        it('should support Optional flag in deps without instantiating it', () => {
            const injector = core_1.Injector.create({
                providers: [{ provide: MyService, deps: [[core_1.Optional, OtherService]] }],
            });
            (0, matchers_1.expect)(injector.get(MyService).value).toBe(null);
        });
    });
    describe('view providers', () => {
        it('should have access to viewProviders within the same component', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '{{s}}-{{n}}',
                        providers: [{ provide: Number, useValue: 1, multi: true }],
                        viewProviders: [
                            { provide: String, useValue: 'bar' },
                            { provide: Number, useValue: 2, multi: true },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor(s, n) {
                        this.s = s;
                        this.n = n;
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('bar-1,2');
        });
        it('should have access to viewProviders of the host component', () => {
            let Repeated = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'repeated',
                        template: '[{{s}}-{{n}}]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Repeated = _classThis = class {
                    constructor(s, n) {
                        this.s = s;
                        this.n = n;
                    }
                };
                __setFunctionName(_classThis, "Repeated");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Repeated = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Repeated = _classThis;
            })();
            let ComponentWithProviders = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div>
            <ng-container *ngFor="let item of items">
              <repeated></repeated>
            </ng-container>
          </div>
        `,
                        providers: [{ provide: Number, useValue: 1, multi: true }],
                        viewProviders: [
                            { provide: String, useValue: 'foo' },
                            { provide: Number, useValue: 2, multi: true },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentWithProviders = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
                };
                __setFunctionName(_classThis, "ComponentWithProviders");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentWithProviders = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentWithProviders = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [ComponentWithProviders, Repeated],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(ComponentWithProviders);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('[foo-1,2][foo-1,2][foo-1,2]');
        });
    });
});
