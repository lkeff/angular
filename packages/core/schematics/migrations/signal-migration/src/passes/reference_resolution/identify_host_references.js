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
exports.identifyHostBindingReferences = identifyHostBindingReferences;
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const common_1 = require("@angular/compiler-cli/src/ngtsc/annotations/common");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const typescript_1 = __importDefault(require("typescript"));
const compiler_1 = require("@angular/compiler");
const tsurge_1 = require("../../../../../utils/tsurge");
const template_reference_visitor_1 = require("./template_reference_visitor");
const reference_kinds_1 = require("./reference_kinds");
/**
 * Checks host bindings of the given class and tracks all
 * references to inputs within bindings.
 */
function identifyHostBindingReferences(node, programInfo, checker, reflector, result, knownFields, fieldNamesToConsiderForReferenceLookup) {
    var _a;
    if (node.name === undefined) {
        return;
    }
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    if (decorators === null) {
        return;
    }
    const angularDecorators = (0, annotations_1.getAngularDecorators)(decorators, ['Directive', 'Component'], 
    /* isAngularCore */ false);
    if (angularDecorators.length === 0) {
        return;
    }
    // Assume only one Angular decorator per class.
    const ngDecorator = angularDecorators[0];
    if (((_a = ngDecorator.args) === null || _a === void 0 ? void 0 : _a.length) !== 1) {
        return;
    }
    const metadataNode = (0, common_1.unwrapExpression)(ngDecorator.args[0]);
    if (!typescript_1.default.isObjectLiteralExpression(metadataNode)) {
        return;
    }
    const metadata = (0, reflection_1.reflectObjectLiteral)(metadataNode);
    if (!metadata.has('host')) {
        return;
    }
    let hostField = (0, common_1.unwrapExpression)(metadata.get('host'));
    // Special-case in case host bindings are shared via a variable.
    // e.g. Material button shares host bindings as a constant in the same target.
    if (typescript_1.default.isIdentifier(hostField)) {
        let symbol = checker.getSymbolAtLocation(hostField);
        // Plain identifier references can point to alias symbols (e.g. imports).
        if (symbol !== undefined && symbol.flags & typescript_1.default.SymbolFlags.Alias) {
            symbol = checker.getAliasedSymbol(symbol);
        }
        if (symbol !== undefined &&
            symbol.valueDeclaration !== undefined &&
            typescript_1.default.isVariableDeclaration(symbol.valueDeclaration)) {
            hostField = symbol === null || symbol === void 0 ? void 0 : symbol.valueDeclaration.initializer;
        }
    }
    if (hostField === undefined || !typescript_1.default.isObjectLiteralExpression(hostField)) {
        return;
    }
    const hostMap = (0, reflection_1.reflectObjectLiteral)(hostField);
    const expressionResult = [];
    const expressionVisitor = new template_reference_visitor_1.TemplateExpressionReferenceVisitor(checker, null, node, knownFields, fieldNamesToConsiderForReferenceLookup);
    for (const [rawName, expression] of hostMap.entries()) {
        if (!typescript_1.default.isStringLiteralLike(expression)) {
            continue;
        }
        const isEventBinding = rawName.startsWith('(');
        const isPropertyBinding = rawName.startsWith('[');
        // Only migrate property or event bindings.
        if (!isPropertyBinding && !isEventBinding) {
            continue;
        }
        const parser = (0, compiler_1.makeBindingParser)();
        const sourceSpan = new compiler_1.ParseSourceSpan(
        // Fake source span to keep parsing offsets zero-based.
        // We then later combine these with the expression TS node offsets.
        new compiler_1.ParseLocation({ content: '', url: '' }, 0, 0, 0), new compiler_1.ParseLocation({ content: '', url: '' }, 0, 0, 0));
        const name = rawName.substring(1, rawName.length - 1);
        let parsed = undefined;
        if (isEventBinding) {
            const result = [];
            parser.parseEvent(name.substring(1, name.length - 1), expression.text, false, sourceSpan, sourceSpan, [], result, sourceSpan);
            parsed = result[0].handler;
        }
        else {
            const result = [];
            parser.parsePropertyBinding(name, expression.text, true, 
            /* isTwoWayBinding */ false, sourceSpan, 0, sourceSpan, [], result, sourceSpan);
            parsed = result[0].expression;
        }
        if (parsed != null) {
            expressionResult.push(...expressionVisitor.checkTemplateExpression(expression, parsed));
        }
    }
    for (const ref of expressionResult) {
        result.references.push({
            kind: reference_kinds_1.ReferenceKind.InHostBinding,
            from: {
                read: ref.read,
                readAstPath: ref.readAstPath,
                isObjectShorthandExpression: ref.isObjectShorthandExpression,
                isWrite: ref.isWrite,
                file: (0, tsurge_1.projectFile)(ref.context.getSourceFile(), programInfo),
                hostPropertyNode: ref.context,
            },
            target: ref.targetField,
        });
    }
}
