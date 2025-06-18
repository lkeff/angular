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
exports.SelectorlessComponentScopeReader = void 0;
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const api_1 = require("./api");
const typescript_1 = __importDefault(require("typescript"));
/**
 * Computes the scope for a selectorless components by looking at imports within the same
 * file and resolving them to metadata.
 */
class SelectorlessComponentScopeReader {
    constructor(metaReader, reflector) {
        this.metaReader = metaReader;
        this.reflector = reflector;
        this.cache = new Map();
    }
    getScopeForComponent(node) {
        var _a;
        if (this.cache.has(node)) {
            return this.cache.get(node);
        }
        const clazzRef = new imports_1.Reference(node);
        const meta = this.metaReader.getDirectiveMetadata(clazzRef);
        if (meta === null || !meta.isComponent || !meta.isStandalone || !meta.selectorlessEnabled) {
            this.cache.set(node, null);
            return null;
        }
        const eligibleIdentifiers = this.getAvailableIdentifiers(node);
        const dependencies = new Map();
        const dependencyIdentifiers = [];
        let isPoisoned = meta.isPoisoned;
        for (const [name, identifier] of eligibleIdentifiers) {
            if (dependencies.has(name)) {
                continue;
            }
            const dep = this.getMetaFromIdentifier(meta, name, identifier);
            if (dep !== null) {
                dependencies.set(name, dep);
                dependencyIdentifiers.push(identifier);
                if (dep.kind === metadata_1.MetaKind.Directive && dep.isPoisoned) {
                    isPoisoned = true;
                }
            }
        }
        const scope = {
            kind: api_1.ComponentScopeKind.Selectorless,
            component: node,
            dependencies,
            dependencyIdentifiers,
            isPoisoned,
            schemas: (_a = meta.schemas) !== null && _a !== void 0 ? _a : [],
        };
        this.cache.set(node, scope);
        return scope;
    }
    getRemoteScope() {
        return null;
    }
    /** Determines which identifiers a class has access to. */
    getAvailableIdentifiers(node) {
        const result = new Map();
        let current = typescript_1.default.getOriginalNode(node).parent;
        while (current) {
            // Note: doesn't account for some cases like function parameters,
            // but we likely don't want to support those anyways.
            if (!typescript_1.default.isSourceFile(current) && !typescript_1.default.isBlock(current)) {
                current = current.parent;
                continue;
            }
            for (const stmt of current.statements) {
                if (this.reflector.isClass(stmt)) {
                    result.set(stmt.name.text, stmt.name);
                    continue;
                }
                if (typescript_1.default.isImportDeclaration(stmt) &&
                    stmt.importClause !== undefined &&
                    !stmt.importClause.isTypeOnly) {
                    const clause = stmt.importClause;
                    if (clause.namedBindings !== undefined && typescript_1.default.isNamedImports(clause.namedBindings)) {
                        for (const element of clause.namedBindings.elements) {
                            if (!element.isTypeOnly) {
                                result.set(element.name.text, element.name);
                            }
                        }
                    }
                    if (clause.name !== undefined) {
                        result.set(clause.name.text, clause.name);
                    }
                    continue;
                }
            }
            current = current.parent;
        }
        return result;
    }
    getMetaFromIdentifier(meta, localName, node) {
        var _a;
        // Consult the set of used names in the template so we don't hit the type checker for every
        // import in the file. Most likely a subset of imports in the file will be used in the template.
        if (meta.localReferencedSymbols === null || !meta.localReferencedSymbols.has(localName)) {
            return null;
        }
        const declaration = this.reflector.getDeclarationOfIdentifier(node);
        if (declaration === null || !this.reflector.isClass(declaration.node)) {
            return null;
        }
        const ref = new imports_1.Reference(declaration.node);
        return (_a = this.metaReader.getDirectiveMetadata(ref)) !== null && _a !== void 0 ? _a : this.metaReader.getPipeMetadata(ref);
    }
}
exports.SelectorlessComponentScopeReader = SelectorlessComponentScopeReader;
