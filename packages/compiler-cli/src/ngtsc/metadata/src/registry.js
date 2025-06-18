"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundMetadataRegistry = exports.LocalMetadataRegistry = void 0;
const api_1 = require("./api");
/**
 * A registry of directive, pipe, and module metadata for types defined in the current compilation
 * unit, which supports both reading and registering.
 */
class LocalMetadataRegistry {
    constructor() {
        this.directives = new Map();
        this.ngModules = new Map();
        this.pipes = new Map();
    }
    getDirectiveMetadata(ref) {
        return this.directives.has(ref.node) ? this.directives.get(ref.node) : null;
    }
    getNgModuleMetadata(ref) {
        return this.ngModules.has(ref.node) ? this.ngModules.get(ref.node) : null;
    }
    getPipeMetadata(ref) {
        return this.pipes.has(ref.node) ? this.pipes.get(ref.node) : null;
    }
    registerDirectiveMetadata(meta) {
        this.directives.set(meta.ref.node, meta);
    }
    registerNgModuleMetadata(meta) {
        this.ngModules.set(meta.ref.node, meta);
    }
    registerPipeMetadata(meta) {
        this.pipes.set(meta.ref.node, meta);
    }
    getKnown(kind) {
        switch (kind) {
            case api_1.MetaKind.Directive:
                return Array.from(this.directives.values()).map((v) => v.ref.node);
            case api_1.MetaKind.Pipe:
                return Array.from(this.pipes.values()).map((v) => v.ref.node);
            case api_1.MetaKind.NgModule:
                return Array.from(this.ngModules.values()).map((v) => v.ref.node);
        }
    }
}
exports.LocalMetadataRegistry = LocalMetadataRegistry;
/**
 * A `MetadataRegistry` which registers metadata with multiple delegate `MetadataRegistry`
 * instances.
 */
class CompoundMetadataRegistry {
    constructor(registries) {
        this.registries = registries;
    }
    registerDirectiveMetadata(meta) {
        for (const registry of this.registries) {
            registry.registerDirectiveMetadata(meta);
        }
    }
    registerNgModuleMetadata(meta) {
        for (const registry of this.registries) {
            registry.registerNgModuleMetadata(meta);
        }
    }
    registerPipeMetadata(meta) {
        for (const registry of this.registries) {
            registry.registerPipeMetadata(meta);
        }
    }
}
exports.CompoundMetadataRegistry = CompoundMetadataRegistry;
