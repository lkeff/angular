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
exports.computeReplacementsToMigrateQuery = computeReplacementsToMigrateQuery;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const assert_1 = __importDefault(require("assert"));
const compiler_1 = require("@angular/compiler");
const remove_from_union_1 = require("../signal-migration/src/utils/remove_from_union");
const query_list_type_1 = require("./query_list_type");
/**
 *  A few notes on changes:
 *
 *    @ViewChild()
 *       --> static is gone!
 *       --> read stays
 *
 *    @ViewChildren()
 *       --> emitDistinctChangesOnly is gone!
 *       --> read stays
 *
 *    @ContentChild()
 *       --> descendants stays
 *       --> read stays
 *       --> static is gone!
 *
 *    @ContentChildren()
 *       --> descendants stays
 *       --> read stays
 *       --> emitDistinctChangesOnly is gone!
 */
function computeReplacementsToMigrateQuery(node, metadata, importManager, info, printer, options, checker) {
    var _a;
    const sf = node.getSourceFile();
    let newQueryFn = importManager.addImport({
        requestedFile: sf,
        exportModuleSpecifier: '@angular/core',
        exportSymbolName: metadata.kind,
    });
    // The default value for descendants is `true`, except for `ContentChildren`.
    const defaultDescendants = metadata.kind !== 'contentChildren';
    const optionProperties = [];
    const args = [
        metadata.args[0], // Locator.
    ];
    let type = node.type;
    // For multi queries, attempt to unwrap `QueryList` types, or infer the
    // type from the initializer, if possible.
    if (!metadata.queryInfo.first) {
        if (type === undefined && node.initializer !== undefined) {
            type = (0, query_list_type_1.extractQueryListType)(node.initializer);
        }
        else if (type !== undefined) {
            type = (0, query_list_type_1.extractQueryListType)(type);
        }
    }
    if (metadata.queryInfo.read !== null) {
        (0, assert_1.default)(metadata.queryInfo.read instanceof compiler_1.WrappedNodeExpr);
        optionProperties.push(typescript_1.default.factory.createPropertyAssignment('read', metadata.queryInfo.read.node));
    }
    if (metadata.queryInfo.descendants !== defaultDescendants) {
        optionProperties.push(typescript_1.default.factory.createPropertyAssignment('descendants', metadata.queryInfo.descendants ? typescript_1.default.factory.createTrue() : typescript_1.default.factory.createFalse()));
    }
    if (optionProperties.length > 0) {
        args.push(typescript_1.default.factory.createObjectLiteralExpression(optionProperties));
    }
    const strictNullChecksEnabled = options.strict === true || options.strictNullChecks === true;
    const strictPropertyInitialization = options.strict === true || options.strictPropertyInitialization === true;
    let isRequired = node.exclamationToken !== undefined;
    // If we come across an application with strict null checks enabled, but strict
    // property initialization is disabled, there are two options:
    //   - Either the query is already typed to include `undefined` explicitly,
    //     in which case an option query makes sense.
    //   - OR, the query is not typed to include `undefined`. In which case, the query
    //     should be marked as required to not break the app. The user-code throughout
    //     the application (given strict null checks) already assumes non-nullable!
    if (strictNullChecksEnabled &&
        !strictPropertyInitialization &&
        node.initializer === undefined &&
        node.questionToken === undefined &&
        type !== undefined &&
        !checker.isTypeAssignableTo(checker.getUndefinedType(), checker.getTypeFromTypeNode(type))) {
        isRequired = true;
    }
    if (isRequired && metadata.queryInfo.first) {
        // If the query is required already via some indicators, and this is a "single"
        // query, use the available `.required` method.
        newQueryFn = typescript_1.default.factory.createPropertyAccessExpression(newQueryFn, 'required');
    }
    // If this query is still nullable (i.e. not required), attempt to remove
    // explicit `undefined` types if possible.
    if (!isRequired && type !== undefined && typescript_1.default.isUnionTypeNode(type)) {
        type = (0, remove_from_union_1.removeFromUnionIfPossible)(type, (v) => v.kind !== typescript_1.default.SyntaxKind.UndefinedKeyword);
    }
    let locatorType = Array.isArray(metadata.queryInfo.predicate)
        ? null
        : metadata.queryInfo.predicate.expression;
    let resolvedReadType = (_a = metadata.queryInfo.read) !== null && _a !== void 0 ? _a : locatorType;
    // If the original property type and the read type are matching, we can rely
    // on the TS inference, instead of repeating types, like in `viewChild<Button>(Button)`.
    if (type !== undefined &&
        resolvedReadType instanceof compiler_1.WrappedNodeExpr &&
        typescript_1.default.isIdentifier(resolvedReadType.node) &&
        typescript_1.default.isTypeReferenceNode(type) &&
        typescript_1.default.isIdentifier(type.typeName) &&
        type.typeName.text === resolvedReadType.node.text) {
        locatorType = null;
    }
    const call = typescript_1.default.factory.createCallExpression(newQueryFn, 
    // If there is no resolved `ReadT` (e.g. string predicate), we use the
    // original type explicitly as generic. Otherwise, query API is smart
    // enough to always infer.
    resolvedReadType === null && type !== undefined ? [type] : undefined, args);
    const accessibilityModifier = getAccessibilityModifier(node);
    let modifiers = [
        typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.ReadonlyKeyword),
    ];
    if (accessibilityModifier) {
        modifiers = [accessibilityModifier, ...modifiers];
    }
    const updated = typescript_1.default.factory.createPropertyDeclaration(modifiers, node.name, undefined, undefined, call);
    return [
        new tsurge_1.Replacement((0, tsurge_1.projectFile)(node.getSourceFile(), info), new tsurge_1.TextUpdate({
            position: node.getStart(),
            end: node.getEnd(),
            toInsert: printer.printNode(typescript_1.default.EmitHint.Unspecified, updated, sf),
        })),
    ];
}
function getAccessibilityModifier(node) {
    var _a;
    return (_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.find((mod) => mod.kind === typescript_1.default.SyntaxKind.PublicKeyword ||
        mod.kind === typescript_1.default.SyntaxKind.PrivateKeyword ||
        mod.kind === typescript_1.default.SyntaxKind.ProtectedKeyword);
}
