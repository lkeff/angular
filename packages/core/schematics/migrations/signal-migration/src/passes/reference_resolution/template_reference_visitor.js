"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateExpressionReferenceVisitor = exports.TemplateReferenceVisitor = void 0;
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const compiler_1 = require("@angular/compiler");
const lookup_property_access_1 = require("../../../../../utils/tsurge/helpers/ast/lookup_property_access");
/**
 * AST visitor that iterates through a template and finds all
 * input references.
 *
 * This resolution is important to be able to migrate references to inputs
 * that will be migrated to signal inputs.
 */
class TemplateReferenceVisitor extends compiler_1.TmplAstRecursiveVisitor {
    constructor(typeChecker, templateTypeChecker, componentClass, knownFields, fieldNamesToConsiderForReferenceLookup) {
        super();
        this.result = [];
        /**
         * Whether we are currently descending into HTML AST nodes
         * where all bound attributes are considered potentially narrowing.
         *
         * Keeps track of all referenced inputs in such attribute expressions.
         */
        this.templateAttributeReferencedFields = null;
        this.seenKnownFieldsCount = new Map();
        this.expressionVisitor = new TemplateExpressionReferenceVisitor(typeChecker, templateTypeChecker, componentClass, knownFields, fieldNamesToConsiderForReferenceLookup);
    }
    checkExpressionForReferencedFields(activeNode, expressionNode) {
        var _a;
        const referencedFields = this.expressionVisitor.checkTemplateExpression(activeNode, expressionNode);
        // Add all references to the overall visitor result.
        this.result.push(...referencedFields);
        // Count usages of seen input references. We'll use this to make decisions
        // based on whether inputs are potentially narrowed or not.
        for (const input of referencedFields) {
            this.seenKnownFieldsCount.set(input.targetField.key, ((_a = this.seenKnownFieldsCount.get(input.targetField.key)) !== null && _a !== void 0 ? _a : 0) + 1);
        }
        return referencedFields;
    }
    descendAndCheckForNarrowedSimilarReferences(potentiallyNarrowedInputs, descend) {
        var _a;
        const inputs = potentiallyNarrowedInputs.map((i) => {
            var _a;
            return ({
                ref: i,
                key: i.targetField.key,
                pastCount: (_a = this.seenKnownFieldsCount.get(i.targetField.key)) !== null && _a !== void 0 ? _a : 0,
            });
        });
        descend();
        for (const input of inputs) {
            // Input was referenced inside a narrowable spot, and is used in child nodes.
            // This is a sign for the input to be narrowed. Mark it as such.
            if (((_a = this.seenKnownFieldsCount.get(input.key)) !== null && _a !== void 0 ? _a : 0) > input.pastCount) {
                input.ref.isLikelyNarrowed = true;
            }
        }
    }
    visitTemplate(template) {
        // Note: We assume all bound expressions for templates may be subject
        // to TCB narrowing. This is relevant for now until we support narrowing
        // of signal calls in templates.
        // TODO: Remove with: https://github.com/angular/angular/pull/55456.
        this.templateAttributeReferencedFields = [];
        (0, compiler_1.tmplAstVisitAll)(this, template.attributes);
        (0, compiler_1.tmplAstVisitAll)(this, template.templateAttrs);
        // If we are dealing with a microsyntax template, do not check
        // inputs and outputs as those are already passed to the children.
        // Template attributes may contain relevant expressions though.
        if (template.tagName === 'ng-template') {
            (0, compiler_1.tmplAstVisitAll)(this, template.inputs);
            (0, compiler_1.tmplAstVisitAll)(this, template.outputs);
        }
        const referencedInputs = this.templateAttributeReferencedFields;
        this.templateAttributeReferencedFields = null;
        this.descendAndCheckForNarrowedSimilarReferences(referencedInputs, () => {
            (0, compiler_1.tmplAstVisitAll)(this, template.children);
            (0, compiler_1.tmplAstVisitAll)(this, template.references);
            (0, compiler_1.tmplAstVisitAll)(this, template.variables);
        });
    }
    visitIfBlockBranch(block) {
        if (block.expression) {
            const referencedFields = this.checkExpressionForReferencedFields(block, block.expression);
            this.descendAndCheckForNarrowedSimilarReferences(referencedFields, () => {
                super.visitIfBlockBranch(block);
            });
        }
        else {
            super.visitIfBlockBranch(block);
        }
    }
    visitForLoopBlock(block) {
        this.checkExpressionForReferencedFields(block, block.expression);
        this.checkExpressionForReferencedFields(block, block.trackBy);
        super.visitForLoopBlock(block);
    }
    visitSwitchBlock(block) {
        const referencedFields = this.checkExpressionForReferencedFields(block, block.expression);
        this.descendAndCheckForNarrowedSimilarReferences(referencedFields, () => {
            super.visitSwitchBlock(block);
        });
    }
    visitSwitchBlockCase(block) {
        if (block.expression) {
            const referencedFields = this.checkExpressionForReferencedFields(block, block.expression);
            this.descendAndCheckForNarrowedSimilarReferences(referencedFields, () => {
                super.visitSwitchBlockCase(block);
            });
        }
        else {
            super.visitSwitchBlockCase(block);
        }
    }
    visitDeferredBlock(deferred) {
        if (deferred.triggers.when) {
            this.checkExpressionForReferencedFields(deferred, deferred.triggers.when.value);
        }
        if (deferred.prefetchTriggers.when) {
            this.checkExpressionForReferencedFields(deferred, deferred.prefetchTriggers.when.value);
        }
        super.visitDeferredBlock(deferred);
    }
    visitBoundText(text) {
        this.checkExpressionForReferencedFields(text, text.value);
    }
    visitBoundEvent(attribute) {
        this.checkExpressionForReferencedFields(attribute, attribute.handler);
    }
    visitBoundAttribute(attribute) {
        const referencedFields = this.checkExpressionForReferencedFields(attribute, attribute.value);
        // Attributes inside templates are potentially "narrowed" and hence we
        // keep track of all referenced inputs to see if they actually are.
        if (this.templateAttributeReferencedFields !== null) {
            this.templateAttributeReferencedFields.push(...referencedFields);
        }
    }
}
exports.TemplateReferenceVisitor = TemplateReferenceVisitor;
/**
 * Expression AST visitor that checks whether a given expression references
 * a known `@Input()`.
 *
 * This resolution is important to be able to migrate references to inputs
 * that will be migrated to signal inputs.
 */
