"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../../src/expression_parser/lexer");
const parser_1 = require("../../src/expression_parser/parser");
const serializer_1 = require("../../src/expression_parser/serializer");
const parser = new parser_1.Parser(new lexer_1.Lexer());
function parse(expression) {
    return parser.parseBinding(expression, /* location */ '', /* absoluteOffset */ 0);
}
function parseAction(expression) {
    return parser.parseAction(expression, /* location */ '', /* absoluteOffset */ 0);
}
describe('serializer', () => {
    describe('serialize', () => {
        it('serializes unary plus', () => {
            expect((0, serializer_1.serialize)(parse(' + 1234 '))).toBe('+1234');
        });
        it('serializes unary negative', () => {
            expect((0, serializer_1.serialize)(parse(' - 1234 '))).toBe('-1234');
        });
        it('serializes binary operations', () => {
            expect((0, serializer_1.serialize)(parse(' 1234   +   4321 '))).toBe('1234 + 4321');
        });
        it('serializes exponentiation', () => {
            expect((0, serializer_1.serialize)(parse(' 1  *  2  **  3 '))).toBe('1 * 2 ** 3');
        });
        it('serializes chains', () => {
            expect((0, serializer_1.serialize)(parseAction(' 1234;   4321 '))).toBe('1234; 4321');
        });
        it('serializes conditionals', () => {
            expect((0, serializer_1.serialize)(parse(' cond   ?   1234   :   4321 '))).toBe('cond ? 1234 : 4321');
        });
        it('serializes `this`', () => {
            expect((0, serializer_1.serialize)(parse(' this '))).toBe('this');
        });
        it('serializes keyed reads', () => {
            expect((0, serializer_1.serialize)(parse(' foo   [bar] '))).toBe('foo[bar]');
        });
        it('serializes keyed write', () => {
            expect((0, serializer_1.serialize)(parse(' foo   [bar]   =   baz '))).toBe('foo[bar] = baz');
        });
        it('serializes array literals', () => {
            expect((0, serializer_1.serialize)(parse(' [   foo,   bar,   baz   ] '))).toBe('[foo, bar, baz]');
        });
        it('serializes object literals', () => {
            expect((0, serializer_1.serialize)(parse(' {   foo:   bar,   baz:   test   } '))).toBe('{foo: bar, baz: test}');
        });
        it('serializes primitives', () => {
            expect((0, serializer_1.serialize)(parse(` 'test' `))).toBe(`'test'`);
            expect((0, serializer_1.serialize)(parse(' "test" '))).toBe(`'test'`);
            expect((0, serializer_1.serialize)(parse(' true '))).toBe('true');
            expect((0, serializer_1.serialize)(parse(' false '))).toBe('false');
            expect((0, serializer_1.serialize)(parse(' 1234 '))).toBe('1234');
            expect((0, serializer_1.serialize)(parse(' null '))).toBe('null');
            expect((0, serializer_1.serialize)(parse(' undefined '))).toBe('undefined');
        });
        it('escapes string literals', () => {
            expect((0, serializer_1.serialize)(parse(` 'Hello, \\'World\\'...' `))).toBe(`'Hello, \\'World\\'...'`);
            expect((0, serializer_1.serialize)(parse(` 'Hello, \\"World\\"...' `))).toBe(`'Hello, "World"...'`);
        });
        it('serializes pipes', () => {
            expect((0, serializer_1.serialize)(parse(' foo   |   pipe '))).toBe('foo | pipe');
        });
        it('serializes not prefixes', () => {
            expect((0, serializer_1.serialize)(parse(' !   foo '))).toBe('!foo');
        });
        it('serializes non-null assertions', () => {
            expect((0, serializer_1.serialize)(parse(' foo   ! '))).toBe('foo!');
        });
        it('serializes property reads', () => {
            expect((0, serializer_1.serialize)(parse(' foo   .   bar '))).toBe('foo.bar');
        });
        it('serializes property writes', () => {
            expect((0, serializer_1.serialize)(parseAction(' foo   .   bar   =   baz '))).toBe('foo.bar = baz');
        });
        it('serializes safe property reads', () => {
            expect((0, serializer_1.serialize)(parse(' foo   ?.   bar '))).toBe('foo?.bar');
        });
        it('serializes safe keyed reads', () => {
            expect((0, serializer_1.serialize)(parse(' foo   ?.   [   bar   ] '))).toBe('foo?.[bar]');
        });
        it('serializes calls', () => {
            expect((0, serializer_1.serialize)(parse(' foo   (   ) '))).toBe('foo()');
            expect((0, serializer_1.serialize)(parse(' foo   (   bar   ) '))).toBe('foo(bar)');
            expect((0, serializer_1.serialize)(parse(' foo   (   bar   ,   ) '))).toBe('foo(bar, )');
            expect((0, serializer_1.serialize)(parse(' foo   (   bar   ,   baz   ) '))).toBe('foo(bar, baz)');
        });
        it('serializes safe calls', () => {
            expect((0, serializer_1.serialize)(parse(' foo   ?.   (   ) '))).toBe('foo?.()');
            expect((0, serializer_1.serialize)(parse(' foo   ?.   (   bar   ) '))).toBe('foo?.(bar)');
            expect((0, serializer_1.serialize)(parse(' foo   ?.   (   bar   ,   ) '))).toBe('foo?.(bar, )');
            expect((0, serializer_1.serialize)(parse(' foo   ?.   (   bar   ,   baz   ) '))).toBe('foo?.(bar, baz)');
        });
        it('serializes void expressions', () => {
            expect((0, serializer_1.serialize)(parse(' void   0 '))).toBe('void 0');
        });
        it('serializes in expressions', () => {
            expect((0, serializer_1.serialize)(parse(' foo   in   bar '))).toBe('foo in bar');
        });
    });
});
