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
exports.analyzeFileAndEnsureNoCrossImports = analyzeFileAndEnsureNoCrossImports;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
/** Comment that can be used to skip a single import from being flagged. */
const skipComment = '// @ng_package: ignore-cross-repo-import';
/**
 * Analyzes the given JavaScript source file and checks whether there are
 * any relative imports that point to different entry-points or packages.
 *
 * Such imports are flagged and will be returned in the failure list. Cross
 * entry-point or package imports result in duplicate code and therefore are
 * forbidden (unless explicitly opted out via comment - {@link skipComment}).
 */
function analyzeFileAndEnsureNoCrossImports(file, pkg) {
    const content = fs.readFileSync(file.path, 'utf8');
    const sf = typescript_1.default.createSourceFile(file.path, content, typescript_1.default.ScriptTarget.Latest, true);
    const fileDirPath = path.posix.dirname(file.path);
    const fileDebugName = file.shortPath.replace(/\.[cm]js$/, '.ts');
    const failures = [];
    const owningPkg = determineOwningEntryPoint(file, pkg);
    if (owningPkg === null) {
        throw new Error(`Could not determine owning entry-point package of: ${file.shortPath}`);
    }
    // TODO: Consider handling deep dynamic import expressions.
    for (const st of sf.statements) {
        if ((!typescript_1.default.isImportDeclaration(st) && !typescript_1.default.isExportDeclaration(st)) ||
            st.moduleSpecifier === undefined ||
            !typescript_1.default.isStringLiteralLike(st.moduleSpecifier)) {
            continue;
        }
        // Skip module imports.
        if (!st.moduleSpecifier.text.startsWith('.')) {
            continue;
        }
        // Skip this import if there is an explicit skip comment.
        const leadingComments = typescript_1.default.getLeadingCommentRanges(sf.text, st.getFullStart());
        if (leadingComments !== undefined &&
            leadingComments.some((c) => sf.text.substring(c.pos, c.end) === skipComment)) {
            continue;
        }
        const destinationPath = path.posix.join(fileDirPath, st.moduleSpecifier.text);
        const targetPackage = determineOwningEntryPoint({ path: destinationPath }, pkg);
        if (targetPackage === null) {
            failures.push(`Could not determine owning entry-point package of: ${destinationPath}. Imported from: ${fileDebugName}. Is this a relative import to another full package?.\n` +
                `You can skip this import by adding a comment: ${skipComment}`);
            continue;
        }
    }
    return failures;
}
/** Determines the owning entry-point for the given JavaScript file. */
function determineOwningEntryPoint(file, pkg) {
    let owningEntryPoint = null;
    for (const [name, info] of Object.entries(pkg.entryPoints)) {
        // Entry point directory is assumed because technically the entry-point
        // could be deeper inside the entry-point source file package. This is
        // unlikely though and we still catch most cases, especially in the standard
        // folder layout where the APF entry-point index file resides at the top of
        // the entry-point.
        const assumedEntryPointDir = path.posix.dirname(info.index.path);
        if (file.path.startsWith(assumedEntryPointDir) &&
            (owningEntryPoint === null || owningEntryPoint.path.length < assumedEntryPointDir.length)) {
            owningEntryPoint = { name, info, path: assumedEntryPointDir };
        }
    }
    return owningEntryPoint;
}
