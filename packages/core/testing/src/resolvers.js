"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgModuleResolver = exports.PipeResolver = exports.ComponentResolver = exports.DirectiveResolver = void 0;
const core_1 = require("../../src/core");
const metadata_overrider_1 = require("./metadata_overrider");
const reflection = new core_1.ɵReflectionCapabilities();
/**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 */
class OverrideResolver {
    constructor() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    addOverride(type, override) {
        const overrides = this.overrides.get(type) || [];
        overrides.push(override);
        this.overrides.set(type, overrides);
        this.resolved.delete(type);
    }
    setOverrides(overrides) {
        this.overrides.clear();
        overrides.forEach(([type, override]) => {
            this.addOverride(type, override);
        });
    }
    getAnnotation(type) {
        const annotations = reflection.annotations(type);
        // Try to find the nearest known Type annotation and make sure that this annotation is an
        // instance of the type we are looking for, so we can use it for resolution. Note: there might
        // be multiple known annotations found due to the fact that Components can extend Directives (so
        // both Directive and Component annotations would be present), so we always check if the known
        // annotation has the right type.
        for (let i = annotations.length - 1; i >= 0; i--) {
            const annotation = annotations[i];
            const isKnownType = annotation instanceof core_1.Directive ||
                annotation instanceof core_1.Component ||
                annotation instanceof core_1.Pipe ||
                annotation instanceof core_1.NgModule;
            if (isKnownType) {
                return annotation instanceof this.type ? annotation : null;
            }
        }
        return null;
    }
    resolve(type) {
        let resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                const overrides = this.overrides.get(type);
                if (overrides) {
                    const overrider = new metadata_overrider_1.MetadataOverrider();
                    overrides.forEach((override) => {
                        resolved = overrider.overrideMetadata(this.type, resolved, override);
                    });
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    }
}
class DirectiveResolver extends OverrideResolver {
    get type() {
        return core_1.Directive;
    }
}
exports.DirectiveResolver = DirectiveResolver;
class ComponentResolver extends OverrideResolver {
    get type() {
        return core_1.Component;
    }
}
exports.ComponentResolver = ComponentResolver;
class PipeResolver extends OverrideResolver {
    get type() {
        return core_1.Pipe;
    }
}
exports.PipeResolver = PipeResolver;
class NgModuleResolver extends OverrideResolver {
    get type() {
        return core_1.NgModule;
    }
}
exports.NgModuleResolver = NgModuleResolver;
