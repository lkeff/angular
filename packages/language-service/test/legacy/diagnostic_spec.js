"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const language_service_1 = require("../../src/language_service");
const mock_host_1 = require("./mock_host");
describe('getSemanticDiagnostics', () => {
    let service;
    let ngLS;
    beforeAll(() => {
        const { project, service: _service, tsLS } = (0, mock_host_1.setup)();
        service = _service;
        ngLS = new language_service_1.LanguageService(project, tsLS, {});
    });
    beforeEach(() => {
        service.reset();
    });
    it('should retrieve external template from latest snapshot', () => {
        // This test is to make sure we are reading from snapshot instead of disk
        // if content from snapshot is newer. It also makes sure the internal cache
        // of the resource loader is invalidated on content change.
        service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ foo }}`);
        const d1 = ngLS.getSemanticDiagnostics(mock_host_1.TEST_TEMPLATE);
        expect(d1.length).toBe(1);
        expect(d1[0].messageText).toBe(`Property 'foo' does not exist on type 'TemplateReference'.`);
        service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ bar }}`);
        const d2 = ngLS.getSemanticDiagnostics(mock_host_1.TEST_TEMPLATE);
        expect(d2.length).toBe(1);
        expect(d2[0].messageText).toBe(`Property 'bar' does not exist on type 'TemplateReference'.`);
    });
});
