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
exports.pass6__migrateInputDeclarations = pass6__migrateInputDeclarations;
const assert_1 = __importDefault(require("assert"));
const typescript_1 = __importDefault(require("typescript"));
const convert_to_signal_1 = require("../convert-input/convert_to_signal");
const incompatibility_todos_1 = require("./problematic_patterns/incompatibility_todos");
/**
 * Phase that migrates `@Input()` declarations to signal inputs and
 * manages imports within the given file.
 */
function pass6__migrateInputDeclarations(host, checker, result, knownInputs, importManager, info) {
    let filesWithMigratedInputs = new Set();
    let filesWithIncompatibleInputs = new WeakSet();
    for (const [input, metadata] of result.sourceInputs) {
        const sf = input.node.getSourceFile();
        const inputInfo = knownInputs.get(input);
        // Do not migrate incompatible inputs.
        if (inputInfo.isIncompatible()) {
            const incompatibilityReason = inputInfo.container.getInputMemberIncompatibility(input);
            // Add a TODO for the incompatible input, if desired.
            if (incompatibilityReason !== null && host.config.insertTodosForSkippedFields) {
                result.replacements.push(...(0, incompatibility_todos_1.insertTodoForIncompatibility)(input.node, info, incompatibilityReason, {
                    single: 'input',
                    plural: 'inputs',
                }));
            }
            filesWithIncompatibleInputs.add(sf);
            continue;
        }
        (0, assert_1.default)(metadata !== null, `Expected metadata to exist for input isn't marked incompatible.`);
        (0, assert_1.default)(!typescript_1.default.isAccessor(input.node), 'Accessor inputs are incompatible.');
        filesWithMigratedInputs.add(sf);
        result.replacements.push(...(0, convert_to_signal_1.convertToSignalInput)(input.node, metadata, info, checker, importManager, result));
    }
    for (const file of filesWithMigratedInputs) {
        // All inputs were migrated, so we can safely remove the `Input` symbol.
        if (!filesWithIncompatibleInputs.has(file)) {
            importManager.removeImport(file, 'Input', '@angular/core');
        }
    }
}
