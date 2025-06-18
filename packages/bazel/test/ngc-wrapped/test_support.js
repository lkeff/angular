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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = setup;
exports.listFilesRecursive = listFilesRecursive;
const bazel_1 = require("@angular/bazel");
const runfiles_1 = require("@bazel/runfiles");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const tsconfig_template_1 = require("./tsconfig_template");
function setup({ bazelBin = 'bazel-bin', tsconfig = 'tsconfig.json', } = {}) {
    const runfilesPath = process.env['TEST_SRCDIR'];
    const basePath = makeTempDir(runfilesPath);
    console.error(basePath);
    const bazelBinPath = path.resolve(basePath, bazelBin);
    fs.mkdirSync(bazelBinPath);
    const angularCorePath = runfiles_1.runfiles.resolve('angular/packages/core');
    const tsConfigJsonPath = path.resolve(basePath, tsconfig);
    const emptyTsConfig = typescript_1.default.readConfigFile(runfiles_1.runfiles.resolve('angular/packages/bazel/test/ngc-wrapped/empty/empty_tsconfig.json'), read);
    const typesRoots = emptyTsConfig.config.compilerOptions.typeRoots[0];
    return {
        basePath,
        runfilesPath,
        angularCorePath,
        typesRoots,
        write,
        read,
        writeFiles,
        writeConfig,
        shouldExist,
        shouldNotExist,
        runOneBuild: runOneBuildImpl,
    };
    // -----------------
    // helpers
    function mkdirp(dirname) {
        const parent = path.dirname(dirname);
        if (!fs.existsSync(parent)) {
            mkdirp(parent);
        }
        fs.mkdirSync(dirname);
    }
    function write(fileName, content) {
        const dir = path.dirname(fileName);
        if (dir != '.') {
            const newDir = path.resolve(basePath, dir);
            if (!fs.existsSync(newDir))
                mkdirp(newDir);
        }
        fs.writeFileSync(path.resolve(basePath, fileName), content, { encoding: 'utf-8' });
    }
    function read(fileName) {
        return fs.readFileSync(path.resolve(basePath, fileName), { encoding: 'utf-8' });
    }
    function writeFiles(...mockDirs) {
        mockDirs.forEach((dir) => {
            Object.keys(dir).forEach((fileName) => {
                write(fileName, dir[fileName]);
            });
        });
    }
    function writeConfig({ srcTargetPath, depPaths = [], pathMapping = [], }) {
        srcTargetPath = path.resolve(basePath, srcTargetPath);
        const compilationTargetSrc = listFilesRecursive(srcTargetPath);
        const target = '//' + path.relative(basePath, srcTargetPath);
        const files = [...compilationTargetSrc];
        depPaths = depPaths.concat([angularCorePath]);
        pathMapping = pathMapping.concat([
            { moduleName: '@angular/core', path: angularCorePath },
            { moduleName: 'angular/packages/core', path: angularCorePath },
        ]);
        for (const depPath of depPaths) {
            files.push(...listFilesRecursive(depPath).filter((f) => f.endsWith('.d.ts')));
        }
        const pathMappingObj = {};
        for (const mapping of pathMapping) {
            pathMappingObj[mapping.moduleName] = [mapping.path];
            pathMappingObj[path.posix.join(mapping.moduleName, '*')] = [
                path.posix.join(mapping.path, '*'),
            ];
        }
        const emptyTsConfig = typescript_1.default.readConfigFile(runfiles_1.runfiles.resolve('angular/packages/bazel/test/ngc-wrapped/empty/empty_tsconfig.json'), read);
        const tsconfig = (0, tsconfig_template_1.createTsConfig)({
            defaultTsConfig: emptyTsConfig.config,
            rootDir: basePath,
            target: target,
            outDir: bazelBinPath,
            compilationTargetSrc,
            files: files,
            pathMapping: pathMappingObj,
        });
        write(path.resolve(basePath, tsConfigJsonPath), JSON.stringify(tsconfig, null, 2));
        return tsconfig;
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
    function runOneBuildImpl() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, bazel_1.runOneBuild)(['@' + tsConfigJsonPath]);
        });
    }
}
function makeTempDir(baseDir) {
    const id = (Math.random() * 1000000).toFixed(0);
    const dir = path.join(baseDir, `tmp.${id}`);
    fs.mkdirSync(dir);
    return dir;
}
function listFilesRecursive(dir, fileList = []) {
    fs.readdirSync(dir).forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            listFilesRecursive(path.join(dir, file), fileList);
        }
        else {
            fileList.push(path.join(dir, file));
        }
    });
    return fileList;
}
