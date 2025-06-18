"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_util_1 = require("../src/promise_util");
describe('isThenable()', () => {
    it('should return false for primitive values', () => {
        expect((0, promise_util_1.isThenable)(undefined)).toBe(false);
        expect((0, promise_util_1.isThenable)(null)).toBe(false);
        expect((0, promise_util_1.isThenable)(false)).toBe(false);
        expect((0, promise_util_1.isThenable)(true)).toBe(false);
        expect((0, promise_util_1.isThenable)(0)).toBe(false);
        expect((0, promise_util_1.isThenable)(1)).toBe(false);
        expect((0, promise_util_1.isThenable)('')).toBe(false);
        expect((0, promise_util_1.isThenable)('foo')).toBe(false);
    });
    it('should return false if `.then` is not a function', () => {
        expect((0, promise_util_1.isThenable)([])).toBe(false);
        expect((0, promise_util_1.isThenable)(['then'])).toBe(false);
        expect((0, promise_util_1.isThenable)(function () { })).toBe(false);
        expect((0, promise_util_1.isThenable)({})).toBe(false);
        expect((0, promise_util_1.isThenable)({ then: true })).toBe(false);
        expect((0, promise_util_1.isThenable)({ then: 'not a function' })).toBe(false);
    });
    it('should return true if `.then` is a function', () => {
        expect((0, promise_util_1.isThenable)({ then: function () { } })).toBe(true);
        expect((0, promise_util_1.isThenable)({ then: () => { } })).toBe(true);
        expect((0, promise_util_1.isThenable)(Object.assign('thenable', { then: () => { } }))).toBe(true);
    });
});
describe('SyncPromise', () => {
    it('should call all callbacks once resolved', () => {
        const spy1 = jasmine.createSpy('spy1');
        const spy2 = jasmine.createSpy('spy2');
        const promise = new promise_util_1.SyncPromise();
        promise.then(spy1);
        promise.then(spy2);
        expect(spy1).not.toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        promise.resolve('foo');
        expect(spy1).toHaveBeenCalledWith('foo');
        expect(spy2).toHaveBeenCalledWith('foo');
    });
    it('should call callbacks immediately if already resolved', () => {
        const spy = jasmine.createSpy('spy');
        const promise = new promise_util_1.SyncPromise();
        promise.resolve('foo');
        promise.then(spy);
        expect(spy).toHaveBeenCalledWith('foo');
    });
    it('should ignore subsequent calls to `resolve()`', () => {
        const spy = jasmine.createSpy('spy');
        const promise = new promise_util_1.SyncPromise();
        promise.then(spy);
        promise.resolve('foo');
        expect(spy).toHaveBeenCalledWith('foo');
        spy.calls.reset();
        promise.resolve('bar');
        expect(spy).not.toHaveBeenCalled();
        promise.then(spy);
        promise.resolve('baz');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('foo');
    });
    describe('.all()', () => {
        it('should return a `SyncPromise` instance', () => {
            expect(promise_util_1.SyncPromise.all([])).toEqual(jasmine.any(promise_util_1.SyncPromise));
        });
        it('should resolve immediately if the provided values are not thenable', () => {
            const spy = jasmine.createSpy('spy');
            const promise = promise_util_1.SyncPromise.all(['foo', 1, { then: false }, []]);
            promise.then(spy);
            expect(spy).toHaveBeenCalledWith(['foo', 1, { then: false }, []]);
        });
        it('should wait for any thenables to resolve', () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jasmine.createSpy('spy');
            const v1 = 'foo';
            const v2 = new promise_util_1.SyncPromise();
            const v3 = Promise.resolve('baz');
            const promise = promise_util_1.SyncPromise.all([v1, v2, v3]);
            promise.then(spy);
            expect(spy).not.toHaveBeenCalled();
            v2.resolve('bar');
            expect(spy).not.toHaveBeenCalled();
            yield v3;
            expect(spy).toHaveBeenCalledWith(['foo', 'bar', 'baz']);
        }));
    });
});
