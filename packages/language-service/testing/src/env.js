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
exports.LanguageServiceTestEnv = void 0;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const testing_2 = require("@angular/compiler-cli/src/ngtsc/testing");
const typescript_1 = __importDefault(require("typescript"));
const host_1 = require("./host");
const project_1 = require("./project");
/**
 * Testing environment for the Angular Language Service, which creates an in-memory tsserver
 * instance that backs a Language Service to emulate an IDE that uses the LS.
 */
class LanguageServiceTestEnv {
    static setup() {
        const fs = (0, file_system_1.getFileSystem)();
        if (!(fs instanceof testing_1.MockFileSystem)) {
            throw new Error(`LanguageServiceTestEnvironment only works with a mock filesystem`);
        }
        fs.init((0, testing_2.loadStandardTestFiles)({
            fakeCommon: true,
            rxjs: true,
        }));
        const host = new host_1.MockServerHost(fs);
        const projectService = new typescript_1.default.server.ProjectService({
            logger,
            cancellationToken: typescript_1.default.server.nullCancellationToken,
            host,
            typingsInstaller: typescript_1.default.server.nullTypingsInstaller,
            session: undefined,
            useInferredProjectPerProjectRoot: true,
            useSingleInferredProject: true,
        });
        return new LanguageServiceTestEnv(host, projectService);
    }
    constructor(host, projectService) {
        this.host = host;
        this.projectService = projectService;
        this.projects = new Map();
    }
    addProject(name, files, angularCompilerOptions = {}, tsCompilerOptions = {}) {
        if (this.projects.has(name)) {
            throw new Error(`Project ${name} is already defined`);
        }
        const project = project_1.Project.initialize(name, this.projectService, files, angularCompilerOptions, tsCompilerOptions);
        this.projects.set(name, project);
        return project;
    }
    getTextFromTsSpan(fileName, span) {
        const scriptInfo = this.projectService.getScriptInfo(fileName);
        if (scriptInfo === undefined) {
            return null;
        }
        return scriptInfo.getSnapshot().getText(span.start, span.start + span.length);
    }
    expectNoSourceDiagnostics() {
        for (const project of this.projects.values()) {
            project.expectNoSourceDiagnostics();
        }
    }
}
exports.LanguageServiceTestEnv = LanguageServiceTestEnv;
const logger = {
    close() { },
    hasLevel(level) {
        return false;
    },
    loggingEnabled() {
        return false;
    },
    perftrc(s) { },
    info(s) { },
    startGroup() { },
    endGroup() { },
    msg(s, type) { },
    getLogFileName() {
        return;
    },
};
