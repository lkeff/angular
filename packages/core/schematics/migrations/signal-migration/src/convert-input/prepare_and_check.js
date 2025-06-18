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
exports.prepareAndCheckForConversion = prepareAndCheckForConversion;
const typescript_1 = __importDefault(require("typescript"));
const incompatibility_1 = require("../passes/problematic_patterns/incompatibility");
const assert_1 = __importDefault(require("assert"));
/**
 * Prepares a potential migration of the given node by performing
 * initial analysis and checking whether it an be migrated.
 *
 * For example, required inputs that don't have an explicit type may not
 * be migrated as we don't have a good type for `input.required<T>`.
 *   (Note: `typeof Bla` may be usable— but isn't necessarily a good practice
 *    for complex expressions)
 */
function prepareAndCheckForConversion(node, metadata, checker, options) {
    // Accessor inputs cannot be migrated right now.
    if (typescript_1.default.isAccessor(node)) {
        return {
            context: node,
            reason: incompatibility_1.FieldIncompatibilityReason.Accessor,
        };
    }
    (0, assert_1.default)(metadata.inputDecorator !== null, 'Expected an input decorator for inputs that are being migrated.');
    let initialValue = node.initializer;
    let isUndefinedInitialValue = node.initializer === undefined ||
        (typescript_1.default.isIdentifier(node.initializer) && node.initializer.text === 'undefined');
    const strictNullChecksEnabled = options.strict === true || options.strictNullChecks === true;
    const strictPropertyInitialization = options.strict === true || options.strictPropertyInitialization === true;
    // Shorthand should never be used, as would expand the type of `T` to be `T|undefined`.
    // This wouldn't matter with strict null checks disabled, but it can break if this is
    // a library that is later consumed with strict null checks enabled.
    const avoidTypeExpansion = !strictNullChecksEnabled;
    // If an input can be required, due to the non-null assertion on the property,
    // make it required if there is no initializer.
    if (node.exclamationToken !== undefined && initialValue === undefined) {
        metadata.required = true;
    }
    let typeToAdd = node.type;
    let preferShorthandIfPossible = null;
    // If there is no initial value, or it's `undefined`, we can prefer the `input()`
    // shorthand which automatically uses `undefined` as initial value, and includes it
    // in the input type.
    if (!metadata.required &&
        node.type !== undefined &&
        isUndefinedInitialValue &&
        !avoidTypeExpansion) {
        preferShorthandIfPossible = { originalType: node.type };
    }
    // If the input is using `@Input() bla?: string;` with the "optional question mark",
    // then we try to explicitly add `undefined` as type, if it's not part of the type already.
    // This is ensuring correctness, as `bla?` automatically includes `undefined` currently.
    if (node.questionToken !== undefined) {
        // If there is no type, but we have an initial value, try inferring
        // it from the initializer.
        if (typeToAdd === undefined && initialValue !== undefined) {
            const inferredType = inferImportableTypeForInput(checker, node, initialValue);
            if (inferredType !== null) {
                typeToAdd = inferredType;
            }
        }
        if (typeToAdd === undefined) {
            return {
                context: node,
                reason: incompatibility_1.FieldIncompatibilityReason.SignalInput__QuestionMarkButNoGoodExplicitTypeExtractable,
            };
        }
        if (!checker.isTypeAssignableTo(checker.getUndefinedType(), checker.getTypeFromTypeNode(typeToAdd))) {
            typeToAdd = typescript_1.default.factory.createUnionTypeNode([
                typeToAdd,
                typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.UndefinedKeyword),
            ]);
        }
    }
    let leadingTodoText = null;
    // If the input does not have an initial value, and strict property initialization
    // is disabled, while strict null checks are enabled; then we know that `undefined`
    // cannot be used as initial value, nor do we want to expand the input's type magically.
    // Instead, we detect this case and migrate to `undefined!` which leaves the behavior unchanged.
    if (strictNullChecksEnabled &&
        !strictPropertyInitialization &&
        node.initializer === undefined &&
        node.type !== undefined &&
        node.questionToken === undefined &&
        node.exclamationToken === undefined &&
        metadata.required === false &&
        !checker.isTypeAssignableTo(checker.getUndefinedType(), checker.getTypeFromTypeNode(node.type))) {
        leadingTodoText =
            'Input is initialized to `undefined` but type does not allow this value. ' +
                'This worked with `@Input` because your project uses `--strictPropertyInitialization=false`.';
        isUndefinedInitialValue = false;
        initialValue = typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createIdentifier('undefined'));
    }
    // Attempt to extract type from input initial value. No explicit type, but input is required.
    // Hence we need an explicit type, or fall back to `typeof`.
    if (typeToAdd === undefined && initialValue !== undefined && metadata.required) {
        const inferredType = inferImportableTypeForInput(checker, node, initialValue);
        if (inferredType !== null) {
            typeToAdd = inferredType;
        }
        else {
            // Note that we could use `typeToTypeNode` here but it's likely breaking because
            // the generated type might depend on imports that we cannot add here (nor want).
            return {
                context: node,
                reason: incompatibility_1.FieldIncompatibilityReason.SignalInput__RequiredButNoGoodExplicitTypeExtractable,
            };
        }
    }
    return {
        requiredButIncludedUndefinedPreviously: metadata.required && node.questionToken !== undefined,
        resolvedMetadata: metadata,
        resolvedType: typeToAdd,
        preferShorthandIfPossible,
        originalInputDecorator: metadata.inputDecorator,
        initialValue: isUndefinedInitialValue ? undefined : initialValue,
        leadingTodoText,
    };
}
function inferImportableTypeForInput(checker, node, initialValue) {
    var _a;
    const propertyType = checker.getTypeAtLocation(node);
    // If the resolved type is a primitive, or union of primitive types,
    // return a type node fully derived from the resolved type.
    if (isPrimitiveImportableTypeNode(propertyType) ||
        (propertyType.isUnion() && propertyType.types.every(isPrimitiveImportableTypeNode))) {
        return (_a = checker.typeToTypeNode(propertyType, node, typescript_1.default.NodeBuilderFlags.NoTypeReduction)) !== null && _a !== void 0 ? _a : null;
    }
    // Alternatively, try to infer a simple importable type from\
    // the initializer.
    if (typescript_1.default.isIdentifier(initialValue)) {
        // @Input({required: true}) bla = SOME_DEFAULT;
        return typescript_1.default.factory.createTypeQueryNode(initialValue);
    }
    else if (typescript_1.default.isPropertyAccessExpression(initialValue) &&
        typescript_1.default.isIdentifier(initialValue.name) &&
        typescript_1.default.isIdentifier(initialValue.expression)) {
        // @Input({required: true}) bla = prop.SOME_DEFAULT;
        return typescript_1.default.factory.createTypeQueryNode(typescript_1.default.factory.createQualifiedName(initialValue.name, initialValue.expression));
    }
    return null;
}
function isPrimitiveImportableTypeNode(type) {
    return !!(type.flags & typescript_1.default.TypeFlags.BooleanLike ||
        type.flags & typescript_1.default.TypeFlags.StringLike ||
        type.flags & typescript_1.default.TypeFlags.NumberLike ||
        type.flags & typescript_1.default.TypeFlags.Undefined ||
        type.flags & typescript_1.default.TypeFlags.Null);
}
