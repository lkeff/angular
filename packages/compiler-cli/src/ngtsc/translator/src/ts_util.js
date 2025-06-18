"use strict";
/*!
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
exports.tsNumericExpression = tsNumericExpression;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Creates a TypeScript node representing a numeric value.
 */
function tsNumericExpression(value) {
    // As of TypeScript 5.3 negative numbers are represented as `prefixUnaryOperator` and passing a
    // negative number (even as a string) into `createNumericLiteral` will result in an error.
    if (value < 0) {
        const operand = typescript_1.default.factory.createNumericLiteral(Math.abs(value));
        return typescript_1.default.factory.createPrefixUnaryExpression(typescript_1.default.SyntaxKind.MinusToken, operand);
    }
    return typescript_1.default.factory.createNumericLiteral(value);
}
