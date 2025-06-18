"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const util_1 = require("../src/util");
describe('ngtsc annotation utilities', () => {
    describe('unwrapExpression', () => {
        const obj = typescript_1.default.factory.createObjectLiteralExpression();
        it('should pass through an ObjectLiteralExpression', () => {
            expect((0, util_1.unwrapExpression)(obj)).toBe(obj);
        });
        it('should unwrap an ObjectLiteralExpression in parentheses', () => {
            const wrapped = typescript_1.default.factory.createParenthesizedExpression(obj);
            expect((0, util_1.unwrapExpression)(wrapped)).toBe(obj);
        });
        it('should unwrap an ObjectLiteralExpression with a type cast', () => {
            const cast = typescript_1.default.factory.createAsExpression(obj, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
            expect((0, util_1.unwrapExpression)(cast)).toBe(obj);
        });
        it('should unwrap an ObjectLiteralExpression with a type cast in parentheses', () => {
            const cast = typescript_1.default.factory.createAsExpression(obj, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
            const wrapped = typescript_1.default.factory.createParenthesizedExpression(cast);
            expect((0, util_1.unwrapExpression)(wrapped)).toBe(obj);
        });
    });
});
