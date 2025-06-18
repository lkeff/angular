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
exports.makeProgram = makeProgram;
exports.getDeclaration = getDeclaration;
exports.walkForDeclarations = walkForDeclarations;
exports.isNamedDeclaration = isNamedDeclaration;
exports.expectCompleteReuse = expectCompleteReuse;
exports.getSourceCodeForDiagnostic = getSourceCodeForDiagnostic;
exports.diagnosticToNode = diagnosticToNode;
///<reference types="jasmine"/>
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const typescript_2 = require("../../util/src/typescript");
const compiler_host_1 = require("./compiler_host");
function makeProgram(files, options, host, checkForErrors = true) {
    const fs = (0, file_system_1.getFileSystem)();
    files.forEach((file) => {
        fs.ensureDir((0, file_system_1.dirname)(file.name));
        fs.writeFile(file.name, file.contents);
    });
    const compilerOptions = Object.assign({ noLib: true, experimentalDecorators: true, moduleResolution: typescript_1.default.ModuleResolutionKind.Node10 }, options);
    const compilerHost = new compiler_host_1.NgtscTestCompilerHost(fs, compilerOptions);
    const rootNames = files
        .filter((file) => file.isRoot !== false)
        .map((file) => compilerHost.getCanonicalFileName(file.name));
    const program = typescript_1.default.createProgram(rootNames, compilerOptions, compilerHost);
    if (checkForErrors) {
        const diags = [...program.getSyntacticDiagnostics(), ...program.getSemanticDiagnostics()];
        if (diags.length > 0) {
            const errors = diags.map((diagnostic) => {
                let message = typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                if (diagnostic.file) {
                    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                    message = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
                }
                return `Error: ${message}`;
            });
            throw new Error(`Typescript diagnostics failed! ${errors.join(', ')}`);
        }
    }
    return { program, host: compilerHost, options: compilerOptions };
}
/**
 * Search the file specified by `fileName` in the given `program` for a declaration that has the
 * name `name` and passes the `predicate` function.
 *
 * An error will be thrown if there is not at least one AST node with the given `name` and passes
 * the `predicate` test.
 */
function getDeclaration(program, fileName, name, assert) {
    const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
    const chosenDecls = walkForDeclarations(name, sf);
    if (chosenDecls.length === 0) {
        throw new Error(`No such symbol: ${name} in ${fileName}`);
    }
    const chosenDecl = chosenDecls.find(assert);
    if (chosenDecl === undefined) {
        throw new Error(`Symbols with name ${name} in ${fileName} have types: ${chosenDecls.map((decl) => typescript_1.default.SyntaxKind[decl.kind])}. Expected one to pass predicate "${assert.name}()".`);
    }
    return chosenDecl;
}
/**
 * Walk the AST tree from the `rootNode` looking for a declaration that has the given `name`.
 */
function walkForDeclarations(name, rootNode) {
    const chosenDecls = [];
    rootNode.forEachChild((node) => {
        if (typescript_1.default.isVariableStatement(node)) {
            node.declarationList.declarations.forEach((decl) => {
                if (bindingNameEquals(decl.name, name)) {
                    chosenDecls.push(decl);
                    if (decl.initializer) {
                        chosenDecls.push(...walkForDeclarations(name, decl.initializer));
                    }
                }
                else {
                    chosenDecls.push(...walkForDeclarations(name, node));
                }
            });
        }
        else if (isNamedDeclaration(node)) {
            if (node.name !== undefined && node.name.text === name) {
                chosenDecls.push(node);
            }
            chosenDecls.push(...walkForDeclarations(name, node));
        }
        else if (typescript_1.default.isImportDeclaration(node) &&
            node.importClause !== undefined &&
            node.importClause.name !== undefined &&
            node.importClause.name.text === name) {
            chosenDecls.push(node.importClause);
        }
        else {
            chosenDecls.push(...walkForDeclarations(name, node));
        }
    });
    return chosenDecls;
}
function isNamedDeclaration(node) {
    const namedNode = node;
    return namedNode.name !== undefined && typescript_1.default.isIdentifier(namedNode.name);
}
const COMPLETE_REUSE_FAILURE_MESSAGE = 'The original program was not reused completely, even though no changes should have been made to its structure';
/**
 * Extracted from TypeScript's internal enum `StructureIsReused`.
 */
var TsStructureIsReused;
(function (TsStructureIsReused) {
    TsStructureIsReused[TsStructureIsReused["Not"] = 0] = "Not";
    TsStructureIsReused[TsStructureIsReused["SafeModules"] = 1] = "SafeModules";
    TsStructureIsReused[TsStructureIsReused["Completely"] = 2] = "Completely";
})(TsStructureIsReused || (TsStructureIsReused = {}));
function expectCompleteReuse(program) {
    // Assert complete reuse using TypeScript's private API.
    expect(program.structureIsReused)
        .withContext(COMPLETE_REUSE_FAILURE_MESSAGE)
        .toBe(TsStructureIsReused.Completely);
}
function bindingNameEquals(node, name) {
    if (typescript_1.default.isIdentifier(node)) {
        return node.text === name;
    }
    return false;
}
function getSourceCodeForDiagnostic(diag) {
    if (diag.file === undefined || diag.start === undefined || diag.length === undefined) {
        throw new Error(`Unable to get source code for diagnostic. Provided diagnostic instance doesn't contain "file", "start" and/or "length" properties.`);
    }
    const text = diag.file.text;
    return text.slice(diag.start, diag.start + diag.length);
}
function diagnosticToNode(diagnostic, guard) {
    const diag = diagnostic;
    if (diag.file === undefined) {
        throw new Error(`Expected ts.Diagnostic to have a file source`);
    }
    const node = (0, typescript_2.getTokenAtPosition)(diag.file, diag.start);
    expect(guard(node)).toBe(true);
    return node;
}
