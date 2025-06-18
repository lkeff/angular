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
const compiler_1 = require("@angular/compiler");
const jit_compiler_facade_1 = require("@angular/compiler/src/jit_compiler_facade");
const output_jit_1 = require("@angular/compiler/src/output/output_jit");
const util_1 = require("@angular/compiler/src/util");
const core_1 = require("../../src/core");
const resource_loading_1 = require("../../src/metadata/resource_loading");
const testing_1 = require("../../testing");
const resource_loader_mock_1 = require("./resource_loader_mock");
const source_map_util_1 = require("./source_map_util");
describe('jit source mapping', () => {
    let resourceLoader;
    let jitEvaluator;
    beforeEach(() => {
        resourceLoader = new resource_loader_mock_1.MockResourceLoader();
        jitEvaluator = new MockJitEvaluator();
        testing_1.TestBed.configureCompiler({
            providers: [
                {
                    provide: compiler_1.ResourceLoader,
                    useValue: resourceLoader,
                },
                {
                    provide: output_jit_1.JitEvaluator,
                    useValue: jitEvaluator,
                },
            ],
        });
    });
    describe('generated filenames and stack traces', () => {
        beforeEach(() => overrideCompilerFacade());
        afterEach(() => restoreCompilerFacade());
        describe('inline templates', () => {
            const ngUrl = 'ng:///MyComp/template.html';
            function templateDecorator(template) {
                return { template };
            }
            declareTests({ ngUrl, templateDecorator });
        });
        describe('external templates', () => {
            const templateUrl = 'http://localhost:1234/some/url.html';
            const ngUrl = templateUrl;
            function templateDecorator(template) {
                resourceLoader.expect(templateUrl, template);
                return { templateUrl };
            }
            declareTests({ ngUrl, templateDecorator });
        });
        function declareTests({ ngUrl, templateDecorator }) {
            const generatedUrl = 'ng:///MyComp.js';
            it('should use the right source url in html parse errors', () => __awaiter(this, void 0, void 0, function* () {
                const template = '<div>\n  </error>';
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, templateDecorator(template)), { standalone: false }))];
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
                yield expectAsync(resolveCompileAndCreateComponent(MyComp, template)).toBeRejectedWithError(new RegExp(`${(0, util_1.escapeRegExp)(ngUrl)}@1:2`));
            }));
            it('should create a sourceMap for templates', () => __awaiter(this, void 0, void 0, function* () {
                const template = `Hello World!`;
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, templateDecorator(template)), { standalone: false }))];
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
                yield resolveCompileAndCreateComponent(MyComp, template);
                const sourceMap = jitEvaluator.getSourceMap(generatedUrl);
                expect(sourceMap.sources).toEqual([generatedUrl, ngUrl]);
                expect(sourceMap.sourcesContent).toEqual([' ', template]);
            }));
            xit('should report source location for di errors', () => __awaiter(this, void 0, void 0, function* () {
                const template = `<div>\n    <div   someDir></div></div>`;
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, templateDecorator(template)), { standalone: false }))];
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
                let SomeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[someDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeDir = _classThis = class {
                        constructor() {
                            throw new Error('Test');
                        }
                    };
                    __setFunctionName(_classThis, "SomeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeDir = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [SomeDir] });
                let error;
                try {
                    yield resolveCompileAndCreateComponent(MyComp, template);
                }
                catch (e) {
                    error = e;
                }
                // The error should be logged from the element
                expect(yield jitEvaluator.getSourcePositionForStack(error.stack, generatedUrl)).toEqual({
                    line: 2,
                    column: 4,
                    source: ngUrl,
                });
            }));
            xit('should report di errors with multiple elements and directives', () => __awaiter(this, void 0, void 0, function* () {
                const template = `<div someDir></div>|<div someDir="throw"></div>`;
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, templateDecorator(template)), { standalone: false }))];
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
                let SomeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[someDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SomeDir = _classThis = class {
                        constructor(someDir) {
                            if (someDir === 'throw') {
                                throw new Error('Test');
                            }
                        }
                    };
                    __setFunctionName(_classThis, "SomeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeDir = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [SomeDir] });
                let error;
                try {
                    yield resolveCompileAndCreateComponent(MyComp, template);
                }
                catch (e) {
                    error = e;
                }
                // The error should be logged from the 2nd-element
                expect(yield jitEvaluator.getSourcePositionForStack(error.stack, generatedUrl)).toEqual({
                    line: 1,
                    column: 20,
                    source: ngUrl,
                });
            }));
            it('should report source location for binding errors', () => __awaiter(this, void 0, void 0, function* () {
                const template = `<div>\n    <span   [title]="createError()"></span></div>`;
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, templateDecorator(template)), { standalone: false }))];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        createError() {
                            throw new Error('Test');
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
                const comp = yield resolveCompileAndCreateComponent(MyComp, template);
                let error;
                try {
                    comp.detectChanges();
                }
                catch (e) {
                    error = e;
                }
                // the stack should point to the binding
                expect(yield jitEvaluator.getSourcePositionForStack(error.stack, generatedUrl)).toEqual({
                    line: 2,
                    column: 12,
                    source: ngUrl,
                });
            }));
            it('should report source location for event errors', () => __awaiter(this, void 0, void 0, function* () {
                const template = `<div>\n    <span   (click)="createError()"></span></div>`;
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, templateDecorator(template)), { standalone: false }))];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        createError() {
                            throw new Error('Test');
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
                const comp = yield resolveCompileAndCreateComponent(MyComp, template);
                let error;
                const errorHandler = testing_1.TestBed.inject(core_1.ErrorHandler);
                spyOn(errorHandler, 'handleError').and.callFake((e) => (error = e));
                try {
                    comp.debugElement.children[0].children[0].triggerEventHandler('click', 'EVENT');
                }
                catch (e) {
                    error = e;
                }
                expect(error).toBeTruthy();
                // the stack should point to the binding
                expect(yield jitEvaluator.getSourcePositionForStack(error.stack, generatedUrl)).toEqual({
                    line: 2,
                    column: 21,
                    source: ngUrl,
                });
            }));
        }
    });
    function compileAndCreateComponent(comType) {
        return __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({ declarations: [comType] });
            yield testing_1.TestBed.compileComponents();
            if (resourceLoader.hasPendingRequests()) {
                resourceLoader.flush();
            }
            return testing_1.TestBed.createComponent(comType);
        });
    }
    function createResolver(contents) {
        return (_url) => Promise.resolve(contents);
    }
    function resolveCompileAndCreateComponent(comType, template) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, resource_loading_1.resolveComponentResources)(createResolver(template));
            return yield compileAndCreateComponent(comType);
        });
    }
    let ɵcompilerFacade;
    function overrideCompilerFacade() {
        const ng = global.ng;
        if (ng) {
            ɵcompilerFacade = ng.ɵcompilerFacade;
            ng.ɵcompilerFacade = new jit_compiler_facade_1.CompilerFacadeImpl(jitEvaluator);
        }
    }
    function restoreCompilerFacade() {
        if (ɵcompilerFacade) {
            const ng = global.ng;
            ng.ɵcompilerFacade = ɵcompilerFacade;
        }
    }
    /**
     * A helper class that captures the sources that have been JIT compiled.
     */
    class MockJitEvaluator extends output_jit_1.JitEvaluator {
        constructor() {
            super(...arguments);
            this.sources = [];
        }
        executeFunction(fn, args) {
            // Capture the source that has been generated.
            this.sources.push(fn.toString());
            // Then execute it anyway.
            return super.executeFunction(fn, args);
        }
        /**
         * Get the source-map for a specified JIT compiled file.
         * @param genFile the URL of the file whose source-map we want.
         */
        getSourceMap(genFile) {
            return this.sources
                .map((source) => (0, source_map_util_1.extractSourceMap)(source))
                .find((map) => !!(map && map.file === genFile));
        }
        getSourcePositionForStack(stack, genFile) {
            return __awaiter(this, void 0, void 0, function* () {
                const urlRegexp = new RegExp(`(${(0, util_1.escapeRegExp)(genFile)}):(\\d+):(\\d+)`);
                const pos = stack
                    .split('\n')
                    .map((line) => urlRegexp.exec(line))
                    .filter((match) => !!match)
                    .map((match) => ({
                    file: match[1],
                    line: parseInt(match[2], 10),
                    column: parseInt(match[3], 10),
                }))
                    .shift();
                if (!pos) {
                    throw new Error(`${genFile} was not mentioned in this stack:\n${stack}`);
                }
                const sourceMap = this.getSourceMap(pos.file);
                return yield (0, source_map_util_1.originalPositionFor)(sourceMap, pos);
            });
        }
    }
});
