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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootCmp = exports.NotStandaloneComponent = exports.SimpleStandaloneComponent = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const index_1 = require("../index");
const helpers_1 = require("./helpers");
let SimpleStandaloneComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ template: '<div>simple standalone</div>' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleStandaloneComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleStandaloneComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleStandaloneComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleStandaloneComponent = _classThis;
})();
exports.SimpleStandaloneComponent = SimpleStandaloneComponent;
let NotStandaloneComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ template: '<div>not standalone</div>', standalone: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotStandaloneComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "NotStandaloneComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotStandaloneComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotStandaloneComponent = _classThis;
})();
exports.NotStandaloneComponent = NotStandaloneComponent;
let RootCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '<router-outlet></router-outlet>',
            imports: [index_1.RouterModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "RootCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootCmp = _classThis;
})();
exports.RootCmp = RootCmp;
describe('standalone in Router API', () => {
    describe('loadChildren => routes', () => {
        it('can navigate to and render standalone component', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'lazy',
                            component: RootCmp,
                            loadChildren: () => [{ path: '', component: SimpleStandaloneComponent }],
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            const router = testing_1.TestBed.inject(index_1.Router);
            router.navigateByUrl('/lazy');
            yield advanceAsync(root);
            expect(root.nativeElement.innerHTML).toContain('simple standalone');
        }));
        it('throws an error when loadChildren=>routes has a component that is not standalone', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'lazy',
                            component: RootCmp,
                            loadChildren: () => [{ path: 'notstandalone', component: NotStandaloneComponent }],
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield expectAsync(router.navigateByUrl('/lazy/notstandalone')).toBeRejectedWithError(/.*lazy\/notstandalone.*component must be standalone/);
        }));
    });
    describe('route providers', () => {
        it('can provide a guard on a route', () => __awaiter(void 0, void 0, void 0, function* () {
            let ConfigurableGuard = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ConfigurableGuard = _classThis = class {
                    canActivate() {
                        return ConfigurableGuard.canActivateValue;
                    }
                };
                __setFunctionName(_classThis, "ConfigurableGuard");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ConfigurableGuard = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.canActivateValue = false;
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ConfigurableGuard = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'simple',
                            providers: [ConfigurableGuard],
                            canActivate: [ConfigurableGuard],
                            component: SimpleStandaloneComponent,
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            ConfigurableGuard.canActivateValue = false;
            const router = testing_1.TestBed.inject(index_1.Router);
            router.navigateByUrl('/simple');
            yield advanceAsync(root);
            expect(root.nativeElement.innerHTML).not.toContain('simple standalone');
            expect(router.url).not.toContain('simple');
            ConfigurableGuard.canActivateValue = true;
            router.navigateByUrl('/simple');
            yield advanceAsync(root);
            expect(root.nativeElement.innerHTML).toContain('simple standalone');
            expect(router.url).toContain('simple');
        }));
        it('can inject provider on a route into component', () => __awaiter(void 0, void 0, void 0, function* () {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.value = 'my service';
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
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{service.value}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
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
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([{ path: 'home', providers: [Service], component: MyComponent }]),
                ],
                declarations: [MyComponent],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            const router = testing_1.TestBed.inject(index_1.Router);
            router.navigateByUrl('/home');
            yield advanceAsync(root);
            expect(root.nativeElement.innerHTML).toContain('my service');
            expect(router.url).toContain('home');
        }));
        it('can not inject provider in lazy loaded ngModule from component on same level', () => __awaiter(void 0, void 0, void 0, function* () {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.value = 'my service';
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
            let LazyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyModule = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{service.value}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
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
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        { path: 'home', loadChildren: () => LazyModule, component: MyComponent },
                    ]),
                ],
                declarations: [MyComponent],
            });
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('/home');
            expect(fixture.detectChanges).toThrow();
        }));
        it('component from lazy module can inject provider from parent route', () => __awaiter(void 0, void 0, void 0, function* () {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.value = 'my service';
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
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{service.value}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
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
            let LazyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [Service],
                        declarations: [MyComponent],
                        imports: [index_1.RouterModule.forChild([{ path: '', component: MyComponent }])],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyModule = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [index_1.RouterModule.forRoot([{ path: 'home', loadChildren: () => LazyModule }])],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            const router = testing_1.TestBed.inject(index_1.Router);
            router.navigateByUrl('/home');
            yield advanceAsync(root);
            expect(root.nativeElement.innerHTML).toContain('my service');
        }));
        it('gets the correct injector for guards and components when combining lazy modules and route providers', () => __awaiter(void 0, void 0, void 0, function* () {
            const canActivateLog = [];
            class ServiceBase {
                canActivate() {
                    canActivateLog.push(this.name);
                    return true;
                }
            }
            let Service1 = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ServiceBase;
                var Service1 = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'service1';
                    }
                };
                __setFunctionName(_classThis, "Service1");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
                let _classSuper = ServiceBase;
                var Service2 = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'service2';
                    }
                };
                __setFunctionName(_classThis, "Service2");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
                let _classSuper = ServiceBase;
                var Service3 = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'service3';
                    }
                };
                __setFunctionName(_classThis, "Service3");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service3 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service3 = _classThis;
            })();
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `parent<router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `child`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let ChildCmp2 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `child2`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp2 = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp2 = _classThis;
            })();
            let LazyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: ServiceBase, useClass: Service2 }],
                        declarations: [ChildCmp, ChildCmp2],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: '',
                                    // This component and guard should get Service2 since it's provided in this module
                                    component: ChildCmp,
                                    canActivate: [ServiceBase],
                                },
                                {
                                    path: 'child2',
                                    providers: [{ provide: ServiceBase, useFactory: () => new Service3() }],
                                    // This component and guard should get Service3 since it's provided on this route
                                    component: ChildCmp2,
                                    canActivate: [ServiceBase],
                                },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyModule = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            // This component and guard should get Service1 since it's provided on this route
                            component: ParentCmp,
                            canActivate: [ServiceBase],
                            providers: [{ provide: ServiceBase, useFactory: () => new Service1() }],
                            loadChildren: () => LazyModule,
                        },
                    ]),
                ],
                declarations: [ParentCmp],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            const router = testing_1.TestBed.inject(index_1.Router);
            router.navigateByUrl('/home');
            yield advanceAsync(root);
            expect(canActivateLog).toEqual(['service1', 'service2']);
            expect(root.debugElement.query(platform_browser_1.By.directive(ParentCmp)).componentInstance.service.name).toEqual('service1');
            expect(root.debugElement.query(platform_browser_1.By.directive(ChildCmp)).componentInstance.service.name).toEqual('service2');
            router.navigateByUrl('/home/child2');
            yield advanceAsync(root);
            expect(canActivateLog).toEqual(['service1', 'service2', 'service3']);
            expect(root.debugElement.query(platform_browser_1.By.directive(ChildCmp2)).componentInstance.service.name).toEqual('service3');
        }));
    });
    describe('loadComponent', () => {
        it('does not load component when canActivate returns false', () => __awaiter(void 0, void 0, void 0, function* () {
            const loadComponentSpy = jasmine.createSpy();
            let Guard = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Guard = _classThis = class {
                    canActivate() {
                        return false;
                    }
                };
                __setFunctionName(_classThis, "Guard");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Guard = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Guard = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            loadComponent: loadComponentSpy,
                            canActivate: [Guard],
                        },
                    ]),
                ],
            });
            testing_1.TestBed.inject(index_1.Router).navigateByUrl('/home');
            yield (0, helpers_1.timeout)();
            expect(loadComponentSpy).not.toHaveBeenCalled();
        }));
        it('loads and renders lazy component', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            loadComponent: () => SimpleStandaloneComponent,
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            testing_1.TestBed.inject(index_1.Router).navigateByUrl('/home');
            yield advanceAsync(root);
            expect(root.nativeElement.innerHTML).toContain('simple standalone');
        }));
        it('throws error when loadComponent is not standalone', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            loadComponent: () => NotStandaloneComponent,
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            yield expectAsync(testing_1.TestBed.inject(index_1.Router).navigateByUrl('/home')).toBeRejectedWithError(/.*home.*component must be standalone/);
        }));
        it('throws error when loadComponent is used with a module', () => __awaiter(void 0, void 0, void 0, function* () {
            let LazyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyModule = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            loadComponent: () => LazyModule,
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            yield expectAsync(testing_1.TestBed.inject(index_1.Router).navigateByUrl('/home')).toBeRejectedWithError(/.*home.*Use 'loadChildren' instead/);
        }));
    });
    describe('default export unwrapping', () => {
        it('should work for loadComponent', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            loadComponent: () => Promise.resolve().then(() => __importStar(require('./default_export_component'))),
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            yield testing_1.TestBed.inject(index_1.Router).navigateByUrl('/home');
            root.detectChanges();
            expect(root.nativeElement.innerHTML).toContain('default exported');
        }));
        it('should work for loadChildren', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        {
                            path: 'home',
                            loadChildren: () => Promise.resolve().then(() => __importStar(require('./default_export_routes'))),
                        },
                    ]),
                ],
            });
            const root = testing_1.TestBed.createComponent(RootCmp);
            yield testing_1.TestBed.inject(index_1.Router).navigateByUrl('/home');
            root.detectChanges();
            expect(root.nativeElement.innerHTML).toContain('default exported');
        }));
    });
});
describe('provideRoutes', () => {
    it('warns if provideRoutes is used without provideRouter, RouterModule, or RouterModule.forRoot', () => {
        spyOn(console, 'warn');
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideRoutes)([])] });
        testing_1.TestBed.inject(index_1.ROUTES);
        expect(console.warn).toHaveBeenCalled();
    });
});
function advanceAsync(fixture) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helpers_1.timeout)();
        fixture.detectChanges();
    });
}
