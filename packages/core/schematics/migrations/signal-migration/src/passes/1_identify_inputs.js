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
exports.pass1__IdentifySourceFileAndDeclarationInputs = pass1__IdentifySourceFileAndDeclarationInputs;
const assert_1 = __importDefault(require("assert"));
const typescript_1 = __importDefault(require("typescript"));
const input_decorator_1 = require("../input_detection/input_decorator");
const input_node_1 = require("../input_detection/input_node");
const input_id_1 = require("../utils/input_id");
const prepare_and_check_1 = require("../convert-input/prepare_and_check");
const incompatibility_1 = require("./problematic_patterns/incompatibility");
/**
 * Phase where we iterate through all source files of the program (including `.d.ts`)
 * and keep track of all `@Input`'s we discover.
 */
function pass1__IdentifySourceFileAndDeclarationInputs(sf, host, checker, reflector, dtsMetadataReader, evaluator, knownDecoratorInputs, result) {
    const visitor = (node) => {
        var _a;
        const decoratorInput = (0, input_decorator_1.extractDecoratorInput)(node, host, reflector, dtsMetadataReader, evaluator);
        if (decoratorInput !== null) {
            (0, assert_1.default)((0, input_node_1.isInputContainerNode)(node), 'Expected input to be declared on accessor or property.');
            const inputDescr = (0, input_id_1.getInputDescriptor)(host, node);
            // track all inputs, even from declarations for reference resolution.
            knownDecoratorInputs.register({ descriptor: inputDescr, metadata: decoratorInput, node });
            // track source file inputs in the result of this target.
            // these are then later migrated in the migration phase.
            if (decoratorInput.inSourceFile && host.isSourceFileForCurrentMigration(sf)) {
                const conversionPreparation = (0, prepare_and_check_1.prepareAndCheckForConversion)(node, decoratorInput, checker, host.compilerOptions);
                if ((0, incompatibility_1.isFieldIncompatibility)(conversionPreparation)) {
                    knownDecoratorInputs.markFieldIncompatible(inputDescr, conversionPreparation);
                    result.sourceInputs.set(inputDescr, null);
                }
                else {
                    result.sourceInputs.set(inputDescr, conversionPreparation);
                }
            }
        }
        // track all imports to `Input` or `input`.
        let importName = null;
        if (typescript_1.default.isImportSpecifier(node) &&
            ((importName = ((_a = node.propertyName) !== null && _a !== void 0 ? _a : node.name).text) === 'Input' ||
                importName === 'input') &&
            typescript_1.default.isStringLiteral(node.parent.parent.parent.moduleSpecifier) &&
            (host.isMigratingCore || node.parent.parent.parent.moduleSpecifier.text === '@angular/core')) {
            if (!result.inputDecoratorSpecifiers.has(sf)) {
                result.inputDecoratorSpecifiers.set(sf, []);
            }
            result.inputDecoratorSpecifiers.get(sf).push({
                kind: importName === 'input' ? 'signal-input-import' : 'decorator-input-import',
                node,
            });
        }
        typescript_1.default.forEachChild(node, visitor);
    };
    typescript_1.default.forEachChild(sf, visitor);
}
