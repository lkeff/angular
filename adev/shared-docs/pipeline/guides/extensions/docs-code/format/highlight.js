"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHighlighter = initHighlighter;
exports.highlightCode = highlightCode;
const html_entities_1 = require("html-entities");
const range_1 = require("./range");
const jsdom_1 = require("jsdom");
const shiki_1 = require("shiki");
const lineNumberClassName = 'shiki-ln-number';
const lineAddedClassName = 'add';
const lineRemovedClassName = 'remove';
const lineHighlightedClassName = 'highlighted';
let highlighter;
/**
 * Highlighter needs to setup asynchronously
 *
 * This is intended to be invoked at the start of the pipeline
 */
function initHighlighter() {
    return __awaiter(this, void 0, void 0, function* () {
        highlighter = yield (0, shiki_1.createHighlighter)({
            themes: ['github-light', 'github-dark'],
            langs: [
                'javascript',
                'typescript',
                'angular-html',
                'angular-ts',
                'shell',
                'html',
                'http',
                'json',
                'nginx',
                'markdown',
                'apache',
            ],
        });
    });
}
/**
 * Updates the provided token's code value to include syntax highlighting.
 */
function highlightCode(token) {
    var _a, _b, _c, _d;
    // TODO(josephperrott): Handle mermaid usages i.e. language == mermaidClassName
    if (token.language !== 'none' && token.language !== 'file') {
        // Decode the code content to replace HTML entities to characters
        const decodedCode = (0, html_entities_1.decode)(token.code);
        const fallbackLanguage = ((_a = token.path) === null || _a === void 0 ? void 0 : _a.endsWith('html')) ? 'angular-html' : 'angular-ts';
        const value = highlighter.codeToHtml(decodedCode, {
            // we chose ts a fallback language as most example are ts.
            // Idealy all examples should have a specified language
            lang: (_b = token.language) !== null && _b !== void 0 ? _b : fallbackLanguage,
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            cssVariablePrefix: '--shiki-',
            defaultColor: false,
        });
        token.code = value;
    }
    const dom = new jsdom_1.JSDOM(token.code);
    const document = dom.window.document;
    const lines = document.body.querySelectorAll('.line');
    // removing whitespaces text nodes so we don't have spaces between codelines
    removeWhitespaceNodes(document.body.querySelector('.shiki > code'));
    const linesCount = lines.length;
    if (linesCount === 0) {
        return;
    }
    let lineIndex = 0;
    let resultFileLineIndex = 1;
    const highlightedLineRanges = token.highlight ? (0, range_1.expandRangeStringValues)(token.highlight) : [];
    do {
        const isRemovedLine = (_c = token.diffMetadata) === null || _c === void 0 ? void 0 : _c.linesRemoved.includes(lineIndex);
        const isAddedLine = (_d = token.diffMetadata) === null || _d === void 0 ? void 0 : _d.linesAdded.includes(lineIndex);
        const isHighlighted = highlightedLineRanges.includes(lineIndex);
        const addClasses = (el) => {
            if (isRemovedLine) {
                el.classList.add(lineRemovedClassName);
            }
            if (isAddedLine) {
                el.classList.add(lineAddedClassName);
            }
            if (isHighlighted) {
                el.classList.add(lineHighlightedClassName);
            }
        };
        const currentline = lines[lineIndex];
        addClasses(currentline);
        if (!!token.linenums) {
            const lineNumberEl = jsdom_1.JSDOM.fragment(`<span role="presentation" class="${lineNumberClassName}"></span>`).firstElementChild;
            addClasses(lineNumberEl);
            lineNumberEl.textContent = isRemovedLine ? '-' : isAddedLine ? '+' : `${resultFileLineIndex}`;
            currentline.parentElement.insertBefore(lineNumberEl, currentline);
            resultFileLineIndex++;
        }
        lineIndex++;
    } while (lineIndex < linesCount);
    token.code = document.body.innerHTML;
}
/**
 *
 * Removed whitespaces between 1st level children
 */
function removeWhitespaceNodes(parent) {
    if (!parent) {
        return;
    }
    const childNodes = parent.childNodes;
    for (let i = childNodes.length - 1; i >= 0; i--) {
        const node = childNodes[i];
        if (node.nodeType === 3 && !/\S/.test(node.nodeValue)) {
            parent.removeChild(node);
        }
    }
}
