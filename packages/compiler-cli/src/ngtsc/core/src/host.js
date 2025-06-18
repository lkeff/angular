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
exports.NgCompilerHost = exports.DelegatingCompilerHost = void 0;
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../diagnostics");
const entry_point_1 = require("../../entry_point");
const file_system_1 = require("../../file_system");
const shims_1 = require("../../shims");
const typecheck_1 = require("../../typecheck");
const path_1 = require("../../util/src/path");
const typescript_2 = require("../../util/src/typescript");
// A persistent source of bugs in CompilerHost delegation has been the addition by TS of new,
// optional methods on ts.CompilerHost. Since these methods are optional, it's not a type error that
// the delegating host doesn't implement or delegate them. This causes subtle runtime failures. No
// more. This infrastructure ensures that failing to delegate a method is a compile-time error.
/**
 * Delegates all methods of `ExtendedTsCompilerHost` to a delegate, with the exception of
 * `getSourceFile` and `fileExists` which are implemented in `NgCompilerHost`.
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
        this.delegate = delegate;
        // Excluded are 'getSourceFile' and 'fileExists', which are actually implemented by
        // NgCompilerHost
        // below.
        this.createHash = this.delegateMethod('createHash');
        this.directoryExists = this.delegateMethod('directoryExists');
        this.fileNameToModuleName = this.delegateMethod('fileNameToModuleName');
        this.getCancellationToken = this.delegateMethod('getCancellationToken');
        this.getCanonicalFileName = this.delegateMethod('getCanonicalFileName');
        this.getCurrentDirectory = this.delegateMethod('getCurrentDirectory');
        this.getDefaultLibFileName = this.delegateMethod('getDefaultLibFileName');
        this.getDefaultLibLocation = this.delegateMethod('getDefaultLibLocation');
        this.getDirectories = this.delegateMethod('getDirectories');
        this.getEnvironmentVariable = this.delegateMethod('getEnvironmentVariable');
        this.getModifiedResourceFiles = this.delegateMethod('getModifiedResourceFiles');
        this.getNewLine = this.delegateMethod('getNewLine');
        this.getParsedCommandLine = this.delegateMethod('getParsedCommandLine');
        this.getSourceFileByPath = this.delegateMethod('getSourceFileByPath');
        this.readDirectory = this.delegateMethod('readDirectory');
        this.readFile = this.delegateMethod('readFile');
        this.readResource = this.delegateMethod('readResource');
        this.transformResource = this.delegateMethod('transformResource');
        this.realpath = this.delegateMethod('realpath');
        this.resolveModuleNames = this.delegateMethod('resolveModuleNames');
        this.resolveTypeReferenceDirectives = this.delegateMethod('resolveTypeReferenceDirectives');
        this.resourceNameToFileName = this.delegateMethod('resourceNameToFileName');
        this.trace = this.delegateMethod('trace');
        this.useCaseSensitiveFileNames = this.delegateMethod('useCaseSensitiveFileNames');
        this.writeFile = this.delegateMethod('writeFile');
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
 * A wrapper around `ts.CompilerHost` (plus any extension methods from `ExtendedTsCompilerHost`).
 *
 * In order for a consumer to include Angular compilation in their TypeScript compiler, the
 * `ts.Program` must be created with a host that adds Angular-specific files (e.g.
 * the template type-checking file, etc) to the compilation. `NgCompilerHost` is the
 * host implementation which supports this.
 *
 * The interface implementations here ensure that `NgCompilerHost` fully delegates to
 * `ExtendedTsCompilerHost` methods whenever present.
 */
