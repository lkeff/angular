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
exports.InheritanceGraph = void 0;
const typescript_1 = __importDefault(require("typescript"));
const heritage_types_1 = require("./heritage_types");
/**
 * Inheritance graph tracks edges between classes that describe
 * heritage.
 *
 * This graph is helpful for efficient lookups whether e.g. an input
 * is overridden, or inherited etc. This is helpful when detecting
 * and propagating input incompatibility statuses.
 */
class InheritanceGraph {
    constructor(checker) {
        this.checker = checker;
        /** Maps nodes to their parent nodes. */
        this.classToParents = new Map();
        /** Maps nodes to their derived nodes. */
        this.parentToChildren = new Map();
        /** All classes seen participating in inheritance chains. */
        this.allClassesInInheritance = new Set();
    }
    /** Registers a given class in the graph. */
    registerClass(clazz, parents) {
        this.classToParents.set(clazz, parents);
        this.allClassesInInheritance.add(clazz);
        for (const parent of parents) {
            this.allClassesInInheritance.add(parent);
            if (!this.parentToChildren.has(parent)) {
                this.parentToChildren.set(parent, []);
            }
            this.parentToChildren.get(parent).push(clazz);
        }
    }
    /**
     * Checks if the given class has overlapping members, either
     * inherited or derived.
     *
     * @returns Symbols of the inherited or derived members, if they exist.
     */
    checkOverlappingMembers(clazz, member, memberName) {
        var _a;
        const inheritedTypes = ((_a = this.classToParents.get(clazz)) !== null && _a !== void 0 ? _a : []).map((c) => this.checker.getTypeAtLocation(c));
        const derivedLeafs = this._traceDerivedChainToLeafs(clazz).map((c) => this.checker.getTypeAtLocation(c));
        const inheritedMember = inheritedTypes
            .map((t) => t.getProperty(memberName))
            .find((m) => m !== undefined);
        const derivedMembers = derivedLeafs
            .map((t) => t.getProperty(memberName))
            // Skip members that point back to the current class element. The derived type
            // might look up back to our starting point— which we ignore.
            .filter((m) => m !== undefined && m.valueDeclaration !== member);
        return { inherited: inheritedMember, derivedMembers };
    }
    /** Gets all leaf derived classes that extend from the given class. */
    _traceDerivedChainToLeafs(clazz) {
        const queue = [clazz];
        const leafs = [];
        while (queue.length) {
            const node = queue.shift();
            if (!this.parentToChildren.has(node)) {
                if (node !== clazz) {
                    leafs.push(node);
                }
                continue;
            }
            queue.push(...this.parentToChildren.get(node));
        }
        return leafs;
    }
    /** Gets all derived classes of the given node. */
    traceDerivedClasses(clazz) {
        const queue = [clazz];
        const derived = [];
        while (queue.length) {
            const node = queue.shift();
            if (node !== clazz) {
                derived.push(node);
            }
            if (!this.parentToChildren.has(node)) {
                continue;
            }
            queue.push(...this.parentToChildren.get(node));
        }
        return derived;
    }
    /**
     * Populates the graph.
     *
     * NOTE: This is expensive and should be called with caution.
     */
    expensivePopulate(files) {
        for (const file of files) {
            const visitor = (node) => {
                if ((typescript_1.default.isClassLike(node) || typescript_1.default.isInterfaceDeclaration(node)) &&
                    node.heritageClauses !== undefined) {
                    const heritageTypes = (0, heritage_types_1.getInheritedTypes)(node, this.checker);
                    const parents = heritageTypes
                        // Interfaces participate in the graph and are not "value declarations".
                        // Also, symbol may be undefined for unresolvable nodes.
                        .map((t) => { var _a; return (t.symbol ? (_a = t.symbol.declarations) === null || _a === void 0 ? void 0 : _a[0] : undefined); })
                        .filter((d) => d !== undefined && (typescript_1.default.isClassLike(d) || typescript_1.default.isInterfaceDeclaration(d)));
                    this.registerClass(node, parents);
                }
                typescript_1.default.forEachChild(node, visitor);
            };
            typescript_1.default.forEachChild(file, visitor);
        }
        return this;
    }
}
exports.InheritanceGraph = InheritanceGraph;
