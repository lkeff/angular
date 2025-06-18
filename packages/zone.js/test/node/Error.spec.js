"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
describe('ZoneAwareError', () => {
    // If the environment does not supports stack rewrites, then these tests will fail
    // and there is no point in running them.
    if (!Error['stackRewrite']) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    it('should have all properties from NativeError', () => {
        let obj = new Object();
        Error.captureStackTrace(obj);
        expect(obj.stack).not.toBeUndefined();
    });
    it('should support prepareStackTrace', () => {
        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (error, stack) {
            return stack;
        };
        let obj = new Object();
        Error.captureStackTrace(obj);
        expect(obj.stack[0].getFileName()).not.toBeUndefined();
        Error.prepareStackTrace = originalPrepareStackTrace;
    });
    it('should not add additional stacktrace from Zone when use prepareStackTrace', () => {
        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (error, stack) {
            return stack;
        };
        let obj = new Object();
        Error.captureStackTrace(obj);
        expect(obj.stack.length).not.toBe(0);
        obj.stack.forEach(function (st) {
            expect(st.getFunctionName()).not.toEqual('zoneCaptureStackTrace');
        });
        Error.prepareStackTrace = originalPrepareStackTrace;
    });
});
