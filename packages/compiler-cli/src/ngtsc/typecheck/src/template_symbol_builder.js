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
exports.SymbolBuilder = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const scope_1 = require("../../scope");
const typescript_2 = require("../../util/src/typescript");
const api_1 = require("../api");
const comments_1 = require("./comments");
const ts_util_1 = require("./ts_util");
const program_driver_1 = require("../../program_driver");
/**
 * Generates and caches `Symbol`s for various template structures for a given component.
 *
 * The `SymbolBuilder` internally caches the `Symbol`s it creates, and must be destroyed and
 * replaced if the component's template changes.
 */
class SymbolBuilder {
    constructor(tcbPath, tcbIsShim, typeCheckBlock, typeCheckData, componentScopeReader, 
    // The `ts.TypeChecker` depends on the current type-checking program, and so must be requested
    // on-demand instead of cached.
    getTypeChecker) {
        this.tcbPath = tcbPath;
        this.tcbIsShim = tcbIsShim;
        this.typeCheckBlock = typeCheckBlock;
        this.typeCheckData = typeCheckData;
        this.componentScopeReader = componentScopeReader;
        this.getTypeChecker = getTypeChecker;
        this.symbolCache = new Map();
    }
    getSymbol(node) {
        if (this.symbolCache.has(node)) {
            return this.symbolCache.get(node);
        }
        let symbol = null;
        if (node instanceof compiler_1.TmplAstBoundAttribute || node instanceof compiler_1.TmplAstTextAttribute) {
            // TODO(atscott): input and output bindings only return the first directive match but should
            // return a list of bindings for all of them.
            symbol = this.getSymbolOfInputBinding(node);
        }
        else if (node instanceof compiler_1.TmplAstBoundEvent) {
            symbol = this.getSymbolOfBoundEvent(node);
        }
        else if (node instanceof compiler_1.TmplAstElement) {
            symbol = this.getSymbolOfElement(node);
        }
        else if (node instanceof compiler_1.TmplAstTemplate) {
            symbol = this.getSymbolOfAstTemplate(node);
        }
        else if (node instanceof compiler_1.TmplAstVariable) {
            symbol = this.getSymbolOfVariable(node);
        }
        else if (node instanceof compiler_1.TmplAstLetDeclaration) {
            symbol = this.getSymbolOfLetDeclaration(node);
        }
        else if (node instanceof compiler_1.TmplAstReference) {
            symbol = this.getSymbolOfReference(node);
        }
        else if (node instanceof compiler_1.BindingPipe) {
            symbol = this.getSymbolOfPipe(node);
        }
        else if (node instanceof compiler_1.AST) {
            symbol = this.getSymbolOfTemplateExpression(node);
        }
        else {
            // TODO(atscott): TmplAstContent, TmplAstIcu
        }
        this.symbolCache.set(node, symbol);
        return symbol;
    }
    getSymbolOfAstTemplate(template) {
        const directives = this.getDirectivesOfNode(template);
        return { kind: api_1.SymbolKind.Template, directives, templateNode: template };
    }
    getSymbolOfElement(element) {
        var _a;
        const elementSourceSpan = (_a = element.startSourceSpan) !== null && _a !== void 0 ? _a : element.sourceSpan;
        const node = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, {
            withSpan: elementSourceSpan,
            filter: typescript_1.default.isVariableDeclaration,
        });
        if (node === null) {
            return null;
        }
        const symbolFromDeclaration = this.getSymbolOfTsNode(node);
        if (symbolFromDeclaration === null || symbolFromDeclaration.tsSymbol === null) {
            return null;
        }
        const directives = this.getDirectivesOfNode(element);
        // All statements in the TCB are `Expression`s that optionally include more information.
        // An `ElementSymbol` uses the information returned for the variable declaration expression,
        // adds the directives for the element, and updates the `kind` to be `SymbolKind.Element`.
        return Object.assign(Object.assign({}, symbolFromDeclaration), { kind: api_1.SymbolKind.Element, directives, templateNode: element });
    }
    getDirectivesOfNode(element) {
        var _a;
        const elementSourceSpan = (_a = element.startSourceSpan) !== null && _a !== void 0 ? _a : element.sourceSpan;
        const tcbSourceFile = this.typeCheckBlock.getSourceFile();
        // directives could be either:
        // - var _t1: TestDir /*T:D*/ = null! as TestDir;
        // - var _t1 /*T:D*/ = _ctor1({});
        const isDirectiveDeclaration = (node) => (typescript_1.default.isTypeNode(node) || typescript_1.default.isIdentifier(node)) &&
            typescript_1.default.isVariableDeclaration(node.parent) &&
            (0, comments_1.hasExpressionIdentifier)(tcbSourceFile, node, comments_1.ExpressionIdentifier.DIRECTIVE);
        const nodes = (0, comments_1.findAllMatchingNodes)(this.typeCheckBlock, {
            withSpan: elementSourceSpan,
            filter: isDirectiveDeclaration,
        });
        const symbols = [];
        for (const node of nodes) {
            const symbol = this.getSymbolOfTsNode(node.parent);
            if (symbol === null ||
                !(0, typescript_2.isSymbolWithValueDeclaration)(symbol.tsSymbol) ||
                !typescript_1.default.isClassDeclaration(symbol.tsSymbol.valueDeclaration)) {
                continue;
            }
            const meta = this.getDirectiveMeta(element, symbol.tsSymbol.valueDeclaration);
            if (meta !== null && meta.selector !== null) {
                const ref = new imports_1.Reference(symbol.tsSymbol.valueDeclaration);
                if (meta.hostDirectives !== null) {
                    this.addHostDirectiveSymbols(element, meta.hostDirectives, symbols);
                }
                const directiveSymbol = Object.assign(Object.assign({}, symbol), { ref, tsSymbol: symbol.tsSymbol, selector: meta.selector, isComponent: meta.isComponent, ngModule: this.getDirectiveModule(symbol.tsSymbol.valueDeclaration), kind: api_1.SymbolKind.Directive, isStructural: meta.isStructural, isInScope: true, isHostDirective: false });
                symbols.push(directiveSymbol);
            }
        }
        return symbols;
    }
    addHostDirectiveSymbols(host, hostDirectives, symbols) {
        for (const current of hostDirectives) {
            if (!(0, metadata_1.isHostDirectiveMetaForGlobalMode)(current)) {
                throw new Error('Impossible state: typecheck code path in local compilation mode.');
            }
            if (!typescript_1.default.isClassDeclaration(current.directive.node)) {
                continue;
            }
            const symbol = this.getSymbolOfTsNode(current.directive.node);
            const meta = this.getDirectiveMeta(host, current.directive.node);
            if (meta !== null && symbol !== null && (0, typescript_2.isSymbolWithValueDeclaration)(symbol.tsSymbol)) {
                if (meta.hostDirectives !== null) {
                    this.addHostDirectiveSymbols(host, meta.hostDirectives, symbols);
                }
                const directiveSymbol = Object.assign(Object.assign({}, symbol), { isHostDirective: true, ref: current.directive, tsSymbol: symbol.tsSymbol, exposedInputs: current.inputs, exposedOutputs: current.outputs, selector: meta.selector, isComponent: meta.isComponent, ngModule: this.getDirectiveModule(current.directive.node), kind: api_1.SymbolKind.Directive, isStructural: meta.isStructural, isInScope: true });
                symbols.push(directiveSymbol);
            }
        }
    }
    getDirectiveMeta(host, directiveDeclaration) {
        var _a;
        let directives = this.typeCheckData.boundTarget.getDirectivesOfNode(host);
        // `getDirectivesOfNode` will not return the directives intended for an element
        // on a microsyntax template, for example `<div *ngFor="let user of users;" dir>`,
        // the `dir` will be skipped, but it's needed in language service.
        const firstChild = host.children[0];
        if (firstChild instanceof compiler_1.TmplAstElement) {
            const isMicrosyntaxTemplate = host instanceof compiler_1.TmplAstTemplate && sourceSpanEqual(firstChild.sourceSpan, host.sourceSpan);
            if (isMicrosyntaxTemplate) {
                const firstChildDirectives = this.typeCheckData.boundTarget.getDirectivesOfNode(firstChild);
                if (firstChildDirectives !== null && directives !== null) {
                    directives = directives.concat(firstChildDirectives);
                }
                else {
                    directives = directives !== null && directives !== void 0 ? directives : firstChildDirectives;
                }
            }
        }
        if (directives === null) {
            return null;
        }
        const directive = directives.find((m) => m.ref.node === directiveDeclaration);
        if (directive) {
            return directive;
        }
        const originalFile = directiveDeclaration.getSourceFile()[program_driver_1.NgOriginalFile];
        if (originalFile !== undefined) {
            // This is a preliminary check ahead of a more expensive search
            const hasPotentialCandidate = directives.find((m) => { var _a; return m.ref.node.name.text === ((_a = directiveDeclaration.name) === null || _a === void 0 ? void 0 : _a.text); });
            if (hasPotentialCandidate) {
                // In case the TCB has been inlined,
                // We will look for a matching class
                // If we find one, we look for it in the directives array
                const classWithSameName = findMatchingDirective(originalFile, directiveDeclaration);
                if (classWithSameName !== null) {
                    return (_a = directives.find((m) => m.ref.node === classWithSameName)) !== null && _a !== void 0 ? _a : null;
                }
            }
        }
        // Really nothing was found
        return null;
    }
    getDirectiveModule(declaration) {
        const scope = this.componentScopeReader.getScopeForComponent(declaration);
        if (scope === null || scope.kind !== scope_1.ComponentScopeKind.NgModule) {
            return null;
        }
        return scope.ngModule;
    }
    getSymbolOfBoundEvent(eventBinding) {
        const consumer = this.typeCheckData.boundTarget.getConsumerOfBinding(eventBinding);
        if (consumer === null) {
            return null;
        }
        // Outputs in the TCB look like one of the two:
        // * _t1["outputField"].subscribe(handler);
        // * _t1.addEventListener(handler);
        // Even with strict null checks disabled, we still produce the access as a separate statement
        // so that it can be found here.
        let expectedAccess;
        if (consumer instanceof compiler_1.TmplAstTemplate || consumer instanceof compiler_1.TmplAstElement) {
            expectedAccess = 'addEventListener';
        }
        else {
            const bindingPropertyNames = consumer.outputs.getByBindingPropertyName(eventBinding.name);
            if (bindingPropertyNames === null || bindingPropertyNames.length === 0) {
                return null;
            }
            // Note that we only get the expectedAccess text from a single consumer of the binding. If
            // there are multiple consumers (not supported in the `boundTarget` API) and one of them has
            // an alias, it will not get matched here.
            expectedAccess = bindingPropertyNames[0].classPropertyName;
        }
        function filter(n) {
            if (!(0, ts_util_1.isAccessExpression)(n)) {
                return false;
            }
            if (typescript_1.default.isPropertyAccessExpression(n)) {
                return n.name.getText() === expectedAccess;
            }
            else {
                return (typescript_1.default.isStringLiteral(n.argumentExpression) && n.argumentExpression.text === expectedAccess);
            }
        }
        const outputFieldAccesses = (0, comments_1.findAllMatchingNodes)(this.typeCheckBlock, {
            withSpan: eventBinding.keySpan,
            filter,
        });
        const bindings = [];
        for (const outputFieldAccess of outputFieldAccesses) {
            if (consumer instanceof compiler_1.TmplAstTemplate || consumer instanceof compiler_1.TmplAstElement) {
                if (!typescript_1.default.isPropertyAccessExpression(outputFieldAccess)) {
                    continue;
                }
                const addEventListener = outputFieldAccess.name;
                const tsSymbol = this.getTypeChecker().getSymbolAtLocation(addEventListener);
                const tsType = this.getTypeChecker().getTypeAtLocation(addEventListener);
                const positionInFile = this.getTcbPositionForNode(addEventListener);
                const target = this.getSymbol(consumer);
                if (target === null || tsSymbol === undefined) {
                    continue;
                }
                bindings.push({
                    kind: api_1.SymbolKind.Binding,
                    tsSymbol,
                    tsType,
                    target,
                    tcbLocation: {
                        tcbPath: this.tcbPath,
                        isShimFile: this.tcbIsShim,
                        positionInFile,
                    },
                });
            }
            else {
                if (!typescript_1.default.isElementAccessExpression(outputFieldAccess)) {
                    continue;
                }
                const tsSymbol = this.getTypeChecker().getSymbolAtLocation(outputFieldAccess.argumentExpression);
                if (tsSymbol === undefined) {
                    continue;
                }
                const target = this.getDirectiveSymbolForAccessExpression(outputFieldAccess, consumer);
                if (target === null) {
                    continue;
                }
                const positionInFile = this.getTcbPositionForNode(outputFieldAccess);
                const tsType = this.getTypeChecker().getTypeAtLocation(outputFieldAccess);
                bindings.push({
                    kind: api_1.SymbolKind.Binding,
                    tsSymbol,
                    tsType,
                    target,
                    tcbLocation: {
                        tcbPath: this.tcbPath,
                        isShimFile: this.tcbIsShim,
                        positionInFile,
                    },
                });
            }
        }
        if (bindings.length === 0) {
            return null;
        }
        return { kind: api_1.SymbolKind.Output, bindings };
    }
    getSymbolOfInputBinding(binding) {
        const consumer = this.typeCheckData.boundTarget.getConsumerOfBinding(binding);
        if (consumer === null) {
            return null;
        }
        if (consumer instanceof compiler_1.TmplAstElement || consumer instanceof compiler_1.TmplAstTemplate) {
            const host = this.getSymbol(consumer);
            return host !== null ? { kind: api_1.SymbolKind.DomBinding, host } : null;
        }
        const nodes = (0, comments_1.findAllMatchingNodes)(this.typeCheckBlock, {
            withSpan: binding.sourceSpan,
            filter: typescript_2.isAssignment,
        });
        const bindings = [];
        for (const node of nodes) {
            if (!(0, ts_util_1.isAccessExpression)(node.left)) {
                continue;
            }
            const signalInputAssignment = unwrapSignalInputWriteTAccessor(node.left);
            let fieldAccessExpr;
            let symbolInfo = null;
            // Signal inputs need special treatment because they are generated with an extra keyed
            // access. E.g. `_t1.prop[WriteT_ACCESSOR_SYMBOL]`. Observations:
            //   - The keyed access for the write type needs to be resolved for the "input type".
            //   - The definition symbol of the input should be the input class member, and not the
            //     internal write accessor. Symbol should resolve `_t1.prop`.
            if (signalInputAssignment !== null) {
                // Note: If the field expression for the input binding refers to just an identifier,
                // then we are handling the case of a temporary variable being used for the input field.
                // This is the case with `honorAccessModifiersForInputBindings = false` and in those cases
                // we cannot resolve the owning directive, similar to how we guard above with `isAccessExpression`.
                if (typescript_1.default.isIdentifier(signalInputAssignment.fieldExpr)) {
                    continue;
                }
                const fieldSymbol = this.getSymbolOfTsNode(signalInputAssignment.fieldExpr);
                const typeSymbol = this.getSymbolOfTsNode(signalInputAssignment.typeExpr);
                fieldAccessExpr = signalInputAssignment.fieldExpr;
                symbolInfo =
                    fieldSymbol === null || typeSymbol === null
                        ? null
                        : {
                            tcbLocation: fieldSymbol.tcbLocation,
                            tsSymbol: fieldSymbol.tsSymbol,
                            tsType: typeSymbol.tsType,
                        };
            }
            else {
                fieldAccessExpr = node.left;
                symbolInfo = this.getSymbolOfTsNode(node.left);
            }
            if (symbolInfo === null || symbolInfo.tsSymbol === null) {
                continue;
            }
            const target = this.getDirectiveSymbolForAccessExpression(fieldAccessExpr, consumer);
            if (target === null) {
                continue;
            }
            bindings.push(Object.assign(Object.assign({}, symbolInfo), { tsSymbol: symbolInfo.tsSymbol, kind: api_1.SymbolKind.Binding, target }));
        }
        if (bindings.length === 0) {
            return null;
        }
        return { kind: api_1.SymbolKind.Input, bindings };
    }
    getDirectiveSymbolForAccessExpression(fieldAccessExpr, { isComponent, selector, isStructural }) {
        var _a;
        // In all cases, `_t1["index"]` or `_t1.index`, `node.expression` is _t1.
        const tsSymbol = this.getTypeChecker().getSymbolAtLocation(fieldAccessExpr.expression);
        if ((tsSymbol === null || tsSymbol === void 0 ? void 0 : tsSymbol.declarations) === undefined ||
            tsSymbol.declarations.length === 0 ||
            selector === null) {
            return null;
        }
        const [declaration] = tsSymbol.declarations;
        if (!typescript_1.default.isVariableDeclaration(declaration) ||
            !(0, comments_1.hasExpressionIdentifier)(
            // The expression identifier could be on the type (for regular directives) or the name
            // (for generic directives and the ctor op).
            declaration.getSourceFile(), (_a = declaration.type) !== null && _a !== void 0 ? _a : declaration.name, comments_1.ExpressionIdentifier.DIRECTIVE)) {
            return null;
        }
        const symbol = this.getSymbolOfTsNode(declaration);
        if (symbol === null ||
            !(0, typescript_2.isSymbolWithValueDeclaration)(symbol.tsSymbol) ||
            !typescript_1.default.isClassDeclaration(symbol.tsSymbol.valueDeclaration)) {
            return null;
        }
        const ref = new imports_1.Reference(symbol.tsSymbol.valueDeclaration);
        const ngModule = this.getDirectiveModule(symbol.tsSymbol.valueDeclaration);
        return {
            ref,
            kind: api_1.SymbolKind.Directive,
            tsSymbol: symbol.tsSymbol,
            tsType: symbol.tsType,
            tcbLocation: symbol.tcbLocation,
            isComponent,
            isStructural,
            selector,
            ngModule,
            isHostDirective: false,
            isInScope: true, // TODO: this should always be in scope in this context, right?
        };
    }
    getSymbolOfVariable(variable) {
        const node = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, {
            withSpan: variable.sourceSpan,
            filter: typescript_1.default.isVariableDeclaration,
        });
        if (node === null) {
            return null;
        }
        let nodeValueSymbol = null;
        if (typescript_1.default.isForOfStatement(node.parent.parent)) {
            nodeValueSymbol = this.getSymbolOfTsNode(node);
        }
        else if (node.initializer !== undefined) {
            nodeValueSymbol = this.getSymbolOfTsNode(node.initializer);
        }
        if (nodeValueSymbol === null) {
            return null;
        }
        return {
            tsType: nodeValueSymbol.tsType,
            tsSymbol: nodeValueSymbol.tsSymbol,
            initializerLocation: nodeValueSymbol.tcbLocation,
            kind: api_1.SymbolKind.Variable,
            declaration: variable,
            localVarLocation: {
                tcbPath: this.tcbPath,
                isShimFile: this.tcbIsShim,
                positionInFile: this.getTcbPositionForNode(node.name),
            },
        };
    }
    getSymbolOfReference(ref) {
        const target = this.typeCheckData.boundTarget.getReferenceTarget(ref);
        // Find the node for the reference declaration, i.e. `var _t2 = _t1;`
        let node = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, {
            withSpan: ref.sourceSpan,
            filter: typescript_1.default.isVariableDeclaration,
        });
        if (node === null || target === null || node.initializer === undefined) {
            return null;
        }
        // Get the original declaration for the references variable, with the exception of template refs
        // which are of the form var _t3 = (_t2 as any as i2.TemplateRef<any>)
        // TODO(atscott): Consider adding an `ExpressionIdentifier` to tag variable declaration
        // initializers as invalid for symbol retrieval.
        const originalDeclaration = typescript_1.default.isParenthesizedExpression(node.initializer) &&
            typescript_1.default.isAsExpression(node.initializer.expression)
            ? this.getTypeChecker().getSymbolAtLocation(node.name)
            : this.getTypeChecker().getSymbolAtLocation(node.initializer);
        if (originalDeclaration === undefined || originalDeclaration.valueDeclaration === undefined) {
            return null;
        }
        const symbol = this.getSymbolOfTsNode(originalDeclaration.valueDeclaration);
        if (symbol === null || symbol.tsSymbol === null) {
            return null;
        }
        const referenceVarTcbLocation = {
            tcbPath: this.tcbPath,
            isShimFile: this.tcbIsShim,
            positionInFile: this.getTcbPositionForNode(node),
        };
        if (target instanceof compiler_1.TmplAstTemplate || target instanceof compiler_1.TmplAstElement) {
            return {
                kind: api_1.SymbolKind.Reference,
                tsSymbol: symbol.tsSymbol,
                tsType: symbol.tsType,
                target,
                declaration: ref,
                targetLocation: symbol.tcbLocation,
                referenceVarLocation: referenceVarTcbLocation,
            };
        }
        else {
            if (!typescript_1.default.isClassDeclaration(target.directive.ref.node)) {
                return null;
            }
            return {
                kind: api_1.SymbolKind.Reference,
                tsSymbol: symbol.tsSymbol,
                tsType: symbol.tsType,
                declaration: ref,
                target: target.directive.ref.node,
                targetLocation: symbol.tcbLocation,
                referenceVarLocation: referenceVarTcbLocation,
            };
        }
    }
    getSymbolOfLetDeclaration(decl) {
        const node = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, {
            withSpan: decl.sourceSpan,
            filter: typescript_1.default.isVariableDeclaration,
        });
        if (node === null) {
            return null;
        }
        const nodeValueSymbol = this.getSymbolOfTsNode(node.initializer);
        if (nodeValueSymbol === null) {
            return null;
        }
        return {
            tsType: nodeValueSymbol.tsType,
            tsSymbol: nodeValueSymbol.tsSymbol,
            initializerLocation: nodeValueSymbol.tcbLocation,
            kind: api_1.SymbolKind.LetDeclaration,
            declaration: decl,
            localVarLocation: {
                tcbPath: this.tcbPath,
                isShimFile: this.tcbIsShim,
                positionInFile: this.getTcbPositionForNode(node.name),
            },
        };
    }
    getSymbolOfPipe(expression) {
        const methodAccess = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, {
            withSpan: expression.nameSpan,
            filter: typescript_1.default.isPropertyAccessExpression,
        });
        if (methodAccess === null) {
            return null;
        }
        const pipeVariableNode = methodAccess.expression;
        const pipeDeclaration = this.getTypeChecker().getSymbolAtLocation(pipeVariableNode);
        if (pipeDeclaration === undefined || pipeDeclaration.valueDeclaration === undefined) {
            return null;
        }
        const pipeInstance = this.getSymbolOfTsNode(pipeDeclaration.valueDeclaration);
        // The instance should never be null, nor should the symbol lack a value declaration. This
        // is because the node used to look for the `pipeInstance` symbol info is a value
        // declaration of another symbol (i.e. the `pipeDeclaration` symbol).
        if (pipeInstance === null || !(0, typescript_2.isSymbolWithValueDeclaration)(pipeInstance.tsSymbol)) {
            return null;
        }
        const symbolInfo = this.getSymbolOfTsNode(methodAccess);
        if (symbolInfo === null) {
            return null;
        }
        return Object.assign(Object.assign({ kind: api_1.SymbolKind.Pipe }, symbolInfo), { classSymbol: Object.assign(Object.assign({}, pipeInstance), { tsSymbol: pipeInstance.tsSymbol }) });
    }
    getSymbolOfTemplateExpression(expression) {
        if (expression instanceof compiler_1.ASTWithSource) {
            expression = expression.ast;
        }
        const expressionTarget = this.typeCheckData.boundTarget.getExpressionTarget(expression);
        if (expressionTarget !== null) {
            return this.getSymbol(expressionTarget);
        }
        let withSpan = expression.sourceSpan;
        // The `name` part of a `PropertyWrite` and `ASTWithName` do not have their own
        // AST so there is no way to retrieve a `Symbol` for just the `name` via a specific node.
        // Also skipping SafePropertyReads as it breaks nullish coalescing not nullable extended diagnostic
        if (expression instanceof compiler_1.PropertyWrite ||
            (expression instanceof compiler_1.ASTWithName && !(expression instanceof compiler_1.SafePropertyRead))) {
            withSpan = expression.nameSpan;
        }
        let node = null;
        // Property reads in templates usually map to a `PropertyAccessExpression`
        // (e.g. `ctx.foo`) so try looking for one first.
        if (expression instanceof compiler_1.PropertyRead) {
            node = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, {
                withSpan,
                filter: typescript_1.default.isPropertyAccessExpression,
            });
        }
        // Otherwise fall back to searching for any AST node.
        if (node === null) {
            node = (0, comments_1.findFirstMatchingNode)(this.typeCheckBlock, { withSpan, filter: anyNodeFilter });
        }
        if (node === null) {
            return null;
        }
        while (typescript_1.default.isParenthesizedExpression(node)) {
            node = node.expression;
        }
        // - If we have safe property read ("a?.b") we want to get the Symbol for b, the `whenTrue`
        // expression.
        // - If our expression is a pipe binding ("a | test:b:c"), we want the Symbol for the
        // `transform` on the pipe.
        // - Otherwise, we retrieve the symbol for the node itself with no special considerations
        if (expression instanceof compiler_1.SafePropertyRead && typescript_1.default.isConditionalExpression(node)) {
            const whenTrueSymbol = this.getSymbolOfTsNode(node.whenTrue);
            if (whenTrueSymbol === null) {
                return null;
            }
            return Object.assign(Object.assign({}, whenTrueSymbol), { kind: api_1.SymbolKind.Expression, 
                // Rather than using the type of only the `whenTrue` part of the expression, we should
                // still get the type of the whole conditional expression to include `|undefined`.
                tsType: this.getTypeChecker().getTypeAtLocation(node) });
        }
        else {
            const symbolInfo = this.getSymbolOfTsNode(node);
            return symbolInfo === null ? null : Object.assign(Object.assign({}, symbolInfo), { kind: api_1.SymbolKind.Expression });
        }
    }
    getSymbolOfTsNode(node) {
        var _a;
        while (typescript_1.default.isParenthesizedExpression(node)) {
            node = node.expression;
        }
        let tsSymbol;
        if (typescript_1.default.isPropertyAccessExpression(node)) {
            tsSymbol = this.getTypeChecker().getSymbolAtLocation(node.name);
        }
        else if (typescript_1.default.isCallExpression(node)) {
            tsSymbol = this.getTypeChecker().getSymbolAtLocation(node.expression);
        }
        else {
            tsSymbol = this.getTypeChecker().getSymbolAtLocation(node);
        }
        const positionInFile = this.getTcbPositionForNode(node);
        const type = this.getTypeChecker().getTypeAtLocation(node);
        return {
            // If we could not find a symbol, fall back to the symbol on the type for the node.
            // Some nodes won't have a "symbol at location" but will have a symbol for the type.
            // Examples of this would be literals and `document.createElement('div')`.
            tsSymbol: (_a = tsSymbol !== null && tsSymbol !== void 0 ? tsSymbol : type.symbol) !== null && _a !== void 0 ? _a : null,
            tsType: type,
            tcbLocation: {
                tcbPath: this.tcbPath,
                isShimFile: this.tcbIsShim,
                positionInFile,
            },
        };
    }
    getTcbPositionForNode(node) {
        if (typescript_1.default.isTypeReferenceNode(node)) {
            return this.getTcbPositionForNode(node.typeName);
        }
        else if (typescript_1.default.isQualifiedName(node)) {
            return node.right.getStart();
        }
        else if (typescript_1.default.isPropertyAccessExpression(node)) {
            return node.name.getStart();
        }
        else if (typescript_1.default.isElementAccessExpression(node)) {
            return node.argumentExpression.getStart();
        }
        else {
            return node.getStart();
        }
    }
}
exports.SymbolBuilder = SymbolBuilder;
/** Filter predicate function that matches any AST node. */
function anyNodeFilter(n) {
    return true;
}
function sourceSpanEqual(a, b) {
    return a.start.offset === b.start.offset && a.end.offset === b.end.offset;
}
function unwrapSignalInputWriteTAccessor(expr) {
    // e.g. `_t2.inputA[i2.ɵINPUT_SIGNAL_BRAND_WRITE_TYPE]`
    // 1. Assert that we are dealing with an element access expression.
    // 2. Assert that we are dealing with a signal brand symbol access in the argument expression.
    if (!typescript_1.default.isElementAccessExpression(expr) ||
        !typescript_1.default.isPropertyAccessExpression(expr.argumentExpression)) {
        return null;
    }
    // Assert that the property access in the element access is a simple identifier and
    // refers to `ɵINPUT_SIGNAL_BRAND_WRITE_TYPE`.
    if (!typescript_1.default.isIdentifier(expr.argumentExpression.name) ||
        expr.argumentExpression.name.text !== compiler_1.R3Identifiers.InputSignalBrandWriteType.name) {
        return null;
    }
    // Assert that the expression is either:
    //   - `_t2.inputA[ɵINPUT_SIGNAL_BRAND_WRITE_TYPE]` or (common case)
    //   - or `_t2['input-A'][ɵINPUT_SIGNAL_BRAND_WRITE_TYPE]` (non-identifier input field names)
    //   - or `_dirInput[ɵINPUT_SIGNAL_BRAND_WRITE_TYPE` (honorAccessModifiersForInputBindings=false)
    // This is checked for type safety and to catch unexpected cases.
    if (!typescript_1.default.isPropertyAccessExpression(expr.expression) &&
        !typescript_1.default.isElementAccessExpression(expr.expression) &&
        !typescript_1.default.isIdentifier(expr.expression)) {
        throw new Error('Unexpected expression for signal input write type.');
    }
    return {
        fieldExpr: expr.expression,
        typeExpr: expr,
    };
}
/**
 * Looks for a class declaration in the original source file that matches a given directive
 * from the type check source file.
 *
 * @param originalSourceFile The original source where the runtime code resides
 * @param directiveDeclarationInTypeCheckSourceFile The directive from the type check source file
 */
function findMatchingDirective(originalSourceFile, directiveDeclarationInTypeCheckSourceFile) {
    var _a, _b, _c;
    const className = (_b = (_a = directiveDeclarationInTypeCheckSourceFile.name) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : '';
    // We build an index of the class declarations with the same name
    // To then compare the indexes to confirm we found the right class declaration
    const ogClasses = collectClassesWithName(originalSourceFile, className);
    const typecheckClasses = collectClassesWithName(directiveDeclarationInTypeCheckSourceFile.getSourceFile(), className);
    return (_c = ogClasses[typecheckClasses.indexOf(directiveDeclarationInTypeCheckSourceFile)]) !== null && _c !== void 0 ? _c : null;
}
/**
 * Builds a list of class declarations of a given name
 * Is used as a index based reference to compare class declarations
 * between the typecheck source file and the original source file
 */
function collectClassesWithName(sourceFile, className) {
    const classes = [];
    function visit(node) {
        var _a;
        if (typescript_1.default.isClassDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.text) === className) {
            classes.push(node);
        }
        typescript_1.default.forEachChild(node, visit);
    }
    sourceFile.forEachChild(visit);
    return classes;
}
