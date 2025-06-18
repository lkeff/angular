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
const diagnostics_state_service_1 = require("./diagnostics-state.service");
describe('DiagnosticsState', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(diagnostics_state_service_1.DiagnosticsState);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
