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
exports.TsCreateProgramDriver = exports.DelegatingCompilerHost = void 0;
const typescript_1 = __importDefault(require("typescript"));
const shims_1 = require("../../shims");
const typescript_2 = require("../../util/src/typescript");
const api_1 = require("./api");
/**
 * Delegates all methods of `ts.CompilerHost` to a delegate, with the exception of
 * `getSourceFile`, `fileExists` and `writeFile` which are implemented in `TypeCheckProgramHost`.
 *
 * If a new method is added to `ts.CompilerHost` which is not delegated, a type error will be
 * generated for this class.
 */
class DelegatingCompilerHost {
    // jsDocParsingMode is not a method like the other elements above
    // TODO: ignore usage can be dropped once 5.2 support is dropped
    get jsDocParsingMode() {
        // @ts-ignore
        return this.delegate.jsDocParsingMode;
    }
    set jsDocParsingMode(mode) {
        // @ts-ignore
        this.delegate.jsDocParsingMode = mode;
    }
    constructor(delegate) {
        // Excluded are 'getSourceFile', 'fileExists' and 'writeFile', which are actually implemented by
        // `TypeCheckProgramHost` below.
        this.delegate = delegate;
        this.createHash = this.delegateMethod('createHash');
        this.directoryExists = this.delegateMethod('directoryExists');
        this.getCancellationToken = this.delegateMethod('getCancellationToken');
        this.getCanonicalFileName = this.delegateMethod('getCanonicalFileName');
        this.getCurrentDirectory = this.delegateMethod('getCurrentDirectory');
        this.getDefaultLibFileName = this.delegateMethod('getDefaultLibFileName');
        this.getDefaultLibLocation = this.delegateMethod('getDefaultLibLocation');
        this.getDirectories = this.delegateMethod('getDirectories');
        this.getEnvironmentVariable = this.delegateMethod('getEnvironmentVariable');
        this.getNewLine = this.delegateMethod('getNewLine');
        this.getParsedCommandLine = this.delegateMethod('getParsedCommandLine');
        this.getSourceFileByPath = this.delegateMethod('getSourceFileByPath');
        this.readDirectory = this.delegateMethod('readDirectory');
        this.readFile = this.delegateMethod('readFile');
        this.realpath = this.delegateMethod('realpath');
        this.resolveModuleNames = this.delegateMethod('resolveModuleNames');
        this.resolveTypeReferenceDirectives = this.delegateMethod('resolveTypeReferenceDirectives');
        this.trace = this.delegateMethod('trace');
        this.useCaseSensitiveFileNames = this.delegateMethod('useCaseSensitiveFileNames');
        this.getModuleResolutionCache = this.delegateMethod('getModuleResolutionCache');
        this.hasInvalidatedResolutions = this.delegateMethod('hasInvalidatedResolutions');
        this.resolveModuleNameLiterals = this.delegateMethod('resolveModuleNameLiterals');
        this.resolveTypeReferenceDirectiveReferences = this.delegateMethod('resolveTypeReferenceDirectiveReferences');
    }
    delegateMethod(name) {
        return this.delegate[name] !== undefined
            ? this.delegate[name].bind(this.delegate)
            : undefined;
    }
}
exports.DelegatingCompilerHost = DelegatingCompilerHost;
/**
 * A `ts.CompilerHost` which augments source files.
 */