class TemplateExpressionReferenceVisitor extends compiler_1.RecursiveAstVisitor {
    constructor(typeChecker, templateTypeChecker, componentClass, knownFields, fieldNamesToConsiderForReferenceLookup) {
        super();
        this.typeChecker = typeChecker;
        this.templateTypeChecker = templateTypeChecker;
        this.componentClass = componentClass;
        this.knownFields = knownFields;
        this.fieldNamesToConsiderForReferenceLookup = fieldNamesToConsiderForReferenceLookup;
        this.activeTmplAstNode = null;
        this.detectedInputReferences = [];
        this.isInsideObjectShorthandExpression = false;
        this.insideConditionalExpressionsWithReads = [];
    }
    /** Checks the given AST expression. */
    checkTemplateExpression(activeNode, expressionNode) {
        this.detectedInputReferences = [];
        this.activeTmplAstNode = activeNode;
        expressionNode.visit(this, []);
        return this.detectedInputReferences;
    }
    visit(ast, context) {
        super.visit(ast, [...context, ast]);
    }
    // Keep track when we are inside an object shorthand expression. This is
    // necessary as we need to expand the shorthand to invoke a potential new signal.
    // E.g. `{bla}` may be transformed to `{bla: bla()}`.
    visitLiteralMap(ast, context) {
        for (const [idx, key] of ast.keys.entries()) {
            this.isInsideObjectShorthandExpression = !!key.isShorthandInitialized;
            ast.values[idx].visit(this, context);
            this.isInsideObjectShorthandExpression = false;
        }
    }
    visitPropertyRead(ast, context) {
        this._inspectPropertyAccess(ast, context);
        super.visitPropertyRead(ast, context);
    }
    visitSafePropertyRead(ast, context) {
        this._inspectPropertyAccess(ast, context);
        super.visitPropertyRead(ast, context);
    }
    visitPropertyWrite(ast, context) {
        this._inspectPropertyAccess(ast, context);
        super.visitPropertyWrite(ast, context);
    }
    visitConditional(ast, context) {
        this.visit(ast.condition, context);
        this.insideConditionalExpressionsWithReads.push(ast.condition);
        this.visit(ast.trueExp, context);
        this.visit(ast.falseExp, context);
        this.insideConditionalExpressionsWithReads.pop();
    }
    /**
     * Inspects the property access and attempts to resolve whether they access
     * a known field. If so, the result is captured.
     */
    _inspectPropertyAccess(ast, astPath) {
        if (this.fieldNamesToConsiderForReferenceLookup !== null &&
            !this.fieldNamesToConsiderForReferenceLookup.has(ast.name)) {
            return;
        }
        const isWrite = !!(ast instanceof compiler_1.PropertyWrite ||
            (this.activeTmplAstNode && isTwoWayBindingNode(this.activeTmplAstNode)));
        this._checkAccessViaTemplateTypeCheckBlock(ast, isWrite, astPath) ||
            this._checkAccessViaOwningComponentClassType(ast, isWrite, astPath);
    }
    /**
     * Checks whether the node refers to an input using the TCB information.
     * Type check block may not exist for e.g. test components, so this can return `null`.
     */
    _checkAccessViaTemplateTypeCheckBlock(ast, isWrite, astPath) {
        // There might be no template type checker. E.g. if we check host bindings.
        if (this.templateTypeChecker === null) {
            return false;
        }
        const symbol = this.templateTypeChecker.getSymbolOfNode(ast, this.componentClass);
        if ((symbol === null || symbol === void 0 ? void 0 : symbol.kind) !== api_1.SymbolKind.Expression || symbol.tsSymbol === null) {
            return false;
        }
        // Dangerous: Type checking symbol retrieval is a totally different `ts.Program`,
        // than the one where we analyzed `knownInputs`.
        // --> Find the input via its input id.
        const targetInput = this.knownFields.attemptRetrieveDescriptorFromSymbol(symbol.tsSymbol);
        if (targetInput === null) {
            return false;
        }
        this.detectedInputReferences.push({
            targetNode: targetInput.node,
            targetField: targetInput,
            read: ast,
            readAstPath: astPath,
            context: this.activeTmplAstNode,
            isLikelyNarrowed: this._isPartOfNarrowingTernary(ast),
            isObjectShorthandExpression: this.isInsideObjectShorthandExpression,
            isWrite,
        });
        return true;
    }
    /**
     * Simple resolution checking whether the given AST refers to a known input.
     * This is a fallback for when there is no type checking information (e.g. in host bindings).
     *
     * It attempts to resolve references by traversing accesses of the "component class" type.
     * e.g. `this.bla` is resolved via `CompType#bla` and further.
     */
    _checkAccessViaOwningComponentClassType(ast, isWrite, astPath) {
        // We might check host bindings, which can never point to template variables or local refs.
        const expressionTemplateTarget = this.templateTypeChecker === null
            ? null
            : this.templateTypeChecker.getExpressionTarget(ast, this.componentClass);
        // Skip checking if:
        // - the reference resolves to a template variable or local ref. No way to resolve without TCB.
        // - the owning component does not have a name (should not happen technically).
        if (expressionTemplateTarget !== null || this.componentClass.name === undefined) {
            return;
        }
        const property = traverseReceiverAndLookupSymbol(ast, this.componentClass, this.typeChecker);
        if (property === null) {
            return;
        }
        const matchingTarget = this.knownFields.attemptRetrieveDescriptorFromSymbol(property);
        if (matchingTarget === null) {
            return;
        }
        this.detectedInputReferences.push({
            targetNode: matchingTarget.node,
            targetField: matchingTarget,
            read: ast,
            readAstPath: astPath,
            context: this.activeTmplAstNode,
            isLikelyNarrowed: this._isPartOfNarrowingTernary(ast),
            isObjectShorthandExpression: this.isInsideObjectShorthandExpression,
            isWrite,
        });
    }
    _isPartOfNarrowingTernary(read) {
        // Note: We do not safe check that the reads are fully matching 1:1. This is acceptable
        // as worst case we just skip an input from being migrated. This is very unlikely too.
        return this.insideConditionalExpressionsWithReads.some((r) => (r instanceof compiler_1.PropertyRead ||
            r instanceof compiler_1.PropertyWrite ||
            r instanceof compiler_1.SafePropertyRead) &&
            r.name === read.name);
    }
}
exports.TemplateExpressionReferenceVisitor = TemplateExpressionReferenceVisitor;
/**
 * Emulates an access to a given field using the TypeScript `ts.Type`
 * of the given class. The resolved symbol of the access is returned.
 */
