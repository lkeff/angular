"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
const typescript_1 = __importDefault(require("typescript"));
const language_service_1 = require("../../src/language_service");
const mock_host_1 = require("./mock_host");
describe('language service adapter', () => {
    let project;
    let service;
    let ngLS;
    let configFileFs;
    beforeAll(() => {
        const { project: _project, tsLS, service: _service, configFileFs: _configFileFs } = (0, mock_host_1.setup)();
        project = _project;
        service = _service;
        ngLS = new language_service_1.LanguageService(project, tsLS, {});
        configFileFs = _configFileFs;
    });
    afterEach(() => {
        configFileFs.clear();
    });
    describe('parse compiler options', () => {
        it('should initialize with angularCompilerOptions from tsconfig.json', () => {
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                strictTemplates: true,
                strictInjectionParameters: true,
            }));
        });
        it('should reparse angularCompilerOptions on tsconfig.json change', () => {
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                strictTemplates: true,
                strictInjectionParameters: true,
            }));
            configFileFs.overwriteConfigFile(mock_host_1.TSCONFIG, {
                angularCompilerOptions: {
                    strictTemplates: false,
                },
            });
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                strictTemplates: false,
            }));
        });
        it('should always enable strictTemplates if forceStrictTemplates is true', () => {
            const { project, tsLS, configFileFs } = (0, mock_host_1.setup)();
            const ngLS = new language_service_1.LanguageService(project, tsLS, {
                forceStrictTemplates: true,
            });
            // First make sure the default for strictTemplates is true
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                strictTemplates: true,
                strictInjectionParameters: true,
            }));
            // Change strictTemplates to false
            configFileFs.overwriteConfigFile(mock_host_1.TSCONFIG, {
                angularCompilerOptions: {
                    strictTemplates: false,
                },
            });
            // Make sure strictTemplates is still true because forceStrictTemplates
            // is enabled.
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                strictTemplates: true,
            }));
        });
        it('should always disable block syntax if enableBlockSyntax is false', () => {
            const { project, tsLS } = (0, mock_host_1.setup)();
            const ngLS = new language_service_1.LanguageService(project, tsLS, {
                enableBlockSyntax: false,
            });
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                '_enableBlockSyntax': false,
            }));
        });
        it('should always disable let declarations if enableLetSyntax is false', () => {
            const { project, tsLS } = (0, mock_host_1.setup)();
            const ngLS = new language_service_1.LanguageService(project, tsLS, {
                enableLetSyntax: false,
            });
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                '_enableLetSyntax': false,
            }));
        });
        it('should pass the @angular/core version along to the compiler', () => {
            const { project, tsLS } = (0, mock_host_1.setup)();
            const ngLS = new language_service_1.LanguageService(project, tsLS, {
                angularCoreVersion: '17.2.11-rc.8',
            });
            expect(ngLS.getCompilerOptions()).toEqual(jasmine.objectContaining({
                '_angularCoreVersion': '17.2.11-rc.8',
            }));
        });
    });
    describe('compiler options diagnostics', () => {
        it('suggests turning on strict flag', () => {
            var _a;
            configFileFs.overwriteConfigFile(mock_host_1.TSCONFIG, {
                angularCompilerOptions: {},
            });
            const diags = ngLS.getCompilerOptionsDiagnostics();
            const diag = diags.find(isSuggestStrictTemplatesDiag);
            expect(diag).toBeDefined();
            expect(diag.category).toBe(typescript_1.default.DiagnosticCategory.Suggestion);
            expect((_a = diag.file) === null || _a === void 0 ? void 0 : _a.getSourceFile().fileName).toBe(mock_host_1.TSCONFIG);
        });
        it('does not suggest turning on strict mode is strictTemplates flag is on', () => {
            configFileFs.overwriteConfigFile(mock_host_1.TSCONFIG, {
                angularCompilerOptions: {
                    strictTemplates: true,
                },
            });
            const diags = ngLS.getCompilerOptionsDiagnostics();
            const diag = diags.find(isSuggestStrictTemplatesDiag);
            expect(diag).toBeUndefined();
        });
        it('does not suggest turning on strict mode is fullTemplateTypeCheck flag is on', () => {
            configFileFs.overwriteConfigFile(mock_host_1.TSCONFIG, {
                angularCompilerOptions: {
                    fullTemplateTypeCheck: true,
                },
            });
            const diags = ngLS.getCompilerOptionsDiagnostics();
            const diag = diags.find(isSuggestStrictTemplatesDiag);
            expect(diag).toBeUndefined();
        });
        function isSuggestStrictTemplatesDiag(diag) {
            return diag.code === (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SUGGEST_STRICT_TEMPLATES);
        }
    });
    describe('last known program', () => {
        beforeEach(() => {
            service.reset();
        });
        it('should be set after getSemanticDiagnostics()', () => {
            const d0 = ngLS.getSemanticDiagnostics(mock_host_1.TEST_TEMPLATE);
            expect(d0.length).toBe(0);
            const p0 = getLastKnownProgram(ngLS);
            const d1 = ngLS.getSemanticDiagnostics(mock_host_1.TEST_TEMPLATE);
            expect(d1.length).toBe(0);
            const p1 = getLastKnownProgram(ngLS);
            expect(p1).toBe(p0); // last known program should not have changed
            service.overwrite(mock_host_1.TEST_TEMPLATE, `<test-c¦omp></test-comp>`);
            const d2 = ngLS.getSemanticDiagnostics(mock_host_1.TEST_TEMPLATE);
            expect(d2.length).toBe(0);
            const p2 = getLastKnownProgram(ngLS);
            expect(p2).not.toBe(p1); // last known program should have changed
        });
        it('should be set after getDefinitionAndBoundSpan()', () => {
            const { position: pos0 } = service.overwrite(mock_host_1.TEST_TEMPLATE, `<test-c¦omp></test-comp>`);
            const d0 = ngLS.getDefinitionAndBoundSpan(mock_host_1.TEST_TEMPLATE, pos0);
            expect(d0).toBeDefined();
            const p0 = getLastKnownProgram(ngLS);
            const d1 = ngLS.getDefinitionAndBoundSpan(mock_host_1.TEST_TEMPLATE, pos0);
            expect(d1).toBeDefined();
            const p1 = getLastKnownProgram(ngLS);
            expect(p1).toBe(p0); // last known program should not have changed
            const { position: pos1 } = service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ ti¦tle }}`);
            const d2 = ngLS.getDefinitionAndBoundSpan(mock_host_1.TEST_TEMPLATE, pos1);
            expect(d2).toBeDefined();
            const p2 = getLastKnownProgram(ngLS);
            expect(p2).not.toBe(p1); // last known program should have changed
        });
        it('should be set after getQuickInfoAtPosition()', () => {
            const { position: pos0 } = service.overwrite(mock_host_1.TEST_TEMPLATE, `<test-c¦omp></test-comp>`);
            const q0 = ngLS.getQuickInfoAtPosition(mock_host_1.TEST_TEMPLATE, pos0);
            expect(q0).toBeDefined();
            const p0 = getLastKnownProgram(ngLS);
            const q1 = ngLS.getQuickInfoAtPosition(mock_host_1.TEST_TEMPLATE, pos0);
            expect(q1).toBeDefined();
            const p1 = getLastKnownProgram(ngLS);
            expect(p1).toBe(p0); // last known program should not have changed
            const { position: pos1 } = service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ ti¦tle }}`);
            const q2 = ngLS.getQuickInfoAtPosition(mock_host_1.TEST_TEMPLATE, pos1);
            expect(q2).toBeDefined();
            const p2 = getLastKnownProgram(ngLS);
            expect(p2).not.toBe(p1); // last known program should have changed
        });
        it('should be set after getTypeDefinitionAtPosition()', () => {
            const { position: pos0 } = service.overwrite(mock_host_1.TEST_TEMPLATE, `<test-c¦omp></test-comp>`);
            const q0 = ngLS.getTypeDefinitionAtPosition(mock_host_1.TEST_TEMPLATE, pos0);
            expect(q0).toBeDefined();
            const p0 = getLastKnownProgram(ngLS);
            const d1 = ngLS.getTypeDefinitionAtPosition(mock_host_1.TEST_TEMPLATE, pos0);
            expect(d1).toBeDefined();
            const p1 = getLastKnownProgram(ngLS);
            expect(p1).toBe(p0); // last known program should not have changed
            const { position: pos1 } = service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ ti¦tle }}`);
            const d2 = ngLS.getTypeDefinitionAtPosition(mock_host_1.TEST_TEMPLATE, pos1);
            expect(d2).toBeDefined();
            const p2 = getLastKnownProgram(ngLS);
            expect(p2).not.toBe(p1); // last known program should have changed
        });
    });
});
function getLastKnownProgram(ngLS) {
    var _a;
    const program = (_a = ngLS['compilerFactory']['compiler']) === null || _a === void 0 ? void 0 : _a.getCurrentProgram();
    expect(program).toBeDefined();
    return program;
}
