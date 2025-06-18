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
const header_service_1 = require("./header.service");
describe('HeaderService', () => {
    let service;
    beforeEach(() => {
        service = testing_1.TestBed.inject(header_service_1.HeaderService);
    });
    it('setCanonical', () => {
        var _a;
        // setCanonical assumes there is a preexisting element
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        (_a = document.querySelector('head')) === null || _a === void 0 ? void 0 : _a.appendChild(linkEl);
        service.setCanonical('/some/link');
        expect(document.querySelector('link[rel=canonical]').getAttribute('href')).toBe('https://angular.dev/some/link');
    });
});
