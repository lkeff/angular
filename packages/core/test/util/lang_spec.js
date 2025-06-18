"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const lang_1 = require("../../src/util/lang");
const rxjs_1 = require("rxjs");
describe('isSubscribable', () => {
    it('should be true for an Observable', () => expect((0, lang_1.isSubscribable)((0, rxjs_1.of)(true))).toEqual(true));
    it('should be true if the argument is the object with subscribe function', () => expect((0, lang_1.isSubscribable)({ subscribe: () => { } })).toEqual(true));
    it('should be false if the argument is undefined', () => expect((0, lang_1.isSubscribable)(undefined)).toEqual(false));
    it('should be false if the argument is null', () => expect((0, lang_1.isSubscribable)(null)).toEqual(false));
    it('should be false if the argument is an object', () => expect((0, lang_1.isSubscribable)({})).toEqual(false));
    it('should be false if the argument is a function', () => expect((0, lang_1.isSubscribable)(() => { })).toEqual(false));
});
