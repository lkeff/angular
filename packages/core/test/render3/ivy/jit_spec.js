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
const core_1 = require("../../../src/core");
const injectable_1 = require("../../../src/di/injectable");
const injector_compatibility_1 = require("../../../src/di/injector_compatibility");
const defs_1 = require("../../../src/di/interface/defs");
const input_flags_1 = require("../../../src/render3/interfaces/input_flags");
describe('render3 jit', () => {
    let injector;
    beforeAll(() => {
        injector = (0, injector_compatibility_1.setCurrentInjector)(null);
    });
    afterAll(() => {
        (0, injector_compatibility_1.setCurrentInjector)(injector);
    });
    it('compiles a component', () => {
        let SomeCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'test',
                    selector: 'test-cmp',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeCmp = _classThis;
        })();
        const SomeCmpAny = SomeCmp;
        expect(SomeCmpAny.ɵcmp).toBeDefined();
        expect(SomeCmpAny.ɵfac() instanceof SomeCmp).toBe(true);
    });
    it('compiles a partially compiled component with split dependencies', () => {
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner-cmp',
                    template: 'Inner!',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        class OuterCmp {
        }
        OuterCmp.ɵcmp = (0, core_1.ɵɵngDeclareComponent)({
            template: '<inner-cmp></inner-cmp>',
            version: '18.0.0',
            type: OuterCmp,
            components: [
                {
                    type: InnerCmp,
                    selector: 'inner-cmp',
                },
            ],
        });
        const rawDirectiveDefs = OuterCmp.ɵcmp.directiveDefs;
        expect(rawDirectiveDefs).not.toBeNull();
        const directiveDefs = rawDirectiveDefs instanceof Function ? rawDirectiveDefs() : rawDirectiveDefs;
        expect(directiveDefs.length).toBe(1);
        expect(directiveDefs[0].type).toBe(InnerCmp);
    });
    it('compiles a partially compiled component with unified dependencies', () => {
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner-cmp',
                    template: 'Inner!',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        class OuterCmp {
        }
        OuterCmp.ɵcmp = (0, core_1.ɵɵngDeclareComponent)({
            template: '<inner-cmp></inner-cmp>',
            type: OuterCmp,
            version: '18.0.0',
            dependencies: [
                {
                    kind: 'component',
                    type: InnerCmp,
                    selector: 'inner-cmp',
                },
            ],
        });
        const rawDirectiveDefs = OuterCmp.ɵcmp.directiveDefs;
        expect(rawDirectiveDefs).not.toBeNull();
        const directiveDefs = rawDirectiveDefs instanceof Function ? rawDirectiveDefs() : rawDirectiveDefs;
        expect(directiveDefs.length).toBe(1);
        expect(directiveDefs[0].type).toBe(InnerCmp);
    });
    it('compiles an injectable with a type provider', () => {
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
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
        const ServiceAny = Service;
        expect(ServiceAny.ɵprov).toBeDefined();
        expect(ServiceAny.ɵprov.providedIn).toBe('root');
        expect((0, injector_compatibility_1.ɵɵinject)(Service) instanceof Service).toBe(true);
    });
    it('compiles an injectable with a useValue provider', () => {
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useValue: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
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
        expect((0, injector_compatibility_1.ɵɵinject)(Service)).toBe('test');
    });
    it('compiles an injectable with a useExisting provider', () => {
        let Existing = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useValue: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Existing = _classThis = class {
            };
            __setFunctionName(_classThis, "Existing");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Existing = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Existing = _classThis;
        })();
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useExisting: Existing })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
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
        expect((0, injector_compatibility_1.ɵɵinject)(Service)).toBe('test');
    });
    it('compiles an injectable with a useFactory provider, without deps', () => {
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useFactory: () => 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
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
        expect((0, injector_compatibility_1.ɵɵinject)(Service)).toBe('test');
    });
    it('compiles an injectable with a useFactory provider, with deps', () => {
        let Existing = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useValue: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Existing = _classThis = class {
            };
            __setFunctionName(_classThis, "Existing");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Existing = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Existing = _classThis;
        })();
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useFactory: (existing) => existing, deps: [Existing] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
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
        expect((0, injector_compatibility_1.ɵɵinject)(Service)).toBe('test');
    });
    it('compiles an injectable with a useClass provider, with deps', () => {
        let Existing = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useValue: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Existing = _classThis = class {
            };
            __setFunctionName(_classThis, "Existing");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Existing = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Existing = _classThis;
        })();
        class Other {
            constructor(value) {
                this.value = value;
            }
        }
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useClass: Other, deps: [Existing] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                get value() {
                    return null;
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
        const ServiceAny = Service;
        expect((0, injector_compatibility_1.ɵɵinject)(Service).value).toBe('test');
    });
    it('compiles an injectable with a useClass provider, without deps', () => {
        let _value = 1;
        let Existing = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Existing = _classThis = class {
                constructor() {
                    this.value = _value++;
                }
            };
            __setFunctionName(_classThis, "Existing");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Existing = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Existing = _classThis;
        })();
        let Service = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root', useClass: Existing })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                get value() {
                    return 0;
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
        expect((0, injector_compatibility_1.ɵɵinject)(Existing).value).toBe(1);
        const injected = (0, injector_compatibility_1.ɵɵinject)(Service);
        expect(injected instanceof Existing).toBe(true);
        expect(injected.value).toBe(2);
    });
    it('compiles an injectable with an inherited constructor', () => {
        let Dep = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dep = _classThis = class {
            };
            __setFunctionName(_classThis, "Dep");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dep = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dep = _classThis;
        })();
        let Base = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Base = _classThis = class {
                constructor(dep) {
                    this.dep = dep;
                }
            };
            __setFunctionName(_classThis, "Base");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Base = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Base = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = Base;
            var Child = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        expect((0, injector_compatibility_1.ɵɵinject)(Child).dep instanceof Dep).toBe(true);
    });
    it('compiles a module to a definition', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'foo',
                    selector: 'foo',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [Cmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        const moduleDef = Module.ɵmod;
        expect(moduleDef).toBeDefined();
        if (!Array.isArray(moduleDef.declarations)) {
            return fail('Expected an array');
        }
        expect(moduleDef.declarations.length).toBe(1);
        expect(moduleDef.declarations[0]).toBe(Cmp);
    });
    it('compiles a module with forwardRef', () => {
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [(0, core_1.forwardRef)(() => Cmp)],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'foo',
                    selector: 'foo',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        const componentDef = Cmp.ɵcmp;
        expect(componentDef).toBeDefined();
        expect(componentDef.schemas).toBeInstanceOf(Array);
    });
    it('compiles a module with an id and registers it correctly', () => {
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    id: 'test',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        const moduleDef = Module.ɵmod;
        expect(moduleDef).toBeDefined();
        if (!Array.isArray(moduleDef.declarations)) {
            return fail('Expected an array');
        }
        expect(moduleDef.id).toBe('test');
        expect((0, core_1.getNgModuleById)('test')).toBe(Module);
    });
    it('compiles a module to an ɵinj with the providers', () => {
        class Token {
        }
        Token.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
            token: Token,
            providedIn: 'root',
            factory: () => 'default',
        });
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: Token, useValue: 'test' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
                constructor(token) {
                    this.token = token;
                }
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        const factory = Module.ɵfac;
        const instance = factory();
        // Since the instance was created outside of an injector using the module, the
        // injection will use the default provider, not the provider from the module.
        expect(instance.token).toBe('default');
        const injectorDef = Module.ɵinj;
        expect(injectorDef.providers).toEqual([{ provide: Token, useValue: 'test' }]);
    });
    it('patches a module onto the component', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'foo',
                    selector: 'foo',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        const cmpDef = Cmp.ɵcmp;
        expect(cmpDef.directiveDefs).toBeNull();
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [Cmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        const moduleDef = Module.ɵmod;
        // directive defs are still null, since no directives were in that component
        expect(cmpDef.directiveDefs).toBeNull();
    });
    it('should add hostbindings and hostlisteners', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'foo',
                    selector: 'foo',
                    host: {
                        '[class.red]': 'isRed',
                        '(click)': 'onClick()',
                    },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _green_decorators;
            let _green_initializers = [];
            let _green_extraInitializers = [];
            let _onChange_decorators;
            var Cmp = _classThis = class {
                onChange(event) { }
                constructor() {
                    this.green = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _green_initializers, false));
                    __runInitializers(this, _green_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _green_decorators = [(0, core_1.HostBinding)('class.green')];
                _onChange_decorators = [(0, core_1.HostListener)('change', ['$event'])];
                __esDecorate(_classThis, null, _onChange_decorators, { kind: "method", name: "onChange", static: false, private: false, access: { has: obj => "onChange" in obj, get: obj => obj.onChange }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, null, _green_decorators, { kind: "field", name: "green", static: false, private: false, access: { has: obj => "green" in obj, get: obj => obj.green, set: (obj, value) => { obj.green = value; } }, metadata: _metadata }, _green_initializers, _green_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        const cmpDef = Cmp.ɵcmp;
        expect(cmpDef.hostBindings).toBeDefined();
        expect(cmpDef.hostBindings.length).toBe(2);
    });
    it('should compile @Pipes without errors', () => {
        let P = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'test-pipe',
                    pure: false,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var P = _classThis = class {
            };
            __setFunctionName(_classThis, "P");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                P = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return P = _classThis;
        })();
        const pipeDef = P.ɵpipe;
        const pipeFactory = P.ɵfac;
        expect(pipeDef.name).toBe('test-pipe');
        expect(pipeDef.pure).toBe(false, 'pipe should not be pure');
        expect(pipeFactory() instanceof P).toBe(true, 'factory() should create an instance of the pipe');
    });
    it('should default @Pipe to pure: true', () => {
        let P = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'test-pipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var P = _classThis = class {
            };
            __setFunctionName(_classThis, "P");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                P = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return P = _classThis;
        })();
        const pipeDef = P.ɵpipe;
        expect(pipeDef.pure).toBe(true, 'pipe should be pure');
    });
    it('should add @Input properties to a component', () => {
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _privateName_decorators;
            let _privateName_initializers = [];
            let _privateName_extraInitializers = [];
            var InputComp = _classThis = class {
                constructor() {
                    this.privateName = __runInitializers(this, _privateName_initializers, 'name1');
                    __runInitializers(this, _privateName_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _privateName_decorators = [(0, core_1.Input)('publicName')];
                __esDecorate(null, null, _privateName_decorators, { kind: "field", name: "privateName", static: false, private: false, access: { has: obj => "privateName" in obj, get: obj => obj.privateName, set: (obj, value) => { obj.privateName = value; } }, metadata: _metadata }, _privateName_initializers, _privateName_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        const InputCompAny = InputComp;
        expect(InputCompAny.ɵcmp.inputs).toEqual({ publicName: ['privateName', input_flags_1.InputFlags.None, null] });
        expect(InputCompAny.ɵcmp.declaredInputs).toEqual({ publicName: 'privateName' });
    });
    it('should add @Input properties to a directive', () => {
        let InputDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _privateName_decorators;
            let _privateName_initializers = [];
            let _privateName_extraInitializers = [];
            var InputDir = _classThis = class {
                constructor() {
                    this.privateName = __runInitializers(this, _privateName_initializers, 'name1');
                    __runInitializers(this, _privateName_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "InputDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _privateName_decorators = [(0, core_1.Input)('publicName')];
                __esDecorate(null, null, _privateName_decorators, { kind: "field", name: "privateName", static: false, private: false, access: { has: obj => "privateName" in obj, get: obj => obj.privateName, set: (obj, value) => { obj.privateName = value; } }, metadata: _metadata }, _privateName_initializers, _privateName_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputDir = _classThis;
        })();
        const InputDirAny = InputDir;
        expect(InputDirAny.ɵdir.inputs).toEqual({ publicName: ['privateName', input_flags_1.InputFlags.None, null] });
        expect(InputDirAny.ɵdir.declaredInputs).toEqual({ publicName: 'privateName' });
    });
    it('should compile ContentChildren query with string predicate on a directive', () => {
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _foos_decorators;
            let _foos_initializers = [];
            let _foos_extraInitializers = [];
            var TestDirective = _classThis = class {
                constructor() {
                    this.foos = __runInitializers(this, _foos_initializers, void 0);
                    __runInitializers(this, _foos_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _foos_decorators = [(0, core_1.ContentChildren)('foo')];
                __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        expect(TestDirective.ɵdir.contentQueries).not.toBeNull();
    });
    it('should compile ContentChild query with string predicate on a directive', () => {
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _foo_decorators;
            let _foo_initializers = [];
            let _foo_extraInitializers = [];
            var TestDirective = _classThis = class {
                constructor() {
                    this.foo = __runInitializers(this, _foo_initializers, void 0);
                    __runInitializers(this, _foo_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _foo_decorators = [(0, core_1.ContentChild)('foo')];
                __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        expect(TestDirective.ɵdir.contentQueries).not.toBeNull();
    });
    it('should compile ContentChildren query with type predicate on a directive', () => {
        class SomeDir {
        }
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dirs_decorators;
            let _dirs_initializers = [];
            let _dirs_extraInitializers = [];
            var TestDirective = _classThis = class {
                constructor() {
                    this.dirs = __runInitializers(this, _dirs_initializers, void 0);
                    __runInitializers(this, _dirs_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dirs_decorators = [(0, core_1.ContentChildren)(SomeDir)];
                __esDecorate(null, null, _dirs_decorators, { kind: "field", name: "dirs", static: false, private: false, access: { has: obj => "dirs" in obj, get: obj => obj.dirs, set: (obj, value) => { obj.dirs = value; } }, metadata: _metadata }, _dirs_initializers, _dirs_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        expect(TestDirective.ɵdir.contentQueries).not.toBeNull();
    });
    it('should compile ContentChild query with type predicate on a directive', () => {
        class SomeDir {
        }
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var TestDirective = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ContentChild)(SomeDir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        expect(TestDirective.ɵdir.contentQueries).not.toBeNull();
    });
    it('should compile ViewChild query on a component', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _foo_decorators;
            let _foo_initializers = [];
            let _foo_extraInitializers = [];
            var TestComponent = _classThis = class {
                constructor() {
                    this.foo = __runInitializers(this, _foo_initializers, void 0);
                    __runInitializers(this, _foo_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _foo_decorators = [(0, core_1.ViewChild)('foo')];
                __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        expect(TestComponent.ɵcmp.foo).not.toBeNull();
    });
    it('should compile ViewChildren query on a component', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _foos_decorators;
            let _foos_initializers = [];
            let _foos_extraInitializers = [];
            var TestComponent = _classThis = class {
                constructor() {
                    this.foos = __runInitializers(this, _foos_initializers, void 0);
                    __runInitializers(this, _foos_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _foos_decorators = [(0, core_1.ViewChildren)('foo')];
                __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        expect(TestComponent.ɵcmp.viewQuery).not.toBeNull();
    });
    describe('invalid parameters', () => {
        it('should error when creating an @Injectable that extends a class with a faulty parameter', () => {
            let Legit = (() => {
                let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Legit = _classThis = class {
                };
                __setFunctionName(_classThis, "Legit");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Legit = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Legit = _classThis;
            })();
            let Base = (() => {
                let _classDecorators = [(0, injectable_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Base = _classThis = class {
                    constructor(first, second) { }
                };
                __setFunctionName(_classThis, "Base");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Base = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Base = _classThis;
            })();
            let Service = (() => {
                let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Base;
                var Service = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            const ServiceAny = Service;
            expect(ServiceAny.ɵprov).toBeDefined();
            expect(ServiceAny.ɵprov.providedIn).toBe('root');
            expect(() => (0, injector_compatibility_1.ɵɵinject)(Service)).toThrowError(/constructor is not compatible with Angular Dependency Injection because its dependency at index 1 of the parameter list is invalid/);
        });
        it('should error when creating an @Directive that extends an undecorated class with parameters', () => {
            let Legit = (() => {
                let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Legit = _classThis = class {
                };
                __setFunctionName(_classThis, "Legit");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Legit = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Legit = _classThis;
            })();
            class BaseDir {
                constructor(first) { }
            }
            let TestDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'test',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = BaseDir;
                var TestDir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "TestDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDir = _classThis;
            })();
            const TestDirAny = TestDir;
            expect(TestDirAny.ɵfac).toBeDefined();
            expect(() => TestDirAny.ɵfac()).toThrowError(/constructor is not compatible with Angular Dependency Injection because its dependency at index 0 of the parameter list is invalid/);
        });
    });
});
it('ensure at least one spec exists', () => { });
