"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextSpanOfNode = getTextSpanOfNode;
exports.toTextSpan = toTextSpan;
exports.isTemplateNodeWithKeyAndValue = isTemplateNodeWithKeyAndValue;
exports.isWithinKey = isWithinKey;
exports.isWithinKeyValue = isWithinKeyValue;
exports.isTemplateNode = isTemplateNode;
exports.isExpressionNode = isExpressionNode;
exports.getTypeCheckInfoAtPosition = getTypeCheckInfoAtPosition;
exports.getFirstComponentForTemplateFile = getFirstComponentForTemplateFile;
exports.getDirectiveMatchesForElementTag = getDirectiveMatchesForElementTag;
exports.makeElementSelector = makeElementSelector;
exports.getDirectiveMatchesForAttribute = getDirectiveMatchesForAttribute;
exports.filterAliasImports = filterAliasImports;
exports.isDollarEvent = isDollarEvent;
exports.isTypeScriptFile = isTypeScriptFile;
exports.isExternalTemplate = isExternalTemplate;
exports.isWithin = isWithin;
exports.getTemplateLocationFromTcbLocation = getTemplateLocationFromTcbLocation;
exports.isBoundEventWithSyntheticHandler = isBoundEventWithSyntheticHandler;
exports.createQuickInfo = createQuickInfo;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const typescript_1 = __importDefault(require("typescript"));
const display_parts_1 = require("./display_parts");
const ts_utils_1 = require("./ts_utils");
function getTextSpanOfNode(node) {
    if (isTemplateNodeWithKeyAndValue(node)) {
        return toTextSpan(node.keySpan);
    }
    else if (node instanceof compiler_1.PropertyWrite ||
        node instanceof compiler_1.BindingPipe ||
        node instanceof compiler_1.PropertyRead) {
        // The `name` part of a `PropertyWrite` and `BindingPipe` does not have its own AST
        // so there is no way to retrieve a `Symbol` for just the `name` via a specific node.
        return toTextSpan(node.nameSpan);
    }
    else {
        return toTextSpan(node.sourceSpan);
    }
}
function toTextSpan(span) {
    let start, end;
    if (span instanceof compiler_1.AbsoluteSourceSpan || span instanceof compiler_1.ParseSpan) {
        start = span.start;
        end = span.end;
    }
    else {
        start = span.start.offset;
        end = span.end.offset;
    }
    return { start, length: end - start };
}
function isTemplateNodeWithKeyAndValue(node) {
    return isTemplateNode(node) && node.hasOwnProperty('keySpan');
}
function isWithinKey(position, node) {
    let { keySpan, valueSpan } = node;
    if (valueSpan === undefined && node instanceof compiler_1.TmplAstBoundEvent) {
        valueSpan = node.handlerSpan;
    }
    const isWithinKeyValue = isWithin(position, keySpan) || !!(valueSpan && isWithin(position, valueSpan));
    return isWithinKeyValue;
}
function isWithinKeyValue(position, node) {
    let { keySpan, valueSpan } = node;
    if (valueSpan === undefined && node instanceof compiler_1.TmplAstBoundEvent) {
        valueSpan = node.handlerSpan;
    }
    const isWithinKeyValue = isWithin(position, keySpan) || !!(valueSpan && isWithin(position, valueSpan));
    return isWithinKeyValue;
}
function isTemplateNode(node) {
    // Template node implements the Node interface so we cannot use instanceof.
    return node.sourceSpan instanceof compiler_1.ParseSourceSpan;
}
function isExpressionNode(node) {
    return node instanceof compiler_1.AST;
}
function getInlineTypeCheckInfoAtPosition(sf, position, compiler) {
    const expression = (0, ts_utils_1.findTightestNode)(sf, position);
    if (expression === undefined) {
        return undefined;
    }
    const classDecl = (0, ts_utils_1.getParentClassDeclaration)(expression);
    if (classDecl === undefined) {
        return undefined;
    }
    // Return `undefined` if the position is not on the template expression or the template resource
    // is not inline.
    const resources = compiler.getDirectiveResources(classDecl);
    if (resources === null) {
        return undefined;
    }
    if (resources.template !== null &&
        !(0, metadata_1.isExternalResource)(resources.template) &&
        expression === resources.template.node) {
        const template = compiler.getTemplateTypeChecker().getTemplate(classDecl);
        if (template === null) {
            return undefined;
        }
        return { nodes: template, declaration: classDecl };
    }
    if (resources.hostBindings !== null) {
        const start = expression.getStart();
        const end = expression.getEnd();
        for (const binding of resources.hostBindings) {
            if (!(0, metadata_1.isExternalResource)(binding) &&
                start >= binding.node.getStart() &&
                end <= binding.node.getEnd()) {
                const hostElement = compiler.getTemplateTypeChecker().getHostElement(classDecl);
                if (hostElement !== null) {
                    return { nodes: [hostElement], declaration: classDecl };
                }
            }
        }
    }
    return undefined;
}
/**
 * Retrieves the `ts.ClassDeclaration` at a location along with its template AST nodes.
 */
