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
exports.extractDecoratorInput = extractDecoratorInput;
const typescript_1 = __importDefault(require("typescript"));
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const directive_1 = require("@angular/compiler-cli/src/ngtsc/annotations/directive");
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
const imports_1 = require("@angular/compiler-cli/src/ngtsc/imports");
const partial_evaluator_1 = require("@angular/compiler-cli/src/ngtsc/partial_evaluator");
const transform_1 = require("@angular/compiler-cli/src/ngtsc/transform");
const input_node_1 = require("../input_detection/input_node");
const output_ast_1 = require("../../../../../../compiler/src/output/output_ast");
/** Attempts to extract metadata of a potential TypeScript `@Input()` declaration. */
function extractDecoratorInput(node, host, reflector, metadataReader, evaluator) {
    var _a;
    return ((_a = extractSourceCodeInput(node, host, reflector, evaluator)) !== null && _a !== void 0 ? _a : extractDtsInput(node, metadataReader));
}
/**
 * Attempts to extract `@Input()` information for the given node, assuming it's
 * part of a `.d.ts` file.
 */
function extractDtsInput(node, metadataReader) {
    if (!(0, input_node_1.isInputContainerNode)(node) ||
        !typescript_1.default.isIdentifier(node.name) ||
        !node.getSourceFile().isDeclarationFile) {
        return null;
    }
    // If the potential node is not part of a valid input class, skip.
    if (!typescript_1.default.isClassDeclaration(node.parent) ||
        node.parent.name === undefined ||
        !typescript_1.default.isIdentifier(node.parent.name)) {
        return null;
    }
    let directiveMetadata = null;
    // Getting directive metadata can throw errors when e.g. types referenced
    // in the `.d.ts` aren't resolvable. This seems to be unexpected and shouldn't
    // result in the entire migration to be failing.
    try {
        directiveMetadata = metadataReader.getDirectiveMetadata(new imports_1.Reference(node.parent));
    }
    catch (e) {
        console.error('Unexpected error. Gracefully ignoring.');
        console.error('Could not parse directive metadata:', e);
        return null;
    }
    const inputMapping = directiveMetadata === null || directiveMetadata === void 0 ? void 0 : directiveMetadata.inputs.getByClassPropertyName(node.name.text);
    // Signal inputs are never tracked and migrated.
    if (inputMapping === null || inputMapping === void 0 ? void 0 : inputMapping.isSignal) {
        return null;
    }
    return inputMapping == null
        ? null
        : Object.assign(Object.assign({}, inputMapping), { inputDecorator: null, inSourceFile: false, 
            // Inputs from `.d.ts` cannot have any field decorators applied.
            fieldDecorators: [] });
}
/**
 * Attempts to extract `@Input()` information for the given node, assuming it's
 * directly defined inside a source file (`.ts`).
 */
function extractSourceCodeInput(node, host, reflector, evaluator) {
    var _a;
    if (!(0, input_node_1.isInputContainerNode)(node) ||
        !typescript_1.default.isIdentifier(node.name) ||
        node.getSourceFile().isDeclarationFile) {
        return null;
    }
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    if (decorators === null) {
        return null;
    }
    const ngDecorators = (0, annotations_1.getAngularDecorators)(decorators, ['Input'], host.isMigratingCore);
    if (ngDecorators.length === 0) {
        return null;
    }
    const inputDecorator = ngDecorators[0];
    let publicName = node.name.text;
    let isRequired = false;
    let transformResult = null;
    // Check options object from `@Input()`.
    if (((_a = inputDecorator.args) === null || _a === void 0 ? void 0 : _a.length) === 1) {
        const evaluatedInputOpts = evaluator.evaluate(inputDecorator.args[0]);
        if (typeof evaluatedInputOpts === 'string') {
            publicName = evaluatedInputOpts;
        }
        else if (evaluatedInputOpts instanceof Map) {
            if (evaluatedInputOpts.has('alias') && typeof evaluatedInputOpts.get('alias') === 'string') {
                publicName = evaluatedInputOpts.get('alias');
            }
            if (evaluatedInputOpts.has('required') &&
                typeof evaluatedInputOpts.get('required') === 'boolean') {
                isRequired = !!evaluatedInputOpts.get('required');
            }
            if (evaluatedInputOpts.has('transform') && evaluatedInputOpts.get('transform') != null) {
                transformResult = parseTransformOfInput(evaluatedInputOpts, node, reflector);
            }
        }
    }
    return {
        bindingPropertyName: publicName,
        classPropertyName: node.name.text,
        required: isRequired,
        isSignal: false,
        inSourceFile: true,
        transform: transformResult,
        inputDecorator,
        fieldDecorators: decorators,
    };
}
/**
 * Gracefully attempts to parse the `transform` option of an `@Input()`
 * and extracts its metadata.
 */
function parseTransformOfInput(evaluatedInputOpts, node, reflector) {
    const transformValue = evaluatedInputOpts.get('transform');
    if (!(transformValue instanceof partial_evaluator_1.DynamicValue) && !(transformValue instanceof imports_1.Reference)) {
        return null;
    }
    // For parsing the transform, we don't need a real reference emitter, as
    // the emitter is only used for verifying that the transform type could be
    // copied into e.g. an `ngInputAccept` class member.
    const noopRefEmitter = new imports_1.ReferenceEmitter([
        {
            emit: () => ({
                kind: imports_1.ReferenceEmitKind.Success,
                expression: output_ast_1.NULL_EXPR,
                importedFile: null,
            }),
        },
    ]);
    try {
        return (0, directive_1.parseDecoratorInputTransformFunction)(node.parent, node.name.text, transformValue, reflector, noopRefEmitter, transform_1.CompilationMode.FULL);
    }
    catch (e) {
        if (!(e instanceof diagnostics_1.FatalDiagnosticError)) {
            throw e;
        }
        // TODO: implement error handling.
        // See failing case: e.g. inherit_definition_feature_spec.ts
        console.error(`${e.node.getSourceFile().fileName}: ${e.toString()}`);
        return null;
    }
}
