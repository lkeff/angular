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
exports.extractSourceQueryDefinition = extractSourceQueryDefinition;
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const directive_1 = require("@angular/compiler-cli/src/ngtsc/annotations/directive");
const typescript_1 = __importDefault(require("typescript"));
const field_tracking_1 = require("./field_tracking");
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
/**
 * Determines if the given node refers to a decorator-based query, and
 * returns its resolved metadata if possible.
 */
function extractSourceQueryDefinition(node, reflector, evaluator, info) {
    var _a, _b, _c;
    if ((!typescript_1.default.isPropertyDeclaration(node) && !typescript_1.default.isAccessor(node)) ||
        !typescript_1.default.isClassDeclaration(node.parent) ||
        node.parent.name === undefined ||
        !typescript_1.default.isIdentifier(node.name)) {
        return null;
    }
    const decorators = (_a = reflector.getDecoratorsOfDeclaration(node)) !== null && _a !== void 0 ? _a : [];
    const ngDecorators = (0, annotations_1.getAngularDecorators)(decorators, annotations_1.queryDecoratorNames, /* isCore */ false);
    if (ngDecorators.length === 0) {
        return null;
    }
    const decorator = ngDecorators[0];
    const id = (0, field_tracking_1.getUniqueIDForClassProperty)(node, info);
    if (id === null) {
        return null;
    }
    let kind;
    if (decorator.name === 'ViewChild') {
        kind = 'viewChild';
    }
    else if (decorator.name === 'ViewChildren') {
        kind = 'viewChildren';
    }
    else if (decorator.name === 'ContentChild') {
        kind = 'contentChild';
    }
    else if (decorator.name === 'ContentChildren') {
        kind = 'contentChildren';
    }
    else {
        throw new Error('Unexpected query decorator detected.');
    }
    let queryInfo = null;
    try {
        queryInfo = (0, directive_1.extractDecoratorQueryMetadata)(node, decorator.name, (_b = decorator.args) !== null && _b !== void 0 ? _b : [], node.name.text, reflector, evaluator);
    }
    catch (e) {
        if (!(e instanceof diagnostics_1.FatalDiagnosticError)) {
            throw e;
        }
        console.error(`Skipping query: ${e.node.getSourceFile().fileName}: ${e.toString()}`);
        return null;
    }
    return {
        id,
        kind,
        args: (_c = decorator.args) !== null && _c !== void 0 ? _c : [],
        queryInfo,
        node: node,
        fieldDecorators: decorators,
    };
}
