"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LSParseConfigHost = exports.LanguageServiceAdapter = void 0;
const shims_1 = require("@angular/compiler-cli/src/ngtsc/shims");
const typescript_1 = require("@angular/compiler-cli/src/ngtsc/util/src/typescript");
const p = __importStar(require("path"));
const typescript_2 = __importDefault(require("typescript"));
const utils_1 = require("./utils");
const PRE_COMPILED_STYLE_EXTENSIONS = ['.scss', '.sass', '.less', '.styl'];
class LanguageServiceAdapter {
    constructor(project) {
        this.project = project;
        this.entryPoint = null;
        this.constructionDiagnostics = [];
        this.ignoreForEmit = new Set();
        this.unifiedModulesHost = null; // only used in Bazel
        /**
         * Map of resource filenames to the version of the file last read via `readResource`.
         *
         * Used to implement `getModifiedResourceFiles`.
         */
        this.lastReadResourceVersion = new Map();
        this.rootDirs = (0, typescript_1.getRootDirs)(this, project.getCompilationSettings());
    }
    resourceNameToFileName(url, fromFile, fallbackResolve) {
        var _a;
        // If we are trying to resolve a `.css` file, see if we can find a pre-compiled file with the
        // same name instead. That way, we can provide go-to-definition for the pre-compiled files which
        // would generally be the desired behavior.
        if (url.endsWith('.css')) {
            const styleUrl = p.resolve(fromFile, '..', url);
            for (const ext of PRE_COMPILED_STYLE_EXTENSIONS) {
                const precompiledFileUrl = styleUrl.replace(/\.css$/, ext);
                if (this.fileExists(precompiledFileUrl)) {
                    return precompiledFileUrl;
                }
            }
        }
        return (_a = fallbackResolve === null || fallbackResolve === void 0 ? void 0 : fallbackResolve(url, fromFile)) !== null && _a !== void 0 ? _a : null;
    }
    isShim(sf) {
        return (0, shims_1.isShim)(sf);
    }
    isResource(sf) {
        const scriptInfo = this.project.getScriptInfo(sf.fileName);
        return (scriptInfo === null || scriptInfo === void 0 ? void 0 : scriptInfo.scriptKind) === typescript_2.default.ScriptKind.Unknown;
    }
    fileExists(fileName) {
        return this.project.fileExists(fileName);
    }
    readFile(fileName) {
        return this.project.readFile(fileName);
    }
    getCurrentDirectory() {
        return this.project.getCurrentDirectory();
    }
    getCanonicalFileName(fileName) {
        return this.project.projectService.toCanonicalFileName(fileName);
    }
    /**
     * Return the real path of a symlink. This method is required in order to
     * resolve symlinks in node_modules.
     */
    realpath(path) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.project).realpath) === null || _b === void 0 ? void 0 : _b.call(_a, path)) !== null && _c !== void 0 ? _c : path;
    }
    /**
     * readResource() is an Angular-specific method for reading files that are not
     * managed by the TS compiler host, namely templates and stylesheets.
     * It is a method on ExtendedTsCompilerHost, see
     * packages/compiler-cli/src/ngtsc/core/api/src/interfaces.ts
     */
    readResource(fileName) {
        if ((0, utils_1.isTypeScriptFile)(fileName)) {
            console.error(`readResource() should not be called on TS file: ${fileName}`);
            return '';
        }
        // Calling getScriptSnapshot() will actually create a ScriptInfo if it does
        // not exist! The same applies for getScriptVersion().
        // getScriptInfo() will not create one if it does not exist.
        // In this case, we *want* a script info to be created so that we could
        // keep track of its version.
        const version = this.project.getScriptVersion(fileName);
        this.lastReadResourceVersion.set(fileName, version);
        const scriptInfo = this.project.getScriptInfo(fileName);
        if (!scriptInfo) {
            // This should not happen because it would have failed already at `getScriptVersion`.
            console.error(`Failed to get script info when trying to read ${fileName}`);
            return '';
        }
        // Add external resources as root files to the project since we project language service
        // features for them (this is currently only the case for HTML files, but we could investigate
        // css file features in the future). This prevents the project from being closed when navigating
        // away from a resource file.
        if (!this.project.isRoot(scriptInfo)) {
            this.project.addRoot(scriptInfo);
        }
        const snapshot = scriptInfo.getSnapshot();
        return snapshot.getText(0, snapshot.getLength());
    }
    getModifiedResourceFiles() {
        const modifiedFiles = new Set();
        for (const [fileName, oldVersion] of this.lastReadResourceVersion) {
            if (this.project.getScriptVersion(fileName) !== oldVersion) {
                modifiedFiles.add(fileName);
            }
        }
        return modifiedFiles.size > 0 ? modifiedFiles : undefined;
    }
}
exports.LanguageServiceAdapter = LanguageServiceAdapter;
/**
 * Used to read configuration files.
 *
 * A language service parse configuration host is independent of the adapter
 * because signatures of calls like `FileSystem#readFile` are a bit stricter
 * than those on the adapter.
 */
class LSParseConfigHost {
    constructor(serverHost) {
        this.serverHost = serverHost;
    }
    exists(path) {
        return this.serverHost.fileExists(path) || this.serverHost.directoryExists(path);
    }
    readFile(path) {
        const content = this.serverHost.readFile(path);
        if (content === undefined) {
            console.error(`LanguageServiceFS#readFile called on unavailable file ${path}`);
            return '';
        }
        return content;
    }
    lstat(path) {
        return {
            isFile: () => {
                return this.serverHost.fileExists(path);
            },
            isDirectory: () => {
                return this.serverHost.directoryExists(path);
            },
            isSymbolicLink: () => {
                throw new Error(`LanguageServiceFS#lstat#isSymbolicLink not implemented`);
            },
        };
    }
    readdir(path) {
        return this.serverHost.readDirectory(path, undefined, undefined, undefined, 
        /* depth */ 1);
    }
    pwd() {
        return this.serverHost.getCurrentDirectory();
    }
    extname(path) {
        return p.extname(path);
    }
    resolve(...paths) {
        return p.resolve(...paths);
    }
    dirname(file) {
        return p.dirname(file);
    }
    join(basePath, ...paths) {
        return p.join(basePath, ...paths);
    }
}
exports.LSParseConfigHost = LSParseConfigHost;
