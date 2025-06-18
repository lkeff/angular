"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.R3SymbolsImportRewriter = exports.NoopImportRewriter = void 0;
exports.validateAndRewriteCoreSymbol = validateAndRewriteCoreSymbol;
const path_1 = require("../../util/src/path");
/**
 * `ImportRewriter` that does no rewriting.
 */
class NoopImportRewriter {
    rewriteSymbol(symbol, specifier) {
        return symbol;
    }
    rewriteSpecifier(specifier, inContextOfFile) {
        return specifier;
    }
    rewriteNamespaceImportIdentifier(specifier) {
        return specifier;
    }
}
exports.NoopImportRewriter = NoopImportRewriter;
/**
 * A mapping of supported symbols that can be imported from within @angular/core, and the names by
 * which they're exported from r3_symbols.
 */
const CORE_SUPPORTED_SYMBOLS = new Map([
    ['ɵɵdefineInjectable', 'ɵɵdefineInjectable'],
    ['ɵɵdefineInjector', 'ɵɵdefineInjector'],
    ['ɵɵdefineNgModule', 'ɵɵdefineNgModule'],
    ['ɵɵsetNgModuleScope', 'ɵɵsetNgModuleScope'],
    ['ɵɵinject', 'ɵɵinject'],
    ['ɵɵFactoryDeclaration', 'ɵɵFactoryDeclaration'],
    ['ɵsetClassMetadata', 'setClassMetadata'],
    ['ɵsetClassMetadataAsync', 'setClassMetadataAsync'],
    ['ɵɵInjectableDeclaration', 'ɵɵInjectableDeclaration'],
    ['ɵɵInjectorDeclaration', 'ɵɵInjectorDeclaration'],
    ['ɵɵNgModuleDeclaration', 'ɵɵNgModuleDeclaration'],
    ['ɵNgModuleFactory', 'NgModuleFactory'],
    ['ɵnoSideEffects', 'ɵnoSideEffects'],
]);
const CORE_MODULE = '@angular/core';
/**
 * `ImportRewriter` that rewrites imports from '@angular/core' to be imported from the r3_symbols.ts
 * file instead.
 */
class R3SymbolsImportRewriter {
    constructor(r3SymbolsPath) {
        this.r3SymbolsPath = r3SymbolsPath;
    }
    rewriteSymbol(symbol, specifier) {
        if (specifier !== CORE_MODULE) {
            // This import isn't from core, so ignore it.
            return symbol;
        }
        return validateAndRewriteCoreSymbol(symbol);
    }
    rewriteSpecifier(specifier, inContextOfFile) {
        if (specifier !== CORE_MODULE) {
            // This module isn't core, so ignore it.
            return specifier;
        }
        const relativePathToR3Symbols = (0, path_1.relativePathBetween)(inContextOfFile, this.r3SymbolsPath);
        if (relativePathToR3Symbols === null) {
            throw new Error(`Failed to rewrite import inside ${CORE_MODULE}: ${inContextOfFile} -> ${this.r3SymbolsPath}`);
        }
        return relativePathToR3Symbols;
    }
    rewriteNamespaceImportIdentifier(specifier) {
        return specifier;
    }
}
exports.R3SymbolsImportRewriter = R3SymbolsImportRewriter;
function validateAndRewriteCoreSymbol(name) {
    if (!CORE_SUPPORTED_SYMBOLS.has(name)) {
        throw new Error(`Importing unexpected symbol ${name} while compiling ${CORE_MODULE}`);
    }
    return CORE_SUPPORTED_SYMBOLS.get(name);
}