function getTypeCheckInfoAtPosition(fileName, position, compiler) {
    if (isTypeScriptFile(fileName)) {
        const sf = compiler.getCurrentProgram().getSourceFile(fileName);
        if (sf === undefined) {
            return undefined;
        }
        return getInlineTypeCheckInfoAtPosition(sf, position, compiler);
    }
    else {
        return getFirstComponentForTemplateFile(fileName, compiler);
    }
}
/**
 * First, attempt to sort component declarations by file name.
 * If the files are the same, sort by start location of the declaration.
 */
function tsDeclarationSortComparator(a, b) {
    const aFile = a.getSourceFile().fileName;
    const bFile = b.getSourceFile().fileName;
    if (aFile < bFile) {
        return -1;
    }
    else if (aFile > bFile) {
        return 1;
    }
    else {
        return b.getFullStart() - a.getFullStart();
    }
}
function getFirstComponentForTemplateFile(fileName, compiler) {
    const templateTypeChecker = compiler.getTemplateTypeChecker();
    const components = compiler.getComponentsWithTemplateFile(fileName);
    const sortedComponents = Array.from(components).sort(tsDeclarationSortComparator);
    for (const component of sortedComponents) {
        if (!typescript_1.default.isClassDeclaration(component)) {
            continue;
        }
        const template = templateTypeChecker.getTemplate(component);
        if (template === null) {
            continue;
        }
        return { nodes: template, declaration: component };
    }
    return undefined;
}
/**
 * Given an attribute node, converts it to string form for use as a CSS selector.
 */
function toAttributeCssSelector(attribute) {
    var _a, _b;
    let selector;
    if (attribute instanceof compiler_1.TmplAstBoundEvent || attribute instanceof compiler_1.TmplAstBoundAttribute) {
        selector = `[${attribute.name}]`;
    }
    else {
        selector = `[${attribute.name}=${(_b = (_a = attribute.valueSpan) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ''}]`;
    }
    // Any dollar signs that appear in the attribute name and/or value need to be escaped because they
    // need to be taken as literal characters rather than special selector behavior of dollar signs in
    // CSS.
    return selector.replace(/\$/g, '\\$');
}
function getNodeName(node) {
    var _a;
    return node instanceof compiler_1.TmplAstTemplate ? ((_a = node.tagName) !== null && _a !== void 0 ? _a : 'ng-template') : node.name;
}
/**
 * Given a template or element node, returns all attributes on the node.
 */
function getAttributes(node) {
    const attributes = [
        ...node.attributes,
        ...node.inputs,
        ...node.outputs,
    ];
    if (node instanceof compiler_1.TmplAstTemplate) {
        attributes.push(...node.templateAttrs);
    }
    return attributes;
}
/**
 * Given two `Set`s, returns all items in the `left` which do not appear in the `right`.
 */
