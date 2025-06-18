"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_support_1 = require("../src/typescript_support");
describe('checkVersion', () => {
    const MIN_TS_VERSION = '2.7.2';
    const MAX_TS_VERSION = '2.8.0';
    const versionError = (version) => `The Angular Compiler requires TypeScript >=${MIN_TS_VERSION} and <${MAX_TS_VERSION} but ${version} was found instead.`;
    it('should not throw when a supported TypeScript version is used', () => {
        expect(() => (0, typescript_support_1.checkVersion)('2.7.2', MIN_TS_VERSION, MAX_TS_VERSION)).not.toThrow();
        expect(() => (0, typescript_support_1.checkVersion)('2.7.9', MIN_TS_VERSION, MAX_TS_VERSION)).not.toThrow();
    });
    it('should handle a TypeScript version < the minimum supported one', () => {
        expect(() => (0, typescript_support_1.checkVersion)('2.4.1', MIN_TS_VERSION, MAX_TS_VERSION)).toThrowError(versionError('2.4.1'));
        expect(() => (0, typescript_support_1.checkVersion)('2.7.1', MIN_TS_VERSION, MAX_TS_VERSION)).toThrowError(versionError('2.7.1'));
    });
    it('should handle a TypeScript version > the maximum supported one', () => {
        expect(() => (0, typescript_support_1.checkVersion)('2.9.0', MIN_TS_VERSION, MAX_TS_VERSION)).toThrowError(versionError('2.9.0'));
        expect(() => (0, typescript_support_1.checkVersion)('2.8.0', MIN_TS_VERSION, MAX_TS_VERSION)).toThrowError(versionError('2.8.0'));
    });
    it('should throw when an out-of-bounds pre-release version is used', () => {
        expect(() => (0, typescript_support_1.checkVersion)('2.7.0-beta', MIN_TS_VERSION, MAX_TS_VERSION)).toThrowError(versionError('2.7.0-beta'));
        expect(() => (0, typescript_support_1.checkVersion)('2.8.5-rc.3', MIN_TS_VERSION, MAX_TS_VERSION)).toThrowError(versionError('2.8.5-rc.3'));
    });
    it('should not throw when a valid pre-release version is used', () => {
        expect(() => (0, typescript_support_1.checkVersion)('2.7.2-beta', MIN_TS_VERSION, MAX_TS_VERSION)).not.toThrow();
        expect(() => (0, typescript_support_1.checkVersion)('2.7.9-rc.8', MIN_TS_VERSION, MAX_TS_VERSION)).not.toThrow();
    });
});