class UpdatedProgramHost extends DelegatingCompilerHost {
    constructor(sfMap, originalProgram, delegate, shimExtensionPrefixes) {
        super(delegate);
        this.originalProgram = originalProgram;
        this.shimExtensionPrefixes = shimExtensionPrefixes;
        this.shimTagger = new shims_1.ShimReferenceTagger(this.shimExtensionPrefixes);
        this.sfMap = sfMap;
    }
    getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
        // Try to use the same `ts.SourceFile` as the original program, if possible. This guarantees
        // that program reuse will be as efficient as possible.
        let delegateSf = this.originalProgram.getSourceFile(fileName);
        if (delegateSf === undefined) {
            // Something went wrong and a source file is being requested that's not in the original
            // program. Just in case, try to retrieve it from the delegate.
            delegateSf = this.delegate.getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
        }
        if (delegateSf === undefined) {
            return undefined;
        }
        // Look for replacements.
        let sf;
        if (this.sfMap.has(fileName)) {
            sf = this.sfMap.get(fileName);
            (0, shims_1.copyFileShimData)(delegateSf, sf);
        }
        else {
            sf = delegateSf;
        }
        // TypeScript doesn't allow returning redirect source files. To avoid unforeseen errors we
        // return the original source file instead of the redirect target.
        sf = (0, typescript_2.toUnredirectedSourceFile)(sf);
        this.shimTagger.tag(sf);
        return sf;
    }
    postProgramCreationCleanup() {
        this.shimTagger.finalize();
    }
    writeFile() {
        throw new Error(`TypeCheckProgramHost should never write files`);
    }
    fileExists(fileName) {
        return this.sfMap.has(fileName) || this.delegate.fileExists(fileName);
    }
}
/**
 * Updates a `ts.Program` instance with a new one that incorporates specific changes, using the
 * TypeScript compiler APIs for incremental program creation.
 */
class TsCreateProgramDriver {
    constructor(originalProgram, originalHost, options, shimExtensionPrefixes) {
        this.originalProgram = originalProgram;
        this.originalHost = originalHost;
        this.options = options;
        this.shimExtensionPrefixes = shimExtensionPrefixes;
        /**
         * A map of source file paths to replacement `ts.SourceFile`s for those paths.
         *
         * Effectively, this tracks the delta between the user's program (represented by the
         * `originalHost`) and the template type-checking program being managed.
         */
        this.sfMap = new Map();
        this.supportsInlineOperations = true;
        this.program = this.originalProgram;
    }
    getProgram() {
        return this.program;
    }
    updateFiles(contents, updateMode) {
        if (contents.size === 0) {
            // No changes have been requested. Is it safe to skip updating entirely?
            // If UpdateMode is Incremental, then yes. If UpdateMode is Complete, then it's safe to skip
            // only if there are no active changes already (that would be cleared by the update).
            if (updateMode !== api_1.UpdateMode.Complete || this.sfMap.size === 0) {
                // No changes would be made to the `ts.Program` anyway, so it's safe to do nothing here.
                return;
            }
        }
        if (updateMode === api_1.UpdateMode.Complete) {
            this.sfMap.clear();
        }
        for (const [filePath, { newText, originalFile }] of contents.entries()) {
            const sf = typescript_1.default.createSourceFile(filePath, newText, typescript_1.default.ScriptTarget.Latest, true);
            if (originalFile !== null) {
                sf[api_1.NgOriginalFile] = originalFile;
            }
            this.sfMap.set(filePath, sf);
        }
        const host = new UpdatedProgramHost(this.sfMap, this.originalProgram, this.originalHost, this.shimExtensionPrefixes);
        const oldProgram = this.program;
        // Retag the old program's `ts.SourceFile`s with shim tags, to allow TypeScript to reuse the
        // most data.
        (0, shims_1.retagAllTsFiles)(oldProgram);
        this.program = typescript_1.default.createProgram({
            host,
            rootNames: this.program.getRootFileNames(),
            options: this.options,
            oldProgram,
        });
        host.postProgramCreationCleanup();
        // Only untag the old program. The new program needs to keep the tagged files, because as of
        // TS 5.5 not having the files tagged while producing diagnostics can lead to errors. See:
        // https://github.com/microsoft/TypeScript/pull/58398
        (0, shims_1.untagAllTsFiles)(oldProgram);
    }
}
exports.TsCreateProgramDriver = TsCreateProgramDriver;
