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
exports.FlatIndexGenerator = void 0;
/// <reference types="node" />
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const path_1 = require("../../util/src/path");
class FlatIndexGenerator {
    constructor(entryPoint, relativeFlatIndexPath, moduleName) {
        this.entryPoint = entryPoint;
        this.moduleName = moduleName;
        this.shouldEmit = true;
        this.flatIndexPath =
            (0, file_system_1.join)((0, file_system_1.dirname)(entryPoint), relativeFlatIndexPath).replace(/\.js$/, '') + '.ts';
    }
    makeTopLevelShim() {
        const relativeEntryPoint = (0, path_1.relativePathBetween)(this.flatIndexPath, this.entryPoint);
        const contents = `/**
 * Generated bundle index. Do not edit.
 */

export * from '${relativeEntryPoint}';
`;
        const genFile = typescript_1.default.createSourceFile(this.flatIndexPath, contents, typescript_1.default.ScriptTarget.ES2015, true, typescript_1.default.ScriptKind.TS);
        if (this.moduleName !== null) {
            genFile.moduleName = this.moduleName;
        }
        return genFile;
    }
}
exports.FlatIndexGenerator = FlatIndexGenerator;
