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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTsConfig = createTsConfig;
const runfiles_1 = require("@bazel/runfiles");
const path = __importStar(require("path"));
const EXT = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
/**
 * Creates a tsconfig based on the default tsconfig
 * to adjust paths, ...
 *
 * @param options
 */
function createTsConfig(options) {
    const result = options.defaultTsConfig;
    return {
        'compilerOptions': Object.assign(Object.assign({}, result.compilerOptions), { 'outDir': options.outDir, 'rootDir': options.rootDir, 'rootDirs': [options.rootDir], 'baseUrl': options.rootDir, 'paths': Object.assign({ '*': ['./*'] }, options.pathMapping), 
            // we have to set this as the default tsconfig is made of es6 mode
            'target': 'es5', 
            // we have to set this as the default tsconfig is made of es6 mode
            'module': 'commonjs', 
            // if we specify declarationDir, we also have to specify
            // declaration in the same tsconfig.json, otherwise ts will error.
            'declaration': true, 'declarationDir': options.outDir, 'skipLibCheck': true }),
        'bazelOptions': Object.assign(Object.assign({}, result.bazelOptions), { 'workspaceName': 'angular', 'target': options.target, 
            // we have to set this as the default tsconfig is made of es6 mode
            'es5Mode': true, 'devmode': true, 'manifest': createManifestPath(options), 'compilationTargetSrc': options.compilationTargetSrc, 
            // Override this property from the real tsconfig we read
            // Because we ask for :empty_tsconfig.json, we get the ES6 version which
            // expects to write externs, yet that doesn't work under this fixture.
            'tsickleExternsPath': '', 
            // we don't copy the node_modules into our tmp dir, so we should look in
            // the original workspace directory for it
            'nodeModulesPrefix': path.join(runfiles_1.runfiles.resolve('npm/node_modules/typescript/package.json'), '../../') }),
        'files': options.files,
        'angularCompilerOptions': Object.assign(Object.assign({}, result.angularCompilerOptions), { 'expectedOut': [
                ...options.compilationTargetSrc.map((src) => srcToExpectedOut(src, 'js', options)),
                ...options.compilationTargetSrc.map((src) => srcToExpectedOut(src, 'd.ts', options)),
            ] }),
    };
}
function srcToExpectedOut(srcFile, suffix, options) {
    const baseName = path.basename(srcFile).replace(EXT, '');
    return (path.join(path.relative(options.rootDir, options.outDir), path.relative(options.rootDir, path.dirname(srcFile)), baseName) +
        '.' +
        suffix);
}
function createManifestPath(options) {
    return (path.resolve(options.outDir, options.target.replace(/\/\/|@/g, '').replace(/:/g, '/')) +
        '.es5.MF');
}
