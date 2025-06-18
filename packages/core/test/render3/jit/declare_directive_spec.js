"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../src/core");
const render3_1 = require("../../../src/render3");
const matcher_1 = require("./matcher");
const input_flags_1 = require("../../../src/render3/interfaces/input_flags");
describe('directive declaration jit compilation', () => {
    it('should compile a minimal directive declaration', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
        });
        expectDirectiveDef(def, {});
    });
    it('should compile a selector', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            selector: '[dir], test',
        });
        expectDirectiveDef(def, {
            selectors: [['', 'dir', ''], ['test']],
        });
    });
    it('should compile inputs and outputs', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            inputs: {
                minifiedProperty: 'property',
                minifiedClassProperty: ['bindingName', 'classProperty'],
            },
            outputs: {
                minifiedEventName: 'eventBindingName',
            },
        });
        expectDirectiveDef(def, {
            inputs: {
                'property': ['minifiedProperty', input_flags_1.InputFlags.None, null],
                'bindingName': ['minifiedClassProperty', input_flags_1.InputFlags.None, null],
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
    it('should compile exportAs', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            exportAs: ['a', 'b'],
        });
        expectDirectiveDef(def, {
            exportAs: ['a', 'b'],
        });
    });
    it('should compile providers', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            providers: [{ provide: 'token', useValue: 123 }],
        });
        expectDirectiveDef(def, {
            features: [jasmine.any(Function)],
            providersResolver: jasmine.any(Function),
        });
    });
    it('should compile content queries', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
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
                    read: core_1.ElementRef,
                    emitDistinctChangesOnly: false,
                },
            ],
        });
        expectDirectiveDef(def, {
            contentQueries: (0, matcher_1.functionContaining)([
                // "byRef" should use `contentQuery` with `0` (`QueryFlags.descendants|QueryFlags.isStatic`)
                // for query flag without a read token, and bind to the full query result.
                /contentQuery[^(]*\(dirIndex,_c0,4\)/,
                '(ctx.byRef = _t)',
                // "byToken" should use `viewQuery` with `3` (`QueryFlags.static|QueryFlags.descendants`)
                // for query flag and `ElementRef` as read token, and bind to the first result in the
                // query result.
                /contentQuery[^(]*\([^,]*dirIndex,[^,]*String[^,]*,3,[^)]*ElementRef[^)]*\)/,
                '(ctx.byToken = _t.first)',
            ]),
        });
    });
    it('should compile content queries with forwardRefs', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            queries: [
                {
                    propertyName: 'byRef',
                    predicate: (0, core_1.forwardRef)(() => Child),
                },
            ],
        });
        class Child {
        }
        expectDirectiveDef(def, {
            contentQueries: (0, matcher_1.functionContaining)([
                /contentQuery[^(]*\(dirIndex,[^,]*resolveForwardRef[^,]*forward_ref[^,]*,[\s]*4\)/,
                '(ctx.byRef = _t)',
            ]),
        });
    });
    it('should compile view queries', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
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
                    read: core_1.ElementRef,
                    emitDistinctChangesOnly: false,
                },
            ],
        });
        expectDirectiveDef(def, {
            viewQuery: (0, matcher_1.functionContaining)([
                // "byRef" should use `viewQuery` with`0` (`QueryFlags.none`) for query flag without a read
                // token, and bind to the full query result.
                /viewQuery[^(]*\(_c0,4\)/,
                '(ctx.byRef = _t)',
                // "byToken" should use `viewQuery` with `3` (`QueryFlags.static|QueryFlags.descendants`)
                // for query flag and `ElementRef` as read token, and bind to the first result in the
                // query result.
                /viewQuery[^(]*\([^,]*String[^,]*,3,[^)]*ElementRef[^)]*\)/,
                '(ctx.byToken = _t.first)',
            ]),
        });
    });
    it('should compile view queries with forwardRefs', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            viewQueries: [
                {
                    propertyName: 'byRef',
                    predicate: (0, core_1.forwardRef)(() => Child),
                },
            ],
        });
        class Child {
        }
        expectDirectiveDef(def, {
            viewQuery: (0, matcher_1.functionContaining)([
                /viewQuery[^(]*\([^,]*resolveForwardRef[^,]*forward_ref[^,]*,[\s]*4\)/,
                '(ctx.byRef = _t)',
            ]),
        });
    });
    it('should compile host bindings', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
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
        expectDirectiveDef(def, {
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
    it('should compile directives with inheritance', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            usesInheritance: true,
        });
        expectDirectiveDef(def, {
            features: [render3_1.ɵɵInheritDefinitionFeature],
        });
    });
    it('should compile directives with onChanges lifecycle hook', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            usesOnChanges: true,
        });
        expectDirectiveDef(def, {
            features: [render3_1.ɵɵNgOnChangesFeature],
        });
    });
    it('should compile host directives', () => {
        class One {
        }
        class Two {
        }
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '18.0.0',
            type: TestClass,
            hostDirectives: [
                {
                    directive: One,
                    inputs: ['firstInput', 'firstInput', 'secondInput', 'secondInputAlias'],
                    outputs: ['firstOutput', 'firstOutput', 'secondOutput', 'secondOutputAlias'],
                },
                {
                    directive: Two,
                },
            ],
        });
        expectDirectiveDef(def, {
            features: [jasmine.any(Function)],
            hostDirectives: [
                {
                    directive: One,
                    inputs: {
                        'firstInput': 'firstInput',
                        'secondInput': 'secondInputAlias',
                    },
                    outputs: {
                        'firstOutput': 'firstOutput',
                        'secondOutput': 'secondOutputAlias',
                    },
                },
                {
                    directive: Two,
                    inputs: {},
                    outputs: {},
                },
            ],
        });
    });
    it('should declare a 0.0.0 directive as standalone', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '0.0.0-PLACEHOLDER',
            type: TestClass,
        });
        expectDirectiveDef(def, {
            standalone: true,
        });
    });
    it('should declare a v19+ directive as standalone', () => {
        const def = (0, core_1.ɵɵngDeclareDirective)({
            version: '19.0.0',
            type: TestClass,
        });
        expectDirectiveDef(def, {
            standalone: true,
        });
    });
});
/**
 * Asserts that the provided directive definition is according to the provided expectation.
 * Definition fields for which no expectation is present are verified to be initialized to their
 * default value.
 */
function expectDirectiveDef(actual, expected) {
    const expectation = Object.assign({ selectors: [], inputs: {}, declaredInputs: {}, outputs: {}, features: null, hostAttrs: null, hostBindings: null, hostVars: 0, contentQueries: null, viewQuery: null, exportAs: null, providersResolver: null, hostDirectives: null, standalone: false }, expected);
    expect(actual.type).toBe(TestClass);
    expect(actual.selectors).withContext('selectors').toEqual(expectation.selectors);
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
    expect(actual.hostDirectives).withContext('hostDirectives').toEqual(expectation.hostDirectives);
    expect(actual.standalone).withContext('standalone').toEqual(expectation.standalone);
}
class TestClass {
}