class NgCompilerHost extends DelegatingCompilerHost {
    constructor(delegate, inputFiles, rootDirs, shimAdapter, shimTagger, entryPoint, diagnostics) {
        super(delegate);
        this.shimAdapter = shimAdapter;
        this.shimTagger = shimTagger;
        this.entryPoint = null;
        this.entryPoint = entryPoint;
        this.constructionDiagnostics = diagnostics;
        this.inputFiles = [...inputFiles, ...shimAdapter.extraInputFiles];
        this.rootDirs = rootDirs;
        if (this.resolveModuleNames === undefined) {
            // In order to reuse the module resolution cache during the creation of the type-check
            // program, we'll need to provide `resolveModuleNames` if the delegate did not provide one.
            this.resolveModuleNames = this.createCachedResolveModuleNamesFunction();
        }
    }
    /**
     * Retrieves a set of `ts.SourceFile`s which should not be emitted as JS files.
     *
     * Available after this host is used to create a `ts.Program` (which causes all the files in the
     * program to be enumerated).
     */
    get ignoreForEmit() {
        return this.shimAdapter.ignoreForEmit;
    }
    /**
     * Retrieve the array of shim extension prefixes for which shims were created for each original
     * file.
     */
    get shimExtensionPrefixes() {
        return this.shimAdapter.extensionPrefixes;
    }
    /**
     * Performs cleanup that needs to happen after a `ts.Program` has been created using this host.
     */
    postProgramCreationCleanup() {
        this.shimTagger.finalize();
    }
    /**
     * Create an `NgCompilerHost` from a delegate host, an array of input filenames, and the full set
     * of TypeScript and Angular compiler options.
     */
    static wrap(delegate, inputFiles, options, oldProgram) {
        const topLevelShimGenerators = [];
        const perFileShimGenerators = [];
        const rootDirs = (0, typescript_2.getRootDirs)(delegate, options);
        perFileShimGenerators.push(new typecheck_1.TypeCheckShimGenerator());
        let diagnostics = [];
        const normalizedTsInputFiles = [];
        for (const inputFile of inputFiles) {
            if (!(0, typescript_2.isNonDeclarationTsPath)(inputFile)) {
                continue;
            }
            normalizedTsInputFiles.push((0, file_system_1.resolve)(inputFile));
        }
        let entryPoint = null;
        if (options.flatModuleOutFile != null && options.flatModuleOutFile !== '') {
            entryPoint = (0, entry_point_1.findFlatIndexEntryPoint)(normalizedTsInputFiles);
            if (entryPoint === null) {
                // This error message talks specifically about having a single .ts file in "files". However
                // the actual logic is a bit more permissive. If a single file exists, that will be taken,
                // otherwise the highest level (shortest path) "index.ts" file will be used as the flat
                // module entry point instead. If neither of these conditions apply, the error below is
                // given.
                //
                // The user is not informed about the "index.ts" option as this behavior is deprecated -
                // an explicit entrypoint should always be specified.
                diagnostics.push({
                    category: typescript_1.default.DiagnosticCategory.Error,
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.CONFIG_FLAT_MODULE_NO_INDEX),
                    file: undefined,
                    start: undefined,
                    length: undefined,
                    messageText: 'Angular compiler option "flatModuleOutFile" requires one and only one .ts file in the "files" field.',
                });
            }
            else {
                const flatModuleId = options.flatModuleId || null;
                const flatModuleOutFile = (0, path_1.normalizeSeparators)(options.flatModuleOutFile);
                const flatIndexGenerator = new entry_point_1.FlatIndexGenerator(entryPoint, flatModuleOutFile, flatModuleId);
                topLevelShimGenerators.push(flatIndexGenerator);
            }
        }
        const shimAdapter = new shims_1.ShimAdapter(delegate, normalizedTsInputFiles, topLevelShimGenerators, perFileShimGenerators, oldProgram);
        const shimTagger = new shims_1.ShimReferenceTagger(perFileShimGenerators.map((gen) => gen.extensionPrefix));
        return new NgCompilerHost(delegate, inputFiles, rootDirs, shimAdapter, shimTagger, entryPoint, diagnostics);
    }
    /**
     * Check whether the given `ts.SourceFile` is a shim file.
     *
     * If this returns false, the file is user-provided.
     */
    isShim(sf) {
        return (0, shims_1.isShim)(sf);
    }
    /**
     * Check whether the given `ts.SourceFile` is a resource file.
     *
     * This simply returns `false` for the compiler-cli since resource files are not added as root
     * files to the project.
     */
    isResource(sf) {
        return false;
    }
    getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
        // Is this a previously known shim?
        const shimSf = this.shimAdapter.maybeGenerate((0, file_system_1.resolve)(fileName));
        if (shimSf !== null) {
            // Yes, so return it.
            return shimSf;
        }
        // No, so it's a file which might need shims (or a file which doesn't exist).
        const sf = this.delegate.getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
        if (sf === undefined) {
            return undefined;
        }
        this.shimTagger.tag(sf);
        return sf;
    }
    fileExists(fileName) {
        // Consider the file as existing whenever
        //  1) it really does exist in the delegate host, or
        //  2) at least one of the shim generators recognizes it
        // Note that we can pass the file name as branded absolute fs path because TypeScript
        // internally only passes POSIX-like paths.
        //
        // Also note that the `maybeGenerate` check below checks for both `null` and `undefined`.
        return (this.delegate.fileExists(fileName) ||
            this.shimAdapter.maybeGenerate((0, file_system_1.resolve)(fileName)) != null);
    }
    get unifiedModulesHost() {
        return this.fileNameToModuleName !== undefined ? this : null;
    }
    createCachedResolveModuleNamesFunction() {
        const moduleResolutionCache = typescript_1.default.createModuleResolutionCache(this.getCurrentDirectory(), this.getCanonicalFileName.bind(this));
        return (moduleNames, containingFile, reusedNames, redirectedReference, options) => {
            return moduleNames.map((moduleName) => {
                const module = typescript_1.default.resolveModuleName(moduleName, containingFile, options, this, moduleResolutionCache, redirectedReference);
                return module.resolvedModule;
            });
        };
    }
}
exports.NgCompilerHost = NgCompilerHost;
