"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCheckScopeRegistry = void 0;
const compiler_1 = require("@angular/compiler");
const metadata_1 = require("../../metadata");
const api_1 = require("./api");
/**
 * Computes scope information to be used in template type checking.
 */
class TypeCheckScopeRegistry {
    constructor(scopeReader, metaReader, hostDirectivesResolver) {
        this.scopeReader = scopeReader;
        this.metaReader = metaReader;
        this.hostDirectivesResolver = hostDirectivesResolver;
        /**
         * Cache of flattened directive metadata. Because flattened metadata is scope-invariant it's
         * cached individually, such that all scopes refer to the same flattened metadata.
         */
        this.flattenedDirectiveMetaCache = new Map();
        /**
         * Cache of the computed type check scope per NgModule declaration.
         */
        this.scopeCache = new Map();
    }
    /**
     * Computes the type-check scope information for the component declaration. If the NgModule
     * contains an error, then 'error' is returned. If the component is not declared in any NgModule,
     * an empty type-check scope is returned.
     */
    getTypeCheckScope(node) {
        const directives = [];
        const pipes = new Map();
        const scope = this.scopeReader.getScopeForComponent(node);
        if (scope === null) {
            return {
                matcher: null,
                directives,
                pipes,
                schemas: [],
                isPoisoned: false,
            };
        }
        const isNgModuleScope = scope.kind === api_1.ComponentScopeKind.NgModule;
        const isSelectorlessScope = scope.kind === api_1.ComponentScopeKind.Selectorless;
        const cacheKey = isNgModuleScope ? scope.ngModule : scope.component;
        if (this.scopeCache.has(cacheKey)) {
            return this.scopeCache.get(cacheKey);
        }
        let matcher;
        if (isSelectorlessScope) {
            matcher = this.getSelectorlessMatcher(scope);
            for (const [name, dep] of scope.dependencies) {
                if (dep.kind === metadata_1.MetaKind.Directive) {
                    directives.push(dep);
                }
                else {
                    // Pipes should be available under the imported name in selectorless.
                    pipes.set(name, dep);
                }
            }
        }
        else {
            const dependencies = isNgModuleScope ? scope.compilation.dependencies : scope.dependencies;
            let allDependencies = dependencies;
            if (!isNgModuleScope &&
                Array.isArray(scope.deferredDependencies) &&
                scope.deferredDependencies.length > 0) {
                allDependencies = [...allDependencies, ...scope.deferredDependencies];
            }
            matcher = this.getSelectorMatcher(allDependencies);
            for (const dep of allDependencies) {
                if (dep.kind === metadata_1.MetaKind.Directive) {
                    directives.push(dep);
                }
                else if (dep.kind === metadata_1.MetaKind.Pipe) {
                    pipes.set(dep.name, dep);
                }
            }
        }
        const typeCheckScope = {
            matcher,
            directives,
            pipes,
            schemas: scope.schemas,
            isPoisoned: scope.kind === api_1.ComponentScopeKind.NgModule
                ? scope.compilation.isPoisoned || scope.exported.isPoisoned
                : scope.isPoisoned,
        };
        this.scopeCache.set(cacheKey, typeCheckScope);
        return typeCheckScope;
    }
    getTypeCheckDirectiveMetadata(ref) {
        const clazz = ref.node;
        if (this.flattenedDirectiveMetaCache.has(clazz)) {
            return this.flattenedDirectiveMetaCache.get(clazz);
        }
        const meta = (0, metadata_1.flattenInheritedDirectiveMetadata)(this.metaReader, ref);
        if (meta === null) {
            return null;
        }
        this.flattenedDirectiveMetaCache.set(clazz, meta);
        return meta;
    }
    applyExplicitlyDeferredFlag(meta, isExplicitlyDeferred) {
        return isExplicitlyDeferred === true ? Object.assign(Object.assign({}, meta), { isExplicitlyDeferred }) : meta;
    }
    getSelectorMatcher(allDependencies) {
        const matcher = new compiler_1.SelectorMatcher();
        for (const meta of allDependencies) {
            if (meta.kind === metadata_1.MetaKind.Directive && meta.selector !== null) {
                const extMeta = this.getTypeCheckDirectiveMetadata(meta.ref);
                if (extMeta === null) {
                    continue;
                }
                // Carry over the `isExplicitlyDeferred` flag from the dependency info.
                const directiveMeta = this.applyExplicitlyDeferredFlag(extMeta, meta.isExplicitlyDeferred);
                matcher.addSelectables(compiler_1.CssSelector.parse(meta.selector), [
                    ...this.hostDirectivesResolver.resolve(directiveMeta),
                    directiveMeta,
                ]);
            }
        }
        return matcher;
    }
    getSelectorlessMatcher(scope) {
        const registry = new Map();
        for (const [name, dep] of scope.dependencies) {
            const extMeta = dep.kind === metadata_1.MetaKind.Directive ? this.getTypeCheckDirectiveMetadata(dep.ref) : null;
            if (extMeta !== null) {
                registry.set(name, [extMeta, ...this.hostDirectivesResolver.resolve(extMeta)]);
            }
        }
        return new compiler_1.SelectorlessMatcher(registry);
    }
}
exports.TypeCheckScopeRegistry = TypeCheckScopeRegistry;
