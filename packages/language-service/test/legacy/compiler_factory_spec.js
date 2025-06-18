"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mock_host_1 = require("./mock_host");
/**
 * The following specs do not directly test the CompilerFactory class, rather
 * it asserts our understanding of the project/program/template interaction
 * which forms the underlying assumption used in the CompilerFactory.
 */
describe('tsserver', () => {
    let project;
    let service;
    beforeAll(() => {
        const { project: _project, service: _service } = (0, mock_host_1.setup)();
        project = _project;
        service = _service;
    });
    beforeEach(() => {
        service.reset();
    });
    describe('project version', () => {
        it('is updated after TS changes', () => {
            const v0 = project.getProjectVersion();
            service.overwriteInlineTemplate(mock_host_1.APP_COMPONENT, `{{ foo }}`);
            const v1 = project.getProjectVersion();
            expect(v1).not.toBe(v0);
        });
        it('is updated after template changes', () => {
            const v0 = project.getProjectVersion();
            service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ bar }}`);
            const v1 = project.getProjectVersion();
            expect(v1).not.toBe(v0);
        });
    });
    describe('program', () => {
        it('is updated after TS changes', () => {
            const p0 = project.getLanguageService().getProgram();
            expect(p0).toBeDefined();
            service.overwriteInlineTemplate(mock_host_1.APP_COMPONENT, `{{ foo }}`);
            const p1 = project.getLanguageService().getProgram();
            expect(p1).not.toBe(p0);
        });
        it('is not updated after template changes', () => {
            const p0 = project.getLanguageService().getProgram();
            expect(p0).toBeDefined();
            service.overwrite(mock_host_1.TEST_TEMPLATE, `{{ bar }}`);
            const p1 = project.getLanguageService().getProgram();
            expect(p1).toBe(p0);
        });
    });
    describe('external template', () => {
        it('should not be part of the project root', () => {
            // Templates should _never_ be added to the project root, otherwise they
            // will be parsed as TS files.
            const scriptInfo = service.getScriptInfo(mock_host_1.TEST_TEMPLATE);
            expect(project.isRoot(scriptInfo)).toBeFalse();
        });
        it('should be attached to project', () => {
            const scriptInfo = service.getScriptInfo(mock_host_1.TEST_TEMPLATE);
            // Script info for external template must be attached to a project because
            // that's the primary mechanism used in the extension to locate the right
            // language service instance. See
            // https://github.com/angular/vscode-ng-language-service/blob/b048f5f6b9996c5cf113b764c7ffe13d9eeb4285/server/src/session.ts#L192
            expect(scriptInfo.isAttached(project)).toBeTrue();
            // Attaching a script info to a project does not mean that the project
            // will contain the script info. Kinda like friendship on social media.
            expect(project.containsScriptInfo(scriptInfo)).toBeFalse();
        });
    });
});
