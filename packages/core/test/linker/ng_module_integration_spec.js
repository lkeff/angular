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
const defs_1 = require("../../src/di/interface/defs");
const def_getters_1 = require("../../src/render3/def_getters");
const testing_1 = require("../../testing");
const ng_module_factory_1 = require("../../src/linker/ng_module_factory");
const ng_module_registration_1 = require("../../src/linker/ng_module_registration");
const stringify_1 = require("../../src/util/stringify");
class Engine {
}
class TurboEngine extends Engine {
}
const CARS = new core_1.InjectionToken('Cars');
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
let CarWithOptionalEngine = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CarWithOptionalEngine = _classThis = class {
        constructor(engine) {
            this.engine = engine;
        }
    };
    __setFunctionName(_classThis, "CarWithOptionalEngine");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CarWithOptionalEngine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CarWithOptionalEngine = _classThis;
})();
let SportsCar = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Car;
    var SportsCar = _classThis = class extends _classSuper {
        constructor(engine) {
            super(engine);
        }
    };
    __setFunctionName(_classThis, "SportsCar");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SportsCar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SportsCar = _classThis;
})();
let CarWithInject = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CarWithInject = _classThis = class {
        constructor(engine) {
            this.engine = engine;
        }
    };
    __setFunctionName(_classThis, "CarWithInject");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CarWithInject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CarWithInject = _classThis;
})();
let CyclicEngine = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CyclicEngine = _classThis = class {
        constructor(car) { }
    };
    __setFunctionName(_classThis, "CyclicEngine");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CyclicEngine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CyclicEngine = _classThis;
})();
class NoAnnotations {
    constructor(secretDependency) { }
}
let SomeComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeComp = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeComp = _classThis;
})();
let SomeDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[someDir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _someDir_decorators;
    let _someDir_initializers = [];
    let _someDir_extraInitializers = [];
    var SomeDirective = _classThis = class {
        constructor() {
            this.someDir = __runInitializers(this, _someDir_initializers, void 0);
            __runInitializers(this, _someDir_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SomeDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _someDir_decorators = [(0, core_1.HostBinding)('title'), (0, core_1.Input)()];
        __esDecorate(null, null, _someDir_decorators, { kind: "field", name: "someDir", static: false, private: false, access: { has: obj => "someDir" in obj, get: obj => obj.someDir, set: (obj, value) => { obj.someDir = value; } }, metadata: _metadata }, _someDir_initializers, _someDir_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeDirective = _classThis;
})();
let SomePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'somePipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomePipe = _classThis = class {
        transform(value) {
            return `transformed ${value}`;
        }
    };
    __setFunctionName(_classThis, "SomePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomePipe = _classThis;
})();
let CompUsingModuleDirectiveAndPipe = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp',
            template: `<div  [someDir]="'someValue' | somePipe"></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CompUsingModuleDirectiveAndPipe = _classThis = class {
    };
    __setFunctionName(_classThis, "CompUsingModuleDirectiveAndPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompUsingModuleDirectiveAndPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompUsingModuleDirectiveAndPipe = _classThis;
})();
describe('NgModule', () => {
    let compiler;
    let injector;
    beforeEach((0, testing_1.inject)([core_1.Compiler, core_1.Injector], (_compiler, _injector) => {
        compiler = _compiler;
        injector = _injector;
    }));
    function createModuleFactory(moduleType) {
        return compiler.compileModuleSync(moduleType);
    }
    function createModule(moduleType, parentInjector) {
        // Read the `ngModuleDef` to cause it to be compiled and any errors thrown.
        (0, def_getters_1.getNgModuleDef)(moduleType);
        return createModuleFactory(moduleType).create(parentInjector || null);
    }
    function createComp(compType, moduleType) {
        const componentDef = compType.ɵcmp;
        if (componentDef) {
            // Since we avoid Components/Directives/Pipes recompiling in case there are no overrides, we
            // may face a problem where previously compiled defs available to a given
            // Component/Directive are cached in TView and may become stale (in case any of these defs
            // gets recompiled). In order to avoid this problem, we force fresh TView to be created.
            componentDef.TView = null;
        }
        createModule(moduleType, injector);
        return testing_1.TestBed.createComponent(compType);
    }
    describe('errors', () => {
        it('should error when exporting a directive that was neither declared nor imported', () => {
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ exports: [SomeDirective] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            expect(() => createModule(SomeModule)).toThrowError(`Can't export directive ${(0, stringify_1.stringify)(SomeDirective)} from ${(0, stringify_1.stringify)(SomeModule)} as it was neither declared nor imported!`);
        });
        it('should error when exporting a pipe that was neither declared nor imported', () => {
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ exports: [SomePipe] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            expect(() => createModule(SomeModule)).toThrowError(`Can't export pipe ${(0, stringify_1.stringify)(SomePipe)} from ${(0, stringify_1.stringify)(SomeModule)} as it was neither declared nor imported!`);
        });
        it('should error if a directive is declared in more than 1 module', () => {
            let Module1 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module1 = _classThis;
            })();
            let Module2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module2 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module2 = _classThis;
            })();
            createModule(Module1);
            expect(() => createModule(Module2)).toThrowError(`Type ${(0, stringify_1.stringify)(SomeDirective)} is part of the declarations of 2 modules: ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}! ` +
                `Please consider moving ${(0, stringify_1.stringify)(SomeDirective)} to a higher module that imports ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}. ` +
                `You can also create a new NgModule that exports and includes ${(0, stringify_1.stringify)(SomeDirective)} then import that NgModule in ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}.`);
        });
        it('should error if a directive is declared in more than 1 module also if the module declaring it is imported', () => {
            let Module1 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective], exports: [SomeDirective] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module1 = _classThis;
            })();
            let Module2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective], imports: [Module1] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module2 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module2 = _classThis;
            })();
            expect(() => createModule(Module2)).toThrowError(`Type ${(0, stringify_1.stringify)(SomeDirective)} is part of the declarations of 2 modules: ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}! ` +
                `Please consider moving ${(0, stringify_1.stringify)(SomeDirective)} to a higher module that imports ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}. ` +
                `You can also create a new NgModule that exports and includes ${(0, stringify_1.stringify)(SomeDirective)} then import that NgModule in ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}.`);
        });
        it('should error if a pipe is declared in more than 1 module', () => {
            let Module1 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomePipe] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module1 = _classThis;
            })();
            let Module2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomePipe] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module2 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module2 = _classThis;
            })();
            createModule(Module1);
            expect(() => createModule(Module2)).toThrowError(`Type ${(0, stringify_1.stringify)(SomePipe)} is part of the declarations of 2 modules: ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}! ` +
                `Please consider moving ${(0, stringify_1.stringify)(SomePipe)} to a higher module that imports ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}. ` +
                `You can also create a new NgModule that exports and includes ${(0, stringify_1.stringify)(SomePipe)} then import that NgModule in ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}.`);
        });
        it('should error if a pipe is declared in more than 1 module also if the module declaring it is imported', () => {
            let Module1 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomePipe], exports: [SomePipe] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module1 = _classThis;
            })();
            let Module2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomePipe], imports: [Module1] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module2 = _classThis = class {
                };
                __setFunctionName(_classThis, "Module2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module2 = _classThis;
            })();
            expect(() => createModule(Module2)).toThrowError(`Type ${(0, stringify_1.stringify)(SomePipe)} is part of the declarations of 2 modules: ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}! ` +
                `Please consider moving ${(0, stringify_1.stringify)(SomePipe)} to a higher module that imports ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}. ` +
                `You can also create a new NgModule that exports and includes ${(0, stringify_1.stringify)(SomePipe)} then import that NgModule in ${(0, stringify_1.stringify)(Module1)} and ${(0, stringify_1.stringify)(Module2)}.`);
        });
    });
    describe('schemas', () => {
        it('should error on unknown bound properties on custom elements by default', () => {
            let ComponentUsingInvalidProperty = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div [someUnknownProp]="true"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentUsingInvalidProperty = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentUsingInvalidProperty");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentUsingInvalidProperty = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentUsingInvalidProperty = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [ComponentUsingInvalidProperty] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            const spy = spyOn(console, 'error');
            const fixture = createComp(ComponentUsingInvalidProperty, SomeModule);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'someUnknownProp'/);
        });
        it('should not error on unknown bound properties on custom elements when using the CUSTOM_ELEMENTS_SCHEMA', () => {
            let ComponentUsingInvalidProperty = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<some-element [someUnknownProp]="true"></some-element>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentUsingInvalidProperty = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentUsingInvalidProperty");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentUsingInvalidProperty = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentUsingInvalidProperty = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                        declarations: [ComponentUsingInvalidProperty],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            expect(() => {
                const fixture = createComp(ComponentUsingInvalidProperty, SomeModule);
                fixture.detectChanges();
            }).not.toThrow();
        });
    });
    describe('id', () => {
        const token = 'myid';
        afterEach(() => (0, ng_module_registration_1.clearModulesForTest)());
        it('should register loaded modules', () => {
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ id: token })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            createModule(SomeModule);
            const moduleType = (0, core_1.getNgModuleById)(token);
            expect(moduleType).toBeTruthy();
            expect(moduleType).toBe(SomeModule);
            const factory = (0, core_1.getModuleFactory)(token);
            expect(factory).toBeTruthy();
            expect(factory.moduleType).toBe(SomeModule);
        });
        it('should throw when registering a duplicate module', () => {
            // TestBed disables the error that's being tested here, so temporarily re-enable it.
            (0, ng_module_registration_1.setAllowDuplicateNgModuleIdsForTest)(false);
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ id: token })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            createModule(SomeModule);
            expect(() => {
                let SomeOtherModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ id: token })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeOtherModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeOtherModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeOtherModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeOtherModule = _classThis;
                })();
                createModule(SomeOtherModule);
            }).toThrowError(/Duplicate module registered/);
            // Re-disable the error.
            (0, ng_module_registration_1.setAllowDuplicateNgModuleIdsForTest)(true);
        });
        it('should register a module even if not importing the .ngfactory file or calling create()', () => {
            let ChildModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ id: 'child' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildModule = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        id: 'test',
                        imports: [ChildModule],
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
            // Verify that we can retrieve NgModule factory by id.
            expect((0, core_1.getModuleFactory)('child')).toBeInstanceOf(ng_module_factory_1.NgModuleFactory);
            // Verify that we can also retrieve NgModule class by id.
            const moduleType = (0, core_1.getNgModuleById)('child');
            expect(moduleType).toBeTruthy();
            expect(moduleType).toBe(ChildModule);
        });
    });
    describe('bootstrap components', () => {
        it('should create ComponentFactories', () => {
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeComp], bootstrap: [SomeComp] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            const ngModule = createModule(SomeModule);
            expect(ngModule.componentFactoryResolver.resolveComponentFactory(SomeComp).componentType).toBe(SomeComp);
        });
        it('should store the ComponentFactories in the NgModuleInjector', () => {
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeComp], bootstrap: [SomeComp] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            const ngModule = createModule(SomeModule);
            expect(ngModule._bootstrapComponents.length).toBe(1);
            expect(ngModule._bootstrapComponents[0]).toBe(SomeComp);
        });
    });
    describe('directives and pipes', () => {
        describe('declarations', () => {
            it('should be supported in root modules', () => {
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompUsingModuleDirectiveAndPipe, SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should be supported in imported modules', () => {
                let SomeImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompUsingModuleDirectiveAndPipe, SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [SomeImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should be supported in nested components', () => {
                let ParentCompUsingModuleDirectiveAndPipe = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent',
                            template: '<comp></comp>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentCompUsingModuleDirectiveAndPipe = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ParentCompUsingModuleDirectiveAndPipe");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ParentCompUsingModuleDirectiveAndPipe = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ParentCompUsingModuleDirectiveAndPipe = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [
                                ParentCompUsingModuleDirectiveAndPipe,
                                CompUsingModuleDirectiveAndPipe,
                                SomeDirective,
                                SomePipe,
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(ParentCompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].children[0].properties['title']).toBe('transformed someValue');
            });
        });
        describe('import/export', () => {
            it('should support exported directives and pipes', () => {
                let SomeImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompUsingModuleDirectiveAndPipe], imports: [SomeImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should support exported directives and pipes if the module is wrapped into an `ModuleWithProviders`', () => {
                let SomeImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [CompUsingModuleDirectiveAndPipe],
                            imports: [{ ngModule: SomeImportedModule }],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should support reexported modules', () => {
                let SomeReexportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeReexportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeReexportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeReexportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeReexportedModule = _classThis;
                })();
                let SomeImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [SomeReexportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompUsingModuleDirectiveAndPipe], imports: [SomeImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should support exporting individual directives of an imported module', () => {
                let SomeReexportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeReexportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeReexportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeReexportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeReexportedModule = _classThis;
                })();
                let SomeImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [SomeReexportedModule], exports: [SomeDirective, SomePipe] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompUsingModuleDirectiveAndPipe], imports: [SomeImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                compFixture.detectChanges();
                expect(compFixture.debugElement.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should not use non exported pipes of an imported module', () => {
                let SomeImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [SomePipe],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompUsingModuleDirectiveAndPipe], imports: [SomeImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                expect(() => createComp(CompUsingModuleDirectiveAndPipe, SomeModule)).toThrowError(/The pipe 'somePipe' could not be found/);
            });
        });
    });
    describe('providers', function () {
        let moduleType = null;
        function createInjector(providers, parent) {
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: providers })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            moduleType = SomeModule;
            return createModule(SomeModule, parent).injector;
        }
        it('should provide the module', () => {
            expect(createInjector([]).get(moduleType)).toBeInstanceOf(moduleType);
        });
        it('should instantiate a class without dependencies', () => {
            const injector = createInjector([Engine]);
            const engine = injector.get(Engine);
            expect(engine).toBeInstanceOf(Engine);
        });
        it('should resolve dependencies based on type information', () => {
            const injector = createInjector([Engine, Car]);
            const car = injector.get(Car);
            expect(car).toBeInstanceOf(Car);
            expect(car.engine).toBeInstanceOf(Engine);
        });
        it('should resolve dependencies based on @Inject annotation', () => {
            const injector = createInjector([TurboEngine, Engine, CarWithInject]);
            const car = injector.get(CarWithInject);
            expect(car).toBeInstanceOf(CarWithInject);
            expect(car.engine).toBeInstanceOf(TurboEngine);
        });
        it('should throw when no type and not @Inject (class case)', () => {
            expect(() => createInjector([NoAnnotations])).toThrowError("NG0204: Can't resolve all parameters for NoAnnotations: (?).");
        });
        it('should cache instances', () => {
            const injector = createInjector([Engine]);
            const e1 = injector.get(Engine);
            const e2 = injector.get(Engine);
            expect(e1).toBe(e2);
        });
        it('should provide to a value', () => {
            const injector = createInjector([{ provide: Engine, useValue: 'fake engine' }]);
            const engine = injector.get(Engine);
            expect(engine).toEqual('fake engine');
        });
        it('should provide to a factory', () => {
            function sportsCarFactory(e) {
                return new SportsCar(e);
            }
            const injector = createInjector([
                Engine,
                { provide: Car, useFactory: sportsCarFactory, deps: [Engine] },
            ]);
            const car = injector.get(Car);
            expect(car).toBeInstanceOf(SportsCar);
            expect(car.engine).toBeInstanceOf(Engine);
        });
        it('should supporting provider to null', () => {
            const injector = createInjector([{ provide: Engine, useValue: null }]);
            const engine = injector.get(Engine);
            expect(engine).toBeNull();
        });
        it('should provide to an alias', () => {
            const injector = createInjector([
                Engine,
                { provide: SportsCar, useClass: SportsCar },
                { provide: Car, useExisting: SportsCar },
            ]);
            const car = injector.get(Car);
            const sportsCar = injector.get(SportsCar);
            expect(car).toBeInstanceOf(SportsCar);
            expect(car).toBe(sportsCar);
        });
        it('should support multiProviders', () => {
            const injector = createInjector([
                Engine,
                { provide: CARS, useClass: SportsCar, multi: true },
                { provide: CARS, useClass: CarWithOptionalEngine, multi: true },
            ]);
            const cars = injector.get(CARS);
            expect(cars.length).toEqual(2);
            expect(cars[0]).toBeInstanceOf(SportsCar);
            expect(cars[1]).toBeInstanceOf(CarWithOptionalEngine);
        });
        it('should support multiProviders that are created using useExisting', () => {
            const injector = createInjector([
                Engine,
                SportsCar,
                { provide: CARS, useExisting: SportsCar, multi: true },
            ]);
            const cars = injector.get(CARS);
            expect(cars.length).toEqual(1);
            expect(cars[0]).toBe(injector.get(SportsCar));
        });
        it('should throw when the aliased provider does not exist', () => {
            const injector = createInjector([{ provide: 'car', useExisting: SportsCar }]);
            const errorMsg = `R3InjectorError(SomeModule)[car -> ${(0, stringify_1.stringify)(SportsCar)}]: \n  ` +
                `NullInjectorError: No provider for ${(0, stringify_1.stringify)(SportsCar)}!`;
            expect(() => injector.get('car')).toThrowError(errorMsg);
        });
        it('should handle forwardRef in useExisting', () => {
            const injector = createInjector([
                { provide: 'originalEngine', useClass: (0, core_1.forwardRef)(() => Engine) },
                { provide: 'aliasedEngine', useExisting: (0, core_1.forwardRef)(() => 'originalEngine') },
            ]);
            expect(injector.get('aliasedEngine')).toBeInstanceOf(Engine);
        });
        it('should support overriding factory dependencies', () => {
            const injector = createInjector([
                Engine,
                { provide: Car, useFactory: (e) => new SportsCar(e), deps: [Engine] },
            ]);
            const car = injector.get(Car);
            expect(car).toBeInstanceOf(SportsCar);
            expect(car.engine).toBeInstanceOf(Engine);
        });
        it('should support optional dependencies', () => {
            const injector = createInjector([CarWithOptionalEngine]);
            const car = injector.get(CarWithOptionalEngine);
            expect(car.engine).toBeNull();
        });
        it('should flatten passed-in providers', () => {
            const injector = createInjector([[[Engine, Car]]]);
            const car = injector.get(Car);
            expect(car).toBeInstanceOf(Car);
        });
        it('should use the last provider when there are multiple providers for same token', () => {
            const injector = createInjector([
                { provide: Engine, useClass: Engine },
                { provide: Engine, useClass: TurboEngine },
            ]);
            expect(injector.get(Engine)).toBeInstanceOf(TurboEngine);
        });
        it('should use non-type tokens', () => {
            const injector = createInjector([{ provide: 'token', useValue: 'value' }]);
            expect(injector.get('token')).toEqual('value');
        });
        it('should throw when given invalid providers', () => {
            expect(() => createInjector(['blah'])).toThrowError(`Invalid provider for the NgModule 'SomeModule' - only instances of Provider and Type are allowed, got: [?blah?]`);
        });
        it('should throw when given blank providers', () => {
            expect(() => createInjector([null, { provide: 'token', useValue: 'value' }])).toThrowError(`Invalid provider for the NgModule 'SomeModule' - only instances of Provider and Type are allowed, got: [?null?, ...]`);
        });
        it('should provide itself', () => {
            const parent = createInjector([]);
            const child = createInjector([], parent);
            expect(child.get(core_1.Injector)).toBe(child);
        });
        it('should provide undefined', () => {
            let factoryCounter = 0;
            const injector = createInjector([
                {
                    provide: 'token',
                    useFactory: () => {
                        factoryCounter++;
                        return undefined;
                    },
                },
            ]);
            expect(injector.get('token')).toBeUndefined();
            expect(injector.get('token')).toBeUndefined();
            expect(factoryCounter).toBe(1);
        });
        describe('injecting lazy providers into an eager provider via Injector.get', () => {
            it('should inject providers that were declared before it', () => {
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [
                                { provide: 'lazy', useFactory: () => 'lazyValue' },
                                {
                                    provide: 'eager',
                                    useFactory: (i) => `eagerValue: ${i.get('lazy')}`,
                                    deps: [core_1.Injector],
                                },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyModule = _classThis = class {
                        // NgModule is eager, which makes all of its deps eager
                        constructor(eager) { }
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
                expect(createModule(MyModule).injector.get('eager')).toBe('eagerValue: lazyValue');
            });
            it('should inject providers that were declared after it', () => {
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [
                                {
                                    provide: 'eager',
                                    useFactory: (i) => `eagerValue: ${i.get('lazy')}`,
                                    deps: [core_1.Injector],
                                },
                                { provide: 'lazy', useFactory: () => 'lazyValue' },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyModule = _classThis = class {
                        // NgModule is eager, which makes all of its deps eager
                        constructor(eager) { }
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
                expect(createModule(MyModule).injector.get('eager')).toBe('eagerValue: lazyValue');
            });
        });
        describe('injecting eager providers into an eager provider via Injector.get', () => {
            it('should inject providers that were declared before it', () => {
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [
                                { provide: 'eager1', useFactory: () => 'v1' },
                                {
                                    provide: 'eager2',
                                    useFactory: (i) => `v2: ${i.get('eager1')}`,
                                    deps: [core_1.Injector],
                                },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyModule = _classThis = class {
                        // NgModule is eager, which makes all of its deps eager
                        constructor(eager1, eager2) { }
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
                expect(createModule(MyModule).injector.get('eager2')).toBe('v2: v1');
            });
            it('should inject providers that were declared after it', () => {
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [
                                {
                                    provide: 'eager1',
                                    useFactory: (i) => `v1: ${i.get('eager2')}`,
                                    deps: [core_1.Injector],
                                },
                                { provide: 'eager2', useFactory: () => 'v2' },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyModule = _classThis = class {
                        // NgModule is eager, which makes all of its deps eager
                        constructor(eager1, eager2) { }
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
                expect(createModule(MyModule).injector.get('eager1')).toBe('v1: v2');
            });
            it('eager providers should get initialized only once', () => {
                let MyService1 = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyService1 = _classThis = class {
                        constructor(injector) {
                            // Create MyService2 before it's initialized by TestModule.
                            this.innerService = injector.get(MyService2);
                        }
                    };
                    __setFunctionName(_classThis, "MyService1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyService1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyService1 = _classThis;
                })();
                let MyService2 = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyService2 = _classThis = class {
                        constructor() { }
                    };
                    __setFunctionName(_classThis, "MyService2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyService2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyService2 = _classThis;
                })();
                let TestModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [MyService1, MyService2],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestModule = _classThis = class {
                        constructor(service1, service2) {
                            this.service1 = service1;
                            this.service2 = service2;
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
                const moduleRef = createModule(TestModule, injector);
                const module = moduleRef.instance;
                // MyService2 should not get initialized twice.
                expect(module.service1.innerService).toBe(module.service2);
            });
        });
        it('should throw when no provider defined', () => {
            const injector = createInjector([]);
            const errorMsg = `R3InjectorError(SomeModule)[NonExisting]: \n  ` +
                'NullInjectorError: No provider for NonExisting!';
            expect(() => injector.get('NonExisting')).toThrowError(errorMsg);
        });
        it('should throw when trying to instantiate a cyclic dependency', () => {
            expect(() => createInjector([Car, { provide: Engine, useClass: CyclicEngine }]).get(Car)).toThrowError(/NG0200: Circular dependency in DI detected for Car/g);
        });
        it('should support null values', () => {
            const injector = createInjector([{ provide: 'null', useValue: null }]);
            expect(injector.get('null')).toBe(null);
        });
        describe('child', () => {
            it('should load instances from parent injector', () => {
                const parent = createInjector([Engine]);
                const child = createInjector([], parent);
                const engineFromParent = parent.get(Engine);
                const engineFromChild = child.get(Engine);
                expect(engineFromChild).toBe(engineFromParent);
            });
            it('should not use the child providers when resolving the dependencies of a parent provider', () => {
                const parent = createInjector([Car, Engine]);
                const child = createInjector([{ provide: Engine, useClass: TurboEngine }], parent);
                const carFromChild = child.get(Car);
                expect(carFromChild.engine).toBeInstanceOf(Engine);
            });
            it('should create new instance in a child injector', () => {
                const parent = createInjector([Engine]);
                const child = createInjector([{ provide: Engine, useClass: TurboEngine }], parent);
                const engineFromParent = parent.get(Engine);
                const engineFromChild = child.get(Engine);
                expect(engineFromParent).not.toBe(engineFromChild);
                expect(engineFromChild).toBeInstanceOf(TurboEngine);
            });
        });
        describe('dependency resolution', () => {
            describe('@Self()', () => {
                it('should return a dependency from self', () => {
                    const inj = createInjector([
                        Engine,
                        { provide: Car, useFactory: (e) => new Car(e), deps: [[Engine, new core_1.Self()]] },
                    ]);
                    expect(inj.get(Car)).toBeInstanceOf(Car);
                });
            });
            describe('default', () => {
                it('should not skip self', () => {
                    const parent = createInjector([Engine]);
                    const child = createInjector([
                        { provide: Engine, useClass: TurboEngine },
                        { provide: Car, useFactory: (e) => new Car(e), deps: [Engine] },
                    ], parent);
                    expect(child.get(Car).engine).toBeInstanceOf(TurboEngine);
                });
            });
        });
        describe('lifecycle', () => {
            it('should instantiate modules eagerly', () => {
                let created = false;
                let ImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule = _classThis = class {
                        constructor() {
                            created = true;
                        }
                    };
                    __setFunctionName(_classThis, "ImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                createModule(SomeModule);
                expect(created).toBe(true);
            });
            it('should instantiate providers that are not used by a module lazily', () => {
                let created = false;
                createInjector([
                    {
                        provide: 'someToken',
                        useFactory: () => {
                            created = true;
                            return true;
                        },
                    },
                ]);
                expect(created).toBe(false);
            });
            it('should support ngOnDestroy on any provider', () => {
                let destroyed = false;
                class SomeInjectable {
                    ngOnDestroy() {
                        destroyed = true;
                    }
                }
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [SomeInjectable] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                        // Inject SomeInjectable to make it eager...
                        constructor(i) { }
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const moduleRef = createModule(SomeModule);
                expect(destroyed).toBe(false);
                moduleRef.destroy();
                expect(destroyed).toBe(true);
            });
            it('should support ngOnDestroy for lazy providers', () => {
                let created = false;
                let destroyed = false;
                class SomeInjectable {
                    constructor() {
                        created = true;
                    }
                    ngOnDestroy() {
                        destroyed = true;
                    }
                }
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [SomeInjectable] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                let moduleRef = createModule(SomeModule);
                expect(created).toBe(false);
                expect(destroyed).toBe(false);
                // no error if the provider was not yet created
                moduleRef.destroy();
                expect(created).toBe(false);
                expect(destroyed).toBe(false);
                moduleRef = createModule(SomeModule);
                moduleRef.injector.get(SomeInjectable);
                expect(created).toBe(true);
                moduleRef.destroy();
                expect(destroyed).toBe(true);
            });
        });
        describe('imported and exported modules', () => {
            it('should add the providers of imported modules', () => {
                let ImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get(SomeModule)).toBeInstanceOf(SomeModule);
                expect(injector.get(ImportedModule)).toBeInstanceOf(ImportedModule);
                expect(injector.get('token1')).toBe('imported');
            });
            it('should add the providers of imported ModuleWithProviders', () => {
                let ImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [
                                { ngModule: ImportedModule, providers: [{ provide: 'token1', useValue: 'imported' }] },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get(SomeModule)).toBeInstanceOf(SomeModule);
                expect(injector.get(ImportedModule)).toBeInstanceOf(ImportedModule);
                expect(injector.get('token1')).toBe('imported');
            });
            it('should overwrite the providers of imported modules', () => {
                let ImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'direct' }], imports: [ImportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('direct');
            });
            it('should overwrite the providers of imported ModuleWithProviders', () => {
                let ImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [{ provide: 'token1', useValue: 'direct' }],
                            imports: [
                                { ngModule: ImportedModule, providers: [{ provide: 'token1', useValue: 'imported' }] },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('direct');
            });
            it('should overwrite the providers of imported modules on the second import level', () => {
                let ImportedModuleLevel2 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModuleLevel2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModuleLevel2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModuleLevel2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModuleLevel2 = _classThis;
                })();
                let ImportedModuleLevel1 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [{ provide: 'token1', useValue: 'direct' }],
                            imports: [ImportedModuleLevel2],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModuleLevel1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModuleLevel1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModuleLevel1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModuleLevel1 = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModuleLevel1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('direct');
            });
            it('should add the providers of exported modules', () => {
                let ExportedValue = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'exported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ExportedValue = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ExportedValue");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ExportedValue = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ExportedValue = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [ExportedValue] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get(SomeModule)).toBeInstanceOf(SomeModule);
                expect(injector.get(ExportedValue)).toBeInstanceOf(ExportedValue);
                expect(injector.get('token1')).toBe('exported');
            });
            it('should overwrite the providers of exported modules', () => {
                let ExportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'exported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ExportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ExportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ExportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ExportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'direct' }], exports: [ExportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('direct');
            });
            it('should overwrite the providers of imported modules by following imported modules', () => {
                let ImportedModule1 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported1' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule1 = _classThis;
                })();
                let ImportedModule2 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported2' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule2 = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule1, ImportedModule2] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('imported2');
            });
            it('should overwrite the providers of exported modules by following exported modules', () => {
                let ExportedModule1 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'exported1' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ExportedModule1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ExportedModule1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ExportedModule1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ExportedModule1 = _classThis;
                })();
                let ExportedModule2 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'exported2' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ExportedModule2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ExportedModule2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ExportedModule2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ExportedModule2 = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [ExportedModule1, ExportedModule2] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('exported2');
            });
            it('should overwrite the providers of imported modules by exported modules', () => {
                let ImportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule = _classThis;
                })();
                let ExportedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'exported' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ExportedModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ExportedModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ExportedModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ExportedModule = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule], exports: [ExportedModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('exported');
            });
            it('should not overwrite the providers if a module was already used on the same level', () => {
                let ImportedModule1 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported1' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule1 = _classThis;
                })();
                let ImportedModule2 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported2' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule2 = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule1, ImportedModule2, ImportedModule1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('imported2');
            });
            it('should not overwrite the providers if a module was already used on a child level', () => {
                let ImportedModule1 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported1' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule1 = _classThis;
                })();
                let ImportedModule3 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule3 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule3");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule3 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule3 = _classThis;
                })();
                let ImportedModule2 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'token1', useValue: 'imported2' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule2 = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [ImportedModule3, ImportedModule2, ImportedModule1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                const injector = createModule(SomeModule).injector;
                expect(injector.get('token1')).toBe('imported2');
            });
            it('should throw when given invalid providers in an imported ModuleWithProviders', () => {
                let ImportedModule1 = (() => {
                    let _classDecorators = [(0, core_1.NgModule)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ImportedModule1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ImportedModule1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ImportedModule1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ImportedModule1 = _classThis;
                })();
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [{ ngModule: ImportedModule1, providers: ['broken'] }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                expect(() => createModule(SomeModule).injector).toThrowError(`Invalid provider for the NgModule 'ImportedModule1' - only instances of Provider and Type are allowed, got: [?broken?]`);
            });
        });
        describe('tree shakable providers', () => {
            it('definition should not persist across NgModuleRef instances', () => {
                let SomeModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SomeModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeModule = _classThis;
                })();
                class Bar {
                }
                Bar.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
                    token: Bar,
                    factory: () => new Bar(),
                    providedIn: SomeModule,
                });
                const factory = createModuleFactory(SomeModule);
                const ngModuleRef1 = factory.create(null);
                // Inject a tree shakeable provider token.
                ngModuleRef1.injector.get(Bar);
                // Tree Shakeable provider definition should be available.
                const providerDef1 = ngModuleRef1._r3Injector.records.get(Bar);
                expect(providerDef1).not.toBeUndefined();
                // Instantiate the same module. The tree shakeable provider definition should not be
                // present.
                const ngModuleRef2 = factory.create(null);
                const providerDef2 = ngModuleRef2._r3Injector.records.get(Bar);
                expect(providerDef2).toBeUndefined();
            });
        });
    });
});
