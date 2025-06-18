"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttrOrThrow = getAttrOrThrow;
exports.getAttribute = getAttribute;
exports.parseInnerRange = parseInnerRange;
exports.canParseXml = canParseXml;
exports.isNamedElement = isNamedElement;
exports.addParseDiagnostic = addParseDiagnostic;
exports.addParseError = addParseError;
exports.addErrorsToBundle = addErrorsToBundle;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../../diagnostics");
const translation_parse_error_1 = require("./translation_parse_error");
function getAttrOrThrow(element, attrName) {
    const attrValue = getAttribute(element, attrName);
    if (attrValue === undefined) {
        throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, `Missing required "${attrName}" attribute:`);
    }
    return attrValue;
}
function getAttribute(element, attrName) {
    const attr = element.attrs.find((a) => a.name === attrName);
    return attr !== undefined ? attr.value : undefined;
}
/**
 * Parse the "contents" of an XML element.
 *
 * This would be equivalent to parsing the `innerHTML` string of an HTML document.
 *
 * @param element The element whose inner range we want to parse.
 * @returns a collection of XML `Node` objects and any errors that were parsed from the element's
 *     contents.
 */
function parseInnerRange(element) {
    const xmlParser = new compiler_1.XmlParser();
    const xml = xmlParser.parse(element.sourceSpan.start.file.content, element.sourceSpan.start.file.url, { tokenizeExpansionForms: true, range: getInnerRange(element) });
    return xml;
}
/**
 * Compute a `LexerRange` that contains all the children of the given `element`.
 * @param element The element whose inner range we want to compute.
 */
function getInnerRange(element) {
    const start = element.startSourceSpan.end;
    const end = element.endSourceSpan.start;
    return {
        startPos: start.offset,
        startLine: start.line,
        startCol: start.col,
        endPos: end.offset,
    };
}
/**
 * Can this XML be parsed for translations, given the expected `rootNodeName` and expected root node
 * `attributes` that should appear in the file.
 *
 * @param filePath The path to the file being checked.
 * @param contents The contents of the file being checked.
 * @param rootNodeName The expected name of an XML root node that should exist.
 * @param attributes The attributes (and their values) that should appear on the root node.
 * @returns The `XmlTranslationParserHint` object for use by `TranslationParser.parse()` if the XML
 * document has the expected format.
 */
function canParseXml(filePath, contents, rootNodeName, attributes) {
    const diagnostics = new diagnostics_1.Diagnostics();
    const xmlParser = new compiler_1.XmlParser();
    const xml = xmlParser.parse(contents, filePath);
    if (xml.rootNodes.length === 0 ||
        xml.errors.some((error) => error.level === compiler_1.ParseErrorLevel.ERROR)) {
        xml.errors.forEach((e) => addParseError(diagnostics, e));
        return { canParse: false, diagnostics };
    }
    const rootElements = xml.rootNodes.filter(isNamedElement(rootNodeName));
    const rootElement = rootElements[0];
    if (rootElement === undefined) {
        diagnostics.warn(`The XML file does not contain a <${rootNodeName}> root node.`);
        return { canParse: false, diagnostics };
    }
    for (const attrKey of Object.keys(attributes)) {
        const attr = rootElement.attrs.find((attr) => attr.name === attrKey);
        if (attr === undefined || attr.value !== attributes[attrKey]) {
            addParseDiagnostic(diagnostics, rootElement.sourceSpan, `The <${rootNodeName}> node does not have the required attribute: ${attrKey}="${attributes[attrKey]}".`, compiler_1.ParseErrorLevel.WARNING);
            return { canParse: false, diagnostics };
        }
    }
    if (rootElements.length > 1) {
        xml.errors.push(new compiler_1.ParseError(xml.rootNodes[1].sourceSpan, 'Unexpected root node. XLIFF 1.2 files should only have a single <xliff> root node.', compiler_1.ParseErrorLevel.WARNING));
    }
    return { canParse: true, diagnostics, hint: { element: rootElement, errors: xml.errors } };
}
/**
 * Create a predicate, which can be used by things like `Array.filter()`, that will match a named
 * XML Element from a collection of XML Nodes.
 *
 * @param name The expected name of the element to match.
 */
function isNamedElement(name) {
    function predicate(node) {
        return node instanceof compiler_1.Element && node.name === name;
    }
    return predicate;
}
/**
 * Add an XML parser related message to the given `diagnostics` object.
 */
function addParseDiagnostic(diagnostics, sourceSpan, message, level) {
    addParseError(diagnostics, new compiler_1.ParseError(sourceSpan, message, level));
}
/**
 * Copy the formatted error message from the given `parseError` object into the given `diagnostics`
 * object.
 */
function addParseError(diagnostics, parseError) {
    if (parseError.level === compiler_1.ParseErrorLevel.ERROR) {
        diagnostics.error(parseError.toString());
    }
    else {
        diagnostics.warn(parseError.toString());
    }
}
/**
 * Add the provided `errors` to the `bundle` diagnostics.
 */
function addErrorsToBundle(bundle, errors) {
    for (const error of errors) {
        addParseError(bundle.diagnostics, error);
    }
}
