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
const node_runtime_state_service_1 = require("./node-runtime-state.service");
const node_runtime_sandbox_service_1 = require("./node-runtime-sandbox.service");
describe('NodeRuntimeState', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [node_runtime_state_service_1.NodeRuntimeState],
        });
        service = testing_1.TestBed.inject(node_runtime_state_service_1.NodeRuntimeState);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should set cookies error type based on error message', () => {
        service.setError({ message: 'service worker', type: undefined });
        expect(service['error']().type).toBe(node_runtime_state_service_1.ErrorType.COOKIES);
    });
    it('should set out of memory error type based on error message', () => {
        service.setError({ message: node_runtime_sandbox_service_1.OUT_OF_MEMORY_MSG, type: undefined });
        expect(service['error']().type).toBe(node_runtime_state_service_1.ErrorType.OUT_OF_MEMORY);
    });
    it('should set unknown error type based on error message', () => {
        service.setError({ message: 'something else', type: undefined });
        expect(service['error']().type).toBe(node_runtime_state_service_1.ErrorType.UNKNOWN);
    });
    it('should set unknown error type if error message is undefined', () => {
        service.setError({ message: undefined, type: undefined });
        expect(service['error']().type).toBe(node_runtime_state_service_1.ErrorType.UNKNOWN);
    });
});
