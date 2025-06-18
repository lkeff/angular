"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../src/util/stringify");
describe('stringify', () => {
    it('should return string undefined when toString returns undefined', () => expect((0, stringify_1.stringify)({ toString: () => undefined })).toBe('undefined'));
    it('should return string null when toString returns null', () => expect((0, stringify_1.stringify)({ toString: () => null })).toBe('null'));
});
