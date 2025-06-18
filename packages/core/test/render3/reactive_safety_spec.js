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
const core_1 = require("../../src/core");
const signals_1 = require("../../primitives/signals");
const create_injector_1 = require("../../src/di/create_injector");
const testing_1 = require("../../testing");
/*
 * Contains tests which validate that certain actions within the framework (for example, creating
 * new views) are automatically "untracked" when started in a reactive context.
 */
describe('reactive safety', () => {
    describe('view creation', () => {
        it('should be safe to call ViewContainerRef.createEmbeddedView', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #tmpl>Template</ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tmpl_decorators;
                let _tmpl_initializers = [];
                let _tmpl_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        this.tmpl = __runInitializers(this, _tmpl_initializers, void 0);
                        __runInitializers(this, _tmpl_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tmpl_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                    __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fix = testing_1.TestBed.createComponent(TestCmp);
            fix.detectChanges();
            const cmp = fix.componentInstance;
            expectNotToThrowInReactiveContext(() => cmp.vcr.createEmbeddedView(cmp.tmpl));
        });
        it('should be safe to call TemplateRef.create', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #tmpl>Template</ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tmpl_decorators;
                let _tmpl_initializers = [];
                let _tmpl_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.tmpl = __runInitializers(this, _tmpl_initializers, void 0);
                        __runInitializers(this, _tmpl_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tmpl_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                    __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fix = testing_1.TestBed.createComponent(TestCmp);
            fix.detectChanges();
            const cmp = fix.componentInstance;
            expectNotToThrowInReactiveContext(() => cmp.tmpl.createEmbeddedView(cmp.tmpl));
        });
        it('should be safe to call createComponent', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expectNotToThrowInReactiveContext(() => (0, core_1.createComponent)(TestCmp, { environmentInjector }));
        });
        it('should be safe to call ComponentFactory.create()', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const resolver = testing_1.TestBed.inject(core_1.ComponentFactoryResolver);
            const factory = resolver.resolveComponentFactory(TestCmp);
            expectNotToThrowInReactiveContext(() => factory.create(injector));
        });
        it('should be safe to flip @if to true', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          @if (cond) {
            (creating this view should not throw)
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.cond = false;
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fix = testing_1.TestBed.createComponent(TestCmp);
            fix.detectChanges();
            expectNotToThrowInReactiveContext(() => {
                fix.componentInstance.cond = true;
                fix.detectChanges();
            });
        });
    });
    describe('view destruction', () => {
        it('should be safe to destroy a ComponentRef', () => {
            let HostCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostCmp = _classThis = class {
                    constructor() {
                        this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                    }
                };
                __setFunctionName(_classThis, "HostCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostCmp = _classThis;
            })();
            let GuestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GuestCmp = _classThis = class {
                    ngOnDestroy() {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                    }
                };
                __setFunctionName(_classThis, "GuestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GuestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GuestCmp = _classThis;
            })();
            const fix = testing_1.TestBed.createComponent(HostCmp);
            const guest = fix.componentInstance.vcr.createComponent(GuestCmp);
            fix.detectChanges();
            expectNotToThrowInReactiveContext(() => expect(() => guest.destroy()));
        });
    });
    describe('dependency injection', () => {
        it('should be safe to inject a provided service', () => {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            const injector = (0, core_1.createEnvironmentInjector)([Service], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            expectNotToThrowInReactiveContext(() => injector.get(Service));
        });
        it('should be safe to inject a token provided with a factory', () => {
            const token = new core_1.InjectionToken('');
            const injector = (0, core_1.createEnvironmentInjector)([
                {
                    provide: token,
                    useFactory: () => {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                        return '';
                    },
                },
            ], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            expectNotToThrowInReactiveContext(() => injector.get(token));
        });
        it('should be safe to use an ENVIRONMENT_INITIALIZER', () => {
            expectNotToThrowInReactiveContext(() => (0, core_1.createEnvironmentInjector)([
                {
                    provide: core_1.ENVIRONMENT_INITIALIZER,
                    useValue: () => expect((0, signals_1.getActiveConsumer)()).toBe(null),
                    multi: true,
                },
            ], testing_1.TestBed.inject(core_1.EnvironmentInjector)));
        });
        it('should be safe to use an NgModule initializer', () => {
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModule = _classThis = class {
                    constructor() {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                    }
                };
                __setFunctionName(_classThis, "TestModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModule = _classThis;
            })();
            expectNotToThrowInReactiveContext(() => (0, create_injector_1.createInjector)(TestModule, testing_1.TestBed.inject(core_1.EnvironmentInjector)));
        });
        it('should be safe to destroy an injector', () => {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    ngOnDestroy() {
                        expect((0, signals_1.getActiveConsumer)()).toBe(null);
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            const injector = (0, core_1.createEnvironmentInjector)([Service], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            injector.get(Service);
            expectNotToThrowInReactiveContext(() => injector.destroy());
        });
    });
    describe('outputs', () => {
        it('should be safe to emit an output', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _output_decorators;
                let _output_initializers = [];
                let _output_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.output = __runInitializers(this, _output_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _output_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _output_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _output_decorators, { kind: "field", name: "output", static: false, private: false, access: { has: obj => "output" in obj, get: obj => obj.output, set: (obj, value) => { obj.output = value; } }, metadata: _metadata }, _output_initializers, _output_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const cmp = testing_1.TestBed.createComponent(TestCmp).componentInstance;
            cmp.output.subscribe(() => {
                expect((0, signals_1.getActiveConsumer)()).toBe(null);
            });
            expectNotToThrowInReactiveContext(() => cmp.output.emit(''));
        });
    });
});
function expectNotToThrowInReactiveContext(fn) {
    const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
    (0, core_1.effect)(() => {
        expect(fn).not.toThrow();
    }, { injector });
    testing_1.TestBed.tick();
}
