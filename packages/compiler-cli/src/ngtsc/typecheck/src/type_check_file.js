"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCheckFile = void 0;
exports.typeCheckFilePath = typeCheckFilePath;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const translator_1 = require("../../translator");
const environment_1 = require("./environment");
const tcb_util_1 = require("./tcb_util");
const type_check_block_1 = require("./type_check_block");
/**
 * An `Environment` representing the single type-checking file into which most (if not all) Type
 * Check Blocks (TCBs) will be generated.
 *
 * The `TypeCheckFile` hosts multiple TCBs and allows the sharing of declarations (e.g. type
 * constructors) between them. Rather than return such declarations via `getPreludeStatements()`, it
 * hoists them to the top of the generated `ts.SourceFile`.
 */
class TypeCheckFile extends environment_1.Environment {
    constructor(fileName, config, refEmitter, reflector, compilerHost) {
        super(config, new translator_1.ImportManager({
            // This minimizes noticeable changes with older versions of `ImportManager`.
            forceGenerateNamespacesForNewImports: true,
            // Type check block code affects code completion and fix suggestions.
            // We want to encourage single quotes for now, like we always did.
            shouldUseSingleQuotes: () => true,
        }), refEmitter, reflector, typescript_1.default.createSourceFile(compilerHost.getCanonicalFileName(fileName), '', typescript_1.default.ScriptTarget.Latest, true));
        this.fileName = fileName;
        this.nextTcbId = 1;
        this.tcbStatements = [];
    }
    addTypeCheckBlock(ref, meta, domSchemaChecker, oobRecorder, genericContextBehavior) {
        const fnId = typescript_1.default.factory.createIdentifier(`_tcb${this.nextTcbId++}`);
        const fn = (0, type_check_block_1.generateTypeCheckBlock)(this, ref, fnId, meta, domSchemaChecker, oobRecorder, genericContextBehavior);
        this.tcbStatements.push(fn);
    }
    render(removeComments) {
        // NOTE: We are conditionally adding imports whenever we discover signal inputs. This has a
        // risk of changing the import graph of the TypeScript program, degrading incremental program
        // re-use due to program structure changes. For type check block files, we are ensuring an
        // import to e.g. `@angular/core` always exists to guarantee a stable graph.
        (0, tcb_util_1.ensureTypeCheckFilePreparationImports)(this);
        const importChanges = this.importManager.finalize();
        if (importChanges.updatedImports.size > 0) {
            throw new Error('AssertionError: Expected no imports to be updated for a new type check file.');
        }
        const printer = typescript_1.default.createPrinter({ removeComments });
        let source = '';
        const newImports = importChanges.newImports.get(this.contextFile.fileName);
        if (newImports !== undefined) {
            source += newImports
                .map((i) => printer.printNode(typescript_1.default.EmitHint.Unspecified, i, this.contextFile))
                .join('\n');
        }
        source += '\n';
        for (const stmt of this.pipeInstStatements) {
            source += printer.printNode(typescript_1.default.EmitHint.Unspecified, stmt, this.contextFile) + '\n';
        }
        for (const stmt of this.typeCtorStatements) {
            source += printer.printNode(typescript_1.default.EmitHint.Unspecified, stmt, this.contextFile) + '\n';
        }
        source += '\n';
        for (const stmt of this.tcbStatements) {
            source += printer.printNode(typescript_1.default.EmitHint.Unspecified, stmt, this.contextFile) + '\n';
        }
        // Ensure the template type-checking file is an ES module. Otherwise, it's interpreted as some
        // kind of global namespace in TS, which forces a full re-typecheck of the user's program that
        // is somehow more expensive than the initial parse.
        source += '\nexport const IS_A_MODULE = true;\n';
        return source;
    }
    getPreludeStatements() {
        return [];
    }
}
exports.TypeCheckFile = TypeCheckFile;
function typeCheckFilePath(rootDirs) {
    const shortest = rootDirs.concat([]).sort((a, b) => a.length - b.length)[0];
    return (0, file_system_1.join)(shortest, '__ng_typecheck__.ts');
}
