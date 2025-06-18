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
exports.getIdOfOutput = getIdOfOutput;
exports.findOutputDeclarationsAndReferences = findOutputDeclarationsAndReferences;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("@angular/compiler-cli/src/ngtsc/imports");
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const project_paths_1 = require("../project_paths");
function getIdOfOutput(info, prop) {
    var _a;
    const fileId = (0, project_paths_1.projectFile)(prop.getSourceFile(), info).id.replace(/\.d\.ts/, '.ts');
    return `${fileId}@@${(_a = prop.parent.name) !== null && _a !== void 0 ? _a : 'unknown-class'}@@${prop.name.getText()}`;
}
function findOutputDeclarationsAndReferences(info, checker, reflector, dtsReader) {
    const { sourceFiles } = info;
    const sourceOutputs = new Map();
    const problematicReferencedOutputs = new Set();
    for (const sf of sourceFiles) {
        const visitor = (node) => {
            // Detect output declarations.
            if (typescript_1.default.isPropertyDeclaration(node) &&
                node.initializer !== undefined &&
                typescript_1.default.isNewExpression(node.initializer) &&
                typescript_1.default.isIdentifier(node.initializer.expression) &&
                node.initializer.expression.text === 'EventEmitter') {
                sourceOutputs.set(getIdOfOutput(info, node), node);
            }
            // Detect problematic output references.
            if (typescript_1.default.isPropertyAccessExpression(node) &&
                typescript_1.default.isIdentifier(node.name) &&
                node.name.text === 'pipe') {
                const targetSymbol = checker.getSymbolAtLocation(node.expression);
                if (targetSymbol !== undefined &&
                    targetSymbol.valueDeclaration !== undefined &&
                    typescript_1.default.isPropertyDeclaration(targetSymbol.valueDeclaration) &&
                    isOutputDeclaration(targetSymbol.valueDeclaration, reflector, dtsReader)) {
                    // Mark output to indicate a seen problematic usage.
                    problematicReferencedOutputs.add(getIdOfOutput(info, targetSymbol.valueDeclaration));
                }
            }
            typescript_1.default.forEachChild(node, visitor);
        };
        typescript_1.default.forEachChild(sf, visitor);
    }
    return { sourceOutputs, problematicReferencedOutputs };
}
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
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    const ngDecorators = decorators !== null ? (0, annotations_1.getAngularDecorators)(decorators, ['Output'], /* isCore */ false) : [];
    return ngDecorators.length > 0;
}
