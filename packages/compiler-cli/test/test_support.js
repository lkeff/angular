"use strict";
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
exports.makeTempDir = makeTempDir;
exports.setupBazelTo = setupBazelTo;
exports.setup = setup;
exports.expectNoDiagnostics = expectNoDiagnostics;
exports.expectNoDiagnosticsInProgram = expectNoDiagnosticsInProgram;
exports.normalizeSeparators = normalizeSeparators;
exports.stripAnsi = stripAnsi;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const ng = __importStar(require("../index"));
const file_system_1 = require("../src/ngtsc/file_system");
const testing_1 = require("../src/ngtsc/testing");
// TEST_TMPDIR is always set by Bazel.
const tmpdir = process.env['TEST_TMPDIR'];
function makeTempDir() {
    let dir;
    while (true) {
        const id = (Math.random() * 1000000).toFixed(0);
        dir = path.posix.join(tmpdir, `tmp.${id}`);
        if (!fs.existsSync(dir))
            break;
    }
    fs.mkdirSync(dir);
    return dir;
}
function createTestSupportFor(basePath) {
    // Typescript uses identity comparison on `paths` and other arrays in order to determine
    // if program structure can be reused for incremental compilation, so we reuse the default
    // values unless overridden, and freeze them so that they can't be accidentally changed somewhere
    // in tests.
    const defaultCompilerOptions = {
        basePath,
        'experimentalDecorators': true,
        'skipLibCheck': true,
        'strict': true,
        'strictPropertyInitialization': false,
        'types': Object.freeze([]),
        'outDir': path.resolve(basePath, 'built'),
        'rootDir': basePath,
        'baseUrl': basePath,
        'declaration': true,
        'target': typescript_1.default.ScriptTarget.ES5,
        'newLine': typescript_1.default.NewLineKind.LineFeed,
        'module': typescript_1.default.ModuleKind.ES2015,
        'moduleResolution': typescript_1.default.ModuleResolutionKind.Node10,
        'lib': Object.freeze([
            path.resolve(basePath, 'node_modules/typescript/lib/lib.es6.d.ts'),
        ]),
        'paths': Object.freeze({ '@angular/*': ['./node_modules/@angular/*'] }),
    };
    return {
        // We normalize the basePath into a posix path, so that multiple assertions which compare
        // paths don't need to normalize the path separators each time.
        basePath: normalizeSeparators(basePath),
        write,
        writeFiles,
        createCompilerOptions,
        shouldExist,
        shouldNotExist,
    };
    function ensureDirExists(absolutePathToDir) {
        if (fs.existsSync(absolutePathToDir)) {
            if (!fs.statSync(absolutePathToDir).isDirectory()) {
                throw new Error(`'${absolutePathToDir}' exists and is not a directory.`);
            }
        }
        else {
            const parentDir = path.dirname(absolutePathToDir);
            ensureDirExists(parentDir);
            fs.mkdirSync(absolutePathToDir);
        }
    }
    function write(fileName, content) {
        const absolutePathToFile = path.resolve(basePath, fileName);
        ensureDirExists(path.dirname(absolutePathToFile));
        fs.writeFileSync(absolutePathToFile, content);
    }
    function writeFiles(...mockDirs) {
        mockDirs.forEach((dir) => {
            Object.keys(dir).forEach((fileName) => {
                write(fileName, dir[fileName]);
            });
        });
    }
    function createCompilerOptions(overrideOptions = {}) {
        return Object.assign(Object.assign({}, defaultCompilerOptions), overrideOptions);
    }
    function shouldExist(fileName) {
        if (!fs.existsSync(path.resolve(basePath, fileName))) {
            throw new Error(`Expected ${fileName} to be emitted (basePath: ${basePath})`);
        }
    }
    function shouldNotExist(fileName) {
        if (fs.existsSync(path.resolve(basePath, fileName))) {
            throw new Error(`Did not expect ${fileName} to be emitted (basePath: ${basePath})`);
        }
    }
}
function setupBazelTo(tmpDirPath) {
    const nodeModulesPath = path.join(tmpDirPath, 'node_modules');
    const angularDirectory = path.join(nodeModulesPath, '@angular');
    fs.mkdirSync(nodeModulesPath);
    fs.mkdirSync(angularDirectory);
    (0, testing_1.getAngularPackagesFromRunfiles)().forEach(({ pkgPath, name }) => {
        fs.symlinkSync(pkgPath, path.join(angularDirectory, name), 'junction');
    });
    // Link typescript
    const typeScriptSource = (0, testing_1.resolveFromRunfiles)('npm/node_modules/typescript');
    const typescriptDest = path.join(nodeModulesPath, 'typescript');
    fs.symlinkSync(typeScriptSource, typescriptDest, 'junction');
    // Link "rxjs" if it has been set up as a runfile. "rxjs" is linked optionally because
    // not all compiler-cli tests need "rxjs" set up.
    try {
        const rxjsSource = (0, testing_1.resolveFromRunfiles)('npm/node_modules/rxjs');
        const rxjsDest = path.join(nodeModulesPath, 'rxjs');
        fs.symlinkSync(rxjsSource, rxjsDest, 'junction');
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND')
            throw e;
    }
}
function setup() {
    // // `TestSupport` provides its own file-system abstraction so we just use
    // // the native `NodeJSFileSystem` under the hood.
    (0, file_system_1.setFileSystem)(new file_system_1.NodeJSFileSystem());
    const tmpDirPath = makeTempDir();
    setupBazelTo(tmpDirPath);
    return createTestSupportFor(tmpDirPath);
}
function expectNoDiagnostics(options, diags) {
    const errorDiags = diags.filter((d) => d.category !== typescript_1.default.DiagnosticCategory.Message);
    if (errorDiags.length) {
        throw new Error(`Expected no diagnostics: ${ng.formatDiagnostics(errorDiags)}`);
    }
}
function expectNoDiagnosticsInProgram(options, p) {
    expectNoDiagnostics(options, [
        ...p.getNgStructuralDiagnostics(),
        ...p.getTsSemanticDiagnostics(),
        ...p.getNgSemanticDiagnostics(),
    ]);
}
function normalizeSeparators(path) {
    return path.replace(/\\/g, '/');
}
const STRIP_ANSI = /\x1B\x5B\d+m/g;
function stripAnsi(diags) {
    return diags.replace(STRIP_ANSI, '');
}
