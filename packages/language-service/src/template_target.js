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
exports.TargetNodeKind = void 0;
exports.getTargetAtPosition = getTargetAtPosition;
exports.getTcbNodesOfTemplateAtPosition = getTcbNodesOfTemplateAtPosition;
const compiler_1 = require("@angular/compiler");
const comments_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/src/comments");
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("./utils");
/**
 * Differentiates the various kinds of `TargetNode`s.
 */
var TargetNodeKind;
(function (TargetNodeKind) {
    TargetNodeKind[TargetNodeKind["RawExpression"] = 0] = "RawExpression";
    TargetNodeKind[TargetNodeKind["CallExpressionInArgContext"] = 1] = "CallExpressionInArgContext";
    TargetNodeKind[TargetNodeKind["RawTemplateNode"] = 2] = "RawTemplateNode";
    TargetNodeKind[TargetNodeKind["ElementInTagContext"] = 3] = "ElementInTagContext";
    TargetNodeKind[TargetNodeKind["ElementInBodyContext"] = 4] = "ElementInBodyContext";
    TargetNodeKind[TargetNodeKind["AttributeInKeyContext"] = 5] = "AttributeInKeyContext";
    TargetNodeKind[TargetNodeKind["AttributeInValueContext"] = 6] = "AttributeInValueContext";
    TargetNodeKind[TargetNodeKind["TwoWayBindingContext"] = 7] = "TwoWayBindingContext";
})(TargetNodeKind || (exports.TargetNodeKind = TargetNodeKind = {}));
/**
 * Special marker AST that can be used when the cursor is within the `sourceSpan` but not
 * the key or value span of a node with key/value spans.
 */
class OutsideKeyValueMarkerAst extends compiler_1.AST {
    visit() {
        return null;
    }
}
/**
 * This special marker is added to the path when the cursor is within the sourceSpan but not the key
 * or value span of a node with key/value spans.
 */
const OUTSIDE_K_V_MARKER = new OutsideKeyValueMarkerAst(new compiler_1.ParseSpan(-1, -1), new compiler_1.AbsoluteSourceSpan(-1, -1));
/**
 * Return the template AST node or expression AST node that most accurately
 * represents the node at the specified cursor `position`.
 *
 * @param template AST tree of the template
 * @param position target cursor position
 */
function getTargetAtPosition(template, position) {
    const path = TemplateTargetVisitor.visitTemplate(template, position);
    if (path.length === 0) {
        return null;
    }
    const candidate = path[path.length - 1];
    // Walk up the result nodes to find the nearest `TmplAstTemplate` which contains the targeted
    // node.
    let context = null;
    for (let i = path.length - 2; i >= 0; i--) {
        const node = path[i];
        if (node instanceof compiler_1.TmplAstTemplate) {
            context = node;
            break;
        }
    }
    // Given the candidate node, determine the full targeted context.
    let nodeInContext;
    if ((candidate instanceof compiler_1.Call || candidate instanceof compiler_1.SafeCall) &&
        (0, utils_1.isWithin)(position, candidate.argumentSpan)) {
        nodeInContext = {
            kind: TargetNodeKind.CallExpressionInArgContext,
            node: candidate,
        };
    }
    else if (candidate instanceof compiler_1.AST) {
        const parents = path.filter((value) => value instanceof compiler_1.AST);
        // Remove the current node from the parents list.
        parents.pop();
        nodeInContext = {
            kind: TargetNodeKind.RawExpression,
            node: candidate,
            parents,
        };
    }
    else if (candidate instanceof compiler_1.TmplAstElement) {
        // Elements have two contexts: the tag context (position is within the element tag) or the
        // element body context (position is outside of the tag name, but still in the element).
        // Calculate the end of the element tag name. Any position beyond this is in the element body.
        const tagEndPos = candidate.sourceSpan.start.offset + 1 /* '<' element open */ + candidate.name.length;
        if (position > tagEndPos) {
            // Position is within the element body
            nodeInContext = {
                kind: TargetNodeKind.ElementInBodyContext,
                node: candidate,
            };
        }
        else {
            nodeInContext = {
                kind: TargetNodeKind.ElementInTagContext,
                node: candidate,
            };
        }
    }
    else if ((candidate instanceof compiler_1.TmplAstBoundAttribute ||
        candidate instanceof compiler_1.TmplAstBoundEvent ||
        candidate instanceof compiler_1.TmplAstTextAttribute) &&
        candidate.keySpan !== undefined) {
        const previousCandidate = path[path.length - 2];
        if (candidate instanceof compiler_1.TmplAstBoundEvent &&
            previousCandidate instanceof compiler_1.TmplAstBoundAttribute &&
            candidate.name === previousCandidate.name + 'Change') {
            const boundAttribute = previousCandidate;
            const boundEvent = candidate;
            nodeInContext = {
                kind: TargetNodeKind.TwoWayBindingContext,
                nodes: [boundAttribute, boundEvent],
            };
        }
        else if ((0, utils_1.isWithin)(position, candidate.keySpan)) {
            nodeInContext = {
                kind: TargetNodeKind.AttributeInKeyContext,
                node: candidate,
            };
        }
        else {
            nodeInContext = {
                kind: TargetNodeKind.AttributeInValueContext,
                node: candidate,
            };
        }
    }
    else {
        nodeInContext = {
            kind: TargetNodeKind.RawTemplateNode,
            node: candidate,
        };
    }
    let parent = null;
    if (nodeInContext.kind === TargetNodeKind.TwoWayBindingContext && path.length >= 3) {
        parent = path[path.length - 3];
    }
    else if (path.length >= 2) {
        parent = path[path.length - 2];
    }
    return { position, context: nodeInContext, template: context, parent };
}
function findFirstMatchingNodeForSourceSpan(tcb, sourceSpan) {
    return (0, comments_1.findFirstMatchingNode)(tcb, {
        withSpan: sourceSpan,
        filter: (node) => true,
    });
}
/**
 * Return the nodes in `TCB` of the node at the specified cursor `position`.
 *
 */
