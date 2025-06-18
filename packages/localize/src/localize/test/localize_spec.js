"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("../src/localize");
describe('$localize tag', () => {
    describe('with no `translate()` defined (the default)', () => {
        it('should render template literals as-is', () => {
            expect(localize_1.$localize.translate).toBeUndefined();
            expect((0, localize_1.$localize) `abc`).toEqual('abc');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}`).toEqual('abc6');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def`).toEqual('abc6def');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def${4 + 5 + 6}`).toEqual('abc6def15');
            const getName = () => 'World';
            expect((0, localize_1.$localize) `Hello, ${getName()}!`).toEqual('Hello, World!');
        });
        it('should strip metadata block from message parts', () => {
            expect(localize_1.$localize.translate).toBeUndefined();
            expect((0, localize_1.$localize) `:meaning|description@@custom-id:abcdef`).toEqual('abcdef');
        });
        it('should ignore escaped metadata block marker', () => {
            expect(localize_1.$localize.translate).toBeUndefined();
            expect((0, localize_1.$localize) `\:abc:def`).toEqual(':abc:def');
        });
        it('should strip metadata block containing escaped block markers', () => {
            expect(localize_1.$localize.translate).toBeUndefined();
            expect((0, localize_1.$localize) `:abc\:def:content`).toEqual('content');
        });
        it('should strip placeholder names from message parts', () => {
            expect(localize_1.$localize.translate).toBeUndefined();
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}:ph1:def${4 + 5 + 6}:ph2:`).toEqual('abc6def15');
        });
        it('should ignore escaped placeholder name marker', () => {
            expect(localize_1.$localize.translate).toBeUndefined();
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}\:ph1:def${4 + 5 + 6}\:ph2:`).toEqual('abc6:ph1:def15:ph2:');
        });
    });
    describe('with `translate()` defined as an identity', () => {
        beforeEach(() => {
            localize_1.$localize.translate = identityTranslate;
        });
        afterEach(() => {
            localize_1.$localize.translate = undefined;
        });
        it('should render template literals as-is', () => {
            expect((0, localize_1.$localize) `abc`).toEqual('abc');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}`).toEqual('abc6');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def`).toEqual('abc6def');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def${4 + 5 + 6}`).toEqual('abc6def15');
            const getName = () => 'World';
            expect((0, localize_1.$localize) `Hello, ${getName()}!`).toEqual('Hello, World!');
        });
    });
    describe('with `translate()` defined to upper-case messageParts', () => {
        beforeEach(() => {
            localize_1.$localize.translate = upperCaseTranslate;
        });
        afterEach(() => {
            localize_1.$localize.translate = undefined;
        });
        it('should render template literals with messages upper-cased', () => {
            expect((0, localize_1.$localize) `abc`).toEqual('ABC');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}`).toEqual('ABC6');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def`).toEqual('ABC6DEF');
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def${4 + 5 + 6}`).toEqual('ABC6DEF15');
            const getName = () => 'World';
            expect((0, localize_1.$localize) `Hello, ${getName()}!`).toEqual('HELLO, World!');
        });
    });
    describe('with `translate()` defined to reverse expressions', () => {
        beforeEach(() => {
            localize_1.$localize.translate = reverseTranslate;
        });
        afterEach(() => {
            localize_1.$localize.translate = undefined;
        });
        it('should render template literals with expressions reversed', () => {
            const getName = () => 'World';
            expect((0, localize_1.$localize) `abc${1 + 2 + 3}def${4 + 5 + 6} - Hello, ${getName()}!`).toEqual('abcWorlddef15 - Hello, 6!');
        });
    });
});
function makeTemplateObject(cooked, raw) {
    Object.defineProperty(cooked, 'raw', { value: raw });
    return cooked;
}
const identityTranslate = function (messageParts, expressions) {
    return [messageParts, expressions];
};
const upperCaseTranslate = function (messageParts, expressions) {
    return [
        makeTemplateObject(Array.from(messageParts).map((part) => part.toUpperCase()), messageParts.raw.map((part) => part.toUpperCase())),
        expressions,
    ];
};
const reverseTranslate = function (messageParts, expressions) {
    expressions = Array.from(expressions).reverse();
    return [messageParts, expressions];
};
