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
exports.patchLanguageServiceProjectsWithTestHost = patchLanguageServiceProjectsWithTestHost;
const testing_1 = require("@angular/compiler-cli/src/ngtsc/testing");
const typescript_1 = __importDefault(require("typescript"));
let patchedLanguageServiceProjectHost = false;
/**
 * Updates `ts.server.Project` to use efficient test caching of source files
 * that aren't expected to be changed. E.g. the default libs.
 */
function patchLanguageServiceProjectsWithTestHost() {
    if (patchedLanguageServiceProjectHost) {
        return;
    }
    patchedLanguageServiceProjectHost = true;
    typescript_1.default.server.Project.prototype.setCompilerHost = (host) => {
        const _originalHostGetSourceFile = host.getSourceFile;
        const _originalHostGetSourceFileByPath = host.getSourceFileByPath;
        host.getSourceFile = (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
            var _a;
            return ((_a = (0, testing_1.getCachedSourceFile)(fileName, () => host.readFile(fileName))) !== null && _a !== void 0 ? _a : _originalHostGetSourceFile.call(host, fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile));
        };
        if (_originalHostGetSourceFileByPath !== undefined) {
            host.getSourceFileByPath = (fileName, path, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
                var _a;
                return ((_a = (0, testing_1.getCachedSourceFile)(fileName, () => host.readFile(fileName))) !== null && _a !== void 0 ? _a : _originalHostGetSourceFileByPath.call(host, fileName, path, languageVersionOrOptions, onError, shouldCreateNewSourceFile));
            };
        }
    };
}
