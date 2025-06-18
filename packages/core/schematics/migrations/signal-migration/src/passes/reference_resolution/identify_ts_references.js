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
exports.identifyPotentialTypeScriptReference = identifyPotentialTypeScriptReference;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../../../../utils/tsurge");
const lookup_property_access_1 = require("../../../../../utils/tsurge/helpers/ast/lookup_property_access");
const binding_elements_1 = require("../../utils/binding_elements");
const traverse_access_1 = require("../../utils/traverse_access");
const unwrap_parent_1 = require("../../utils/unwrap_parent");
const write_operators_1 = require("../../utils/write_operators");
const reference_kinds_1 = require("./reference_kinds");
/**
 * Checks whether given TypeScript reference refers to an Angular input, and captures
 * the reference if possible.
 *
 * @param fieldNamesToConsiderForReferenceLookup List of field names that should be
 *   respected when expensively looking up references to known fields.
 *   May be null if all identifiers should be inspected.
 */
function identifyPotentialTypeScriptReference(node, programInfo, checker, knownFields, result, fieldNamesToConsiderForReferenceLookup, advisors) {
    var _a;
    // Skip all identifiers that never can point to a migrated field.
    // TODO: Capture these assumptions and performance optimizations in the design doc.
    if (fieldNamesToConsiderForReferenceLookup !== null &&
        !fieldNamesToConsiderForReferenceLookup.has(node.text)) {
        return;
    }
    let target = undefined;
    // Resolve binding elements to their declaration symbol.
    // Commonly inputs are accessed via object expansion. e.g. `const {input} = this;`.
    if (typescript_1.default.isBindingElement(node.parent)) {
        // Skip binding elements that are using spread.
        if (node.parent.dotDotDotToken !== undefined) {
            return;
        }
        const bindingInfo = (0, binding_elements_1.resolveBindingElement)(node.parent);
        if (bindingInfo === null) {
            // The declaration could not be resolved. Skip analyzing this.
            return;
        }
        const bindingType = checker.getTypeAtLocation(bindingInfo.pattern);
        const resolved = (0, lookup_property_access_1.lookupPropertyAccess)(checker, bindingType, [bindingInfo.propertyName]);
        target = resolved === null || resolved === void 0 ? void 0 : resolved.symbol;
    }
    else {
        target = checker.getSymbolAtLocation(node);
    }
    noTargetSymbolCheck: if (target === undefined) {
        if (typescript_1.default.isPropertyAccessExpression(node.parent) && node.parent.name === node) {
            const propAccessSymbol = checker.getSymbolAtLocation(node.parent.expression);
            if (propAccessSymbol !== undefined &&
                propAccessSymbol.valueDeclaration !== undefined &&
                typescript_1.default.isVariableDeclaration(propAccessSymbol.valueDeclaration) &&
                propAccessSymbol.valueDeclaration.initializer !== undefined) {
                target = (_a = advisors.debugElComponentInstanceTracker
                    .detect(propAccessSymbol.valueDeclaration.initializer)) === null || _a === void 0 ? void 0 : _a.getProperty(node.text);
                // We found a target in the fallback path. Break out.
                if (target !== undefined) {
                    break noTargetSymbolCheck;
                }
            }
        }
        return;
    }
    let targetInput = knownFields.attemptRetrieveDescriptorFromSymbol(target);
    if (targetInput === null) {
        return;
    }
    const access = (0, unwrap_parent_1.unwrapParent)((0, traverse_access_1.traverseAccess)(node));
    const accessParent = access.parent;
    const isWriteReference = typescript_1.default.isBinaryExpression(accessParent) &&
        accessParent.left === access &&
        write_operators_1.writeBinaryOperators.includes(accessParent.operatorToken.kind);
    // track accesses from source files to known fields.
    result.references.push({
        kind: reference_kinds_1.ReferenceKind.TsReference,
        from: {
            node,
            file: (0, tsurge_1.projectFile)(node.getSourceFile(), programInfo),
            isWrite: isWriteReference,
            isPartOfElementBinding: typescript_1.default.isBindingElement(node.parent),
        },
        target: targetInput,
    });
}
