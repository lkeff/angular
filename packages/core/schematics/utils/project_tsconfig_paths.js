"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
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
exports.getProjectTsConfigPaths = getProjectTsConfigPaths;
const core_1 = require("@angular-devkit/core");
/**
 * Gets all tsconfig paths from a CLI project by reading the workspace configuration
 * and looking for common tsconfig locations.
 */
function getProjectTsConfigPaths(tree) {
    return __awaiter(this, void 0, void 0, function* () {
        // Start with some tsconfig paths that are generally used within CLI projects. Note
        // that we are not interested in IDE-specific tsconfig files (e.g. /tsconfig.json)
        const buildPaths = new Set();
        const testPaths = new Set();
        const workspace = yield getWorkspace(tree);
        for (const [, project] of workspace.projects) {
            for (const [name, target] of project.targets) {
                if (name !== 'build' && name !== 'test') {
                    continue;
                }
                for (const [, options] of allTargetOptions(target)) {
                    const tsConfig = options['tsConfig'];
                    // Filter out tsconfig files that don't exist in the CLI project.
                    if (typeof tsConfig !== 'string' || !tree.exists(tsConfig)) {
                        continue;
                    }
                    if (name === 'build') {
                        buildPaths.add((0, core_1.normalize)(tsConfig));
                    }
                    else {
                        testPaths.add((0, core_1.normalize)(tsConfig));
                    }
                }
            }
        }
        return {
            buildPaths: [...buildPaths],
            testPaths: [...testPaths],
        };
    });
}
/** Get options for all configurations for the passed builder target. */
function* allTargetOptions(target) {
    if (target.options) {
        yield [undefined, target.options];
    }
    if (!target.configurations) {
        return;
    }
    for (const [name, options] of Object.entries(target.configurations)) {
        if (options) {
            yield [name, options];
        }
    }
}
function createHost(tree) {
    return {
        readFile(path) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = tree.read(path);
                if (!data) {
                    throw new Error('File not found.');
                }
                return core_1.virtualFs.fileBufferToString(data);
            });
        },
        writeFile(path, data) {
            return __awaiter(this, void 0, void 0, function* () {
                return tree.overwrite(path, data);
            });
        },
        isDirectory(path) {
            return __awaiter(this, void 0, void 0, function* () {
                // Approximate a directory check.
                // We don't need to consider empty directories and hence this is a good enough approach.
                // This is also per documentation, see:
                // https://angular.dev/tools/cli/schematics-for-libraries#get-the-project-configuration
                return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
            });
        },
        isFile(path) {
            return __awaiter(this, void 0, void 0, function* () {
                return tree.exists(path);
            });
        },
    };
}
function getWorkspace(tree) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = createHost(tree);
        const { workspace } = yield core_1.workspaces.readWorkspace('/', host);
        return workspace;
    });
}
