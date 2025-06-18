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
exports.calculateDeclarationReplacement = calculateDeclarationReplacement;
exports.calculateImportReplacements = calculateImportReplacements;
exports.calculateNextFnReplacement = calculateNextFnReplacement;
exports.calculateNextFnReplacementInTemplate = calculateNextFnReplacementInTemplate;
exports.calculateNextFnReplacementInHostBinding = calculateNextFnReplacementInHostBinding;
exports.calculateCompleteCallReplacement = calculateCompleteCallReplacement;
exports.calculatePipeCallReplacement = calculatePipeCallReplacement;
const typescript_1 = __importDefault(require("typescript"));
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const tsurge_1 = require("../../utils/tsurge");
const apply_import_manager_1 = require("../../utils/tsurge/helpers/apply_import_manager");
const printer = typescript_1.default.createPrinter();
function calculateDeclarationReplacement(info, node, aliasParam) {
    var _a;
    const sf = node.getSourceFile();
    let payloadTypes;
    if (node.initializer && typescript_1.default.isNewExpression(node.initializer) && node.initializer.typeArguments) {
        payloadTypes = node.initializer.typeArguments;
    }
    else if (node.type && typescript_1.default.isTypeReferenceNode(node.type) && node.type.typeArguments) {
        payloadTypes = typescript_1.default.factory.createNodeArray(node.type.typeArguments);
    }
    const outputCall = typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier('output'), payloadTypes, aliasParam !== undefined
        ? [
            typescript_1.default.factory.createObjectLiteralExpression([
                typescript_1.default.factory.createPropertyAssignment('alias', typescript_1.default.factory.createStringLiteral(aliasParam, true)),
            ], false),
        ]
        : []);
    const existingModifiers = ((_a = node.modifiers) !== null && _a !== void 0 ? _a : []).filter((modifier) => !typescript_1.default.isDecorator(modifier) && modifier.kind !== typescript_1.default.SyntaxKind.ReadonlyKeyword);
    const updatedOutputDeclaration = typescript_1.default.factory.createPropertyDeclaration(
    // Think: this logic of dealing with modifiers is applicable to all signal-based migrations
    typescript_1.default.factory.createNodeArray([
        ...existingModifiers,
        typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.ReadonlyKeyword),
    ]), node.name, undefined, undefined, outputCall);
    return prepareTextReplacementForNode(info, node, printer.printNode(typescript_1.default.EmitHint.Unspecified, updatedOutputDeclaration, sf));
}
function calculateImportReplacements(info, sourceFiles) {
    const importReplacements = {};
    for (const sf of sourceFiles) {
        const importManager = new migrations_1.ImportManager();
        const addOnly = [];
        const addRemove = [];
        const file = (0, tsurge_1.projectFile)(sf, info);
        importManager.addImport({
            requestedFile: sf,
            exportModuleSpecifier: '@angular/core',
            exportSymbolName: 'output',
        });
        (0, apply_import_manager_1.applyImportManagerChanges)(importManager, addOnly, [sf], info);
        importManager.removeImport(sf, 'Output', '@angular/core');
        importManager.removeImport(sf, 'EventEmitter', '@angular/core');
        (0, apply_import_manager_1.applyImportManagerChanges)(importManager, addRemove, [sf], info);
        importReplacements[file.id] = {
            add: addOnly,
            addAndRemove: addRemove,
        };
    }
    return importReplacements;
}
function calculateNextFnReplacement(info, node) {
    return prepareTextReplacementForNode(info, node, 'emit');
}
function calculateNextFnReplacementInTemplate(file, span) {
    return prepareTextReplacement(file, 'emit', span.start, span.end);
}
function calculateNextFnReplacementInHostBinding(file, offset, span) {
    return prepareTextReplacement(file, 'emit', offset + span.start, offset + span.end);
}
function calculateCompleteCallReplacement(info, node) {
    return prepareTextReplacementForNode(info, node, '', node.getFullStart());
}
function calculatePipeCallReplacement(info, node) {
    if (typescript_1.default.isPropertyAccessExpression(node.expression)) {
        const sf = node.getSourceFile();
        const importManager = new migrations_1.ImportManager();
        const outputToObservableIdent = importManager.addImport({
            requestedFile: sf,
            exportModuleSpecifier: '@angular/core/rxjs-interop',
            exportSymbolName: 'outputToObservable',
        });
        const toObsCallExp = typescript_1.default.factory.createCallExpression(outputToObservableIdent, undefined, [
            node.expression.expression,
        ]);
        const pipePropAccessExp = typescript_1.default.factory.updatePropertyAccessExpression(node.expression, toObsCallExp, node.expression.name);
        const pipeCallExp = typescript_1.default.factory.updateCallExpression(node, pipePropAccessExp, [], node.arguments);
        const replacements = [
            prepareTextReplacementForNode(info, node, printer.printNode(typescript_1.default.EmitHint.Unspecified, pipeCallExp, sf)),
        ];
        (0, apply_import_manager_1.applyImportManagerChanges)(importManager, replacements, [sf], info);
        return replacements;
    }
    else {
        // TODO: assert instead?
        throw new Error(`Unexpected call expression for .pipe - expected a property access but got "${node.getText()}"`);
    }
}
function prepareTextReplacementForNode(info, node, replacement, start) {
    const sf = node.getSourceFile();
    return new tsurge_1.Replacement((0, tsurge_1.projectFile)(sf, info), new tsurge_1.TextUpdate({
        position: start !== null && start !== void 0 ? start : node.getStart(),
        end: node.getEnd(),
        toInsert: replacement,
    }));
}
function prepareTextReplacement(file, replacement, start, end) {
    return new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
        position: start,
        end: end,
        toInsert: replacement,
    }));
}
