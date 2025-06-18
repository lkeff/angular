"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const reporting_error_handler_1 = require("./reporting-error-handler");
const analytics_service_1 = require("./analytics.service");
describe('ReportingErrorHandler service', () => {
    let handler;
    let superHandler;
    let reportErrorSpy;
    beforeEach(() => {
        superHandler = spyOn(core_1.ErrorHandler.prototype, 'handleError');
        reportErrorSpy = jasmine.createSpy('analytics report error');
        const injector = core_1.Injector.create({
            providers: [
                { provide: analytics_service_1.AnalyticsService, useValue: { reportError: reportErrorSpy } },
                { provide: core_1.ErrorHandler, useClass: reporting_error_handler_1.ReportingErrorHandler, deps: [analytics_service_1.AnalyticsService] },
            ],
        });
        handler = injector.get(core_1.ErrorHandler);
    });
    describe('handleError', () => {
        it('should call the super class handleError', () => {
            const error = new Error();
            handler.handleError(error);
            expect(superHandler).toHaveBeenCalledWith(error);
        });
        it('should cope with the super handler throwing an error', () => {
            const error = new Error('initial error');
            superHandler.and.throwError('super handler error');
            handler.handleError(error);
            expect(reportErrorSpy).toHaveBeenCalledTimes(2);
            // Error from super handler is reported first
            expect(reportErrorSpy.calls.argsFor(0)[0]).toEqual(jasmine.stringContaining('super handler error\n'));
            // Then error from initial exception
            expect(reportErrorSpy.calls.argsFor(1)[0]).toEqual(jasmine.stringContaining(`[v${core_1.VERSION.full}] initial error\n`));
        });
        it('should augment an error object with version info', () => {
            const originalMessage = 'this is an error message';
            const error = new Error(originalMessage);
            expect(error.message).toBe(originalMessage);
            // NOTE:
            // Intentionally not checking `error.stack` here, because accessing it causes the property to
            // be computed and may affect the observed behavior of `handleError()`.
            handler.handleError(error);
            expect(error.message).toBe(`[v${core_1.VERSION.full}] ${originalMessage}`);
            if (error.stack) {
                const expected = `Error: [v${core_1.VERSION.full}] ${originalMessage}`;
                const actual = error.stack.split('\n', 1)[0];
                expect(actual.startsWith(expected))
                    .withContext(`Expected '${actual}' to start with '${expected}'.`)
                    .toBeTrue();
            }
        });
        it('should send an error object to analytics', () => {
            const error = new Error('this is an error message');
            handler.handleError(error);
            expect(reportErrorSpy).toHaveBeenCalledWith(jasmine.stringContaining('this is an error message\n'));
        });
        it('should send a non-error object to analytics', () => {
            const error = { reason: 'this is an error message' };
            handler.handleError(error);
            expect(reportErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
        });
        it('should send a non-error object with circular references to analytics', () => {
            const error = {
                reason: 'this is an error message',
                get self() {
                    return this;
                },
                toString() {
                    return `{reason: ${this.reason}}`;
                },
            };
            handler.handleError(error);
            expect(reportErrorSpy).toHaveBeenCalledWith('{reason: this is an error message}');
        });
        it('should send an error string to analytics (prefixed with version info)', () => {
            const error = 'this is an error message';
            handler.handleError(error);
            expect(reportErrorSpy).toHaveBeenCalledWith(`[v${core_1.VERSION.full}] ${error}`);
        });
        it('should send a non-object, non-string error stringified to analytics', () => {
            handler.handleError(404);
            handler.handleError(false);
            handler.handleError(null);
            handler.handleError(undefined);
            expect(reportErrorSpy.calls.allArgs()).toEqual([['404'], ['false'], ['null'], ['undefined']]);
        });
    });
});
