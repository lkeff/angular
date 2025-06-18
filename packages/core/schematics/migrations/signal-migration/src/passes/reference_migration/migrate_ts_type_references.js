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
exports.migrateTypeScriptTypeReferences = migrateTypeScriptTypeReferences;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../../../../utils/tsurge");
const assert_1 = __importDefault(require("assert"));
const reference_kinds_1 = require("../reference_resolution/reference_kinds");
/**
 * Migrates TypeScript "ts.Type" references. E.g.

 *  - `Partial<MyComp>` will be converted to `UnwrapSignalInputs<Partial<MyComp>>`.
      in Catalyst test files.
 */
function migrateTypeScriptTypeReferences(host, references, importManager, info) {
    const seenTypeNodes = new WeakSet();
    for (const reference of references) {
        // This pass only deals with TS input class type references.
        if (!(0, reference_kinds_1.isTsClassTypeReference)(reference)) {
            continue;
        }
        // Skip references to classes that are not fully migrated.
        if (!host.shouldMigrateReferencesToClass(reference.target)) {
            continue;
        }
        // Skip duplicate references. E.g. in batching.
        if (seenTypeNodes.has(reference.from.node)) {
            continue;
        }
        seenTypeNodes.add(reference.from.node);
        if (reference.isPartialReference && reference.isPartOfCatalystFile) {
            (0, assert_1.default)(reference.from.node.typeArguments, 'Expected type arguments for partial reference.');
            (0, assert_1.default)(reference.from.node.typeArguments.length === 1, 'Expected an argument for reference.');
            const firstArg = reference.from.node.typeArguments[0];
            const sf = firstArg.getSourceFile();
            // Naive detection of the import. Sufficient for this test file migration.
            const catalystImport = sf.text.includes('google3/javascript/angular2/testing/catalyst/fake_async')
                ? 'google3/javascript/angular2/testing/catalyst/fake_async'
                : 'google3/javascript/angular2/testing/catalyst/async';
            const unwrapImportExpr = importManager.addImport({
                exportModuleSpecifier: catalystImport,
                exportSymbolName: 'UnwrapSignalInputs',
                requestedFile: sf,
            });
            host.replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sf, info), new tsurge_1.TextUpdate({
                position: firstArg.getStart(),
                end: firstArg.getStart(),
                toInsert: `${host.printer.printNode(typescript_1.default.EmitHint.Unspecified, unwrapImportExpr, sf)}<`,
            })));
            host.replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sf, info), new tsurge_1.TextUpdate({ position: firstArg.getEnd(), end: firstArg.getEnd(), toInsert: '>' })));
        }
    }
}
