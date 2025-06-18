"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
/**
 * A simple helper to render a TS Node as a string.
 */
function generate(node) {
    const printer = typescript_1.default.createPrinter({ newLine: typescript_1.default.NewLineKind.LineFeed });
    const sf = typescript_1.default.createSourceFile('test.ts', '', typescript_1.default.ScriptTarget.ES2015, true);
    return printer.printNode(typescript_1.default.EmitHint.Unspecified, node, sf);
}