function getTcbNodesOfTemplateAtPosition(typeCheckInfo, position, compiler) {
    var _a;
    const target = getTargetAtPosition(typeCheckInfo.nodes, position);
    if (target === null) {
        return null;
    }
    const tcb = compiler.getTemplateTypeChecker().getTypeCheckBlock(typeCheckInfo.declaration);
    if (tcb === null) {
        return null;
    }
    const tcbNodes = [];
    if (target.context.kind === TargetNodeKind.RawExpression) {
        const targetNode = target.context.node;
        if (targetNode instanceof compiler_1.PropertyRead) {
            const tsNode = (0, comments_1.findFirstMatchingNode)(tcb, {
                withSpan: targetNode.nameSpan,
                filter: (node) => typescript_1.default.isPropertyAccessExpression(node),
            });
            tcbNodes.push((_a = tsNode === null || tsNode === void 0 ? void 0 : tsNode.name) !== null && _a !== void 0 ? _a : null);
        }
        else {
            tcbNodes.push(findFirstMatchingNodeForSourceSpan(tcb, target.context.node.sourceSpan));
        }
    }
    else if (target.context.kind === TargetNodeKind.TwoWayBindingContext) {
        const targetNodes = target.context.nodes
            .map((n) => n.sourceSpan)
            .map((node) => {
            return findFirstMatchingNodeForSourceSpan(tcb, node);
        });
        tcbNodes.push(...targetNodes);
    }
    else {
        tcbNodes.push(findFirstMatchingNodeForSourceSpan(tcb, target.context.node.sourceSpan));
    }
    return {
        nodes: tcbNodes.filter((n) => n !== null),
        componentTcbNode: tcb,
    };
}
/**
 * Visitor which, given a position and a template, identifies the node within the template at that
 * position, as well as records the path of increasingly nested nodes that were traversed to reach
 * that position.
 */
