"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const dom_sanitization_service_1 = require("../../src/security/dom_sanitization_service");
describe('DOM Sanitization Service', () => {
    it('accepts resource URL values for resource contexts', () => {
        const svc = new dom_sanitization_service_1.DomSanitizerImpl(null);
        const resourceUrl = svc.bypassSecurityTrustResourceUrl('http://hello/world');
        expect(svc.sanitize(core_1.SecurityContext.URL, resourceUrl)).toBe('http://hello/world');
    });
});
