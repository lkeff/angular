"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
describe('retryWhen', () => {
    let log;
    const genericRetryStrategy = (finalizer) => (attempts) => attempts.pipe((0, operators_1.mergeMap)((error, i) => {
        const retryAttempt = i + 1;
        if (retryAttempt > 3) {
            return (0, rxjs_1.throwError)(error);
        }
        log.push(error);
        return (0, rxjs_1.timer)(retryAttempt * 1);
    }), (0, operators_1.finalize)(() => finalizer()));
    const errorGenerator = () => {
        return (0, rxjs_1.throwError)(new Error('error emit'));
    };
    beforeEach(() => {
        log = [];
    });
    it('should retry max 3 times', (done) => {
        errorGenerator()
            .pipe((0, operators_1.retryWhen)(genericRetryStrategy(() => {
            expect(log.length).toBe(3);
            done();
        })), (0, operators_1.catchError)((error) => (0, rxjs_1.of)(error)))
            .subscribe();
    });
});
