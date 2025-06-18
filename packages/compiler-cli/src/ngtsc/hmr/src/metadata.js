"use strict";
/*!
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
exports.extractHmrMetatadata = extractHmrMetatadata;
const compiler_1 = require("@angular/compiler");
const path_1 = require("../../util/src/path");
const extract_dependencies_1 = require("./extract_dependencies");
const typescript_1 = __importDefault(require("typescript"));
/**
 * Extracts the HMR metadata for a class declaration.
 * @param clazz Class being analyzed.
 * @param reflection Reflection host.
 * @param compilerHost Compiler host to use when resolving file names.
 * @param rootDirs Root directories configured by the user.
 * @param definition Analyzed component definition.
 * @param factory Analyzed component factory.
 * @param deferBlockMetadata Metadata about the defer blocks in the component.
 * @param classMetadata Analyzed `setClassMetadata` expression, if any.
 * @param debugInfo Analyzed `setClassDebugInfo` expression, if any.
 */
function extractHmrMetatadata(clazz, reflection, evaluator, compilerHost, rootDirs, definition, factory, deferBlockMetadata, classMetadata, debugInfo) {
    if (!reflection.isClass(clazz)) {
        return null;
    }
    const sourceFile = typescript_1.default.getOriginalNode(clazz).getSourceFile();
    const filePath = (0, path_1.getProjectRelativePath)(sourceFile.fileName, rootDirs, compilerHost) ||
        compilerHost.getCanonicalFileName(sourceFile.fileName);
    const dependencies = (0, extract_dependencies_1.extractHmrDependencies)(clazz, definition, factory, deferBlockMetadata, classMetadata, debugInfo, reflection, evaluator);
    if (dependencies === null) {
        return null;
    }
    const meta = {
        type: new compiler_1.outputAst.WrappedNodeExpr(clazz.name),
        className: clazz.name.text,
        filePath,
        localDependencies: dependencies.local,
        namespaceDependencies: dependencies.external,
    };
    return meta;
}
