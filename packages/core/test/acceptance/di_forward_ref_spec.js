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
const testing_1 = require("../../testing");
// **NOTE**: More details on why tests relying on `forwardRef` are put into this
// file can be found in the `BUILD.bazel` file declaring the forward ref test target.
describe('di with forwardRef', () => {
    describe('directive injection', () => {
        it('should throw if directives try to inject each other', () => {
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor(siblingDir) { }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(siblingDir) { }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA dirB></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
            expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError('NG0200: Circular dependency in DI detected for DirectiveA. Find more at https://angular.dev/errors/NG0200');
        });
        describe('flags', () => {
            describe('@Host', () => {
                it('should find host component on the host itself', () => {
                    let DirectiveComp = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirComp]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveComp = _classThis = class {
                            constructor(comp) {
                                this.comp = comp;
                            }
                        };
                        __setFunctionName(_classThis, "DirectiveComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveComp = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: '<div dirComp></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirComp_decorators;
                        let _dirComp_initializers = [];
                        let _dirComp_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirComp = __runInitializers(this, _dirComp_initializers, void 0);
                                __runInitializers(this, _dirComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirComp_decorators = [(0, core_1.ViewChild)(DirectiveComp)];
                            __esDecorate(null, null, _dirComp_decorators, { kind: "field", name: "dirComp", static: false, private: false, access: { has: obj => "dirComp" in obj, get: obj => obj.dirComp, set: (obj, value) => { obj.dirComp = value; } }, metadata: _metadata }, _dirComp_initializers, _dirComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<my-comp></my-comp>',
                                jit: true,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _myComp_decorators;
                        let _myComp_initializers = [];
                        let _myComp_extraInitializers = [];
                        var MyApp = _classThis = class {
                            constructor() {
                                this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                                __runInitializers(this, _myComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                            __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveComp, MyComp, MyApp] });
                    const fixture = testing_1.TestBed.createComponent(MyApp);
                    fixture.detectChanges();
                    const myComp = fixture.componentInstance.myComp;
                    const dirComp = myComp.dirComp;
                    expect(dirComp.comp).toBe(myComp);
                });
            });
        });
    });
});