function difference(left, right) {
    const result = new Set();
    for (const dir of left) {
        if (!right.has(dir)) {
            result.add(dir);
        }
    }
    return result;
}
/**
 * Given an element or template, determines which directives match because the tag is present. For
 * example, if a directive selector is `div[myAttr]`, this would match div elements but would not if
 * the selector were just `[myAttr]`. We find which directives are applied because of this tag by
 * elimination: compare the directive matches with the tag present against the directive matches
 * without it. The difference would be the directives which match because the tag is present.
 *
 * @param element The element or template node that the attribute/tag is part of.
 * @param directives The list of directives to match against.
 * @returns The list of directives matching the tag name via the strategy described above.
 */
// TODO(atscott): Add unit tests for this and the one for attributes
function getDirectiveMatchesForElementTag(element, directives) {
    const attributes = getAttributes(element);
    const allAttrs = attributes.map(toAttributeCssSelector);
    const allDirectiveMatches = getDirectiveMatchesForSelector(directives, getNodeName(element) + allAttrs.join(''));
    const matchesWithoutElement = getDirectiveMatchesForSelector(directives, allAttrs.join(''));
    return difference(allDirectiveMatches, matchesWithoutElement);
}
function makeElementSelector(element) {
    const attributes = getAttributes(element);
    const allAttrs = attributes.map(toAttributeCssSelector);
    return getNodeName(element) + allAttrs.join('');
}
/**
 * Given an attribute name, determines which directives match because the attribute is present. We
 * find which directives are applied because of this attribute by elimination: compare the directive
 * matches with the attribute present against the directive matches without it. The difference would
 * be the directives which match because the attribute is present.
 *
 * @param name The name of the attribute
 * @param hostNode The node which the attribute appears on
 * @param directives The list of directives to match against.
 * @returns The list of directives matching the tag name via the strategy described above.
 */
function getDirectiveMatchesForAttribute(name, hostNode, directives) {
    const attributes = getAttributes(hostNode);
    const allAttrs = attributes.map(toAttributeCssSelector);
    const allDirectiveMatches = getDirectiveMatchesForSelector(directives, getNodeName(hostNode) + allAttrs.join(''));
    const attrsExcludingName = attributes.filter((a) => a.name !== name).map(toAttributeCssSelector);
    const matchesWithoutAttr = getDirectiveMatchesForSelector(directives, getNodeName(hostNode) + attrsExcludingName.join(''));
    return difference(allDirectiveMatches, matchesWithoutAttr);
}
/**
 * Given a list of directives and a text to use as a selector, returns the directives which match
 * for the selector.
 */
function getDirectiveMatchesForSelector(directives, selector) {
    try {
        const selectors = compiler_1.CssSelector.parse(selector);
        if (selectors.length === 0) {
            return new Set();
        }
        return new Set(directives.filter((dir) => {
            if (dir.selector === null) {
                return false;
            }
            const matcher = new compiler_1.SelectorMatcher();
            matcher.addSelectables(compiler_1.CssSelector.parse(dir.selector));
            return selectors.some((selector) => matcher.match(selector, null));
        }));
    }
    catch (_a) {
        // An invalid selector may throw an error. There would be no directive matches for an invalid
        // selector.
        return new Set();
    }
}
/**
 * Returns a new `ts.SymbolDisplayPart` array which has the alias imports from the tcb filtered
 * out, i.e. `i0.NgForOf`.
 */
