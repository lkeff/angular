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
exports.writeBinaryOperators = void 0;
const typescript_1 = __importDefault(require("typescript"));
/**
 * List of binary operators that indicate a write operation.
 *
 * Useful for figuring out whether an expression assigns to
 * something or not.
 */
exports.writeBinaryOperators = [
    typescript_1.default.SyntaxKind.EqualsToken,
    typescript_1.default.SyntaxKind.BarBarEqualsToken,
    typescript_1.default.SyntaxKind.BarEqualsToken,
    typescript_1.default.SyntaxKind.AmpersandEqualsToken,
    typescript_1.default.SyntaxKind.AmpersandAmpersandEqualsToken,
    typescript_1.default.SyntaxKind.SlashEqualsToken,
    typescript_1.default.SyntaxKind.MinusEqualsToken,
    typescript_1.default.SyntaxKind.PlusEqualsToken,
    typescript_1.default.SyntaxKind.CaretEqualsToken,
    typescript_1.default.SyntaxKind.PercentEqualsToken,
    typescript_1.default.SyntaxKind.AsteriskEqualsToken,
    typescript_1.default.SyntaxKind.ExclamationEqualsToken,
];
