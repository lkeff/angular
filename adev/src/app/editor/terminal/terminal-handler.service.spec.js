"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const terminal_handler_service_1 = require("./terminal-handler.service");
const docs_1 = require("@angular/docs");
describe('TerminalHandler', () => {
    let service;
    const fakeWindow = {
        location: {
            search: '',
        },
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [terminal_handler_service_1.TerminalHandler, { provide: docs_1.WINDOW, useValue: fakeWindow }],
        });
        service = testing_1.TestBed.inject(terminal_handler_service_1.TerminalHandler);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should create terminal instances on init', () => {
        expect(service.readonlyTerminalInstance).not.toBeNull();
        expect(service.interactiveTerminalInstance).not.toBeNull();
    });
});
