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
exports.createModuleWithProvidersResolver = createModuleWithProvidersResolver;
exports.isResolvedModuleWithProviders = isResolvedModuleWithProviders;
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const imports_1 = require("../../../imports");
const partial_evaluator_1 = require("../../../partial_evaluator");
const reflection_1 = require("../../../reflection");
/**
 * Creates a foreign function resolver to detect a `ModuleWithProviders<T>` type in a return type
 * position of a function or method declaration. A `SyntheticValue` is produced if such a return
 * type is recognized.
 *
 * @param reflector The reflection host to use for analyzing the syntax.
 * @param isCore Whether the @angular/core package is being compiled.
 */
function createModuleWithProvidersResolver(reflector, isCore) {
    /**
     * Retrieve an `NgModule` identifier (T) from the specified `type`, if it is of the form:
     * `ModuleWithProviders<T>`
     * @param type The type to reflect on.
     * @returns the identifier of the NgModule type if found, or null otherwise.
     */
    function _reflectModuleFromTypeParam(type, node) {
        // Examine the type of the function to see if it's a ModuleWithProviders reference.
        if (!typescript_1.default.isTypeReferenceNode(type)) {
            return null;
        }
        const typeName = (type &&
            ((typescript_1.default.isIdentifier(type.typeName) && type.typeName) ||
                (typescript_1.default.isQualifiedName(type.typeName) && type.typeName.right))) ||
            null;
        if (typeName === null) {
            return null;
        }
        // Look at the type itself to see where it comes from.
        const id = reflector.getImportOfIdentifier(typeName);
        // If it's not named ModuleWithProviders, bail.
        if (id === null || id.name !== 'ModuleWithProviders') {
            return null;
        }
        // If it's not from @angular/core, bail.
        if (!isCore && id.from !== '@angular/core') {
            return null;
        }
        // If there's no type parameter specified, bail.
        if (type.typeArguments === undefined || type.typeArguments.length !== 1) {
            const parent = typescript_1.default.isMethodDeclaration(node) && typescript_1.default.isClassDeclaration(node.parent) ? node.parent : null;
            const symbolName = (parent && parent.name ? parent.name.getText() + '.' : '') +
                (node.name ? node.name.getText() : 'anonymous');
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.NGMODULE_MODULE_WITH_PROVIDERS_MISSING_GENERIC, type, `${symbolName} returns a ModuleWithProviders type without a generic type argument. ` +
                `Please add a generic type argument to the ModuleWithProviders type. If this ` +
                `occurrence is in library code you don't control, please contact the library authors.`);
        }
        const arg = type.typeArguments[0];
        return (0, reflection_1.typeNodeToValueExpr)(arg);
    }
    /**
     * Retrieve an `NgModule` identifier (T) from the specified `type`, if it is of the form:
     * `A|B|{ngModule: T}|C`.
     * @param type The type to reflect on.
     * @returns the identifier of the NgModule type if found, or null otherwise.
     */
    function _reflectModuleFromLiteralType(type) {
        if (!typescript_1.default.isIntersectionTypeNode(type)) {
            return null;
        }
        for (const t of type.types) {
            if (typescript_1.default.isTypeLiteralNode(t)) {
                for (const m of t.members) {
                    const ngModuleType = (typescript_1.default.isPropertySignature(m) &&
                        typescript_1.default.isIdentifier(m.name) &&
                        m.name.text === 'ngModule' &&
                        m.type) ||
                        null;
                    let ngModuleExpression = null;
                    // Handle `: typeof X` or `: X` cases.
                    if (ngModuleType !== null && typescript_1.default.isTypeQueryNode(ngModuleType)) {
                        ngModuleExpression = (0, reflection_1.entityNameToValue)(ngModuleType.exprName);
                    }
                    else if (ngModuleType !== null) {
                        ngModuleExpression = (0, reflection_1.typeNodeToValueExpr)(ngModuleType);
                    }
                    if (ngModuleExpression) {
                        return ngModuleExpression;
                    }
                }
            }
        }
        return null;
    }
    return (fn, callExpr, resolve, unresolvable) => {
        var _a;
        const rawType = fn.node.type;
        if (rawType === undefined) {
            return unresolvable;
        }
        const type = (_a = _reflectModuleFromTypeParam(rawType, fn.node)) !== null && _a !== void 0 ? _a : _reflectModuleFromLiteralType(rawType);
        if (type === null) {
            return unresolvable;
        }
        const ngModule = resolve(type);
        if (!(ngModule instanceof imports_1.Reference) || !(0, reflection_1.isNamedClassDeclaration)(ngModule.node)) {
            return unresolvable;
        }
        return new partial_evaluator_1.SyntheticValue({
            ngModule: ngModule,
            mwpCall: callExpr,
        });
    };
}
function isResolvedModuleWithProviders(sv) {
    return (typeof sv.value === 'object' &&
        sv.value != null &&
        sv.value.hasOwnProperty('ngModule') &&
        sv.value.hasOwnProperty('mwpCall'));
}
