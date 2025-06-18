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
exports.CompletionBuilder = exports.CompletionNodeContext = void 0;
const compiler_1 = require("@angular/compiler");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const attribute_completions_1 = require("./attribute_completions");
const display_parts_1 = require("./utils/display_parts");
const template_target_1 = require("./template_target");
const ts_utils_1 = require("./utils/ts_utils");
const utils_1 = require("./utils");
var CompletionNodeContext;
(function (CompletionNodeContext) {
    CompletionNodeContext[CompletionNodeContext["None"] = 0] = "None";
    CompletionNodeContext[CompletionNodeContext["ElementTag"] = 1] = "ElementTag";
    CompletionNodeContext[CompletionNodeContext["ElementAttributeKey"] = 2] = "ElementAttributeKey";
    CompletionNodeContext[CompletionNodeContext["ElementAttributeValue"] = 3] = "ElementAttributeValue";
    CompletionNodeContext[CompletionNodeContext["EventValue"] = 4] = "EventValue";
    CompletionNodeContext[CompletionNodeContext["TwoWayBinding"] = 5] = "TwoWayBinding";
})(CompletionNodeContext || (exports.CompletionNodeContext = CompletionNodeContext = {}));
const ANIMATION_PHASES = ['start', 'done'];
function buildBlockSnippet(insertSnippet, blockName, withParens) {
    if (!insertSnippet) {
        return blockName;
    }
    if (blockName === 'for') {
        return `${blockName} (\${1:item} of \${2:items}; track \${3:\\$index}) {$4}`;
    }
    if (withParens) {
        return `${blockName} ($1) {$2}`;
    }
    return `${blockName} {$1}`;
}
/**
 * Performs autocompletion operations on a given node in the template.
 *
 * This class acts as a closure around all of the context required to perform the 3 autocompletion
 * operations (completions, get details, and get symbol) at a specific node.
 *
 * The generic `N` type for the template node is narrowed internally for certain operations, as the
 * compiler operations required to implement completion may be different for different node types.
 *
 * @param N type of the template node in question, narrowed accordingly.
 */
