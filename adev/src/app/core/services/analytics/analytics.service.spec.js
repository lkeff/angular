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
const docs_1 = require("@angular/docs");
const analytics_service_1 = require("./analytics.service");
describe('AnalyticsService', () => {
    let service;
    let injector;
    let gtagSpy;
    let gtagAppendNodeSpy;
    let windowOnErrorHandler;
    let mockWindow;
    let mockLocalStorage = new docs_1.MockLocalStorage();
    beforeEach(() => {
        gtagSpy = jasmine.createSpy('gtag');
        gtagAppendNodeSpy = jasmine.createSpy('gtag.js script head attach');
        mockWindow = {
            name: 'Some name',
            document: {
                head: { appendChild: gtagAppendNodeSpy },
                createElement: (tag) => document.createElement(tag),
                querySelector: (_gtagIdSelector) => null,
            },
            addEventListener: (_name, handler) => (windowOnErrorHandler = handler),
        };
        injector = core_1.Injector.create({
            providers: [
                { provide: docs_1.ENVIRONMENT, useValue: {} },
                { provide: analytics_service_1.AnalyticsService, deps: [docs_1.WINDOW] },
                { provide: docs_1.WINDOW, useFactory: () => mockWindow, deps: [] },
                { provide: docs_1.LOCAL_STORAGE, useValue: mockLocalStorage },
            ],
        });
        service = injector.get(analytics_service_1.AnalyticsService);
        // The `gtag` function is attached to the `Window`, so we can spy on it
        // after the service has been initialized.
        gtagSpy = spyOn(mockWindow, 'gtag');
    });
    describe('error reporting', () => {
        it('should subscribe to window uncaught errors and report them', () => {
            spyOn(service, 'reportError');
            windowOnErrorHandler(new ErrorEvent('error', {
                error: new Error('Test Error'),
            }));
            expect(service.reportError).toHaveBeenCalledTimes(1);
            expect(service.reportError).toHaveBeenCalledWith(jasmine.stringContaining('Test Error\n'), true);
        });
        it('should report errors to analytics by dispatching `gtag` and `ga` events', () => {
            gtagSpy.calls.reset();
            windowOnErrorHandler(new ErrorEvent('error', {
                error: new Error('Test Error'),
            }));
            expect(gtagSpy).toHaveBeenCalledTimes(1);
            expect(gtagSpy).toHaveBeenCalledWith('event', 'exception', jasmine.objectContaining({
                description: jasmine.stringContaining('Test Error\n'),
                fatal: true,
            }));
        });
    });
});
