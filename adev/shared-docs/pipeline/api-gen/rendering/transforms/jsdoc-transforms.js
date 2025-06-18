"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JS_DOC_DESCRIPTION_TAG = exports.JS_DOC_SEE_TAG = void 0;
exports.addHtmlDescription = addHtmlDescription;
exports.addHtmlJsDocTagComments = addHtmlJsDocTagComments;
exports.addHtmlAdditionalLinks = addHtmlAdditionalLinks;
exports.addHtmlUsageNotes = addHtmlUsageNotes;
exports.setEntryFlags = setEntryFlags;
const marked_1 = require("marked");
const categorization_1 = require("../entities/categorization");
const url_transforms_1 = require("./url-transforms");
const code_transforms_1 = require("./code-transforms");
const symbol_context_1 = require("../symbol-context");
const JS_DOC_USAGE_NOTE_TAGS = new Set(['remarks', 'usageNotes', 'example']);
exports.JS_DOC_SEE_TAG = 'see';
exports.JS_DOC_DESCRIPTION_TAG = 'description';
// Some links are written in the following format: {@link Route}
const jsDoclinkRegex = /\{\s*@link\s+([^}]+)\s*\}/;
const jsDoclinkRegexGlobal = new RegExp(jsDoclinkRegex.source, 'g');
/** Given an entity with a description, gets the entity augmented with an `htmlDescription`. */
function addHtmlDescription(entry) {
    var _a, _b;
    const firstParagraphRule = /(.*?)(?:\n\n|$)/s;
    let jsDocDescription = '';
    if ('jsdocTags' in entry) {
        jsDocDescription =
            (_b = (_a = entry.jsdocTags.find((tag) => tag.name === exports.JS_DOC_DESCRIPTION_TAG)) === null || _a === void 0 ? void 0 : _a.comment) !== null && _b !== void 0 ? _b : '';
    }
    const description = !!entry.description ? entry.description : jsDocDescription;
    const shortTextMatch = description.match(firstParagraphRule);
    const htmlDescription = getHtmlForJsDocText(description).trim();
    const shortHtmlDescription = getHtmlForJsDocText(shortTextMatch ? shortTextMatch[0] : '').trim();
    return Object.assign(Object.assign({}, entry), { htmlDescription, shortHtmlDescription });
}
/**
 * Given an entity with JsDoc tags, gets the entity with JsDocTagRenderable entries that
 * have been augmented with an `htmlComment`.
 */
function addHtmlJsDocTagComments(entry) {
    return Object.assign(Object.assign({}, entry), { jsdocTags: entry.jsdocTags.map((tag) => (Object.assign(Object.assign({}, tag), { htmlComment: getHtmlForJsDocText(tag.comment) }))) });
}
/** Given an entity with `See also` links. */
function addHtmlAdditionalLinks(entry) {
    return Object.assign(Object.assign({}, entry), { additionalLinks: getHtmlAdditionalLinks(entry) });
}
function addHtmlUsageNotes(entry) {
    var _a;
    const usageNotesTags = (_a = entry.jsdocTags.filter(({ name }) => JS_DOC_USAGE_NOTE_TAGS.has(name))) !== null && _a !== void 0 ? _a : [];
    let htmlUsageNotes = '';
    for (const { comment } of usageNotesTags) {
        htmlUsageNotes += getHtmlForJsDocText(comment);
    }
    return Object.assign(Object.assign({}, entry), { htmlUsageNotes });
}
/** Given a markdown JsDoc text, gets the rendered HTML. */
function getHtmlForJsDocText(text) {
    const parsed = marked_1.marked.parse(convertLinks(wrapExampleHtmlElementsWithCode(text)));
    return (0, code_transforms_1.addApiLinksToHtml)(parsed);
}
function setEntryFlags(entry) {
    const deprecationMessage = (0, categorization_1.getDeprecatedEntry)(entry);
    return Object.assign(Object.assign({}, entry), { deprecated: (0, categorization_1.getTagSinceVersion)(entry, 'deprecated'), deprecationMessage: deprecationMessage
            ? getHtmlForJsDocText(deprecationMessage)
            : deprecationMessage, developerPreview: (0, categorization_1.getTagSinceVersion)(entry, 'developerPreview'), experimental: (0, categorization_1.getTagSinceVersion)(entry, 'experimental'), stable: (0, categorization_1.getTagSinceVersion)(entry, 'publicApi') });
}
function getHtmlAdditionalLinks(entry) {
    const markdownLinkRule = /\[(.*?)\]\((.*?)(?: "(.*?)")?\)/;
    const seeAlsoLinks = entry.jsdocTags
        .filter((tag) => tag.name === exports.JS_DOC_SEE_TAG)
        .map((tag) => tag.comment)
        .map((comment) => {
        const markdownLinkMatch = comment.match(markdownLinkRule);
        if (markdownLinkMatch) {
            return {
                label: markdownLinkMatch[1],
                url: markdownLinkMatch[2],
                title: markdownLinkMatch[3],
            };
        }
        const linkMatch = comment.match(jsDoclinkRegex);
        if (linkMatch) {
            const link = linkMatch[1];
            const { url, label } = parseAtLink(link);
            return { label, url };
        }
        return undefined;
    })
        .filter((link) => !!link);
    return seeAlsoLinks;
}
/**
 * Some descriptions in the text contain HTML elements like `input` or `img`,
 * we should wrap such elements using `code`.
 * Otherwise DocViewer will try to render those elements.
 */
function wrapExampleHtmlElementsWithCode(text) {
    return text
        .replace(/'<input>'/g, `<code><input></code>`)
        .replace(/'<img>'/g, `<code><img></code>`);
}
/**
 * Converts {@link } tags into html anchor elements
 */
function convertLinks(text) {
    return text.replace(jsDoclinkRegexGlobal, (_, link) => {
        const { label, url } = parseAtLink(link);
        return `<a href="${url}"><code>${label}</code></a>`;
    });
}
function parseAtLink(link) {
    // Because of microsoft/TypeScript/issues/59679
    // getTextOfJSDocComment introduces an extra space between the symbol and a trailing ()
    link = link.replace(/ \(\)$/, '');
    let [rawSymbol, description] = link.split(/\s(.+)/);
    if (rawSymbol.startsWith('#')) {
        rawSymbol = rawSymbol.substring(1);
    }
    else if (rawSymbol.includes('/')) {
        if (!rawSymbol.startsWith('/') && !rawSymbol.startsWith('http')) {
            throw Error(`Forbidden relative link: ${link}. Links should be absolute and start with a slash`);
        }
        return {
            url: rawSymbol,
            label: description !== null && description !== void 0 ? description : rawSymbol.split('/').pop(),
        };
    }
    let [symbol, subSymbol] = rawSymbol.replace(/\(\)$/, '').split(/(?:#|\.)/);
    let moduleName = (0, symbol_context_1.getModuleName)(symbol);
    const label = description !== null && description !== void 0 ? description : rawSymbol;
    const currentSymbol = (0, symbol_context_1.getCurrentSymbol)();
    if (!moduleName) {
        // 2nd attemp, try to get the module name in the context of the current symbol
        moduleName = (0, symbol_context_1.getModuleName)(`${currentSymbol}.${symbol}`);
        if (!moduleName || !currentSymbol) {
            throw (0, symbol_context_1.unknownSymbolMessage)(link, symbol);
        }
        subSymbol = symbol;
        symbol = currentSymbol;
    }
    return { label, url: (0, url_transforms_1.getLinkToModule)(moduleName, symbol, subSymbol) };
}
