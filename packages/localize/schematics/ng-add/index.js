"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 *
 * @fileoverview Schematics for `ng add @angular/localize` schematic.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const utility_1 = require("@schematics/angular/utility");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const json_file_1 = require("@schematics/angular/utility/json-file");
const localizeType = `@angular/localize`;
const localizePolyfill = '@angular/localize/init';
const localizeTripleSlashType = `/// <reference types="@angular/localize" />`;
function addPolyfillToConfig(projectName) {
    return (0, utility_1.updateWorkspace)((workspace) => {
        var _a;
        const project = workspace.projects.get(projectName);
        if (!project) {
            throw new schematics_1.SchematicsException(`Invalid project name '${projectName}'.`);
        }
        const isLocalizePolyfill = (path) => path.startsWith('@angular/localize');
        for (const target of project.targets.values()) {
            switch (target.builder) {
                case utility_1.AngularBuilder.Karma:
                case utility_1.AngularBuilder.BuildKarma:
                case utility_1.AngularBuilder.Server:
                case utility_1.AngularBuilder.Browser:
                case utility_1.AngularBuilder.BrowserEsbuild:
                case utility_1.AngularBuilder.Application:
                case utility_1.AngularBuilder.BuildApplication:
                    (_a = target.options) !== null && _a !== void 0 ? _a : (target.options = {});
                    const value = target.options['polyfills'];
                    if (typeof value === 'string') {
                        if (!isLocalizePolyfill(value)) {
                            target.options['polyfills'] = [value, localizePolyfill];
                        }
                    }
                    else if (Array.isArray(value)) {
                        if (!value.some(isLocalizePolyfill)) {
                            value.push(localizePolyfill);
                        }
                    }
                    else {
                        target.options['polyfills'] = [localizePolyfill];
                    }
                    break;
            }
        }
    });
}
function addTypeScriptConfigTypes(projectName) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const workspace = yield (0, utility_1.readWorkspace)(host);
        const project = workspace.projects.get(projectName);
        if (!project) {
            throw new schematics_1.SchematicsException(`Invalid project name '${projectName}'.`);
        }
        // We add the root workspace tsconfig for better IDE support.
        const tsConfigFiles = new Set();
        for (const target of project.targets.values()) {
            switch (target.builder) {
                case utility_1.AngularBuilder.Karma:
                case utility_1.AngularBuilder.Server:
                case utility_1.AngularBuilder.BrowserEsbuild:
                case utility_1.AngularBuilder.Browser:
                case utility_1.AngularBuilder.Application:
                case utility_1.AngularBuilder.BuildApplication:
                    const value = (_a = target.options) === null || _a === void 0 ? void 0 : _a['tsConfig'];
                    if (typeof value === 'string') {
                        tsConfigFiles.add(value);
                    }
                    break;
            }
            if (target.builder === utility_1.AngularBuilder.Browser ||
                target.builder === utility_1.AngularBuilder.BrowserEsbuild) {
                const value = (_b = target.options) === null || _b === void 0 ? void 0 : _b['main'];
                if (typeof value === 'string') {
                    addTripleSlashType(host, value);
                }
            }
            else if (target.builder === utility_1.AngularBuilder.Application) {
                const value = (_c = target.options) === null || _c === void 0 ? void 0 : _c['browser'];
                if (typeof value === 'string') {
                    addTripleSlashType(host, value);
                }
            }
        }
        const typesJsonPath = ['compilerOptions', 'types'];
        for (const path of tsConfigFiles) {
            if (!host.exists(path)) {
                continue;
            }
            const json = new json_file_1.JSONFile(host, path);
            const types = (_d = json.get(typesJsonPath)) !== null && _d !== void 0 ? _d : [];
            if (!Array.isArray(types)) {
                throw new schematics_1.SchematicsException(`TypeScript configuration file '${path}' has an invalid 'types' property. It must be an array.`);
            }
            const hasLocalizeType = types.some((t) => t === localizeType || t === '@angular/localize/init');
            if (hasLocalizeType) {
                // Skip has already localize type.
                continue;
            }
            json.modify(typesJsonPath, [...types, localizeType]);
        }
    });
}
function addTripleSlashType(host, path) {
    const content = host.readText(path);
    if (!content.includes(localizeTripleSlashType)) {
        host.overwrite(path, localizeTripleSlashType + '\n\n' + content);
    }
}
function moveToDependencies(host) {
    if (!host.exists('package.json')) {
        return;
    }
    // Remove the previous dependency and add in a new one under the desired type.
    (0, dependencies_1.removePackageJsonDependency)(host, '@angular/localize');
    return (0, utility_1.addDependency)('@angular/localize', `~0.0.0-PLACEHOLDER`);
}
function default_1(options) {
    const projectName = options.project;
    if (!projectName) {
        throw new schematics_1.SchematicsException('Option "project" is required.');
    }
    return (0, schematics_1.chain)([
        addTypeScriptConfigTypes(projectName),
        addPolyfillToConfig(projectName),
        // If `$localize` will be used at runtime then must install `@angular/localize`
        // into `dependencies`, rather than the default of `devDependencies`.
        options.useAtRuntime ? moveToDependencies : (0, schematics_1.noop)(),
    ]);
}
