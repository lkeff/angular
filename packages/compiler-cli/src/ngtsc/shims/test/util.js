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
exports.TestShimGenerator = void 0;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
class TestShimGenerator {
    constructor() {
        this.shouldEmit = false;
        this.extensionPrefix = 'testshim';
    }
    generateShimForFile(sf, genFilePath, priorSf) {
        if (priorSf !== null) {
            return priorSf;
        }
        const path = (0, file_system_1.absoluteFromSourceFile)(sf);
        return typescript_1.default.createSourceFile(genFilePath, `export const SHIM_FOR_FILE = '${path}';\n`, typescript_1.default.ScriptTarget.Latest, true);
    }
}
exports.TestShimGenerator = TestShimGenerator;
