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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
{
    describe('di metadata examples', () => {
        describe('Inject', () => {
            it('works without decorator', () => {
                // #docregion InjectWithoutDecorator
                class Engine {
                }
                let Car = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Car = _classThis = class {
                        constructor(engine) {
                            this.engine = engine;
                        } // same as constructor(@Inject(Engine) engine:Engine)
                    };
                    __setFunctionName(_classThis, "Car");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Car = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Car = _classThis;
                })();
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: Engine, deps: [] },
                        { provide: Car, deps: [Engine] },
                    ],
                });
                expect(injector.get(Car).engine instanceof Engine).toBe(true);
                // #enddocregion
            });
        });
        describe('Optional', () => {
            it('works', () => {
                // #docregion Optional
                class Engine {
                }
                let Car = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Car = _classThis = class {
                        constructor(engine) {
                            this.engine = engine;
                        }
                    };
                    __setFunctionName(_classThis, "Car");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Car = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Car = _classThis;
                })();
                const injector = core_1.Injector.create({
                    providers: [{ provide: Car, deps: [[new core_1.Optional(), Engine]] }],
                });
                expect(injector.get(Car).engine).toBeNull();
                // #enddocregion
            });
        });
        describe('Injectable', () => {
            it('works', () => {
                // #docregion Injectable
                let UsefulService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var UsefulService = _classThis = class {
                    };
                    __setFunctionName(_classThis, "UsefulService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        UsefulService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return UsefulService = _classThis;
                })();
                let NeedsService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NeedsService = _classThis = class {
                        constructor(service) {
                            this.service = service;
                        }
                    };
                    __setFunctionName(_classThis, "NeedsService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NeedsService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NeedsService = _classThis;
                })();
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: NeedsService, deps: [UsefulService] },
                        { provide: UsefulService, deps: [] },
                    ],
                });
                expect(injector.get(NeedsService).service instanceof UsefulService).toBe(true);
                // #enddocregion
            });
        });
        describe('Self', () => {
            it('works', () => {
                // #docregion Self
                class Dependency {
                }
                let NeedsDependency = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NeedsDependency = _classThis = class {
                        constructor(dependency) {
                            this.dependency = dependency;
                        }
                    };
                    __setFunctionName(_classThis, "NeedsDependency");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NeedsDependency = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NeedsDependency = _classThis;
                })();
                let inj = core_1.Injector.create({
                    providers: [
                        { provide: Dependency, deps: [] },
                        { provide: NeedsDependency, deps: [[new core_1.Self(), Dependency]] },
                    ],
                });
                const nd = inj.get(NeedsDependency);
                expect(nd.dependency instanceof Dependency).toBe(true);
                const child = core_1.Injector.create({
                    providers: [{ provide: NeedsDependency, deps: [[new core_1.Self(), Dependency]] }],
                    parent: inj,
                });
                expect(() => child.get(NeedsDependency)).toThrowError();
                // #enddocregion
            });
        });
        describe('SkipSelf', () => {
            it('works', () => {
                // #docregion SkipSelf
                class Dependency {
                }
                let NeedsDependency = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NeedsDependency = _classThis = class {
                        constructor(dependency) {
                            this.dependency = dependency;
                        }
                    };
                    __setFunctionName(_classThis, "NeedsDependency");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NeedsDependency = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NeedsDependency = _classThis;
                })();
                const parent = core_1.Injector.create({ providers: [{ provide: Dependency, deps: [] }] });
                const child = core_1.Injector.create({
                    providers: [{ provide: NeedsDependency, deps: [Dependency] }],
                    parent,
                });
                expect(child.get(NeedsDependency).dependency instanceof Dependency).toBe(true);
                const inj = core_1.Injector.create({
                    providers: [{ provide: NeedsDependency, deps: [[new core_1.Self(), Dependency]] }],
                });
                expect(() => inj.get(NeedsDependency)).toThrowError();
                // #enddocregion
            });
        });
        describe('Host', () => {
            it('works', () => {
                // #docregion Host
                class OtherService {
                }
                class HostService {
                }
                let ChildDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'child-directive',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildDirective = _classThis = class {
                        constructor(os, hs) {
                            this.logs = [];
                            // os is null: true
                            this.logs.push(`os is null: ${os === null}`);
                            // hs is an instance of HostService: true
                            this.logs.push(`hs is an instance of HostService: ${hs instanceof HostService}`);
                        }
                    };
                    __setFunctionName(_classThis, "ChildDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildDirective = _classThis;
                })();
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            viewProviders: [HostService],
                            template: '<child-directive></child-directive>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentCmp = _classThis = class {
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
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            viewProviders: [OtherService],
                            template: '<parent-cmp></parent-cmp>',
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
                // #enddocregion
                testing_1.TestBed.configureTestingModule({
                    declarations: [App, ParentCmp, ChildDirective],
                });
                let cmp = undefined;
                expect(() => (cmp = testing_1.TestBed.createComponent(App))).not.toThrow();
                expect(cmp.debugElement.children[0].children[0].injector.get(ChildDirective).logs).toEqual([
                    'os is null: true',
                    'hs is an instance of HostService: true',
                ]);
            });
        });
    });
}
