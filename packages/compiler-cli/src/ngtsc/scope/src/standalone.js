"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneComponentScopeReader = void 0;
const imports_1 = require("../../imports");
const api_1 = require("./api");
/**
 * Computes scopes for standalone components based on their `imports`, expanding imported NgModule
 * scopes where necessary.
 */
class StandaloneComponentScopeReader {
    constructor(metaReader, localModuleReader, dtsModuleReader) {
        this.metaReader = metaReader;
        this.localModuleReader = localModuleReader;
        this.dtsModuleReader = dtsModuleReader;
        this.cache = new Map();
    }
    getScopeForComponent(clazz) {
        var _a;
        if (!this.cache.has(clazz)) {
            const clazzRef = new imports_1.Reference(clazz);
            const clazzMeta = this.metaReader.getDirectiveMetadata(clazzRef);
            if (clazzMeta === null ||
                !clazzMeta.isComponent ||
                !clazzMeta.isStandalone ||
                clazzMeta.selectorlessEnabled) {
                this.cache.set(clazz, null);
                return null;
            }
            // A standalone component always has itself in scope, so add `clazzMeta` during
            // initialization.
            const dependencies = new Set([clazzMeta]);
            const deferredDependencies = new Set();
            const seen = new Set([clazz]);
            let isPoisoned = clazzMeta.isPoisoned;
            if (clazzMeta.imports !== null) {
                for (const ref of clazzMeta.imports) {
                    if (seen.has(ref.node)) {
                        continue;
                    }
                    seen.add(ref.node);
                    const dirMeta = this.metaReader.getDirectiveMetadata(ref);
                    if (dirMeta !== null) {
                        dependencies.add(Object.assign(Object.assign({}, dirMeta), { ref }));
                        isPoisoned = isPoisoned || dirMeta.isPoisoned || !dirMeta.isStandalone;
                        continue;
                    }
                    const pipeMeta = this.metaReader.getPipeMetadata(ref);
                    if (pipeMeta !== null) {
                        dependencies.add(Object.assign(Object.assign({}, pipeMeta), { ref }));
                        isPoisoned = isPoisoned || !pipeMeta.isStandalone;
                        continue;
                    }
                    const ngModuleMeta = this.metaReader.getNgModuleMetadata(ref);
                    if (ngModuleMeta !== null) {
                        dependencies.add(Object.assign(Object.assign({}, ngModuleMeta), { ref }));
                        let ngModuleScope;
                        if (ref.node.getSourceFile().isDeclarationFile) {
                            ngModuleScope = this.dtsModuleReader.resolve(ref);
                        }
                        else {
                            ngModuleScope = this.localModuleReader.getScopeOfModule(ref.node);
                        }
                        if (ngModuleScope === null) {
                            // This technically shouldn't happen, but mark the scope as poisoned just in case.
                            isPoisoned = true;
                            continue;
                        }
                        isPoisoned = isPoisoned || ngModuleScope.exported.isPoisoned;
                        for (const dep of ngModuleScope.exported.dependencies) {
                            if (!seen.has(dep.ref.node)) {
                                seen.add(dep.ref.node);
                                dependencies.add(dep);
                            }
                        }
                        continue;
                    }
                    // Import was not a component/directive/pipe/NgModule, which is an error and poisons the
                    // scope.
                    isPoisoned = true;
                }
            }
            if (clazzMeta.deferredImports !== null) {
                for (const ref of clazzMeta.deferredImports) {
                    const dirMeta = this.metaReader.getDirectiveMetadata(ref);
                    if (dirMeta !== null) {
                        deferredDependencies.add(Object.assign(Object.assign({}, dirMeta), { ref, isExplicitlyDeferred: true }));
                        isPoisoned = isPoisoned || dirMeta.isPoisoned || !dirMeta.isStandalone;
                        continue;
                    }
                    const pipeMeta = this.metaReader.getPipeMetadata(ref);
                    if (pipeMeta !== null) {
                        deferredDependencies.add(Object.assign(Object.assign({}, pipeMeta), { ref, isExplicitlyDeferred: true }));
                        isPoisoned = isPoisoned || !pipeMeta.isStandalone;
                        continue;
                    }
                }
            }
            this.cache.set(clazz, {
                kind: api_1.ComponentScopeKind.Standalone,
                component: clazz,
                dependencies: Array.from(dependencies),
                deferredDependencies: Array.from(deferredDependencies),
                isPoisoned,
                schemas: (_a = clazzMeta.schemas) !== null && _a !== void 0 ? _a : [],
            });
        }
        return this.cache.get(clazz);
    }
    getRemoteScope() {
        return null;
    }
}
exports.StandaloneComponentScopeReader = StandaloneComponentScopeReader;
