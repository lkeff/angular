"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateTypeScriptReferences = migrateTypeScriptReferences;
const object_expansion_refs_1 = require("./helpers/object_expansion_refs");
const standard_reference_1 = require("./helpers/standard_reference");
const reference_kinds_1 = require("../reference_resolution/reference_kinds");
/**
 * Migrates TypeScript input references to be signal compatible.
 *
 * The phase takes care of control flow analysis and generates temporary variables
 * where needed to ensure narrowing continues to work. E.g.
 *
 * ```ts
 * someMethod() {
 *   if (this.input) {
 *     this.input.charAt(0);
 *   }
 * }
 * ```
 *
 * will be transformed into:
 *
 * ```ts
 * someMethod() {
 *   const input_1 = this.input();
 *   if (input_1) {
 *     input_1.charAt(0);
 *   }
 * }
 * ```
 */
function migrateTypeScriptReferences(host, references, checker, info) {
    const tsReferencesWithNarrowing = new Map();
    const tsReferencesInBindingElements = new Set();
    const seenIdentifiers = new WeakSet();
    for (const reference of references) {
        // This pass only deals with TS references.
        if (!(0, reference_kinds_1.isTsReference)(reference)) {
            continue;
        }
        // Skip references to incompatible inputs.
        if (!host.shouldMigrateReferencesToField(reference.target)) {
            continue;
        }
        // Never attempt to migrate write references.
        // Those usually invalidate the target input most of the time, but in
        // best-effort mode they are not.
        if (reference.from.isWrite) {
            continue;
        }
        // Skip duplicate references. E.g. in batching.
        if (seenIdentifiers.has(reference.from.node)) {
            continue;
        }
        seenIdentifiers.add(reference.from.node);
        const targetKey = reference.target.key;
        if (reference.from.isPartOfElementBinding) {
            tsReferencesInBindingElements.add(reference.from.node);
        }
        else {
            if (!tsReferencesWithNarrowing.has(targetKey)) {
                tsReferencesWithNarrowing.set(targetKey, { accesses: [] });
            }
            tsReferencesWithNarrowing.get(targetKey).accesses.push(reference.from.node);
        }
    }
    (0, object_expansion_refs_1.migrateBindingElementInputReference)(tsReferencesInBindingElements, info, host.replacements, host.printer);
    (0, standard_reference_1.migrateStandardTsReference)(tsReferencesWithNarrowing, checker, info, host.replacements);
}
