"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHostBindings = migrateHostBindings;
const tsurge_1 = require("../../../../../utils/tsurge");
const reference_kinds_1 = require("../reference_resolution/reference_kinds");
/**
 * Phase that migrates Angular host binding references to
 * unwrap signals.
 */
function migrateHostBindings(host, references, info) {
    var _a;
    const seenReferences = new WeakMap();
    for (const reference of references) {
        // This pass only deals with host binding references.
        if (!(0, reference_kinds_1.isHostBindingReference)(reference)) {
            continue;
        }
        // Skip references to incompatible inputs.
        if (!host.shouldMigrateReferencesToField(reference.target)) {
            continue;
        }
        const bindingField = reference.from.hostPropertyNode;
        const expressionOffset = bindingField.getStart() + 1; // account for quotes.
        const readEndPos = expressionOffset + reference.from.read.sourceSpan.end;
        // Skip duplicate references. Can happen if the host object is shared.
        if ((_a = seenReferences.get(bindingField)) === null || _a === void 0 ? void 0 : _a.has(readEndPos)) {
            continue;
        }
        if (seenReferences.has(bindingField)) {
            seenReferences.get(bindingField).add(readEndPos);
        }
        else {
            seenReferences.set(bindingField, new Set([readEndPos]));
        }
        // Expand shorthands like `{bla}` to `{bla: bla()}`.
        const appendText = reference.from.isObjectShorthandExpression
            ? `: ${reference.from.read.name}()`
            : `()`;
        host.replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(bindingField.getSourceFile(), info), new tsurge_1.TextUpdate({ position: readEndPos, end: readEndPos, toInsert: appendText })));
    }
}
