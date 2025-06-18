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
const testing_1 = require("../../testing");
describe('standalone injector', () => {
    it('should create one standalone injector for each parent EnvInjector', () => {
        let counter = 0;
        class Service {
            constructor() {
                this.value = counter++;
            }
        }
        let ModuleWithAService = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleWithAService = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleWithAService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleWithAService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleWithAService = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    imports: [ModuleWithAService],
                    template: `({{service.value}})`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `<ng-template #insert></ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _vcRef_decorators;
            let _vcRef_initializers = [];
            let _vcRef_extraInitializers = [];
            var AppComponent = _classThis = class {
                createComponent(envInjector) {
                    this.vcRef.createComponent(TestComponent, { environmentInjector: envInjector });
                }
                constructor() {
                    this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                    __runInitializers(this, _vcRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vcRef_decorators = [(0, core_1.ViewChild)('insert', { static: true, read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        const currEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        fixture.componentInstance.createComponent(currEnvInjector);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('(0)');
        // inserting the same standalone component second time and asserting that no new injector /
        // service instance gets created
        fixture.componentInstance.createComponent(currEnvInjector);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('(0)(0)');
        // inserting with a different EnvInjector as a parent should trigger a new service instance
        // creation
        fixture.componentInstance.createComponent((0, core_1.createEnvironmentInjector)([], currEnvInjector));
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('(0)(0)(1)');
    });
    it('should create a standalone Injector for ComponentRefs that are not inserted anywhere', () => {
        class Service {
            constructor() {
                this.value = 'Service value';
            }
        }
        let ModuleWithAService = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleWithAService = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleWithAService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleWithAService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleWithAService = _classThis;
        })();
        let DynamicComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    imports: [ModuleWithAService],
                    template: `{{service.value}}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComponent = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "DynamicComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicComponent = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
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
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        const environmentInjector = (0, core_1.createEnvironmentInjector)([Service], testing_1.TestBed.inject(core_1.EnvironmentInjector));
        const componentRef = (0, core_1.createComponent)(DynamicComponent, { environmentInjector });
        componentRef.changeDetectorRef.detectChanges();
        expect(componentRef.location.nativeElement.textContent).toBe('Service value');
    });
});
