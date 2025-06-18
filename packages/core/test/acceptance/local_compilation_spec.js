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
const def_getters_1 = require("../../src/render3/def_getters");
describe('component dependencies in local compilation', () => {
    it('should compute correct set of dependencies when importing ng-modules directly', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [SubComponent] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, { imports: [SubModule], declarations: [MainComponent] });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules - nested array case', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [[[SubComponent]]] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, { imports: [[SubModule]], declarations: [[MainComponent]] });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules with providers', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [SubComponent] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, {
            imports: [{ ngModule: SubModule, providers: [] }],
            declarations: [MainComponent],
        });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules with providers - nested array case', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [[[SubComponent]]] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, {
            imports: [[{ ngModule: SubModule, providers: [] }]],
            declarations: [[MainComponent]],
        });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules using forward ref', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [(0, core_1.forwardRef)(() => SubComponent)] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, {
            imports: [(0, core_1.forwardRef)(() => SubModule)],
            declarations: [(0, core_1.forwardRef)(() => MainComponent)],
        });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules using forward ref - nested array case', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [[[(0, core_1.forwardRef)(() => SubComponent)]]] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, {
            imports: [[(0, core_1.forwardRef)(() => SubModule)]],
            declarations: [[(0, core_1.forwardRef)(() => MainComponent)]],
        });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules with providers using forward ref', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [SubComponent] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, {
            imports: [(0, core_1.forwardRef)(() => ({ ngModule: SubModule, providers: [] }))],
            declarations: [MainComponent],
        });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
    it('should compute correct set of dependencies when importing ng-modules with providers using forward ref', () => {
        let SubComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sub',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SubComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SubComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubComponent = _classThis;
        })();
        class SubModule {
        }
        SubModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: SubModule });
        (0, core_1.ɵɵsetNgModuleScope)(SubModule, { exports: [[[SubComponent]]] });
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, {
            imports: [[(0, core_1.forwardRef)(() => ({ ngModule: SubModule, providers: [] }))]],
            declarations: [[MainComponent]],
        });
        const deps = (0, core_1.ɵɵgetComponentDepsFactory)(MainComponent)();
        expect(deps).toEqual(jasmine.arrayWithExactContents([SubComponent, MainComponent]));
    });
});
describe('component bootstrap info', () => {
    it('should include the bootstrap info in local compilation mode', () => {
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, { declarations: [MainComponent], bootstrap: [MainComponent] });
        const def = (0, def_getters_1.getNgModuleDef)(MainModule);
        expect(def === null || def === void 0 ? void 0 : def.bootstrap).toEqual([MainComponent]);
    });
    it('should flatten the bootstrap info in local compilation mode', () => {
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, { declarations: [MainComponent], bootstrap: [[[MainComponent]]] });
        const def = (0, def_getters_1.getNgModuleDef)(MainModule);
        expect(def === null || def === void 0 ? void 0 : def.bootstrap).toEqual([MainComponent]);
    });
    it('should include the bootstrap info in full compilation mode', () => {
        let MainComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MainComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainComponent = _classThis;
        })();
        class MainModule {
        }
        MainModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: MainModule, bootstrap: [MainComponent] });
        (0, core_1.ɵɵsetNgModuleScope)(MainModule, { declarations: [MainComponent] });
        const def = (0, def_getters_1.getNgModuleDef)(MainModule);
        expect(def === null || def === void 0 ? void 0 : def.bootstrap).toEqual([MainComponent]);
    });
});
