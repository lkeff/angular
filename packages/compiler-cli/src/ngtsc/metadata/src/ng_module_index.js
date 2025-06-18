"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgModuleIndexImpl = void 0;
const imports_1 = require("../../imports");
const api_1 = require("./api");
/**
 * An index of all NgModules that export or re-export a given trait.
 */
class NgModuleIndexImpl {
    constructor(metaReader, localReader) {
        this.metaReader = metaReader;
        this.localReader = localReader;
        // A map from an NgModule's Class Declaration to the "main" reference to that module, aka the one
        // present in the reader metadata object
        this.ngModuleAuthoritativeReference = new Map();
        // A map from a Directive/Pipe's class declaration to the class declarations of all re-exporting
        // NgModules
        this.typeToExportingModules = new Map();
        this.indexed = false;
    }
    updateWith(cache, key, elem) {
        if (cache.has(key)) {
            cache.get(key).add(elem);
        }
        else {
            const set = new Set();
            set.add(elem);
            cache.set(key, set);
        }
    }
    index() {
        const seenTypesWithReexports = new Map();
        const locallyDeclaredDirsAndNgModules = [
            ...this.localReader.getKnown(api_1.MetaKind.NgModule),
            ...this.localReader.getKnown(api_1.MetaKind.Directive),
        ];
        for (const decl of locallyDeclaredDirsAndNgModules) {
            // Here it's safe to create a new Reference because these are known local types.
            this.indexTrait(new imports_1.Reference(decl), seenTypesWithReexports);
        }
        this.indexed = true;
    }
    indexTrait(ref, seenTypesWithReexports) {
        var _a, _b, _c;
        if (seenTypesWithReexports.has(ref.node)) {
            // We've processed this type before.
            return;
        }
        seenTypesWithReexports.set(ref.node, new Set());
        const meta = (_a = this.metaReader.getDirectiveMetadata(ref)) !== null && _a !== void 0 ? _a : this.metaReader.getNgModuleMetadata(ref);
        if (meta === null) {
            return;
        }
        // Component + NgModule: recurse into imports
        if (meta.imports !== null) {
            for (const childRef of meta.imports) {
                this.indexTrait(childRef, seenTypesWithReexports);
            }
        }
        if (meta.kind === api_1.MetaKind.NgModule) {
            if (!this.ngModuleAuthoritativeReference.has(ref.node)) {
                this.ngModuleAuthoritativeReference.set(ref.node, ref);
            }
            for (const childRef of meta.exports) {
                this.indexTrait(childRef, seenTypesWithReexports);
                const childMeta = (_c = (_b = this.metaReader.getDirectiveMetadata(childRef)) !== null && _b !== void 0 ? _b : this.metaReader.getPipeMetadata(childRef)) !== null && _c !== void 0 ? _c : this.metaReader.getNgModuleMetadata(childRef);
                if (childMeta === null) {
                    continue;
                }
                switch (childMeta.kind) {
                    case api_1.MetaKind.Directive:
                    case api_1.MetaKind.Pipe:
                        this.updateWith(this.typeToExportingModules, childRef.node, ref.node);
                        this.updateWith(seenTypesWithReexports, ref.node, childRef.node);
                        break;
                    case api_1.MetaKind.NgModule:
                        if (seenTypesWithReexports.has(childRef.node)) {
                            for (const reexported of seenTypesWithReexports.get(childRef.node)) {
                                this.updateWith(this.typeToExportingModules, reexported, ref.node);
                                this.updateWith(seenTypesWithReexports, ref.node, reexported);
                            }
                        }
                        break;
                }
            }
        }
    }
    getNgModulesExporting(directiveOrPipe) {
        if (!this.indexed) {
            this.index();
        }
        if (!this.typeToExportingModules.has(directiveOrPipe)) {
            return [];
        }
        const refs = [];
        for (const ngModule of this.typeToExportingModules.get(directiveOrPipe)) {
            if (this.ngModuleAuthoritativeReference.has(ngModule)) {
                refs.push(this.ngModuleAuthoritativeReference.get(ngModule));
            }
        }
        return refs;
    }
}
exports.NgModuleIndexImpl = NgModuleIndexImpl;
