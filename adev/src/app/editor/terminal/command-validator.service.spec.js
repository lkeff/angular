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
const command_validator_service_1 = require("./command-validator.service");
describe('CommandValidator', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(command_validator_service_1.CommandValidator);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should return true when user try to execute allowed commands', () => {
        for (const command of command_validator_service_1.ALLOWED_COMMAND_PREFIXES) {
            const result = service.validate(`${command} other command params`);
            expect(result).toBeTrue();
        }
    });
    it('should return false when user try to execute illegal commands', () => {
        const result = service.validate(`npm install`);
        expect(result).toBeFalse();
    });
});
