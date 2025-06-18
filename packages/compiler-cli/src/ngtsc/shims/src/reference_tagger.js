"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShimReferenceTagger = void 0;
const file_system_1 = require("../../file_system");
const typescript_1 = require("../../util/src/typescript");
const expando_1 = require("./expando");
const util_1 = require("./util");
/**
 * Manipulates the `referencedFiles` property of `ts.SourceFile`s to add references to shim files
 * for each original source file, causing the shims to be loaded into the program as well.
 *
 * `ShimReferenceTagger`s are intended to operate during program creation only.
 */
class ShimReferenceTagger {
    constructor(shimExtensions) {
        /**
         * Tracks which original files have been processed and had shims generated if necessary.
         *
         * This is used to avoid generating shims twice for the same file.
         */
        this.tagged = new Set();
        /**
         * Whether shim tagging is currently being performed.
         */
        this.enabled = true;
        this.suffixes = shimExtensions.map((extension) => `.${extension}.ts`);
    }
    /**
     * Tag `sf` with any needed references if it's not a shim itself.
     */
    tag(sf) {
        if (!this.enabled ||
            sf.isDeclarationFile ||
            (0, expando_1.isShim)(sf) ||
            this.tagged.has(sf) ||
            !(0, typescript_1.isNonDeclarationTsPath)(sf.fileName)) {
            return;
        }
        const ext = (0, expando_1.sfExtensionData)(sf);
        // If this file has never been tagged before, capture its `referencedFiles` in the extension
        // data.
        if (ext.originalReferencedFiles === null) {
            ext.originalReferencedFiles = sf.referencedFiles;
        }
        const referencedFiles = [...ext.originalReferencedFiles];
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
        for (const suffix of this.suffixes) {
            referencedFiles.push({
                fileName: (0, util_1.makeShimFileName)(sfPath, suffix),
                pos: 0,
                end: 0,
            });
        }
        ext.taggedReferenceFiles = referencedFiles;
        sf.referencedFiles = referencedFiles;
        this.tagged.add(sf);
    }
    /**
     * Disable the `ShimReferenceTagger` and free memory associated with tracking tagged files.
     */
    finalize() {
        this.enabled = false;
        this.tagged.clear();
    }
}
exports.ShimReferenceTagger = ShimReferenceTagger;