class CompletionBuilder {
    constructor(tsLS, compiler, component, node, targetDetails) {
        this.tsLS = tsLS;
        this.compiler = compiler;
        this.component = component;
        this.node = node;
        this.targetDetails = targetDetails;
        this.typeChecker = this.compiler.getCurrentProgram().getTypeChecker();
        this.templateTypeChecker = this.compiler.getTemplateTypeChecker();
        this.nodeParent = this.targetDetails.parent;
        this.nodeContext = nodeContextFromTarget(this.targetDetails.context);
        this.template = this.targetDetails.template;
        this.position = this.targetDetails.position;
    }
    /**
     * Analogue for `ts.LanguageService.getCompletionsAtPosition`.
     */
    getCompletionsAtPosition(options) {
        if (this.isPropertyExpressionCompletion()) {
            return this.getPropertyExpressionCompletion(options);
        }
        else if (this.isElementTagCompletion()) {
            return this.getElementTagCompletion();
        }
        else if (this.isElementAttributeCompletion()) {
            if (this.isAnimationCompletion()) {
                return this.getAnimationCompletions();
            }
            else {
                return this.getElementAttributeCompletions(options);
            }
        }
        else if (this.isPipeCompletion()) {
            return this.getPipeCompletions();
        }
        else if (this.isLiteralCompletion()) {
            return this.getLiteralCompletions(options);
        }
        else if (this.isBlockCompletion()) {
            return this.getBlockCompletions(options);
        }
        else if (this.isLetCompletion()) {
            return this.getGlobalPropertyExpressionCompletion(options);
        }
        else {
            return undefined;
        }
    }
    isLetCompletion() {
        return this.node instanceof compiler_1.TmplAstLetDeclaration;
    }
    isBlockCompletion() {
        return this.node instanceof compiler_1.TmplAstUnknownBlock;
    }
    getBlockCompletions(options) {
        var _a;
        const blocksWithParens = ['if', 'else if', 'for', 'switch', 'case', 'defer'];
        const blocksWithoutParens = ['else', 'empty', 'placeholder', 'error', 'loading', 'default'];
        // Determine whether to provide a snippet, which includes parens and curly braces.
        // If the block has any expressions or a body, don't provide a snippet as the completion.
        // TODO: We can be smarter about this, e.g. include `default` in `switch` if it is missing.
        const incompleteBlockHasExpressionsOrBody = this.node.sourceSpan
            .toString()
            .substring(1 + this.node.name.length)
            .trim().length > 0;
        const useSnippet = ((_a = options === null || options === void 0 ? void 0 : options.includeCompletionsWithSnippetText) !== null && _a !== void 0 ? _a : false) && !incompleteBlockHasExpressionsOrBody;
        // Generate the list of completions, one for each block.
        // TODO: Exclude connected blocks (e.g. `else` when the preceding block isn't `if` or `else
        // if`).
        const partialCompletionEntryWholeBlock = {
            kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.BLOCK),
            replacementSpan: {
                start: this.node.sourceSpan.start.offset + 1,
                length: this.node.name.length,
            },
        };
        let completionKeywords = [...blocksWithParens, ...blocksWithoutParens];
        if (this.nodeParent instanceof compiler_1.TmplAstSwitchBlock) {
            completionKeywords = ['case', 'default'];
        }
        const completionEntries = completionKeywords.map((name) => (Object.assign({ name, sortText: `${attribute_completions_1.AsciiSortPriority.First}${name}`, insertText: buildBlockSnippet(useSnippet, name, blocksWithParens.includes(name)), isSnippet: useSnippet || undefined }, partialCompletionEntryWholeBlock)));
        // Return the completions.
        const completionInfo = {
            flags: typescript_1.default.CompletionInfoFlags.IsContinuation,
            isMemberCompletion: false,
            isGlobalCompletion: false,
            isNewIdentifierLocation: false,
            entries: completionEntries,
        };
        return completionInfo;
    }
    isLiteralCompletion() {
        return (this.node instanceof compiler_1.LiteralPrimitive ||
            (this.node instanceof compiler_1.TmplAstTextAttribute &&
                this.nodeContext === CompletionNodeContext.ElementAttributeValue));
    }
    getLiteralCompletions(options) {
        const location = this.compiler
            .getTemplateTypeChecker()
            .getLiteralCompletionLocation(this.node, this.component);
        if (location === null) {
            return undefined;
        }
        const tsResults = this.tsLS.getCompletionsAtPosition(location.tcbPath, location.positionInFile, options);
        if (tsResults === undefined) {
            return undefined;
        }
        let replacementSpan;
        if (this.node instanceof compiler_1.TmplAstTextAttribute && this.node.value.length > 0 && this.node.valueSpan) {
            replacementSpan = {
                start: this.node.valueSpan.start.offset,
                length: this.node.value.length,
            };
        }
        if (this.node instanceof compiler_1.LiteralPrimitive) {
            if (typeof this.node.value === 'string' && this.node.value.length > 0) {
                replacementSpan = {
                    // The sourceSpan of `LiteralPrimitive` includes the open quote and the completion
                    // entries
                    // don't, so skip the open quote here.
                    start: this.node.sourceSpan.start + 1,
                    length: this.node.value.length,
                };
            }
            else if (typeof this.node.value === 'number') {
                replacementSpan = {
                    start: this.node.sourceSpan.start,
                    length: this.node.value.toString().length,
                };
            }
        }
        let ngResults = [];
        for (const result of tsResults.entries) {
            if (this.isValidNodeContextCompletion(result)) {
                ngResults.push(Object.assign(Object.assign({}, result), { replacementSpan }));
            }
        }
        return Object.assign(Object.assign({}, tsResults), { entries: ngResults });
    }
    /**
     * Analogue for `ts.LanguageService.getCompletionEntryDetails`.
     */
    getCompletionEntryDetails(entryName, formatOptions, preferences, data) {
        if (this.isPropertyExpressionCompletion()) {
            return this.getPropertyExpressionCompletionDetails(entryName, formatOptions, preferences, data);
        }
        else if (this.isElementTagCompletion()) {
            return this.getElementTagCompletionDetails(entryName);
        }
        else if (this.isElementAttributeCompletion()) {
            return this.getElementAttributeCompletionDetails(entryName);
        }
        return undefined;
    }
    /**
     * Analogue for `ts.LanguageService.getCompletionEntrySymbol`.
     */
    getCompletionEntrySymbol(name) {
        if (this.isPropertyExpressionCompletion()) {
            return this.getPropertyExpressionCompletionSymbol(name);
        }
        else if (this.isElementTagCompletion()) {
            return this.getElementTagCompletionSymbol(name);
        }
        else if (this.isElementAttributeCompletion()) {
            return this.getElementAttributeCompletionSymbol(name);
        }
        else {
            return undefined;
        }
    }
    /**
     * Determine if the current node is the completion of a property expression, and narrow the type
     * of `this.node` if so.
     *
     * This narrowing gives access to additional methods related to completion of property
     * expressions.
     */
    isPropertyExpressionCompletion() {
        return (this.node instanceof compiler_1.PropertyRead ||
            this.node instanceof compiler_1.SafePropertyRead ||
            this.node instanceof compiler_1.PropertyWrite ||
            this.node instanceof compiler_1.EmptyExpr ||
            // BoundEvent nodes only count as property completions if in an EventValue context.
            (this.node instanceof compiler_1.TmplAstBoundEvent && this.nodeContext === CompletionNodeContext.EventValue));
    }
    /**
     * Get completions for property expressions.
     */
    getPropertyExpressionCompletion(options) {
        if (this.node instanceof compiler_1.EmptyExpr ||
            this.node instanceof compiler_1.TmplAstBoundEvent ||
            this.node.receiver instanceof compiler_1.ImplicitReceiver) {
            return this.getGlobalPropertyExpressionCompletion(options);
        }
        else {
            const location = this.templateTypeChecker.getExpressionCompletionLocation(this.node, this.component);
            if (location === null) {
                return undefined;
            }
            const tsResults = this.tsLS.getCompletionsAtPosition(location.tcbPath, location.positionInFile, options);
            if (tsResults === undefined) {
                return undefined;
            }
            const replacementSpan = makeReplacementSpanFromAst(this.node);
            if (!(this.node.receiver instanceof compiler_1.ImplicitReceiver) &&
                !(this.node instanceof compiler_1.SafePropertyRead) &&
                (options === null || options === void 0 ? void 0 : options.includeCompletionsWithInsertText) &&
                options.includeAutomaticOptionalChainCompletions !== false) {
                const symbol = this.templateTypeChecker.getSymbolOfNode(this.node.receiver, this.component);
                if ((symbol === null || symbol === void 0 ? void 0 : symbol.kind) === api_1.SymbolKind.Expression) {
                    const type = symbol.tsType;
                    const nonNullableType = this.typeChecker.getNonNullableType(type);
                    if (type !== nonNullableType && replacementSpan !== undefined) {
                        // Shift the start location back one so it includes the `.` of the property access.
                        // In combination with the options above, this will indicate to the TS LS to include
                        // optional chaining completions `?.` for nullable types.
                        replacementSpan.start--;
                        replacementSpan.length++;
                    }
                }
            }
            let ngResults = [];
            for (const result of tsResults.entries) {
                ngResults.push(Object.assign(Object.assign({}, result), { replacementSpan }));
            }
            return Object.assign(Object.assign({}, tsResults), { entries: ngResults });
        }
    }
    /**
     * Get the details of a specific completion for a property expression.
     */
    getPropertyExpressionCompletionDetails(entryName, formatOptions, preferences, data) {
        let details = undefined;
        if (this.node instanceof compiler_1.EmptyExpr ||
            this.node instanceof compiler_1.TmplAstBoundEvent ||
            this.node.receiver instanceof compiler_1.ImplicitReceiver) {
            details = this.getGlobalPropertyExpressionCompletionDetails(entryName, formatOptions, preferences, data);
        }
        else {
            const location = this.compiler
                .getTemplateTypeChecker()
                .getExpressionCompletionLocation(this.node, this.component);
            if (location === null) {
                return undefined;
            }
            details = this.tsLS.getCompletionEntryDetails(location.tcbPath, location.positionInFile, entryName, formatOptions, 
            /* source */ undefined, preferences, data);
        }
        if (details !== undefined) {
            details.displayParts = (0, utils_1.filterAliasImports)(details.displayParts);
        }
        return details;
    }
    /**
     * Get the `ts.Symbol` for a specific completion for a property expression.
     */
    getPropertyExpressionCompletionSymbol(name) {
        if (this.node instanceof compiler_1.EmptyExpr ||
            this.node instanceof compiler_1.LiteralPrimitive ||
            this.node instanceof compiler_1.TmplAstBoundEvent ||
            this.node.receiver instanceof compiler_1.ImplicitReceiver) {
            return this.getGlobalPropertyExpressionCompletionSymbol(name);
        }
        else {
            const location = this.compiler
                .getTemplateTypeChecker()
                .getExpressionCompletionLocation(this.node, this.component);
            if (location === null) {
                return undefined;
            }
            return this.tsLS.getCompletionEntrySymbol(location.tcbPath, location.positionInFile, name, 
            /* source */ undefined);
        }
    }
    /**
     * Get completions for a property expression in a global context (e.g. `{{y|}}`).
     */
    getGlobalPropertyExpressionCompletion(options) {
        const completions = this.templateTypeChecker.getGlobalCompletions(this.template, this.component, this.node);
        if (completions === null) {
            return undefined;
        }
        const { componentContext, templateContext, nodeContext: astContext } = completions;
        const replacementSpan = makeReplacementSpanFromAst(this.node);
        // Merge TS completion results with results from the template scope.
        let entries = [];
        const componentCompletions = this.tsLS.getCompletionsAtPosition(componentContext.tcbPath, componentContext.positionInFile, options);
        if (componentCompletions !== undefined) {
            for (const tsCompletion of componentCompletions.entries) {
                // Skip completions that are shadowed by a template entity definition.
                if (templateContext.has(tsCompletion.name)) {
                    continue;
                }
                entries.push(Object.assign(Object.assign({}, tsCompletion), { 
                    // Substitute the TS completion's `replacementSpan` (which uses offsets within the TCB)
                    // with the `replacementSpan` within the template source.
                    replacementSpan }));
            }
        }
        // Merge TS completion results with results from the ast context.
        if (astContext !== null) {
            const nodeCompletions = this.tsLS.getCompletionsAtPosition(astContext.tcbPath, astContext.positionInFile, options);
            if (nodeCompletions !== undefined) {
                for (const tsCompletion of nodeCompletions.entries) {
                    if (this.isValidNodeContextCompletion(tsCompletion)) {
                        entries.push(Object.assign(Object.assign({}, tsCompletion), { 
                            // Substitute the TS completion's `replacementSpan` (which uses offsets within the
                            // TCB) with the `replacementSpan` within the template source.
                            replacementSpan }));
                    }
                }
            }
        }
        for (const [name, entity] of templateContext) {
            let displayInfo;
            if (entity.kind === api_1.CompletionKind.Reference) {
                displayInfo = display_parts_1.DisplayInfoKind.REFERENCE;
            }
            else if (entity.kind === api_1.CompletionKind.LetDeclaration) {
                displayInfo = display_parts_1.DisplayInfoKind.LET;
            }
            else {
                displayInfo = display_parts_1.DisplayInfoKind.VARIABLE;
            }
            entries.push({
                name,
                sortText: name,
                replacementSpan,
                kindModifiers: typescript_1.default.ScriptElementKindModifier.none,
                kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(displayInfo),
            });
        }
        return {
            entries,
            // Although this completion is "global" in the sense of an Angular expression (there is no
            // explicit receiver), it is not "global" in a TypeScript sense since Angular expressions
            // have the component as an implicit receiver.
            isGlobalCompletion: false,
            isMemberCompletion: true,
            isNewIdentifierLocation: false,
        };
    }
    /**
     * Get the details of a specific completion for a property expression in a global context (e.g.
     * `{{y|}}`).
     */
    getGlobalPropertyExpressionCompletionDetails(entryName, formatOptions, preferences, data) {
        const completions = this.templateTypeChecker.getGlobalCompletions(this.template, this.component, this.node);
        if (completions === null) {
            return undefined;
        }
        const { componentContext, templateContext } = completions;
        if (templateContext.has(entryName)) {
            const entry = templateContext.get(entryName);
            // Entries that reference a symbol in the template context refer either to local references
            // or variables.
            const symbol = this.templateTypeChecker.getSymbolOfNode(entry.node, this.component);
            if (symbol === null) {
                return undefined;
            }
            const { kind, displayParts, documentation, tags } = (0, display_parts_1.getSymbolDisplayInfo)(this.tsLS, this.typeChecker, symbol);
            return {
                kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(kind),
                name: entryName,
                kindModifiers: typescript_1.default.ScriptElementKindModifier.none,
                displayParts,
                documentation,
                tags,
            };
        }
        else {
            return this.tsLS.getCompletionEntryDetails(componentContext.tcbPath, componentContext.positionInFile, entryName, formatOptions, 
            /* source */ undefined, preferences, data);
        }
    }
    /**
     * Get the `ts.Symbol` of a specific completion for a property expression in a global context
     * (e.g. `{{y|}}`).
     */
    getGlobalPropertyExpressionCompletionSymbol(entryName) {
        const completions = this.templateTypeChecker.getGlobalCompletions(this.template, this.component, this.node);
        if (completions === null) {
            return undefined;
        }
        const { componentContext, templateContext } = completions;
        if (templateContext.has(entryName)) {
            const node = templateContext.get(entryName).node;
            const symbol = this.templateTypeChecker.getSymbolOfNode(node, this.component);
            if (symbol === null || symbol.tsSymbol === null) {
                return undefined;
            }
            return symbol.tsSymbol;
        }
        else {
            return this.tsLS.getCompletionEntrySymbol(componentContext.tcbPath, componentContext.positionInFile, entryName, 
            /* source */ undefined);
        }
    }
    isElementTagCompletion() {
        if (this.node instanceof compiler_1.TmplAstText) {
            const positionInTextNode = this.position - this.node.sourceSpan.start.offset;
            // We only provide element completions in a text node when there is an open tag immediately
            // to the left of the position.
            return this.node.value.substring(0, positionInTextNode).endsWith('<');
        }
        else if (this.node instanceof compiler_1.TmplAstElement) {
            return this.nodeContext === CompletionNodeContext.ElementTag;
        }
        return false;
    }
    getElementTagCompletion() {
        const templateTypeChecker = this.compiler.getTemplateTypeChecker();
        let start;
        let length;
        if (this.node instanceof compiler_1.TmplAstElement) {
            // The replacementSpan is the tag name.
            start = this.node.sourceSpan.start.offset + 1; // account for leading '<'
            length = this.node.name.length;
        }
        else {
            const positionInTextNode = this.position - this.node.sourceSpan.start.offset;
            const textToLeftOfPosition = this.node.value.substring(0, positionInTextNode);
            start = this.node.sourceSpan.start.offset + textToLeftOfPosition.lastIndexOf('<') + 1;
            // We only autocomplete immediately after the < so we don't replace any existing text
            length = 0;
        }
        const replacementSpan = { start, length };
        let potentialTags = Array.from(templateTypeChecker.getPotentialElementTags(this.component));
        // Don't provide non-Angular tags (directive === null) because we expect other extensions
        // (i.e. Emmet) to provide those for HTML files.
        potentialTags = potentialTags.filter(([_, directive]) => directive !== null);
        const entries = potentialTags.map(([tag, directive]) => ({
            kind: tagCompletionKind(directive),
            name: tag,
            sortText: tag,
            replacementSpan,
            hasAction: (directive === null || directive === void 0 ? void 0 : directive.isInScope) === true ? undefined : true,
        }));
        return {
            entries,
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
        };
    }
    getElementTagCompletionDetails(entryName) {
        const templateTypeChecker = this.compiler.getTemplateTypeChecker();
        const tagMap = templateTypeChecker.getPotentialElementTags(this.component);
        if (!tagMap.has(entryName)) {
            return undefined;
        }
        const directive = tagMap.get(entryName);
        let displayParts;
        let documentation = undefined;
        let tags = undefined;
        if (directive === null) {
            displayParts = [];
        }
        else {
            const displayInfo = (0, display_parts_1.getDirectiveDisplayInfo)(this.tsLS, directive);
            displayParts = displayInfo.displayParts;
            documentation = displayInfo.documentation;
            tags = displayInfo.tags;
        }
        let codeActions;
        if (!directive.isInScope) {
            const importOn = (0, ts_utils_1.standaloneTraitOrNgModule)(templateTypeChecker, this.component);
            codeActions =
                importOn !== null
                    ? (0, ts_utils_1.getCodeActionToImportTheDirectiveDeclaration)(this.compiler, importOn, directive)
                    : undefined;
        }
        return {
            kind: tagCompletionKind(directive),
            name: entryName,
            kindModifiers: typescript_1.default.ScriptElementKindModifier.none,
            displayParts,
            documentation,
            tags,
            codeActions,
        };
    }
    getElementTagCompletionSymbol(entryName) {
        const templateTypeChecker = this.compiler.getTemplateTypeChecker();
        const tagMap = templateTypeChecker.getPotentialElementTags(this.component);
        if (!tagMap.has(entryName)) {
            return undefined;
        }
        const directive = tagMap.get(entryName);
        return directive === null || directive === void 0 ? void 0 : directive.tsSymbol;
    }
    isAnimationCompletion() {
        return ((this.node instanceof compiler_1.TmplAstBoundAttribute && this.node.type === compiler_1.BindingType.Animation) ||
            (this.node instanceof compiler_1.TmplAstBoundEvent && this.node.type === compiler_1.ParsedEventType.Animation));
    }
    getAnimationCompletions() {
        var _a, _b, _c, _d;
        if (this.node instanceof compiler_1.TmplAstBoundAttribute) {
            const animations = (_b = (_a = this.compiler.getTemplateTypeChecker().getDirectiveMetadata(this.component)) === null || _a === void 0 ? void 0 : _a.animationTriggerNames) === null || _b === void 0 ? void 0 : _b.staticTriggerNames;
            const replacementSpan = makeReplacementSpanFromParseSourceSpan(this.node.keySpan);
            if (animations === undefined) {
                return undefined;
            }
            const entries = (0, attribute_completions_1.buildAnimationCompletionEntries)([...animations, '.disabled'], replacementSpan, display_parts_1.DisplayInfoKind.ATTRIBUTE);
            return {
                entries,
                isGlobalCompletion: false,
                isMemberCompletion: false,
                isNewIdentifierLocation: true,
            };
        }
        else {
            const animationNameSpan = buildAnimationNameSpan(this.node);
            const phaseSpan = buildAnimationPhaseSpan(this.node);
            if ((0, utils_1.isWithin)(this.position, animationNameSpan)) {
                const animations = (_d = (_c = this.compiler
                    .getTemplateTypeChecker()
                    .getDirectiveMetadata(this.component)) === null || _c === void 0 ? void 0 : _c.animationTriggerNames) === null || _d === void 0 ? void 0 : _d.staticTriggerNames;
                const replacementSpan = makeReplacementSpanFromParseSourceSpan(animationNameSpan);
                if (animations === undefined) {
                    return undefined;
                }
                const entries = (0, attribute_completions_1.buildAnimationCompletionEntries)(animations, replacementSpan, display_parts_1.DisplayInfoKind.EVENT);
                return {
                    entries,
                    isGlobalCompletion: false,
                    isMemberCompletion: false,
                    isNewIdentifierLocation: true,
                };
            }
            if (phaseSpan !== null && (0, utils_1.isWithin)(this.position, phaseSpan)) {
                const replacementSpan = makeReplacementSpanFromParseSourceSpan(phaseSpan);
                const entries = (0, attribute_completions_1.buildAnimationCompletionEntries)(ANIMATION_PHASES, replacementSpan, display_parts_1.DisplayInfoKind.EVENT);
                return {
                    entries,
                    isGlobalCompletion: false,
                    isMemberCompletion: false,
                    isNewIdentifierLocation: true,
                };
            }
            return undefined;
        }
    }
    isElementAttributeCompletion() {
        return ((this.nodeContext === CompletionNodeContext.ElementAttributeKey ||
            this.nodeContext === CompletionNodeContext.TwoWayBinding) &&
            (this.node instanceof compiler_1.TmplAstElement ||
                this.node instanceof compiler_1.TmplAstBoundAttribute ||
                this.node instanceof compiler_1.TmplAstTextAttribute ||
                this.node instanceof compiler_1.TmplAstBoundEvent));
    }
    getElementAttributeCompletions(options) {
        let element;
        if (this.node instanceof compiler_1.TmplAstElement) {
            element = this.node;
        }
        else if (this.nodeParent instanceof compiler_1.TmplAstElement ||
            this.nodeParent instanceof compiler_1.TmplAstTemplate) {
            element = this.nodeParent;
        }
        else {
            // Nothing to do without an element to process.
            return undefined;
        }
        if (element.endSourceSpan &&
            (0, utils_1.isWithin)(this.position, element.endSourceSpan) &&
            // start and end spans are the same for self closing tags
            element.endSourceSpan.start !== element.startSourceSpan.start) {
            return undefined;
        }
        let replacementSpan = undefined;
        if ((this.node instanceof compiler_1.TmplAstBoundAttribute ||
            this.node instanceof compiler_1.TmplAstBoundEvent ||
            this.node instanceof compiler_1.TmplAstTextAttribute) &&
            this.node.keySpan !== undefined) {
            replacementSpan = makeReplacementSpanFromParseSourceSpan(this.node.keySpan);
        }
        let insertSnippet;
        if ((options === null || options === void 0 ? void 0 : options.includeCompletionsWithSnippetText) && options.includeCompletionsWithInsertText) {
            if (this.node instanceof compiler_1.TmplAstBoundEvent && (0, utils_1.isBoundEventWithSyntheticHandler)(this.node)) {
                replacementSpan = makeReplacementSpanFromParseSourceSpan(this.node.sourceSpan);
                insertSnippet = true;
            }
            const isBoundAttributeValueEmpty = this.node instanceof compiler_1.TmplAstBoundAttribute &&
                (this.node.valueSpan === undefined ||
                    (this.node.value instanceof compiler_1.ASTWithSource && this.node.value.ast instanceof compiler_1.EmptyExpr));
            if (isBoundAttributeValueEmpty) {
                replacementSpan = makeReplacementSpanFromParseSourceSpan(this.node.sourceSpan);
                insertSnippet = true;
            }
            if (this.node instanceof compiler_1.TmplAstTextAttribute && this.node.keySpan !== undefined) {
                // The `sourceSpan` only includes `ngFor` and the `valueSpan` is always empty even if
                // there is something there because we split this up into the desugared AST, `ngFor
                // ngForOf=""`.
                const nodeStart = this.node.keySpan.start.getContext(1, 1);
                if ((nodeStart === null || nodeStart === void 0 ? void 0 : nodeStart.before[0]) === '*') {
                    const nodeEnd = this.node.keySpan.end.getContext(1, 1);
                    if ((nodeEnd === null || nodeEnd === void 0 ? void 0 : nodeEnd.after[0]) !== '=') {
                        // *ngFor -> *ngFor="¦"
                        insertSnippet = true;
                    }
                }
                else {
                    if (this.node.value === '') {
                        replacementSpan = makeReplacementSpanFromParseSourceSpan(this.node.sourceSpan);
                        insertSnippet = true;
                    }
                }
            }
            if (this.node instanceof compiler_1.TmplAstElement) {
                // <div ¦ />
                insertSnippet = true;
            }
        }
        const attrTable = (0, attribute_completions_1.buildAttributeCompletionTable)(this.component, element, this.compiler.getTemplateTypeChecker());
        let entries = [];
        for (const completion of attrTable.values()) {
            // First, filter out completions that don't make sense for the current node. For example, if
            // the user is completing on a property binding `[foo|]`, don't offer output event
            // completions.
            switch (completion.kind) {
                case attribute_completions_1.AttributeCompletionKind.DomEvent:
                    if (this.node instanceof compiler_1.TmplAstBoundAttribute) {
                        continue;
                    }
                    break;
                case attribute_completions_1.AttributeCompletionKind.DomAttribute:
                case attribute_completions_1.AttributeCompletionKind.DomProperty:
                    if (this.node instanceof compiler_1.TmplAstBoundEvent) {
                        continue;
                    }
                    break;
                case attribute_completions_1.AttributeCompletionKind.DirectiveInput:
                    if (this.node instanceof compiler_1.TmplAstBoundEvent) {
                        continue;
                    }
                    if (!completion.twoWayBindingSupported &&
                        this.nodeContext === CompletionNodeContext.TwoWayBinding) {
                        continue;
                    }
                    break;
                case attribute_completions_1.AttributeCompletionKind.DirectiveOutput:
                    if (this.node instanceof compiler_1.TmplAstBoundAttribute) {
                        continue;
                    }
                    break;
                case attribute_completions_1.AttributeCompletionKind.DirectiveAttribute:
                    if (this.node instanceof compiler_1.TmplAstBoundAttribute ||
                        this.node instanceof compiler_1.TmplAstBoundEvent) {
                        continue;
                    }
                    break;
            }
            // Is the completion in an attribute context (instead of a property context)?
            const isAttributeContext = this.node instanceof compiler_1.TmplAstElement || this.node instanceof compiler_1.TmplAstTextAttribute;
            // Is the completion for an element (not an <ng-template>)?
            const isElementContext = this.node instanceof compiler_1.TmplAstElement || this.nodeParent instanceof compiler_1.TmplAstElement;
            (0, attribute_completions_1.addAttributeCompletionEntries)(entries, completion, isAttributeContext, isElementContext, replacementSpan, insertSnippet);
        }
        return {
            entries,
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: true,
        };
    }
    getElementAttributeCompletionDetails(entryName) {
        // `entryName` here may be `foo` or `[foo]`, depending on which suggested completion the user
        // chose. Strip off any binding syntax to get the real attribute name.
        const { name, kind } = stripBindingSugar(entryName);
        let element;
        if (this.node instanceof compiler_1.TmplAstElement || this.node instanceof compiler_1.TmplAstTemplate) {
            element = this.node;
        }
        else if (this.nodeParent instanceof compiler_1.TmplAstElement ||
            this.nodeParent instanceof compiler_1.TmplAstTemplate) {
            element = this.nodeParent;
        }
        else {
            // Nothing to do without an element to process.
            return undefined;
        }
        const attrTable = (0, attribute_completions_1.buildAttributeCompletionTable)(this.component, element, this.compiler.getTemplateTypeChecker());
        if (!attrTable.has(name)) {
            return undefined;
        }
        const completion = attrTable.get(name);
        let displayParts;
        let documentation = undefined;
        let tags = undefined;
        let info;
        switch (completion.kind) {
            case attribute_completions_1.AttributeCompletionKind.DomEvent:
            case attribute_completions_1.AttributeCompletionKind.DomAttribute:
            case attribute_completions_1.AttributeCompletionKind.DomProperty:
                // TODO(alxhub): ideally we would show the same documentation as quick info here. However,
                // since these bindings don't exist in the TCB, there is no straightforward way to
                // retrieve a `ts.Symbol` for the field in the TS DOM definition.
                displayParts = [];
                break;
            case attribute_completions_1.AttributeCompletionKind.DirectiveAttribute:
                info = (0, display_parts_1.getDirectiveDisplayInfo)(this.tsLS, completion.directive);
                displayParts = info.displayParts;
                documentation = info.documentation;
                tags = info.tags;
                break;
            case attribute_completions_1.AttributeCompletionKind.StructuralDirectiveAttribute:
            case attribute_completions_1.AttributeCompletionKind.DirectiveInput:
            case attribute_completions_1.AttributeCompletionKind.DirectiveOutput:
                const propertySymbol = (0, attribute_completions_1.getAttributeCompletionSymbol)(completion, this.typeChecker);
                if (propertySymbol === null) {
                    return undefined;
                }
                let kind;
                if (completion.kind === attribute_completions_1.AttributeCompletionKind.DirectiveInput) {
                    kind = display_parts_1.DisplayInfoKind.PROPERTY;
                }
                else if (completion.kind === attribute_completions_1.AttributeCompletionKind.DirectiveOutput) {
                    kind = display_parts_1.DisplayInfoKind.EVENT;
                }
                else {
                    kind = display_parts_1.DisplayInfoKind.DIRECTIVE;
                }
                info = (0, display_parts_1.getTsSymbolDisplayInfo)(this.tsLS, this.typeChecker, propertySymbol, kind, completion.directive.tsSymbol.name);
                if (info === null) {
                    return undefined;
                }
                displayParts = info.displayParts;
                documentation = info.documentation;
                tags = info.tags;
        }
        return {
            name: entryName,
            kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(kind),
            kindModifiers: typescript_1.default.ScriptElementKindModifier.none,
            displayParts,
            documentation,
            tags,
        };
    }
    getElementAttributeCompletionSymbol(attribute) {
        var _a;
        const { name } = stripBindingSugar(attribute);
        let element;
        if (this.node instanceof compiler_1.TmplAstElement || this.node instanceof compiler_1.TmplAstTemplate) {
            element = this.node;
        }
        else if (this.nodeParent instanceof compiler_1.TmplAstElement ||
            this.nodeParent instanceof compiler_1.TmplAstTemplate) {
            element = this.nodeParent;
        }
        else {
            // Nothing to do without an element to process.
            return undefined;
        }
        const attrTable = (0, attribute_completions_1.buildAttributeCompletionTable)(this.component, element, this.compiler.getTemplateTypeChecker());
        if (!attrTable.has(name)) {
            return undefined;
        }
        const completion = attrTable.get(name);
        return (_a = (0, attribute_completions_1.getAttributeCompletionSymbol)(completion, this.typeChecker)) !== null && _a !== void 0 ? _a : undefined;
    }
    isPipeCompletion() {
        return this.node instanceof compiler_1.BindingPipe;
    }
    getPipeCompletions() {
        const pipes = this.templateTypeChecker
            .getPotentialPipes(this.component)
            .filter((p) => p.isInScope);
        if (pipes === null) {
            return undefined;
        }
        const replacementSpan = makeReplacementSpanFromAst(this.node);
        const entries = pipes.map((pipe) => ({
            name: pipe.name,
            sortText: pipe.name,
            kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.PIPE),
            replacementSpan,
        }));
        return {
            entries,
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
        };
    }
    /**
     * From the AST node of the cursor position, include completion of string literals, number
     * literals, `true`, `false`, `null`, and `undefined`.
     */
    isValidNodeContextCompletion(completion) {
        if (completion.kind === typescript_1.default.ScriptElementKind.string) {
            // 'string' kind includes both string literals and number literals
            return true;
        }
        if (completion.kind === typescript_1.default.ScriptElementKind.keyword) {
            return (completion.name === 'true' || completion.name === 'false' || completion.name === 'null');
        }
        if (completion.kind === typescript_1.default.ScriptElementKind.variableElement) {
            return completion.name === 'undefined';
        }
        return false;
    }
}
exports.CompletionBuilder = CompletionBuilder;
function makeReplacementSpanFromParseSourceSpan(span) {
    return {
        start: span.start.offset,
        length: span.end.offset - span.start.offset,
    };
}
function makeReplacementSpanFromAst(node) {
    if (node instanceof compiler_1.EmptyExpr ||
        node instanceof compiler_1.LiteralPrimitive ||
        node instanceof compiler_1.TmplAstBoundEvent ||
        node instanceof compiler_1.TmplAstLetDeclaration) {
        // empty nodes do not replace any existing text
        return undefined;
    }
    return {
        start: node.nameSpan.start,
        length: node.nameSpan.end - node.nameSpan.start,
    };
}
function tagCompletionKind(directive) {
    let kind;
    if (directive === null) {
        kind = display_parts_1.DisplayInfoKind.ELEMENT;
    }
    else if (directive.isComponent) {
        kind = display_parts_1.DisplayInfoKind.COMPONENT;
    }
    else {
        kind = display_parts_1.DisplayInfoKind.DIRECTIVE;
    }
    return (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(kind);
}
const BINDING_SUGAR = /[\[\(\)\]]/g;
function stripBindingSugar(binding) {
    const name = binding.replace(BINDING_SUGAR, '');
    if (binding.startsWith('[')) {
        return { name, kind: display_parts_1.DisplayInfoKind.PROPERTY };
    }
    else if (binding.startsWith('(')) {
        return { name, kind: display_parts_1.DisplayInfoKind.EVENT };
    }
    else {
        return { name, kind: display_parts_1.DisplayInfoKind.ATTRIBUTE };
    }
}
function nodeContextFromTarget(target) {
    switch (target.kind) {
        case template_target_1.TargetNodeKind.ElementInTagContext:
            return CompletionNodeContext.ElementTag;
        case template_target_1.TargetNodeKind.ElementInBodyContext:
            // Completions in element bodies are for new attributes.
            return CompletionNodeContext.ElementAttributeKey;
        case template_target_1.TargetNodeKind.TwoWayBindingContext:
            return CompletionNodeContext.TwoWayBinding;
        case template_target_1.TargetNodeKind.AttributeInKeyContext:
            return CompletionNodeContext.ElementAttributeKey;
        case template_target_1.TargetNodeKind.AttributeInValueContext:
            if (target.node instanceof compiler_1.TmplAstBoundEvent) {
                return CompletionNodeContext.EventValue;
            }
            else if (target.node instanceof compiler_1.TmplAstTextAttribute) {
                return CompletionNodeContext.ElementAttributeValue;
            }
            else {
                return CompletionNodeContext.None;
            }
        default:
            // No special context is available.
            return CompletionNodeContext.None;
    }
}
function buildAnimationNameSpan(node) {
    return new compiler_1.ParseSourceSpan(node.keySpan.start, node.keySpan.start.moveBy(node.name.length));
}
function buildAnimationPhaseSpan(node) {
    if (node.phase !== null) {
        return new compiler_1.ParseSourceSpan(node.keySpan.end.moveBy(-node.phase.length), node.keySpan.end);
    }
    return null;
}
