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
exports.MockService = exports.MockConfigFileFs = exports.TEST_TEMPLATE = exports.PARSING_CASES = exports.APP_MAIN = exports.APP_COMPONENT = exports.TSCONFIG = exports.PROJECT_DIR = exports.TEST_SRCDIR = void 0;
exports.setup = setup;
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("../../src/utils");
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
exports.TEST_SRCDIR = process.env['TEST_SRCDIR'];
exports.PROJECT_DIR = (0, path_1.join)(exports.TEST_SRCDIR, 'angular', 'packages', 'language-service', 'test', 'legacy', 'project');
exports.TSCONFIG = (0, path_1.join)(exports.PROJECT_DIR, 'tsconfig.json');
exports.APP_COMPONENT = (0, path_1.join)(exports.PROJECT_DIR, 'app', 'app.component.ts');
exports.APP_MAIN = (0, path_1.join)(exports.PROJECT_DIR, 'app', 'main.ts');
exports.PARSING_CASES = (0, path_1.join)(exports.PROJECT_DIR, 'app', 'parsing-cases.ts');
exports.TEST_TEMPLATE = (0, path_1.join)(exports.PROJECT_DIR, 'app', 'test.ng');
const NOOP_FILE_WATCHER = {
    close() { },
};
class MockWatcher {
    constructor(fileName, cb, close) {
        this.fileName = fileName;
        this.cb = cb;
        this.close = close;
    }
    changed() {
        this.cb(this.fileName, typescript_1.default.FileWatcherEventKind.Changed);
    }
    deleted() {
        this.cb(this.fileName, typescript_1.default.FileWatcherEventKind.Deleted);
    }
}
/**
 * A mock file system impacting configuration files.
 * Queries for all other files are deferred to the underlying filesystem.
 */
class MockConfigFileFs {
    constructor() {
        this.configOverwrites = new Map();
        this.configFileWatchers = new Map();
    }
    overwriteConfigFile(configFile, contents) {
        var _a;
        if (!configFile.endsWith('.json')) {
            throw new Error(`${configFile} is not a configuration file.`);
        }
        this.configOverwrites.set(configFile, JSON.stringify(contents));
        (_a = this.configFileWatchers.get(configFile)) === null || _a === void 0 ? void 0 : _a.changed();
    }
    readFile(file, encoding) {
        var _a;
        const read = (_a = this.configOverwrites.get(file)) !== null && _a !== void 0 ? _a : typescript_1.default.sys.readFile(file, encoding);
        return read;
    }
    fileExists(file) {
        return this.configOverwrites.has(file) || typescript_1.default.sys.fileExists(file);
    }
    watchFile(path, callback) {
        if (!path.endsWith('.json')) {
            // We only care about watching config files.
            return NOOP_FILE_WATCHER;
        }
        const watcher = new MockWatcher(path, callback, () => {
            this.configFileWatchers.delete(path);
        });
        this.configFileWatchers.set(path, watcher);
        return watcher;
    }
    clear() {
        for (const [fileName, watcher] of this.configFileWatchers) {
            this.configOverwrites.delete(fileName);
            watcher.changed();
        }
        this.configOverwrites.clear();
    }
}
exports.MockConfigFileFs = MockConfigFileFs;
function createHost(configFileFs) {
    return Object.assign(Object.assign({}, typescript_1.default.sys), { fileExists(absPath) {
            return configFileFs.fileExists(absPath);
        },
        readFile(absPath, encoding) {
            return configFileFs.readFile(absPath, encoding);
        },
        watchFile(path, callback) {
            return configFileFs.watchFile(path, callback);
        },
        watchDirectory(path, callback) {
            return NOOP_FILE_WATCHER;
        },
        setTimeout(callback, delay, ...args) {
            return setTimeout(callback, delay, ...args);
        },
        clearTimeout(id) {
            clearTimeout(id);
        },
        setImmediate() {
            throw new Error('setImmediate is not implemented');
        },
        clearImmediate() {
            throw new Error('clearImmediate is not implemented');
        } });
}
/**
 * Create a ConfiguredProject and an actual program for the test project located
 * in packages/language-service/test/legacy/project. Project creation exercises the
 * actual code path, but a mock host is used for the filesystem to intercept
 * and modify test files.
 */