class TemplateTargetVisitor {
    static visitTemplate(template, position) {
        const visitor = new TemplateTargetVisitor(position);
        visitor.visitAll(template);
        const { path } = visitor;
        const strictPath = path.filter((v) => v !== OUTSIDE_K_V_MARKER);
        const candidate = strictPath[strictPath.length - 1];
        const matchedASourceSpanButNotAKvSpan = path.some((v) => v === OUTSIDE_K_V_MARKER);
        if (matchedASourceSpanButNotAKvSpan &&
            (candidate instanceof compiler_1.TmplAstTemplate || candidate instanceof compiler_1.TmplAstElement)) {
            // Template nodes with key and value spans are always defined on a `TmplAstTemplate` or
            // `TmplAstElement`. If we found a node on a template with a `sourceSpan` that includes the
            // cursor, it is possible that we are outside the k/v spans (i.e. in-between them). If this is
            // the case and we do not have any other candidate matches on the `TmplAstElement` or
            // `TmplAstTemplate`, we want to return no results. Otherwise, the
            // `TmplAstElement`/`TmplAstTemplate` result is incorrect for that cursor position.
            return [];
        }
        return strictPath;
    }
    // Position must be absolute in the source file.
    constructor(position) {
        this.position = position;
        // We need to keep a path instead of the last node because we might need more
        // context for the last node, for example what is the parent node?
        this.path = [];
    }
    visit(node) {
        if (!isWithinNode(this.position, node)) {
            return;
        }
        const last = this.path[this.path.length - 1];
        const withinKeySpanOfLastNode = last && (0, utils_1.isTemplateNodeWithKeyAndValue)(last) && (0, utils_1.isWithin)(this.position, last.keySpan);
        const withinKeySpanOfCurrentNode = (0, utils_1.isTemplateNodeWithKeyAndValue)(node) && (0, utils_1.isWithin)(this.position, node.keySpan);
        if (withinKeySpanOfLastNode && !withinKeySpanOfCurrentNode) {
            // We've already identified that we are within a `keySpan` of a node.
            // Unless we are _also_ in the `keySpan` of the current node (happens with two way bindings),
            // we should stop processing nodes at this point to prevent matching any other nodes. This can
            // happen when the end span of a different node touches the start of the keySpan for the
            // candidate node. Because our `isWithin` logic is inclusive on both ends, we can match both
            // nodes.
            return;
        }
        if (last instanceof compiler_1.TmplAstUnknownBlock && (0, utils_1.isWithin)(this.position, last.nameSpan)) {
            // Autocompletions such as `@\nfoo`, where a newline follows a bare `@`, would not work
            // because the language service visitor sees us inside the subsequent text node. We deal with
            // this with using a special-case: if we are completing inside the name span, we don't
            // continue to the subsequent text node.
            return;
        }
        if ((0, utils_1.isTemplateNodeWithKeyAndValue)(node) && !(0, utils_1.isWithinKeyValue)(this.position, node)) {
            // If cursor is within source span but not within key span or value span,
            // do not return the node.
            this.path.push(OUTSIDE_K_V_MARKER);
        }
        else if (node instanceof compiler_1.TmplAstHostElement) {
            this.path.push(node);
            this.visitAll(node.bindings);
            this.visitAll(node.listeners);
        }
        else {
            this.path.push(node);
            node.visit(this);
        }
    }
    visitElement(element) {
        this.visitElementOrTemplate(element);
    }
    visitTemplate(template) {
        this.visitElementOrTemplate(template);
    }
    visitElementOrTemplate(element) {
        const isTemplate = element instanceof compiler_1.TmplAstTemplate;
        this.visitAll(element.attributes);
        if (!isTemplate) {
            this.visitAll(element.directives);
        }
        this.visitAll(element.inputs);
        // We allow the path to contain both the `TmplAstBoundAttribute` and `TmplAstBoundEvent` for
        // two-way bindings but do not want the path to contain both the `TmplAstBoundAttribute` with
        // its children when the position is in the value span because we would then logically create a
        // path that also contains the `PropertyWrite` from the `TmplAstBoundEvent`. This early return
        // condition ensures we target just `TmplAstBoundAttribute` for this case and exclude
        // `TmplAstBoundEvent` children.
        if (this.path[this.path.length - 1] !== element &&
            !(this.path[this.path.length - 1] instanceof compiler_1.TmplAstBoundAttribute)) {
            return;
        }
        this.visitAll(element.outputs);
        if (isTemplate) {
            this.visitAll(element.templateAttrs);
        }
        this.visitAll(element.references);
        if (isTemplate) {
            this.visitAll(element.variables);
        }
        // If we get here and have not found a candidate node on the element itself, proceed with
        // looking for a more specific node on the element children.
        if (this.path[this.path.length - 1] !== element) {
            return;
        }
        this.visitAll(element.children);
    }
    visitContent(content) {
        (0, compiler_1.tmplAstVisitAll)(this, content.attributes);
        this.visitAll(content.children);
    }
    visitVariable(variable) {
        // Variable has no template nodes or expression nodes.
    }
    visitReference(reference) {
        // Reference has no template nodes or expression nodes.
    }
    visitTextAttribute(attribute) {
        // Text attribute has no template nodes or expression nodes.
    }
    visitBoundAttribute(attribute) {
        if (attribute.valueSpan !== undefined) {
            this.visitBinding(attribute.value);
        }
    }
    visitBoundEvent(event) {
        if (!(0, utils_1.isBoundEventWithSyntheticHandler)(event)) {
            this.visitBinding(event.handler);
        }
    }
    visitText(text) {
        // Text has no template nodes or expression nodes.
    }
    visitBoundText(text) {
        this.visitBinding(text.value);
    }
    visitIcu(icu) {
        for (const boundText of Object.values(icu.vars)) {
            this.visit(boundText);
        }
        for (const boundTextOrText of Object.values(icu.placeholders)) {
            this.visit(boundTextOrText);
        }
    }
    visitDeferredBlock(deferred) {
        deferred.visitAll(this);
    }
    visitDeferredBlockPlaceholder(block) {
        this.visitAll(block.children);
    }
    visitDeferredBlockError(block) {
        this.visitAll(block.children);
    }
    visitDeferredBlockLoading(block) {
        this.visitAll(block.children);
    }
    visitDeferredTrigger(trigger) {
        if (trigger instanceof compiler_1.TmplAstBoundDeferredTrigger) {
            this.visitBinding(trigger.value);
        }
    }
    visitSwitchBlock(block) {
        this.visitBinding(block.expression);
        this.visitAll(block.cases);
        this.visitAll(block.unknownBlocks);
    }
    visitSwitchBlockCase(block) {
        block.expression && this.visitBinding(block.expression);
        this.visitAll(block.children);
    }
    visitForLoopBlock(block) {
        this.visit(block.item);
        this.visitAll(block.contextVariables);
        this.visitBinding(block.expression);
        this.visitBinding(block.trackBy);
        this.visitAll(block.children);
        block.empty && this.visit(block.empty);
    }
    visitForLoopBlockEmpty(block) {
        this.visitAll(block.children);
    }
    visitIfBlock(block) {
        this.visitAll(block.branches);
    }
    visitIfBlockBranch(block) {
        block.expression && this.visitBinding(block.expression);
        block.expressionAlias && this.visit(block.expressionAlias);
        this.visitAll(block.children);
    }
    visitUnknownBlock(block) { }
    visitLetDeclaration(decl) {
        this.visitBinding(decl.value);
    }
    visitComponent(component) {
        // TODO(crisbeto): integrate selectorless
    }
    visitDirective(directive) {
        // TODO(crisbeto): integrate selectorless
    }
    visitAll(nodes) {
        for (const node of nodes) {
            this.visit(node);
        }
    }
    visitBinding(expression) {
        const visitor = new ExpressionVisitor(this.position);
        visitor.visit(expression, this.path);
    }
}
class ExpressionVisitor extends compiler_1.RecursiveAstVisitor {
    // Position must be absolute in the source file.
    constructor(position) {
        super();
        this.position = position;
    }
    visit(node, path) {
        if (node instanceof compiler_1.ASTWithSource) {
            // In order to reduce noise, do not include `ASTWithSource` in the path.
            // For the purpose of source spans, there is no difference between
            // `ASTWithSource` and underlying node that it wraps.
            node = node.ast;
        }
        // The third condition is to account for the implicit receiver, which should
        // not be visited.
        if ((0, utils_1.isWithin)(this.position, node.sourceSpan) && !(node instanceof compiler_1.ImplicitReceiver)) {
            path.push(node);
            node.visit(this, path);
        }
    }
}
function getSpanIncludingEndTag(ast) {
    const result = {
        start: ast.sourceSpan.start.offset,
        end: ast.sourceSpan.end.offset,
    };
    // For Element and Template node, sourceSpan.end is the end of the opening
    // tag. For the purpose of language service, we need to actually recognize
    // the end of the closing tag. Otherwise, for situation like
    // <my-component></my-comp¦onent> where the cursor is in the closing tag
    // we will not be able to return any information.
    if (ast instanceof compiler_1.TmplAstElement || ast instanceof compiler_1.TmplAstTemplate) {
        if (ast.endSourceSpan) {
            result.end = ast.endSourceSpan.end.offset;
        }
        else if (ast.children.length > 0) {
            // If the AST has children but no end source span, then it is an unclosed element with an end
            // that should be the end of the last child.
            result.end = getSpanIncludingEndTag(ast.children[ast.children.length - 1]).end;
        }
        else {
            // This is likely a self-closing tag with no children so the `sourceSpan.end` is correct.
        }
    }
    return result;
}
/** Checks whether a position is within an AST node. */
function isWithinNode(position, node) {
    if (!(node instanceof compiler_1.TmplAstHostElement)) {
        return (0, utils_1.isWithin)(position, getSpanIncludingEndTag(node));
    }
    // Host elements are special in that they don't have a contiguous source span. E.g. some bindings
    // can be in the `host` literal in the decorator while others are on class members. That's why we
    // need to check each binding, rather than the host element itself.
    return ((node.bindings.length > 0 &&
        node.bindings.some((binding) => (0, utils_1.isWithin)(position, binding.sourceSpan))) ||
        (node.listeners.length > 0 &&
            node.listeners.some((listener) => (0, utils_1.isWithin)(position, listener.sourceSpan))));
}