function filterAliasImports(displayParts) {
    const tcbAliasImportRegex = /i\d+/;
    function isImportAlias(part) {
        return part.kind === display_parts_1.ALIAS_NAME && tcbAliasImportRegex.test(part.text);
    }
    function isDotPunctuation(part) {
        return part.kind === display_parts_1.SYMBOL_PUNC && part.text === '.';
    }
    return displayParts.filter((part, i) => {
        const previousPart = displayParts[i - 1];
        const nextPart = displayParts[i + 1];
        const aliasNameFollowedByDot = isImportAlias(part) && nextPart !== undefined && isDotPunctuation(nextPart);
        const dotPrecededByAlias = isDotPunctuation(part) && previousPart !== undefined && isImportAlias(previousPart);
        return !aliasNameFollowedByDot && !dotPrecededByAlias;
    });
}
function isDollarEvent(n) {
    return (n instanceof compiler_1.PropertyRead &&
        n.name === '$event' &&
        n.receiver instanceof compiler_1.ImplicitReceiver &&
        !(n.receiver instanceof compiler_1.ThisReceiver));
}
function isTypeScriptFile(fileName) {
    return /\.[cm]?tsx?$/i.test(fileName);
}
function isExternalTemplate(fileName) {
    return !isTypeScriptFile(fileName);
}
function isWithin(position, span) {
    let start, end;
    if (span instanceof compiler_1.ParseSourceSpan) {
        start = span.start.offset;
        end = span.end.offset;
    }
    else {
        start = span.start;
        end = span.end;
    }
    // Note both start and end are inclusive because we want to match conditions
    // like ¦start and end¦ where ¦ is the cursor.
    return start <= position && position <= end;
}
/**
 * For a given location in a shim file, retrieves the corresponding file url for the template and
 * the span in the template.
 */
function getTemplateLocationFromTcbLocation(templateTypeChecker, tcbPath, tcbIsShim, positionInFile) {
    const mapping = templateTypeChecker.getSourceMappingAtTcbLocation({
        tcbPath,
        isShimFile: tcbIsShim,
        positionInFile,
    });
    if (mapping === null) {
        return null;
    }
    const { sourceMapping, span } = mapping;
    let templateUrl;
    if (sourceMapping.type === 'direct') {
        templateUrl = (0, file_system_1.absoluteFromSourceFile)(sourceMapping.node.getSourceFile());
    }
    else if (sourceMapping.type === 'external') {
        templateUrl = (0, file_system_1.absoluteFrom)(sourceMapping.templateUrl);
    }
    else {
        // This includes indirect mappings, which are difficult to map directly to the code
        // location. Diagnostics similarly return a synthetic template string for this case rather
        // than a real location.
        return null;
    }
    return { templateUrl, span };
}
function isBoundEventWithSyntheticHandler(event) {
    // An event binding with no value (e.g. `(event|)`) parses to a `BoundEvent` with a
    // `LiteralPrimitive` handler with value `'ERROR'`, as opposed to a property binding with no
    // value which has an `EmptyExpr` as its value. This is a synthetic node created by the binding
    // parser, and is not suitable to use for Language Service analysis. Skip it.
    //
    // TODO(alxhub): modify the parser to generate an `EmptyExpr` instead.
    let handler = event.handler;
    if (handler instanceof compiler_1.ASTWithSource) {
        handler = handler.ast;
    }
    if (handler instanceof compiler_1.LiteralPrimitive && handler.value === 'ERROR') {
        return true;
    }
    return false;
}
/**
 * Construct a QuickInfo object taking into account its container and type.
 * @param name Name of the QuickInfo target
 * @param kind component, directive, pipe, etc.
 * @param textSpan span of the target
 * @param containerName either the Symbol's container or the NgModule that contains the directive
 * @param type user-friendly name of the type
 * @param documentation docstring or comment
 */
function createQuickInfo(name, kind, textSpan, containerName, type, documentation, tags) {
    const displayParts = (0, display_parts_1.createDisplayParts)(name, kind, containerName, type);
    return {
        kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(kind),
        kindModifiers: typescript_1.default.ScriptElementKindModifier.none,
        textSpan: textSpan,
        displayParts,
        documentation,
        tags,
    };
}
