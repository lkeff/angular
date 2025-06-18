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
exports.isOutputDeclarationEligibleForMigration = isOutputDeclarationEligibleForMigration;
exports.isPotentialPipeCallUsage = isPotentialPipeCallUsage;
exports.isPotentialNextCallUsage = isPotentialNextCallUsage;
exports.isPotentialCompleteCallUsage = isPotentialCompleteCallUsage;
exports.isTargetOutputDeclaration = isTargetOutputDeclaration;
exports.getTargetPropertyDeclaration = getTargetPropertyDeclaration;
exports.getOutputDecorator = getOutputDecorator;
exports.getUniqueIdForProperty = getUniqueIdForProperty;
exports.isTestRunnerImport = isTestRunnerImport;
exports.checkNonTsReferenceAccessesField = checkNonTsReferenceAccessesField;
exports.checkNonTsReferenceCallsField = checkNonTsReferenceCallsField;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("@angular/compiler-cli/src/ngtsc/imports");
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const tsurge_1 = require("../../utils/tsurge");
const compiler_1 = require("@angular/compiler");
function isOutputDeclarationEligibleForMigration(node) {
    return (node.initializer !== undefined &&
        typescript_1.default.isNewExpression(node.initializer) &&
        typescript_1.default.isIdentifier(node.initializer.expression) &&
        node.initializer.expression.text === 'EventEmitter');
}
function isPotentialOutputCallUsage(node, name) {
    var _a;
    if (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isPropertyAccessExpression(node.expression) &&
        typescript_1.default.isIdentifier(node.expression.name)) {
        return ((_a = node.expression) === null || _a === void 0 ? void 0 : _a.name.text) === name;
    }
    else {
        return false;
    }
}
function isPotentialPipeCallUsage(node) {
    return isPotentialOutputCallUsage(node, 'pipe');
}
function isPotentialNextCallUsage(node) {
    return isPotentialOutputCallUsage(node, 'next');
}
function isPotentialCompleteCallUsage(node) {
    return isPotentialOutputCallUsage(node, 'complete');
}
function isTargetOutputDeclaration(node, checker, reflector, dtsReader) {
    const targetSymbol = checker.getSymbolAtLocation(node);
    if (targetSymbol !== undefined) {
        const propertyDeclaration = getTargetPropertyDeclaration(targetSymbol);
        if (propertyDeclaration !== null &&
            isOutputDeclaration(propertyDeclaration, reflector, dtsReader)) {
            return propertyDeclaration;
        }
    }
    return null;
}
/** Gets whether the given property is an Angular `@Output`. */
function isOutputDeclaration(node, reflector, dtsReader) {
    // `.d.ts` file, so we check the `static ecmp` metadata on the `declare class`.
    if (node.getSourceFile().isDeclarationFile) {
        if (!typescript_1.default.isIdentifier(node.name) ||
            !typescript_1.default.isClassDeclaration(node.parent) ||
            node.parent.name === undefined) {
            return false;
        }
        const ref = new imports_1.Reference(node.parent);
        const directiveMeta = dtsReader.getDirectiveMetadata(ref);
        return !!(directiveMeta === null || directiveMeta === void 0 ? void 0 : directiveMeta.outputs.getByClassPropertyName(node.name.text));
    }
    // `.ts` file, so we check for the `@Output()` decorator.
    return getOutputDecorator(node, reflector) !== null;
}
function getTargetPropertyDeclaration(targetSymbol) {
    const valDeclaration = targetSymbol.valueDeclaration;
    if (valDeclaration !== undefined && typescript_1.default.isPropertyDeclaration(valDeclaration)) {
        return valDeclaration;
    }
    return null;
}
/** Returns Angular `@Output` decorator or null when a given property declaration is not an @Output */
function getOutputDecorator(node, reflector) {
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    const ngDecorators = decorators !== null ? (0, annotations_1.getAngularDecorators)(decorators, ['Output'], /* isCore */ false) : [];
    return ngDecorators.length > 0 ? ngDecorators[0] : null;
}
// THINK: this utility + type is not specific to @Output, really, maybe move it to tsurge?
/** Computes an unique ID for a given Angular `@Output` property. */
function getUniqueIdForProperty(info, prop) {
    var _a;
    const { id } = (0, tsurge_1.projectFile)(prop.getSourceFile(), info);
    id.replace(/\.d\.ts$/, '.ts');
    return `${id}@@${(_a = prop.parent.name) !== null && _a !== void 0 ? _a : 'unknown-class'}@@${prop.name.getText()}`;
}
function isTestRunnerImport(node) {
    if (typescript_1.default.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier.getText();
        return moduleSpecifier.includes('jasmine') || moduleSpecifier.includes('catalyst');
    }
    return false;
}
// TODO: code duplication with signals migration - sort it out
/**
 * Gets whether the given read is used to access
 * the specified field.
 *
 * E.g. whether `<my-read>.toArray` is detected.
 */
function checkNonTsReferenceAccessesField(ref, fieldName) {
    const readFromPath = ref.from.readAstPath.at(-1);
    const parentRead = ref.from.readAstPath.at(-2);
    if (ref.from.read !== readFromPath) {
        return null;
    }
    if (!(parentRead instanceof compiler_1.PropertyRead) || parentRead.name !== fieldName) {
        return null;
    }
    return parentRead;
}
/**
 * Gets whether the given reference is accessed to call the
 * specified function on it.
 *
 * E.g. whether `<my-read>.toArray()` is detected.
 */
function checkNonTsReferenceCallsField(ref, fieldName) {
    const propertyAccess = checkNonTsReferenceAccessesField(ref, fieldName);
    if (propertyAccess === null) {
        return null;
    }
    const accessIdx = ref.from.readAstPath.indexOf(propertyAccess);
    if (accessIdx === -1) {
        return null;
    }
    const potentialRead = ref.from.readAstPath[accessIdx];
    if (potentialRead === undefined) {
        return null;
    }
    return potentialRead;
}
