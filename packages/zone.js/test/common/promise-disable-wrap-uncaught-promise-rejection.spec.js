"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
class TestRejection {
}
describe('disable wrap uncaught promise rejection', () => {
    it('should notify Zone.onHandleError if promise is uncaught', (done) => {
        let promiseError = null;
        let zone = null;
        let task = null;
        let error = null;
        Zone.current
            .fork({
            name: 'promise-error',
            onHandleError: (delegate, current, target, error) => {
                promiseError = error;
                delegate.handleError(target, error);
                return false;
            },
        })
            .run(() => {
            zone = Zone.current;
            task = Zone.currentTask;
            error = new Error('rejectedErrorShouldBeHandled');
            try {
                // throw so that the stack trace is captured
                throw error;
            }
            catch (e) { }
            Promise.reject(error);
            expect(promiseError).toBe(null);
        });
        setTimeout(() => null);
        setTimeout(() => {
            expect(promiseError).toBe(error);
            expect(promiseError['rejection']).toBe(undefined);
            expect(promiseError['zone']).toBe(undefined);
            expect(promiseError['task']).toBe(undefined);
            done();
        });
    });
    it('should print original information when a non-Error object is used for rejection', (done) => {
        let promiseError = null;
        let rejectObj;
        Zone.current
            .fork({
            name: 'promise-error',
            onHandleError: (delegate, current, target, error) => {
                promiseError = error;
                delegate.handleError(target, error);
                return false;
            },
        })
            .run(() => {
            rejectObj = new TestRejection();
            rejectObj.prop1 = 'value1';
            rejectObj.prop2 = 'value2';
            rejectObj.message = 'rejectMessage';
            Promise.reject(rejectObj);
            expect(promiseError).toBe(null);
        });
        setTimeout(() => null);
        setTimeout(() => {
            expect(promiseError).toEqual(rejectObj);
            done();
        });
    });
    it('should print original information when a primitive value is used for rejection', (done) => {
        let promiseError = null;
        Zone.current
            .fork({
            name: 'promise-error',
            onHandleError: (delegate, current, target, error) => {
                promiseError = error;
                delegate.handleError(target, error);
                return false;
            },
        })
            .run(() => {
            Promise.reject(42);
            expect(promiseError).toBe(null);
        });
        setTimeout(() => null);
        setTimeout(() => {
            expect(promiseError).toBe(42);
            done();
        });
    });
});
