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
exports.ShimAdapter = void 0;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const typescript_2 = require("../../util/src/typescript");
const expando_1 = require("./expando");
const util_1 = require("./util");
/**
 * Generates and tracks shim files for each original `ts.SourceFile`.
 *
 * The `ShimAdapter` provides an API that's designed to be used by a `ts.CompilerHost`
 * implementation and allows it to include synthetic "shim" files in the program that's being
 * created. It works for both freshly created programs as well as with reuse of an older program
 * (which already may contain shim files and thus have a different creation flow).
 */
class ShimAdapter {
    constructor(delegate, tsRootFiles, topLevelGenerators, perFileGenerators, oldProgram) {
        this.delegate = delegate;
        /**
         * A map of shim file names to the `ts.SourceFile` generated for those shims.
         */
        this.shims = new Map();
        /**
         * A map of shim file names to existing shims which were part of a previous iteration of this
         * program.
         *
         * Not all of these shims will be inherited into this program.
         */
        this.priorShims = new Map();
        /**
         * File names which are already known to not be shims.
         *
         * This allows for short-circuit returns without the expense of running regular expressions
         * against the filename repeatedly.
         */
        this.notShims = new Set();
        /**
         * The shim generators supported by this adapter as well as extra precalculated data facilitating
         * their use.
         */
        this.generators = [];
        /**
         * A `Set` of shim `ts.SourceFile`s which should not be emitted.
         */
        this.ignoreForEmit = new Set();
        /**
         * Extension prefixes of all installed per-file shims.
         */
        this.extensionPrefixes = [];
        // Initialize `this.generators` with a regex that matches each generator's paths.
        for (const gen of perFileGenerators) {
            // This regex matches paths for shims from this generator. The first (and only) capture group
            // extracts the filename prefix, which can be used to find the original file that was used to
            // generate this shim.
            const pattern = `^(.*)\\.${gen.extensionPrefix}\\.ts$`;
            const regexp = new RegExp(pattern, 'i');
            this.generators.push({
                generator: gen,
                test: regexp,
                suffix: `.${gen.extensionPrefix}.ts`,
            });
            this.extensionPrefixes.push(gen.extensionPrefix);
        }
        // Process top-level generators and pre-generate their shims. Accumulate the list of filenames
        // as extra input files.
        const extraInputFiles = [];
        for (const gen of topLevelGenerators) {
            const sf = gen.makeTopLevelShim();
            (0, expando_1.sfExtensionData)(sf).isTopLevelShim = true;
            if (!gen.shouldEmit) {
                this.ignoreForEmit.add(sf);
            }
            const fileName = (0, file_system_1.absoluteFromSourceFile)(sf);
            this.shims.set(fileName, sf);
            extraInputFiles.push(fileName);
        }
        // Add to that list the per-file shims associated with each root file. This is needed because
        // reference tagging alone may not work in TS compilations that have `noResolve` set. Such
        // compilations rely on the list of input files completely describing the program.
        for (const rootFile of tsRootFiles) {
            for (const gen of this.generators) {
                extraInputFiles.push((0, util_1.makeShimFileName)(rootFile, gen.suffix));
            }
        }
        this.extraInputFiles = extraInputFiles;
        // If an old program is present, extract all per-file shims into a map, which will be used to
        // generate new versions of those shims.
        if (oldProgram !== null) {
            for (const oldSf of oldProgram.getSourceFiles()) {
                if (oldSf.isDeclarationFile || !(0, expando_1.isFileShimSourceFile)(oldSf)) {
                    continue;
                }
                this.priorShims.set((0, file_system_1.absoluteFromSourceFile)(oldSf), oldSf);
            }
        }
    }
    /**
     * Produce a shim `ts.SourceFile` if `fileName` refers to a shim file which should exist in the
     * program.
     *
     * If `fileName` does not refer to a potential shim file, `null` is returned. If a corresponding
     * base file could not be determined, `undefined` is returned instead.
     */
    maybeGenerate(fileName) {
        // Fast path: either this filename has been proven not to be a shim before, or it is a known
        // shim and no generation is required.
        if (this.notShims.has(fileName)) {
            return null;
        }
        else if (this.shims.has(fileName)) {
            return this.shims.get(fileName);
        }
        // .d.ts files can't be shims.
        if ((0, typescript_2.isDtsPath)(fileName)) {
            this.notShims.add(fileName);
            return null;
        }
        // This is the first time seeing this path. Try to match it against a shim generator.
        for (const record of this.generators) {
            const match = record.test.exec(fileName);
            if (match === null) {
                continue;
            }
            // The path matched. Extract the filename prefix without the extension.
            const prefix = match[1];
            // This _might_ be a shim, if an underlying base file exists. The base file might be .ts or
            // .tsx.
            let baseFileName = (0, file_system_1.absoluteFrom)(prefix + '.ts');
            // Retrieve the original file for which the shim will be generated.
            let inputFile = this.delegate.getSourceFile(baseFileName, typescript_1.default.ScriptTarget.Latest);
            if (inputFile === undefined) {
                // No .ts file by that name - try .tsx.
                baseFileName = (0, file_system_1.absoluteFrom)(prefix + '.tsx');
                inputFile = this.delegate.getSourceFile(baseFileName, typescript_1.default.ScriptTarget.Latest);
            }
            if (inputFile === undefined || (0, expando_1.isShim)(inputFile)) {
                // This isn't a shim after all since there is no original file which would have triggered
                // its generation, even though the path is right. There are a few reasons why this could
                // occur:
                //
                // * when resolving an import to an .ngfactory.d.ts file, the module resolution algorithm
                //   will first look for an .ngfactory.ts file in its place, which will be requested here.
                // * when the user writes a bad import.
                // * when a file is present in one compilation and removed in the next incremental step.
                //
                // Note that this does not add the filename to `notShims`, so this path is not cached.
                // That's okay as these cases above are edge cases and do not occur regularly in normal
                // operations.
                return undefined;
            }
            // Actually generate and cache the shim.
            return this.generateSpecific(fileName, record.generator, inputFile);
        }
        // No generator matched.
        this.notShims.add(fileName);
        return null;
    }
    generateSpecific(fileName, generator, inputFile) {
        let priorShimSf = null;
        if (this.priorShims.has(fileName)) {
            // In the previous program a shim with this name already existed. It's passed to the shim
            // generator which may reuse it instead of generating a fresh shim.
            priorShimSf = this.priorShims.get(fileName);
            this.priorShims.delete(fileName);
        }
        const shimSf = generator.generateShimForFile(inputFile, fileName, priorShimSf);
        // Mark the new generated source file as a shim that originated from this generator.
        (0, expando_1.sfExtensionData)(shimSf).fileShim = {
            extension: generator.extensionPrefix,
            generatedFrom: (0, file_system_1.absoluteFromSourceFile)(inputFile),
        };
        if (!generator.shouldEmit) {
            this.ignoreForEmit.add(shimSf);
        }
        this.shims.set(fileName, shimSf);
        return shimSf;
    }
}
exports.ShimAdapter = ShimAdapter;
