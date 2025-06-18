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
exports.setupTsurgeJasmineHelpers = setupTsurgeJasmineHelpers;
/// <reference types="jasmine" />
const chalk_1 = __importDefault(require("chalk"));
const dedent_1 = require("./dedent");
const diff_1 = require("./diff");
function setupTsurgeJasmineHelpers() {
    jasmine.addMatchers({
        toMatchWithDiff: () => {
            return {
                compare(actual, expected) {
                    actual = (0, dedent_1.dedent) `${actual}`;
                    expected = (0, dedent_1.dedent) `${expected}`;
                    if (actual === expected) {
                        return { pass: true };
                    }
                    const diffWithColors = (0, diff_1.diffText)(expected, actual);
                    return {
                        pass: false,
                        message: `${chalk_1.default.bold('Expected contents to match.')}\n\n` +
                            `  - ${chalk_1.default.green('■■■■■■■')}: Unexpected text in your test assertion.\n` +
                            `  - ${chalk_1.default.red(`■■■■■■■`)}: Text that is missing in your assertion.\n` +
                            `${chalk_1.default.bold('Diff below')}:\n${diffWithColors}`,
                    };
                },
            };
        },
    });
}