function traverseReceiverAndLookupSymbol(readOrWrite, componentClass, checker) {
    var _a, _b;
    const path = [readOrWrite.name];
    let node = readOrWrite;
    while (node.receiver instanceof compiler_1.PropertyRead || node.receiver instanceof compiler_1.PropertyWrite) {
        node = node.receiver;
        path.unshift(node.name);
    }
    if (!(node.receiver instanceof compiler_1.ImplicitReceiver || node.receiver instanceof compiler_1.ThisReceiver)) {
        return null;
    }
    const classType = checker.getTypeAtLocation(componentClass.name);
    return ((_b = (_a = (0, lookup_property_access_1.lookupPropertyAccess)(checker, classType, path, {
        // Necessary to avoid breaking the resolution if there is
        // some narrowing involved. E.g. `myClass ? myClass.input`.
        ignoreNullability: true,
    })) === null || _a === void 0 ? void 0 : _a.symbol) !== null && _b !== void 0 ? _b : null);
}
/** Whether the given node refers to a two-way binding AST node. */
function isTwoWayBindingNode(node) {
    return ((node instanceof compiler_1.TmplAstBoundAttribute && node.type === compiler_1.BindingType.TwoWay) ||
        (node instanceof compiler_1.TmplAstBoundEvent && node.type === compiler_1.ParsedEventType.TwoWay));
}
