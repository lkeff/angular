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
const core_1 = require("@angular/compiler/src/core");
const core_2 = require("../../../src/core");
const render3_1 = require("../../../src/render3");
const matcher_1 = require("./matcher");
describe('component declaration jit compilation', () => {
    it('should compile a minimal component declaration', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: `<div></div>`,
        });
        expectComponentDef(def, {
            template: (0, matcher_1.functionContaining)([/element[^(]*\(0,'div'\)/]),
        });
    });
    it('should compile a selector', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            selector: '[dir], test',
        });
        expectComponentDef(def, {
            selectors: [['', 'dir', ''], ['test']],
        });
    });
    it('should compile inputs and outputs', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            inputs: {
                minifiedProperty: 'property',
                minifiedClassProperty: ['bindingName', 'classProperty'],
            },
            outputs: {
                minifiedEventName: 'eventBindingName',
            },
        });
        expectComponentDef(def, {
            inputs: {
                'property': ['minifiedProperty', core_1.InputFlags.None, null],
                'bindingName': ['minifiedClassProperty', core_1.InputFlags.None, null],
            },
            declaredInputs: {
                'property': 'property',
                'bindingName': 'classProperty',
            },
            outputs: {
                'eventBindingName': 'minifiedEventName',
            },
        });
    });
    it('should compile input with a transform function', () => {
        const transformFn = () => 1;
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            inputs: {
                minifiedClassProperty: ['bindingName', 'classProperty', transformFn],
            },
        });
        expectComponentDef(def, {
            inputs: {
                'bindingName': [
                    'minifiedClassProperty',
                    core_1.InputFlags.HasDecoratorInputTransform,
                    transformFn,
                ],
            },
            declaredInputs: {
                'bindingName': 'classProperty',
            },
        });
    });
    it('should compile exportAs', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            exportAs: ['a', 'b'],
        });
        expectComponentDef(def, {
            exportAs: ['a', 'b'],
        });
    });
    it('should compile providers', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            providers: [{ provide: 'token', useValue: 123 }],
        });
        expectComponentDef(def, {
            features: [jasmine.any(Function)],
            providersResolver: jasmine.any(Function),
        });
    });
    it('should compile view providers', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            viewProviders: [{ provide: 'token', useValue: 123 }],
        });
        expectComponentDef(def, {
            features: [jasmine.any(Function)],
            providersResolver: jasmine.any(Function),
        });
    });
    it('should compile content queries', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            queries: [
                {
                    propertyName: 'byRef',
                    predicate: ['ref'],
                },
                {
                    propertyName: 'byToken',
                    predicate: String,
                    descendants: true,
                    static: true,
                    first: true,
                    read: core_2.ElementRef,
                    emitDistinctChangesOnly: false,
                },
            ],
        });
        expectComponentDef(def, {
            contentQueries: (0, matcher_1.functionContaining)([
                // "byRef" should use `contentQuery` with `0` (`QueryFlags.none`) for query flag
                // without a read token, and bind to the full query result.
                /contentQuery[^(]*\(dirIndex,_c0,4\)/,
                '(ctx.byRef = _t)',
                // "byToken" should use `staticContentQuery` with `3`
                // (`QueryFlags.descendants|QueryFlags.isStatic`) for query flag and `ElementRef` as
                // read token, and bind to the first result in the query result.
                /contentQuery[^(]*\(dirIndex,[^,]*String[^,]*,3,[^)]*ElementRef[^)]*\)/,
                '(ctx.byToken = _t.first)',
            ]),
        });
    });
    it('should compile view queries', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            viewQueries: [
                {
                    propertyName: 'byRef',
                    predicate: ['ref'],
                },
                {
                    propertyName: 'byToken',
                    predicate: String,
                    descendants: true,
                    static: true,
                    first: true,
                    read: core_2.ElementRef,
                    emitDistinctChangesOnly: false,
                },
            ],
        });
        expectComponentDef(def, {
            viewQuery: (0, matcher_1.functionContaining)([
                // "byRef" should use `viewQuery` with `0` (`QueryFlags.none`) for query flag without a read
                // token, and bind to the full query result.
                /viewQuery[^(]*\(_c0,4\)/,
                '(ctx.byRef = _t)',
                // "byToken" should use `viewQuery` with `3`
                // (`QueryFlags.descendants|QueryFlags.isStatic`) for query flag and `ElementRef` as
                // read token, and bind to the first result in the query result.
                /viewQuery[^(]*\([^,]*String[^,]*,3,[^)]*ElementRef[^)]*\)/,
                '(ctx.byToken = _t.first)',
            ]),
        });
    });
    it('should compile host bindings', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            host: {
                attributes: {
                    'attr': 'value',
                },
                listeners: {
                    'event': 'handleEvent($event)',
                },
                properties: {
                    'foo': 'foo.prop',
                    'attr.bar': 'bar.prop',
                },
                classAttribute: 'foo bar',
                styleAttribute: 'width: 100px;',
            },
        });
        expectComponentDef(def, {
            hostAttrs: [
                'attr',
                'value',
                1 /* AttributeMarker.Classes */,
                'foo',
                'bar',
                2 /* AttributeMarker.Styles */,
                'width',
                '100px',
            ],
            hostBindings: (0, matcher_1.functionContaining)([
                'return ctx.handleEvent($event)',
                /domProperty[^(]*\('foo',ctx\.foo\.prop\)/,
                /attribute[^(]*\('bar',ctx\.bar\.prop\)/,
            ]),
            hostVars: 2,
        });
    });
    it('should compile components with inheritance', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            usesInheritance: true,
        });
        expectComponentDef(def, {
            features: [render3_1.ɵɵInheritDefinitionFeature],
        });
    });
    it('should compile components with onChanges lifecycle hook', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            usesOnChanges: true,
        });
        expectComponentDef(def, {
            features: [render3_1.ɵɵNgOnChangesFeature],
        });
    });
    it('should compile components with OnPush change detection strategy', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            changeDetection: core_2.ChangeDetectionStrategy.OnPush,
        });
        expectComponentDef(def, {
            onPush: true,
        });
    });
    it('should compile components with styles', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            styles: ['div {}'],
        });
        expectComponentDef(def, {
            styles: ['div[_ngcontent-%COMP%] {}'],
            encapsulation: core_2.ViewEncapsulation.Emulated,
        });
    });
    it('should compile components with view encapsulation', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            styles: ['div {}'],
            encapsulation: core_2.ViewEncapsulation.ShadowDom,
        });
        expectComponentDef(def, {
            styles: ['div {}'],
            encapsulation: core_2.ViewEncapsulation.ShadowDom,
        });
    });
    it('should compile components with animations', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div></div>',
            animations: [{ type: 'trigger' }],
        });
        expectComponentDef(def, {
            data: {
                animation: [{ type: 'trigger' }],
            },
        });
    });
    it('should honor preserveWhitespaces', () => {
        const template = '<div>    Foo    </div>';
        const whenTrue = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template,
            preserveWhitespaces: true,
        });
        const whenOmitted = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template,
        });
        expectComponentDef(whenTrue, {
            template: (0, matcher_1.functionContaining)([
                /elementStart[^(]*\(0,'div'\)/,
                /text[^(]*\(1,'    Foo    '\)/,
            ]),
        });
        expectComponentDef(whenOmitted, {
            template: (0, matcher_1.functionContaining)([/elementStart[^(]*\(0,'div'\)/, /text[^(]*\(1,' Foo '\)/]),
        });
    });
    it('should honor custom interpolation config', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '{% foo %}',
            interpolation: ['{%', '%}'],
        });
        expectComponentDef(def, {
            template: (0, matcher_1.functionContaining)([/textInterpolate[^(]*\(ctx.foo\)/]),
        });
    });
    it('should compile used components', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<cmp></cmp>',
            components: [
                {
                    type: TestCmp,
                    selector: 'cmp',
                },
            ],
        });
        expectComponentDef(def, {
            directives: [TestCmp],
        });
    });
    it('should compile used directives', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div dir></div>',
            directives: [
                {
                    type: TestDir,
                    selector: '[dir]',
                },
            ],
        });
        expectComponentDef(def, {
            directives: [TestDir],
        });
    });
    it('should compile used directives together with used components', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<cmp dir></cmp>',
            components: [
                {
                    type: TestCmp,
                    selector: 'cmp',
                },
            ],
            directives: [
                {
                    type: TestDir,
                    selector: '[dir]',
                },
            ],
        });
        expectComponentDef(def, {
            directives: [TestCmp, TestDir],
        });
    });
    it('should compile forward declared directives', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div forward></div>',
            directives: [
                {
                    type: (0, core_2.forwardRef)(function () {
                        return ForwardDir;
                    }),
                    selector: '[forward]',
                },
            ],
        });
        let ForwardDir = (() => {
            let _classDecorators = [(0, core_2.Directive)({
                    selector: '[forward]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ForwardDir = _classThis = class {
            };
            __setFunctionName(_classThis, "ForwardDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ForwardDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ForwardDir = _classThis;
        })();
        expectComponentDef(def, {
            directives: [ForwardDir],
        });
    });
    it('should compile mixed forward and direct declared directives', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '<div dir forward></div>',
            directives: [
                {
                    type: TestDir,
                    selector: '[dir]',
                },
                {
                    type: (0, core_2.forwardRef)(function () {
                        return ForwardDir;
                    }),
                    selector: '[forward]',
                },
            ],
        });
        let ForwardDir = (() => {
            let _classDecorators = [(0, core_2.Directive)({
                    selector: '[forward]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ForwardDir = _classThis = class {
            };
            __setFunctionName(_classThis, "ForwardDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ForwardDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ForwardDir = _classThis;
        })();
        expectComponentDef(def, {
            directives: [TestDir, ForwardDir],
        });
    });
    it('should compile used pipes', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '{{ expr | test }}',
            pipes: {
                'test': TestPipe,
            },
        });
        expectComponentDef(def, {
            pipes: [TestPipe],
        });
    });
    it('should compile forward declared pipes', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '{{ expr | forward }}',
            pipes: {
                'forward': (0, core_2.forwardRef)(function () {
                    return ForwardPipe;
                }),
            },
        });
        let ForwardPipe = (() => {
            let _classDecorators = [(0, core_2.Pipe)({
                    name: 'forward',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ForwardPipe = _classThis = class {
            };
            __setFunctionName(_classThis, "ForwardPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ForwardPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ForwardPipe = _classThis;
        })();
        expectComponentDef(def, {
            pipes: [ForwardPipe],
        });
    });
    it('should compile mixed forward and direct declared pipes', () => {
        const def = (0, core_2.ɵɵngDeclareComponent)({
            version: '18.0.0',
            type: TestClass,
            template: '{{ expr | forward | test }}',
            pipes: {
                'test': TestPipe,
                'forward': (0, core_2.forwardRef)(function () {
                    return ForwardPipe;
                }),
            },
        });
        let ForwardPipe = (() => {
            let _classDecorators = [(0, core_2.Pipe)({
                    name: 'forward',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ForwardPipe = _classThis = class {
            };
            __setFunctionName(_classThis, "ForwardPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ForwardPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ForwardPipe = _classThis;
        })();
        expectComponentDef(def, {
            pipes: [TestPipe, ForwardPipe],
        });
    });
});
/**
 * Asserts that the provided component definition is according to the provided expectation.
 * Definition fields for which no expectation is present are verified to be initialized to their
 * default value.
 */
function expectComponentDef(actual, expected) {
    const expectation = Object.assign({ selectors: [], template: jasmine.any(Function), inputs: {}, declaredInputs: {}, outputs: {}, features: null, hostAttrs: null, hostBindings: null, hostVars: 0, contentQueries: null, viewQuery: null, exportAs: null, providersResolver: null, 
        // Although the default view encapsulation is `Emulated`, the default expected view
        // encapsulation is `None` as this is chosen when no styles are present.
        encapsulation: core_2.ViewEncapsulation.None, onPush: false, styles: [], directives: [], pipes: [], data: {} }, expected);
    expect(actual.type).toBe(TestClass);
    expect(actual.selectors).withContext('selectors').toEqual(expectation.selectors);
    expect(actual.template).withContext('template').toEqual(expectation.template);
    expect(actual.inputs).withContext('inputs').toEqual(expectation.inputs);
    expect(actual.declaredInputs).withContext('declaredInputs').toEqual(expectation.declaredInputs);
    expect(actual.outputs).withContext('outputs').toEqual(expectation.outputs);
    expect(actual.features).withContext('features').toEqual(expectation.features);
    expect(actual.hostAttrs).withContext('hostAttrs').toEqual(expectation.hostAttrs);
    expect(actual.hostBindings).withContext('hostBindings').toEqual(expectation.hostBindings);
    expect(actual.hostVars).withContext('hostVars').toEqual(expectation.hostVars);
    expect(actual.contentQueries).withContext('contentQueries').toEqual(expectation.contentQueries);
    expect(actual.viewQuery).withContext('viewQuery').toEqual(expectation.viewQuery);
    expect(actual.exportAs).withContext('exportAs').toEqual(expectation.exportAs);
    expect(actual.providersResolver)
        .withContext('providersResolver')
        .toEqual(expectation.providersResolver);
    expect(actual.encapsulation).withContext('encapsulation').toEqual(expectation.encapsulation);
    expect(actual.onPush).withContext('onPush').toEqual(expectation.onPush);
    expect(actual.styles).withContext('styles').toEqual(expectation.styles);
    expect(actual.data).withContext('data').toEqual(expectation.data);
    const convertNullToEmptyArray = (arr) => arr !== null && arr !== void 0 ? arr : [];
    const directiveDefs = typeof actual.directiveDefs === 'function' ? actual.directiveDefs() : actual.directiveDefs;
    const directiveTypes = directiveDefs !== null ? directiveDefs.map((def) => def.type) : null;
    expect(convertNullToEmptyArray(directiveTypes)).toEqual(expectation.directives);
    const pipeDefs = typeof actual.pipeDefs === 'function' ? actual.pipeDefs() : actual.pipeDefs;
    const pipeTypes = pipeDefs !== null ? pipeDefs.map((def) => def.type) : null;
    expect(convertNullToEmptyArray(pipeTypes)).toEqual(expectation.pipes);
}
class TestClass {
}
let TestDir = (() => {
    let _classDecorators = [(0, core_2.Directive)({
            selector: '[dir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestDir = _classThis = class {
    };
    __setFunctionName(_classThis, "TestDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestDir = _classThis;
})();
let TestCmp = (() => {
    let _classDecorators = [(0, core_2.Component)({
            selector: 'cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmp = _classThis = class {
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
let TestPipe = (() => {
    let _classDecorators = [(0, core_2.Pipe)({
            name: 'test',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestPipe = _classThis = class {
    };
    __setFunctionName(_classThis, "TestPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestPipe = _classThis;
})();