function setup() {
    const configFileFs = new MockConfigFileFs();
    const projectService = new typescript_1.default.server.ProjectService({
        host: createHost(configFileFs),
        logger,
        cancellationToken: typescript_1.default.server.nullCancellationToken,
        useSingleInferredProject: true,
        useInferredProjectPerProjectRoot: true,
        typingsInstaller: typescript_1.default.server.nullTypingsInstaller,
        session: undefined,
    });
    // Opening APP_COMPONENT forces a new ConfiguredProject to be created based
    // on the tsconfig.json in the test project.
    projectService.openClientFile(exports.APP_COMPONENT);
    const project = projectService.findProject(exports.TSCONFIG);
    if (!project) {
        throw new Error(`Failed to create project for ${exports.TSCONFIG}`);
    }
    // The following operation forces a ts.Program to be created.
    const tsLS = project.getLanguageService();
    return {
        service: new MockService(project, projectService),
        project,
        tsLS,
        configFileFs,
    };
}
class MockService {
    constructor(project, ps) {
        this.project = project;
        this.ps = ps;
        this.overwritten = new Set();
    }
    /**
     * Overwrite the entire content of `fileName` with `newText`. If cursor is
     * present in `newText`, it will be removed and the position of the cursor
     * will be returned.
     */
    overwrite(fileName, newText) {
        const scriptInfo = this.getScriptInfo(fileName);
        return this.overwriteScriptInfo(scriptInfo, newText);
    }
    /**
     * Overwrite an inline template defined in `fileName` and return the entire
     * content of the source file (not just the template). If a cursor is present
     * in `newTemplate`, it will be removed and the position of the cursor in the
     * source file will be returned.
     */
    overwriteInlineTemplate(fileName, newTemplate) {
        const scriptInfo = this.getScriptInfo(fileName);
        const snapshot = scriptInfo.getSnapshot();
        const originalText = snapshot.getText(0, snapshot.getLength());
        const { position, text } = replaceOnce(originalText, /template: `([\s\S]+?)`/, `template: \`${newTemplate}\``);
        if (position === -1) {
            throw new Error(`${fileName} does not contain a component with template`);
        }
        return this.overwriteScriptInfo(scriptInfo, text);
    }
    reset() {
        if (this.overwritten.size === 0) {
            return;
        }
        for (const fileName of this.overwritten) {
            const scriptInfo = this.getScriptInfo(fileName);
            const reloaded = scriptInfo.reloadFromFile();
            if (!reloaded) {
                throw new Error(`Failed to reload ${scriptInfo.fileName}`);
            }
        }
        this.overwritten.clear();
        // updateGraph() will clear the internal dirty flag.
        this.project.updateGraph();
    }
    getScriptInfo(fileName) {
        const scriptInfo = this.ps.getScriptInfo(fileName);
        if (scriptInfo) {
            return scriptInfo;
        }
        // There is no script info for external template, so create one.
        // But we need to make sure it's not a TS file.
        if ((0, utils_1.isTypeScriptFile)(fileName)) {
            throw new Error(`No existing script info for ${fileName}`);
        }
        const newScriptInfo = this.ps.getOrCreateScriptInfoForNormalizedPath(typescript_1.default.server.toNormalizedPath(fileName), true, // openedByClient
        '', // fileContent
        typescript_1.default.ScriptKind.Unknown);
        if (!newScriptInfo) {
            throw new Error(`Failed to create new script info for ${fileName}`);
        }
        newScriptInfo.attachToProject(this.project);
        return newScriptInfo;
    }
    /**
     * Remove the cursor from `newText`, then replace `scriptInfo` with the new
     * content and return the position of the cursor.
     * @param scriptInfo
     * @param newText Text that possibly contains a cursor
     */
    overwriteScriptInfo(scriptInfo, newText) {
        const result = replaceOnce(newText, /¦/, '');
        const snapshot = scriptInfo.getSnapshot();
        scriptInfo.editContent(0, snapshot.getLength(), result.text);
        this.overwritten.add(scriptInfo.fileName);
        return result;
    }
}
exports.MockService = MockService;
/**
 * Replace at most one occurrence that matches `regex` in the specified
 * `searchText` with the specified `replaceText`. Throw an error if there is
 * more than one occurrence.
 */
function replaceOnce(searchText, regex, replaceText) {
    regex = new RegExp(regex.source, regex.flags + 'g' /* global */);
    let position = -1;
    const text = searchText.replace(regex, (...args) => {
        if (position !== -1) {
            throw new Error(`${regex} matches more than one occurrence in text: ${searchText}`);
        }
        position = args[args.length - 2]; // second last argument is always the index
        return replaceText;
    });
    return { position, text };
}
