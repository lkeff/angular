"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const expression_1 = require("./util/expression");
const util_1 = require("./view/util");
describe('expression AST absolute source spans', () => {
    it('should handle comment in interpolation', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('{{foo // comment}}', { preserveWhitespaces: true }).nodes)).toContain(['foo', new index_1.AbsoluteSourceSpan(2, 5)]);
    });
    it('should handle whitespace in interpolation', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('{{  foo  }}', { preserveWhitespaces: true }).nodes)).toContain(['foo', new index_1.AbsoluteSourceSpan(4, 7)]);
    });
    it('should handle whitespace and comment in interpolation', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('{{  foo // comment  }}', { preserveWhitespaces: true }).nodes)).toContain(['foo', new index_1.AbsoluteSourceSpan(4, 7)]);
    });
    it('should handle comment in an action binding', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<button (click)="foo = true // comment">Save</button>', {
            preserveWhitespaces: true,
        }).nodes)).toContain(['foo = true', new index_1.AbsoluteSourceSpan(17, 27)]);
    });
    // TODO(ayazhafiz): duplicate this test without `preserveWhitespaces` once whitespace rewriting is
    // moved to post-R3AST generation.
    it('should provide absolute offsets with arbitrary whitespace', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>\n  \n{{foo}}</div>', { preserveWhitespaces: true }).nodes)).toContain(['\n  \n{{ foo }}', new index_1.AbsoluteSourceSpan(5, 16)]);
    });
    it('should provide absolute offsets of an expression in a bound text', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{foo}}</div>').nodes)).toContain([
            '{{ foo }}',
            new index_1.AbsoluteSourceSpan(5, 12),
        ]);
    });
    it('should provide absolute offsets of an expression in a bound event', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="foo();bar();"></div>').nodes)).toContain([
            'foo(); bar();',
            new index_1.AbsoluteSourceSpan(14, 26),
        ]);
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div on-click="foo();bar();"></div>').nodes)).toContain([
            'foo(); bar();',
            new index_1.AbsoluteSourceSpan(15, 27),
        ]);
    });
    it('should provide absolute offsets of an expression in a bound attribute', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<input [disabled]="condition ? true : false" />').nodes)).toContain(['condition ? true : false', new index_1.AbsoluteSourceSpan(19, 43)]);
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<input bind-disabled="condition ? true : false" />').nodes)).toContain(['condition ? true : false', new index_1.AbsoluteSourceSpan(22, 46)]);
    });
    it('should provide absolute offsets of an expression in a template attribute', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div *ngIf="value | async"></div>').nodes)).toContain([
            '(value | async)',
            new index_1.AbsoluteSourceSpan(12, 25),
        ]);
    });
    describe('binary expression', () => {
        it('should provide absolute offsets of a binary expression', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{1 + 2}}<div>').nodes)).toContain([
                '1 + 2',
                new index_1.AbsoluteSourceSpan(7, 12),
            ]);
        });
        it('should provide absolute offsets of expressions in a binary expression', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{1 + 2}}<div>').nodes)).toEqual(jasmine.arrayContaining([
                ['1', new index_1.AbsoluteSourceSpan(7, 8)],
                ['2', new index_1.AbsoluteSourceSpan(11, 12)],
            ]));
        });
    });
    describe('conditional', () => {
        it('should provide absolute offsets of a conditional', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{bool ? 1 : 0}}<div>').nodes)).toContain([
                'bool ? 1 : 0',
                new index_1.AbsoluteSourceSpan(7, 19),
            ]);
        });
        it('should provide absolute offsets of expressions in a conditional', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{bool ? 1 : 0}}<div>').nodes)).toEqual(jasmine.arrayContaining([
                ['bool', new index_1.AbsoluteSourceSpan(7, 11)],
                ['1', new index_1.AbsoluteSourceSpan(14, 15)],
                ['0', new index_1.AbsoluteSourceSpan(18, 19)],
            ]));
        });
    });
    describe('chain', () => {
        it('should provide absolute offsets of a chain', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="a(); b();"><div>').nodes)).toContain([
                'a(); b();',
                new index_1.AbsoluteSourceSpan(14, 23),
            ]);
        });
        it('should provide absolute offsets of expressions in a chain', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="a(); b();"><div>').nodes)).toEqual(jasmine.arrayContaining([
                ['a()', new index_1.AbsoluteSourceSpan(14, 17)],
                ['b()', new index_1.AbsoluteSourceSpan(19, 22)],
            ]));
        });
    });
    describe('function call', () => {
        it('should provide absolute offsets of a function call', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{fn()()}}<div>').nodes)).toContain([
                'fn()()',
                new index_1.AbsoluteSourceSpan(7, 13),
            ]);
        });
        it('should provide absolute offsets of expressions in a function call', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{fn()(param)}}<div>').nodes)).toContain([
                'param',
                new index_1.AbsoluteSourceSpan(12, 17),
            ]);
        });
    });
    it('should provide absolute offsets of an implicit receiver', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{a.b}}<div>').nodes)).toContain([
            '',
            new index_1.AbsoluteSourceSpan(7, 7),
        ]);
    });
    describe('interpolation', () => {
        it('should provide absolute offsets of an interpolation', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{1 + foo.length}}<div>').nodes)).toContain([
                '{{ 1 + foo.length }}',
                new index_1.AbsoluteSourceSpan(5, 23),
            ]);
        });
        it('should provide absolute offsets of expressions in an interpolation', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{1 + 2}}<div>').nodes)).toEqual(jasmine.arrayContaining([
                ['1', new index_1.AbsoluteSourceSpan(7, 8)],
                ['2', new index_1.AbsoluteSourceSpan(11, 12)],
            ]));
        });
        it('should handle HTML entity before interpolation', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('&nbsp;{{abc}}').nodes)).toEqual(jasmine.arrayContaining([['abc', new index_1.AbsoluteSourceSpan(8, 11)]]));
        });
        it('should handle many HTML entities and many interpolations', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('&quot;{{abc}}&quot;{{def}}&nbsp;{{ghi}}').nodes)).toEqual(jasmine.arrayContaining([
                ['abc', new index_1.AbsoluteSourceSpan(8, 11)],
                ['def', new index_1.AbsoluteSourceSpan(21, 24)],
                ['ghi', new index_1.AbsoluteSourceSpan(34, 37)],
            ]));
        });
        it('should handle interpolation in attribute', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div class="{{abc}}"><div>').nodes)).toEqual(jasmine.arrayContaining([['abc', new index_1.AbsoluteSourceSpan(14, 17)]]));
        });
        it('should handle interpolation preceded by HTML entity in attribute', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div class="&nbsp;{{abc}}"><div>').nodes)).toEqual(jasmine.arrayContaining([['abc', new index_1.AbsoluteSourceSpan(20, 23)]]));
        });
        it('should handle many interpolation with HTML entities in attribute', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div class="&quot;{{abc}}&quot;&nbsp;{{def}}"><div>').nodes)).toEqual(jasmine.arrayContaining([
                ['abc', new index_1.AbsoluteSourceSpan(20, 23)],
                ['def', new index_1.AbsoluteSourceSpan(39, 42)],
            ]));
        });
    });
    describe('keyed read', () => {
        it('should provide absolute offsets of a keyed read', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{obj[key]}}<div>').nodes)).toContain([
                'obj[key]',
                new index_1.AbsoluteSourceSpan(7, 15),
            ]);
        });
        it('should provide absolute offsets of expressions in a keyed read', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{obj[key]}}<div>').nodes)).toContain([
                'key',
                new index_1.AbsoluteSourceSpan(11, 14),
            ]);
        });
    });
    describe('keyed write', () => {
        it('should provide absolute offsets of a keyed write', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{obj[key] = 0}}<div>').nodes)).toContain([
                'obj[key] = 0',
                new index_1.AbsoluteSourceSpan(7, 19),
            ]);
        });
        it('should provide absolute offsets of expressions in a keyed write', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{obj[key] = 0}}<div>').nodes)).toEqual(jasmine.arrayContaining([
                ['key', new index_1.AbsoluteSourceSpan(11, 14)],
                ['0', new index_1.AbsoluteSourceSpan(18, 19)],
            ]));
        });
    });
    it('should provide absolute offsets of a literal primitive', () => {
        expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{100}}<div>').nodes)).toContain([
            '100',
            new index_1.AbsoluteSourceSpan(7, 10),
        ]);
    });
    describe('literal array', () => {
        it('should provide absolute offsets of a literal array', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{[0, 1, 2]}}<div>').nodes)).toContain([
                '[0, 1, 2]',
                new index_1.AbsoluteSourceSpan(7, 16),
            ]);
        });
        it('should provide absolute offsets of expressions in a literal array', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{[0, 1, 2]}}<div>').nodes)).toEqual(jasmine.arrayContaining([
                ['0', new index_1.AbsoluteSourceSpan(8, 9)],
                ['1', new index_1.AbsoluteSourceSpan(11, 12)],
                ['2', new index_1.AbsoluteSourceSpan(14, 15)],
            ]));
        });
    });
    describe('literal map', () => {
        it('should provide absolute offsets of a literal map', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{ {a: 0} }}<div>').nodes)).toContain([
                '{a: 0}',
                new index_1.AbsoluteSourceSpan(8, 14),
            ]);
        });
        it('should provide absolute offsets of expressions in a literal map', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{ {a: 0} }}<div>').nodes)).toEqual(jasmine.arrayContaining([['0', new index_1.AbsoluteSourceSpan(12, 13)]]));
        });
    });
    describe('method call', () => {
        it('should provide absolute offsets of a method call', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{method()}}</div>').nodes)).toContain([
                'method()',
                new index_1.AbsoluteSourceSpan(7, 15),
            ]);
        });
        it('should provide absolute offsets of expressions in a method call', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{method(param)}}<div>').nodes)).toContain([
                'param',
                new index_1.AbsoluteSourceSpan(14, 19),
            ]);
        });
    });
    describe('non-null assert', () => {
        it('should provide absolute offsets of a non-null assert', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop!}}</div>').nodes)).toContain([
                'prop!',
                new index_1.AbsoluteSourceSpan(7, 12),
            ]);
        });
        it('should provide absolute offsets of expressions in a non-null assert', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop!}}<div>').nodes)).toContain([
                'prop',
                new index_1.AbsoluteSourceSpan(7, 11),
            ]);
        });
    });
    describe('pipe', () => {
        it('should provide absolute offsets of a pipe', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop | pipe}}<div>').nodes)).toContain([
                '(prop | pipe)',
                new index_1.AbsoluteSourceSpan(7, 18),
            ]);
        });
        it('should provide absolute offsets expressions in a pipe', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop | pipe}}<div>').nodes)).toContain([
                'prop',
                new index_1.AbsoluteSourceSpan(7, 11),
            ]);
        });
    });
    describe('property read', () => {
        it('should provide absolute offsets of a property read', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop.obj}}<div>').nodes)).toContain([
                'prop.obj',
                new index_1.AbsoluteSourceSpan(7, 15),
            ]);
        });
        it('should provide absolute offsets of expressions in a property read', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop.obj}}<div>').nodes)).toContain([
                'prop',
                new index_1.AbsoluteSourceSpan(7, 11),
            ]);
        });
    });
    describe('property write', () => {
        it('should provide absolute offsets of a property write', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="prop = 0"></div>').nodes)).toContain([
                'prop = 0',
                new index_1.AbsoluteSourceSpan(14, 22),
            ]);
        });
        it('should provide absolute offsets of an accessed property write', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="prop.inner = 0"></div>').nodes)).toContain(['prop.inner = 0', new index_1.AbsoluteSourceSpan(14, 28)]);
        });
        it('should provide absolute offsets of expressions in a property write', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="prop = 0"></div>').nodes)).toContain([
                '0',
                new index_1.AbsoluteSourceSpan(21, 22),
            ]);
        });
    });
    describe('"not" prefix', () => {
        it('should provide absolute offsets of a "not" prefix', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{!prop}}</div>').nodes)).toContain([
                '!prop',
                new index_1.AbsoluteSourceSpan(7, 12),
            ]);
        });
        it('should provide absolute offsets of expressions in a "not" prefix', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{!prop}}<div>').nodes)).toContain([
                'prop',
                new index_1.AbsoluteSourceSpan(8, 12),
            ]);
        });
    });
    describe('safe method call', () => {
        it('should provide absolute offsets of a safe method call', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop?.safe()}}<div>').nodes)).toContain([
                'prop?.safe()',
                new index_1.AbsoluteSourceSpan(7, 19),
            ]);
        });
        it('should provide absolute offsets of expressions in safe method call', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop?.safe()}}<div>').nodes)).toContain([
                'prop',
                new index_1.AbsoluteSourceSpan(7, 11),
            ]);
        });
    });
    describe('safe property read', () => {
        it('should provide absolute offsets of a safe property read', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop?.safe}}<div>').nodes)).toContain([
                'prop?.safe',
                new index_1.AbsoluteSourceSpan(7, 17),
            ]);
        });
        it('should provide absolute offsets of expressions in safe property read', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div>{{prop?.safe}}<div>').nodes)).toContain([
                'prop',
                new index_1.AbsoluteSourceSpan(7, 11),
            ]);
        });
    });
    describe('absolute offsets for template expressions', () => {
        it('should work for simple cases', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div *ngFor="let item of items">{{item}}</div>').nodes)).toContain(['items', new index_1.AbsoluteSourceSpan(25, 30)]);
        });
        it('should work with multiple bindings', () => {
            expect((0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div *ngFor="let a of As; let b of Bs"></div>').nodes)).toEqual(jasmine.arrayContaining([
                ['As', new index_1.AbsoluteSourceSpan(22, 24)],
                ['Bs', new index_1.AbsoluteSourceSpan(35, 37)],
            ]));
        });
    });
    describe('ICU expressions', () => {
        it('is correct for variables and placeholders', () => {
            const spans = (0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<span i18n>{item.var, plural, other { {{item.placeholder}} items } }</span>').nodes);
            expect(spans).toContain(['item.var', new index_1.AbsoluteSourceSpan(12, 20)]);
            expect(spans).toContain(['item.placeholder', new index_1.AbsoluteSourceSpan(40, 56)]);
        });
        it('is correct for variables and placeholders', () => {
            const spans = (0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<span i18n>{item.var, plural, other { {{item.placeholder}} {nestedVar, plural, other { {{nestedPlaceholder}} }}} }</span>').nodes);
            expect(spans).toContain(['item.var', new index_1.AbsoluteSourceSpan(12, 20)]);
            expect(spans).toContain(['item.placeholder', new index_1.AbsoluteSourceSpan(40, 56)]);
            expect(spans).toContain(['nestedVar', new index_1.AbsoluteSourceSpan(60, 69)]);
            expect(spans).toContain(['nestedPlaceholder', new index_1.AbsoluteSourceSpan(89, 106)]);
        });
    });
    describe('object literal', () => {
        it('is correct for object literals with shorthand property declarations', () => {
            const spans = (0, expression_1.humanizeExpressionSource)((0, util_1.parseR3)('<div (click)="test({a: 1, b, c: 3, foo})"></div>').nodes);
            expect(spans).toContain(['{a: 1, b: b, c: 3, foo: foo}', new index_1.AbsoluteSourceSpan(19, 39)]);
            expect(spans).toContain(['b', new index_1.AbsoluteSourceSpan(26, 27)]);
            expect(spans).toContain(['foo', new index_1.AbsoluteSourceSpan(35, 38)]);
        });
    });
});
