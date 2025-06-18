"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
describe('Injector.NULL', () => {
    it('should throw if no arg is given', () => {
        expect(() => core_1.Injector.NULL.get('someToken')).toThrowError('NullInjectorError: No provider for someToken!');
    });
    it('should throw if THROW_IF_NOT_FOUND is given', () => {
        expect(() => core_1.Injector.NULL.get('someToken', core_1.Injector.THROW_IF_NOT_FOUND)).toThrowError('NullInjectorError: No provider for someToken!');
    });
    it('should return the default value', () => {
        expect(core_1.Injector.NULL.get('someToken', 'notFound')).toEqual('notFound');
    });
});
