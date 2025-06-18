"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE_EDITOR_EXTENSIONS = exports.EditorView = void 0;
const state_1 = require("@codemirror/state");
const view_1 = require("@codemirror/view");
var view_2 = require("@codemirror/view");
Object.defineProperty(exports, "EditorView", { enumerable: true, get: function () { return view_2.EditorView; } });
const language_1 = require("@codemirror/language");
const commands_1 = require("@codemirror/commands");
const search_1 = require("@codemirror/search");
const autocomplete_1 = require("@codemirror/autocomplete");
const lint_1 = require("@codemirror/lint");
const syntax_styles_1 = require("./syntax-styles");
const theme_styles_1 = require("./theme-styles");
exports.CODE_EDITOR_EXTENSIONS = [
    (0, view_1.lineNumbers)(),
    (0, view_1.highlightActiveLineGutter)(),
    (0, view_1.highlightSpecialChars)(),
    (0, commands_1.history)(),
    (0, language_1.foldGutter)(),
    (0, view_1.drawSelection)(),
    (0, view_1.dropCursor)(),
    state_1.EditorState.allowMultipleSelections.of(true),
    (0, language_1.indentOnInput)(),
    (0, language_1.bracketMatching)(),
    (0, autocomplete_1.closeBrackets)(),
    (0, autocomplete_1.autocompletion)(),
    (0, view_1.rectangularSelection)(),
    (0, view_1.crosshairCursor)(),
    (0, view_1.highlightActiveLine)(),
    (0, search_1.highlightSelectionMatches)(),
    (0, language_1.syntaxHighlighting)(language_1.defaultHighlightStyle, { fallback: true }),
    (0, language_1.syntaxHighlighting)(language_1.HighlightStyle.define(syntax_styles_1.SYNTAX_STYLES)),
    view_1.EditorView.lineWrapping,
    view_1.EditorView.theme(theme_styles_1.CODE_EDITOR_THEME_STYLES, 
    // TODO: get from global theme, reconfigure on change: https://discuss.codemirror.net/t/dynamic-light-mode-dark-mode-how/4709
    { dark: true }),
    view_1.keymap.of([
        ...autocomplete_1.closeBracketsKeymap,
        ...commands_1.defaultKeymap,
        ...search_1.searchKeymap,
        ...commands_1.historyKeymap,
        ...language_1.foldKeymap,
        ...autocomplete_1.completionKeymap,
        ...lint_1.lintKeymap,
        commands_1.indentWithTab,
        {
            key: 'Ctrl-.',
            run: autocomplete_1.startCompletion,
            mac: 'Mod-.',
        },
    ]),
];
