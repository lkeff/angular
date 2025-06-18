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
const render3_1 = require("../../src/render3");
const deps_tracker_1 = require("../../src/render3/deps_tracker/deps_tracker");
const { DepsTracker } = deps_tracker_1.TEST_ONLY;
describe('runtime dependency tracker', () => {
    let depsTracker = new DepsTracker();
    beforeEach(() => {
        depsTracker = new DepsTracker();
    });
    describe('getNgModuleScope method', () => {
        it('should include empty scope for a module without any import/declarations/exports', () => {
            let MainModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MainModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MainModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MainModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MainModule = _classThis;
            })();
            const ans = depsTracker.getNgModuleScope(MainModule);
            expect(ans.compilation).toEqual({
                directives: new Set(),
                pipes: new Set(),
            });
            expect(ans.exported).toEqual({
                directives: new Set(),
                pipes: new Set(),
            });
        });
        it('should throw if applied to a non NgModule type', () => {
            class RandomClass {
            }
            expect(() => depsTracker.getNgModuleScope(RandomClass)).toThrow();
        });
        describe('exports specs', () => {
            it('should include the exported components/directives/pipes in exported scope', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                // No ɵcmp added yet.
                class AsyncComponent {
                }
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Directive1, Pipe1, Component1, AsyncComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Directive1, Component1, AsyncComponent]),
                });
            });
            it('should include the exported scope of an exported module in the exported scope and compilation scope', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Directive1, Pipe1, Component1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [SubModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Directive1, Component1]),
                });
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Directive1, Component1]),
                });
            });
            it('should combine the directly exported elements with the exported scope of exported module in both exported and compilation scopes', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Directive1, Pipe1, Component1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
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
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [SubModule, MainComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Directive1, Component1, MainComponent]),
                });
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Directive1, Component1]),
                });
            });
        });
        describe('import specs', () => {
            it('should contain the exported scope of an imported module in compilation scope', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let PrivateComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var PrivateComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "PrivateComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        PrivateComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return PrivateComponent = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Directive1, Component1, Pipe1],
                            declarations: [PrivateComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [SubModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    directives: new Set([Directive1, Component1]),
                    pipes: new Set([Pipe1]),
                });
            });
            it('should contain imported standalone components/directive/pipes in compilation scope', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [Directive1, Pipe1, Component1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    directives: new Set([Directive1, Component1]),
                    pipes: new Set([Pipe1]),
                });
            });
            it('should contain the exported scope of a depth-2 transitively imported module in compilation scope', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let PrivateComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var PrivateComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "PrivateComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        PrivateComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return PrivateComponent = _classThis;
                })();
                let SubSubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Directive1, Component1, Pipe1],
                            declarations: [PrivateComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubSubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubSubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubSubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubSubModule = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [SubSubModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [SubModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    directives: new Set([Directive1, Component1]),
                    pipes: new Set([Pipe1]),
                });
            });
            it('should poison compilation scope if an import is neither a NgModule nor a standalone component', () => {
                class RandomClass {
                }
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [RandomClass],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation.isPoisoned).toBeTrue();
            });
        });
        describe('declarations specs', () => {
            it('should include declared components/directives/pipes as part of compilation scope', () => {
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                // No ɵcmp added yet.
                class AsyncComponent {
                }
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Directive1, Pipe1, Component1, AsyncComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Directive1, Component1, AsyncComponent]),
                });
                expect(ans.exported).toEqual({
                    pipes: new Set(),
                    directives: new Set(),
                });
            });
            it('should poison the compilation scope if a standalone component is declared', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Component1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation.isPoisoned).toBeTrue();
            });
            it('should poison compilation scope if declare a module', () => {
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [SubModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation.isPoisoned).toBeTrue();
            });
        });
        describe('cache specs', () => {
            it('should use cache for re-calculation', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Component1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set(),
                    directives: new Set([Component1]),
                });
                // Modify the module
                MainModule.ɵmod.declarations = [];
                ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set(),
                    directives: new Set([Component1]),
                });
            });
            it('should bust the cache correctly', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Component1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set(),
                    directives: new Set([Component1]),
                });
                // Modify the module
                MainModule.ɵmod.declarations = [];
                depsTracker.clearScopeCacheFor(MainModule);
                ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set(),
                    directives: new Set([]),
                });
            });
        });
        describe('forward ref specs', () => {
            it('should include the exported scope of a forward ref imported module in the compilation scope when compiling in JIT mode', () => {
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [(0, core_1.forwardRef)(() => SubModule)] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [Component1, Directive1, Pipe1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include the exported scope of a forward ref imported module in the compilation scope when compiling in AOT mode', () => {
                class MainModule {
                }
                MainModule.ɵmod = createNgModuleDef({ imports: () => [SubModule] });
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [Component1, Directive1, Pipe1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include forward ref imported standalone component in the compilation scope when compiling in JIT mode', () => {
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [(0, core_1.forwardRef)(() => Component1)] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([]),
                    directives: new Set([Component1]),
                });
            });
            it('should include forward ref imported standalone component in the compilation scope when compiling in AOT mode', () => {
                class MainModule {
                }
                MainModule.ɵmod = createNgModuleDef({ imports: () => [Component1] });
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([]),
                    directives: new Set([Component1]),
                });
            });
            it('should include the forward ref declarations in the compilation scope when compiling in JIT mode', () => {
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [
                                (0, core_1.forwardRef)(() => Component1),
                                (0, core_1.forwardRef)(() => Directive1),
                                (0, core_1.forwardRef)(() => Pipe1),
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include the forward ref declarations in the compilation scope when compiling in AOT mode', () => {
                class MainModule {
                }
                MainModule.ɵmod = createNgModuleDef({
                    declarations: () => [Component1, Directive1, Pipe1],
                });
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include the exported forward ref components/directives/pipes in exported scope when compiling in JIT mode', () => {
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [
                                (0, core_1.forwardRef)(() => Component1),
                                (0, core_1.forwardRef)(() => Directive1),
                                (0, core_1.forwardRef)(() => Pipe1),
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include the exported forward ref components/directives/pipes in exported scope when compiling in AOT mode', () => {
                class MainModule {
                }
                MainModule.ɵmod = createNgModuleDef({
                    exports: () => [Component1, Directive1, Pipe1],
                });
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include the exported scope of an exported forward ref module in the exported and compilation scope when compiling in JIT mode', () => {
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [(0, core_1.forwardRef)(() => SubModule)] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [Component1, Directive1, Pipe1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
            it('should include the exported scope of an exported forward ref module in the exported and compilation scopes when compiling in AOT mode', () => {
                class MainModule {
                }
                MainModule.ɵmod = createNgModuleDef({ exports: () => [SubModule] });
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ exports: [Component1, Directive1, Pipe1] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                const ans = depsTracker.getNgModuleScope(MainModule);
                expect(ans.compilation).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
                expect(ans.exported).toEqual({
                    pipes: new Set([Pipe1]),
                    directives: new Set([Component1, Directive1]),
                });
            });
        });
    });
    describe('getStandaloneComponentScope method', () => {
        it('should only include the component itself in the compilation scope when there is no imports', () => {
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, []);
            expect(ans.compilation).toEqual({
                pipes: new Set([]),
                directives: new Set([MainComponent]),
                ngModules: new Set([]),
            });
        });
        it('should include the imported standalone component/directive/pipes in the compilation scope', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                Component1,
                Directive1,
                Pipe1,
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([]),
            });
        });
        it('should include the imported standalone component/directive/pipes in the compilation scope - nested array case', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                [[Component1], Directive1],
                [[[Pipe1]]],
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([]),
            });
        });
        it('should poison the compilation scope if an import is not standalone', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                Component1,
            ]);
            expect(ans.compilation.isPoisoned).toBeTrue();
        });
        it('should include the imported module and its exported scope in the compilation scope', () => {
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'pipe1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let PrivateComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var PrivateComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "PrivateComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PrivateComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PrivateComponent = _classThis;
            })();
            let SubSubModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        exports: [Directive1, Component1, Pipe1],
                        declarations: [PrivateComponent],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubSubModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SubSubModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubSubModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubSubModule = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                SubSubModule,
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([SubSubModule]),
            });
        });
        it('should include the imported module and its exported scope in the compilation scope - case of nested array imports', () => {
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'pipe1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let PrivateComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var PrivateComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "PrivateComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PrivateComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PrivateComponent = _classThis;
            })();
            let SubSubModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        exports: [Directive1, Component1, Pipe1],
                        declarations: [PrivateComponent],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubSubModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SubSubModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubSubModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubSubModule = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                [SubSubModule],
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([SubSubModule]),
            });
        });
        it('should resolve the imported forward refs and include them in the compilation scope', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            let SubModuleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModuleComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModuleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModuleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModuleComponent = _classThis;
            })();
            let SubModuleDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModuleDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModuleDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModuleDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModuleDirective = _classThis;
            })();
            let SubModulePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'submodule pipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModulePipe = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModulePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModulePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModulePipe = _classThis;
            })();
            let SubModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ exports: [SubModuleComponent, SubModulePipe, SubModuleDirective] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModule = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                (0, core_1.forwardRef)(() => Component1),
                (0, core_1.forwardRef)(() => Directive1),
                (0, core_1.forwardRef)(() => Pipe1),
                (0, core_1.forwardRef)(() => SubModule),
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1, SubModulePipe]),
                directives: new Set([
                    MainComponent,
                    Component1,
                    Directive1,
                    SubModuleComponent,
                    SubModuleDirective,
                ]),
                ngModules: new Set([SubModule]),
            });
        });
        it('should resolve the imported forward refs and include them in the compilation scope - case of nested array imports', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            let SubModuleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModuleComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModuleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModuleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModuleComponent = _classThis;
            })();
            let SubModuleDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModuleDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModuleDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModuleDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModuleDirective = _classThis;
            })();
            let SubModulePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'submodule pipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModulePipe = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModulePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModulePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModulePipe = _classThis;
            })();
            let SubModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ exports: [SubModuleComponent, SubModulePipe, SubModuleDirective] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SubModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SubModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubModule = _classThis;
            })();
            class MainComponent {
            }
            const ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                [(0, core_1.forwardRef)(() => Component1)],
                [(0, core_1.forwardRef)(() => Directive1)],
                [(0, core_1.forwardRef)(() => Pipe1)],
                [(0, core_1.forwardRef)(() => SubModule)],
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1, SubModulePipe]),
                directives: new Set([
                    MainComponent,
                    Component1,
                    Directive1,
                    SubModuleComponent,
                    SubModuleDirective,
                ]),
                ngModules: new Set([SubModule]),
            });
        });
        it('should cache the computed scopes', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
            class MainComponent {
            }
            let ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                Component1,
                Directive1,
                Pipe1,
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([]),
            });
            ans = depsTracker.getStandaloneComponentScope(MainComponent, []);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([]),
            });
        });
        it('should clear the cache correctly', () => {
            let Component1 = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Component1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Component1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Component1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Component1 = _classThis;
            })();
            let Directive1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Directive1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Directive1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Directive1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Directive1 = _classThis;
            })();
            let Pipe1 = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Pipe1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Pipe1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Pipe1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Pipe1 = _classThis;
            })();
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
            let ans = depsTracker.getStandaloneComponentScope(MainComponent, [
                Component1,
                Directive1,
                Pipe1,
            ]);
            expect(ans.compilation).toEqual({
                pipes: new Set([Pipe1]),
                directives: new Set([MainComponent, Component1, Directive1]),
                ngModules: new Set([]),
            });
            depsTracker.clearScopeCacheFor(MainComponent);
            ans = depsTracker.getStandaloneComponentScope(MainComponent, []);
            expect(ans.compilation).toEqual({
                pipes: new Set([]),
                directives: new Set([MainComponent]),
                ngModules: new Set([]),
            });
        });
    });
    describe('getComponentDependencies method', () => {
        describe('for non-standalone component', () => {
            it('should include the compilation scope of the declaring module', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
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
                let MainModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [MainComponent, Component1, Directive1, Pipe1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MainModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MainModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MainModule = _classThis;
                })();
                depsTracker.registerNgModule(MainModule, {});
                const ans = depsTracker.getComponentDependencies(MainComponent);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1, Directive1, Pipe1]));
            });
            it('should include the compilation scope of the declaring module when it is forward referenced', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
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
                MainModule.ɵmod = createNgModuleDef({
                    declarations: () => [MainComponent, Component1, Directive1, Pipe1],
                });
                depsTracker.registerNgModule(MainModule, {});
                const ans = depsTracker.getComponentDependencies(MainComponent);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1, Directive1, Pipe1]));
            });
            it('should return empty dependencies if component has no registered module', () => {
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
                (0, render3_1.ɵsetClassDebugInfo)(MainComponent, {
                    className: 'MainComponent',
                    filePath: 'main.ts',
                    lineNumber: 11,
                });
                const ans = depsTracker.getComponentDependencies(MainComponent);
                expect(ans.dependencies).toEqual([]);
            });
            it('should return empty deps if the compilation scope of the declaring module is corrupted', () => {
                class RandomClass {
                }
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
                MainModule.ɵmod = createNgModuleDef({
                    declarations: [MainComponent],
                    // Importing an invalid class makes the compilation scope corrupted.
                    imports: [RandomClass],
                });
                depsTracker.registerNgModule(MainModule, {});
                const ans = depsTracker.getComponentDependencies(MainComponent);
                expect(ans.dependencies).toEqual([]);
            });
        });
        describe('for standalone component', () => {
            it('should always return self (even if component has empty imports)', () => {
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                const ans = depsTracker.getComponentDependencies(MainComponent);
                expect(ans.dependencies).toEqual([MainComponent]);
            });
            it('should include imported standalone component/directive/pipe', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                const ans = depsTracker.getComponentDependencies(MainComponent, [
                    Component1,
                    Directive1,
                    Pipe1,
                ]);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1, Directive1, Pipe1]));
            });
            it('should include imported forward ref standalone component/directive/pipe', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe1' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                const ans = depsTracker.getComponentDependencies(MainComponent, [
                    (0, core_1.forwardRef)(() => Component1),
                    (0, core_1.forwardRef)(() => Directive1),
                    (0, core_1.forwardRef)(() => Pipe1),
                ]);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1, Directive1, Pipe1]));
            });
            it('should ignore imported non-standalone component/directive/pipe', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                const ans = depsTracker.getComponentDependencies(MainComponent, [
                    Component1,
                    Directive1,
                    Pipe1,
                ]);
                expect(ans.dependencies).toEqual([]);
            });
            it('should include the imported module and its exported scope', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Component1, Directive1, Pipe1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                const ans = depsTracker.getComponentDependencies(MainComponent, [
                    SubModule,
                ]);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1, Directive1, Pipe1, SubModule]));
            });
            it('should include the imported forward ref module and its exported scope', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let Directive1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Directive1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Directive1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Directive1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Directive1 = _classThis;
                })();
                let Pipe1 = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Pipe1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Pipe1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Pipe1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Pipe1 = _classThis;
                })();
                let SubModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            exports: [Component1, Directive1, Pipe1],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SubModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SubModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubModule = _classThis;
                })();
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                const ans = depsTracker.getComponentDependencies(MainComponent, [
                    (0, core_1.forwardRef)(() => SubModule),
                ]);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1, Directive1, Pipe1, SubModule]));
            });
            it('should use cache for re-calculation', () => {
                let Component1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Component1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Component1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Component1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Component1 = _classThis;
                })();
                let MainComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
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
                let ans = depsTracker.getComponentDependencies(MainComponent, [
                    Component1,
                ]);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1]));
                ans = depsTracker.getComponentDependencies(MainComponent, [
                    Component1,
                ]);
                expect(ans.dependencies).toEqual(jasmine.arrayWithExactContents([MainComponent, Component1]));
            });
        });
    });
    describe('isOrphanComponent method', () => {
        it('should return true for non-standalone component without NgModule', () => {
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
            expect(depsTracker.isOrphanComponent(MainComponent)).toBeTrue();
        });
        it('should return false for standalone component', () => {
            let MainComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({})];
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
            expect(depsTracker.isOrphanComponent(MainComponent)).toBeFalse();
        });
        it('should return false for non-standalone component with its NgModule', () => {
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
            let MainModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MainComponent],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MainModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MainModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MainModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MainModule = _classThis;
            })();
            depsTracker.registerNgModule(MainModule, {});
            expect(depsTracker.isOrphanComponent(MainComponent)).toBeFalse();
        });
        it('should return false for class which is not a component', () => {
            class RandomClass {
            }
            expect(depsTracker.isOrphanComponent(RandomClass)).toBeFalse();
        });
    });
});
function createNgModuleDef(data) {
    return Object.assign({ bootstrap: [], declarations: [], exports: [], imports: [] }, data);
}
