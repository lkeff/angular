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
const adapters_1 = require("../src/adapters");
describe('LSParseConfigHost.resolve()', () => {
    it('should collapse absolute paths', () => {
        const p1 = '/foo/bar/baz';
        const p2 = '/foo/bar/baz/tsconfig.json';
        const host = new adapters_1.LSParseConfigHost(typescript_1.default.sys);
        const resolved = host.resolve(p1, p2);
        expect(resolved).toBe('/foo/bar/baz/tsconfig.json');
    });
});
