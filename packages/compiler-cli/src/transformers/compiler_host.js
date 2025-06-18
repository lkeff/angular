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
exports.setWrapHostForTest = setWrapHostForTest;
exports.createCompilerHost = createCompilerHost;
const typescript_1 = __importDefault(require("typescript"));
let wrapHostForTest = null;
function setWrapHostForTest(wrapFn) {
    wrapHostForTest = wrapFn;
}
function createCompilerHost({ options, tsHost = typescript_1.default.createCompilerHost(options, true), }) {
    if (wrapHostForTest !== null) {
        tsHost = wrapHostForTest(tsHost);
    }
    return tsHost;
}
