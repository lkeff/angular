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
const ts_plugin_1 = require("../../src/ts_plugin");
const mock_host_1 = require("./mock_host");
describe('getExternalFiles()', () => {
    it('should return all typecheck files', () => {
        const { project, tsLS } = (0, mock_host_1.setup)();
        let externalFiles = (0, ts_plugin_1.getExternalFiles)(project);
        // Initially there are no external files because Ivy compiler hasn't done
        // a global analysis
        expect(externalFiles).toEqual([]);
        // Trigger global analysis
        const ngLS = new language_service_1.LanguageService(project, tsLS, {});
        ngLS.getSemanticDiagnostics(mock_host_1.APP_COMPONENT);
        // Now that global analysis is run, we should have all the typecheck files
        externalFiles = (0, ts_plugin_1.getExternalFiles)(project);
        // Includes 1 typecheck file, 1 template, and 1 css files
        expect(externalFiles.length).toBe(3);
        expect(externalFiles[0].endsWith('app.component.ngtypecheck.ts')).toBeTrue();
    });
});
