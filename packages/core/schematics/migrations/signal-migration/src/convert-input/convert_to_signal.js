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
exports.convertToSignalInput = convertToSignalInput;
const assert_1 = __importDefault(require("assert"));
const typescript_1 = __importDefault(require("typescript"));
const remove_from_union_1 = require("../utils/remove_from_union");
const tsurge_1 = require("../../../../utils/tsurge");
const insert_preceding_line_1 = require("../../../../utils/tsurge/helpers/ast/insert_preceding_line");
const cut_string_line_length_1 = require("../../../../utils/tsurge/helpers/string_manipulation/cut_string_line_length");
// TODO: Consider initializations inside the constructor. Those are not migrated right now
// though, as they are writes.
/**
 * Converts an `@Input()` property declaration to a signal input.
 *
 * @returns Replacements for converting the input.
 */
function convertToSignalInput(node, { resolvedMetadata: metadata, resolvedType, preferShorthandIfPossible, originalInputDecorator, initialValue, leadingTodoText, }, info, checker, importManager, result) {
    var _a, _b;
    let optionsLiteral = null;
    // We need an options array for the input because:
    //   - the input is either aliased,
    //   - or we have a transform.
    if (metadata.bindingPropertyName !== metadata.classPropertyName || metadata.transform !== null) {
        const properties = [];
        if (metadata.bindingPropertyName !== metadata.classPropertyName) {
            properties.push(typescript_1.default.factory.createPropertyAssignment('alias', typescript_1.default.factory.createStringLiteral(metadata.bindingPropertyName)));
        }
        if (metadata.transform !== null) {
            const transformRes = extractTransformOfInput(metadata.transform, resolvedType, checker);
            properties.push(transformRes.node);
            // Propagate TODO if one was requested from the transform extraction/validation.
            if (transformRes.leadingTodoText !== null) {
                leadingTodoText =
                    (leadingTodoText ? `${leadingTodoText} ` : '') + transformRes.leadingTodoText;
            }
        }
        optionsLiteral = typescript_1.default.factory.createObjectLiteralExpression(properties);
    }
    // The initial value is `undefined` or none is present:
    //    - We may be able to use the `input()` shorthand
    //    - or we use an explicit `undefined` initial value.
    if (initialValue === undefined) {
        // Shorthand not possible, so explicitly add `undefined`.
        if (preferShorthandIfPossible === null) {
            initialValue = typescript_1.default.factory.createIdentifier('undefined');
        }
        else {
            resolvedType = preferShorthandIfPossible.originalType;
            // When using the `input()` shorthand, try cutting of `undefined` from potential
            // union types. `undefined` will be automatically included in the type.
            if (typescript_1.default.isUnionTypeNode(resolvedType)) {
                resolvedType = (0, remove_from_union_1.removeFromUnionIfPossible)(resolvedType, (t) => t.kind !== typescript_1.default.SyntaxKind.UndefinedKeyword);
            }
        }
    }
    const inputArgs = [];
    const typeArguments = [];
    if (resolvedType !== undefined) {
        typeArguments.push(resolvedType);
        if (metadata.transform !== null) {
            // Note: The TCB code generation may use the same type node and attach
            // synthetic comments for error reporting. We remove those explicitly here.
            typeArguments.push(typescript_1.default.setSyntheticTrailingComments(metadata.transform.type.node, undefined));
        }
    }
    // Always add an initial value when the input is optional, and we have one, or we need one
    // to be able to pass options as the second argument.
    if (!metadata.required && (initialValue !== undefined || optionsLiteral !== null)) {
        inputArgs.push(initialValue !== null && initialValue !== void 0 ? initialValue : typescript_1.default.factory.createIdentifier('undefined'));
    }
    if (optionsLiteral !== null) {
        inputArgs.push(optionsLiteral);
    }
    const inputFnRef = importManager.addImport({
        exportModuleSpecifier: '@angular/core',
        exportSymbolName: 'input',
        requestedFile: node.getSourceFile(),
    });
    const inputInitializerFn = metadata.required
        ? typescript_1.default.factory.createPropertyAccessExpression(inputFnRef, 'required')
        : inputFnRef;
    const inputInitializer = typescript_1.default.factory.createCallExpression(inputInitializerFn, typeArguments, inputArgs);
    let modifiersWithoutInputDecorator = (_b = (_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.filter((m) => m !== originalInputDecorator.node)) !== null && _b !== void 0 ? _b : [];
    // Add `readonly` to all new signal input declarations.
    if (!(modifiersWithoutInputDecorator === null || modifiersWithoutInputDecorator === void 0 ? void 0 : modifiersWithoutInputDecorator.some((s) => s.kind === typescript_1.default.SyntaxKind.ReadonlyKeyword))) {
        modifiersWithoutInputDecorator.push(typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.ReadonlyKeyword));
    }
    const newNode = typescript_1.default.factory.createPropertyDeclaration(modifiersWithoutInputDecorator, node.name, undefined, undefined, inputInitializer);
    const newPropertyText = result.printer.printNode(typescript_1.default.EmitHint.Unspecified, newNode, node.getSourceFile());
    const replacements = [];
    if (leadingTodoText !== null) {
        replacements.push((0, insert_preceding_line_1.insertPrecedingLine)(node, info, '// TODO: Notes from signal input migration:'), ...(0, cut_string_line_length_1.cutStringToLineLimit)(leadingTodoText, 70).map((line) => (0, insert_preceding_line_1.insertPrecedingLine)(node, info, `//  ${line}`)));
    }
    replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(node.getSourceFile(), info), new tsurge_1.TextUpdate({
        position: node.getStart(),
        end: node.getEnd(),
        toInsert: newPropertyText,
    })));
    return replacements;
}
/**
 * Extracts the transform for the given input and returns a property assignment
 * that works for the new signal `input()` API.
 */
function extractTransformOfInput(transform, resolvedType, checker) {
    (0, assert_1.default)(typescript_1.default.isExpression(transform.node), `Expected transform to be an expression.`);
    let transformFn = transform.node;
    let leadingTodoText = null;
    // If there is an explicit type, check if the transform return type actually works.
    // In some cases, the transform function is not compatible because with decorator inputs,
    // those were not checked. We cast the transform to `any` and add a TODO.
    // TODO: Capture this in the design doc.
    if (resolvedType !== undefined && !typescript_1.default.isSyntheticExpression(resolvedType)) {
        // Note: If the type is synthetic, we cannot check, and we accept that in the worst case
        // we will create code that is not necessarily compiling. This is unlikely, but notably
        // the errors would be correct and valuable.
        const transformType = checker.getTypeAtLocation(transform.node);
        const transformSignature = transformType.getCallSignatures()[0];
        (0, assert_1.default)(transformSignature !== undefined, 'Expected transform to be an invoke-able.');
        if (!checker.isTypeAssignableTo(checker.getReturnTypeOfSignature(transformSignature), checker.getTypeFromTypeNode(resolvedType))) {
            leadingTodoText =
                'Input type is incompatible with transform. The migration added an `any` cast. ' +
                    'This worked previously because Angular was unable to check transforms.';
            transformFn = typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createParenthesizedExpression(transformFn), typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
        }
    }
    return {
        node: typescript_1.default.factory.createPropertyAssignment('transform', transformFn),
        leadingTodoText,
    };
}
