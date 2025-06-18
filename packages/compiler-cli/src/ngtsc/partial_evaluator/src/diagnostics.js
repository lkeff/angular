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
exports.describeResolvedType = describeResolvedType;
exports.traceDynamicValue = traceDynamicValue;
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../diagnostics");
const imports_1 = require("../../imports");
const dynamic_1 = require("./dynamic");
const result_1 = require("./result");
/**
 * Derives a type representation from a resolved value to be reported in a diagnostic.
 *
 * @param value The resolved value for which a type representation should be derived.
 * @param maxDepth The maximum nesting depth of objects and arrays, defaults to 1 level.
 */
function describeResolvedType(value, maxDepth = 1) {
    var _a, _b;
    if (value === null) {
        return 'null';
    }
    else if (value === undefined) {
        return 'undefined';
    }
    else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
        return typeof value;
    }
    else if (value instanceof Map) {
        if (maxDepth === 0) {
            return 'object';
        }
        const entries = Array.from(value.entries()).map(([key, v]) => {
            return `${quoteKey(key)}: ${describeResolvedType(v, maxDepth - 1)}`;
        });
        return entries.length > 0 ? `{ ${entries.join('; ')} }` : '{}';
    }
    else if (value instanceof result_1.ResolvedModule) {
        return '(module)';
    }
    else if (value instanceof result_1.EnumValue) {
        return (_a = value.enumRef.debugName) !== null && _a !== void 0 ? _a : '(anonymous)';
    }
    else if (value instanceof imports_1.Reference) {
        return (_b = value.debugName) !== null && _b !== void 0 ? _b : '(anonymous)';
    }
    else if (Array.isArray(value)) {
        if (maxDepth === 0) {
            return 'Array';
        }
        return `[${value.map((v) => describeResolvedType(v, maxDepth - 1)).join(', ')}]`;
    }
    else if (value instanceof dynamic_1.DynamicValue) {
        return '(not statically analyzable)';
    }
    else if (value instanceof result_1.KnownFn) {
        return 'Function';
    }
    else {
        return 'unknown';
    }
}
function quoteKey(key) {
    if (/^[a-z0-9_]+$/i.test(key)) {
        return key;
    }
    else {
        return `'${key.replace(/'/g, "\\'")}'`;
    }
}
/**
 * Creates an array of related information diagnostics for a `DynamicValue` that describe the trace
 * of why an expression was evaluated as dynamic.
 *
 * @param node The node for which a `ts.Diagnostic` is to be created with the trace.
 * @param value The dynamic value for which a trace should be created.
 */
function traceDynamicValue(node, value) {
    return value.accept(new TraceDynamicValueVisitor(node));
}
class TraceDynamicValueVisitor {
    constructor(node) {
        this.node = node;
        this.currentContainerNode = null;
    }
    visitDynamicInput(value) {
        const trace = value.reason.accept(this);
        if (this.shouldTrace(value.node)) {
            const info = (0, diagnostics_1.makeRelatedInformation)(value.node, 'Unable to evaluate this expression statically.');
            trace.unshift(info);
        }
        return trace;
    }
    visitSyntheticInput(value) {
        return [(0, diagnostics_1.makeRelatedInformation)(value.node, 'Unable to evaluate this expression further.')];
    }
    visitDynamicString(value) {
        return [
            (0, diagnostics_1.makeRelatedInformation)(value.node, 'A string value could not be determined statically.'),
        ];
    }
    visitExternalReference(value) {
        const name = value.reason.debugName;
        const description = name !== null ? `'${name}'` : 'an anonymous declaration';
        return [
            (0, diagnostics_1.makeRelatedInformation)(value.node, `A value for ${description} cannot be determined statically, as it is an external declaration.`),
        ];
    }
    visitComplexFunctionCall(value) {
        return [
            (0, diagnostics_1.makeRelatedInformation)(value.node, 'Unable to evaluate function call of complex function. A function must have exactly one return statement.'),
            (0, diagnostics_1.makeRelatedInformation)(value.reason.node, 'Function is declared here.'),
        ];
    }
    visitInvalidExpressionType(value) {
        return [(0, diagnostics_1.makeRelatedInformation)(value.node, 'Unable to evaluate an invalid expression.')];
    }
    visitUnknown(value) {
        return [(0, diagnostics_1.makeRelatedInformation)(value.node, 'Unable to evaluate statically.')];
    }
    visitUnknownIdentifier(value) {
        return [(0, diagnostics_1.makeRelatedInformation)(value.node, 'Unknown reference.')];
    }
    visitDynamicType(value) {
        return [(0, diagnostics_1.makeRelatedInformation)(value.node, 'Dynamic type.')];
    }
    visitUnsupportedSyntax(value) {
        return [(0, diagnostics_1.makeRelatedInformation)(value.node, 'This syntax is not supported.')];
    }
    /**
     * Determines whether the dynamic value reported for the node should be traced, i.e. if it is not
     * part of the container for which the most recent trace was created.
     */
    shouldTrace(node) {
        if (node === this.node) {
            // Do not include a dynamic value for the origin node, as the main diagnostic is already
            // reported on that node.
            return false;
        }
        const container = getContainerNode(node);
        if (container === this.currentContainerNode) {
            // The node is part of the same container as the previous trace entry, so this dynamic value
            // should not become part of the trace.
            return false;
        }
        this.currentContainerNode = container;
        return true;
    }
}
/**
 * Determines the closest parent node that is to be considered as container, which is used to reduce
 * the granularity of tracing the dynamic values to a single entry per container. Currently, full
 * statements and destructuring patterns are considered as container.
 */
function getContainerNode(node) {
    let currentNode = node;
    while (currentNode !== undefined) {
        switch (currentNode.kind) {
            case typescript_1.default.SyntaxKind.ExpressionStatement:
            case typescript_1.default.SyntaxKind.VariableStatement:
            case typescript_1.default.SyntaxKind.ReturnStatement:
            case typescript_1.default.SyntaxKind.IfStatement:
            case typescript_1.default.SyntaxKind.SwitchStatement:
            case typescript_1.default.SyntaxKind.DoStatement:
            case typescript_1.default.SyntaxKind.WhileStatement:
            case typescript_1.default.SyntaxKind.ForStatement:
            case typescript_1.default.SyntaxKind.ForInStatement:
            case typescript_1.default.SyntaxKind.ForOfStatement:
            case typescript_1.default.SyntaxKind.ContinueStatement:
            case typescript_1.default.SyntaxKind.BreakStatement:
            case typescript_1.default.SyntaxKind.ThrowStatement:
            case typescript_1.default.SyntaxKind.ObjectBindingPattern:
            case typescript_1.default.SyntaxKind.ArrayBindingPattern:
                return currentNode;
        }
        currentNode = currentNode.parent;
    }
    return node.getSourceFile();
}
