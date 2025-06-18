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
exports.processMermaidCodeBlock = processMermaidCodeBlock;
const playwright_core_1 = require("playwright-core");
const runfiles_1 = require("@bazel/runfiles");
/** Mermaid configuration to use when creating mermaid svgs. */
const mermaidConfig = {
    // The `base` theme is the only configurable theme provided by mermaid.
    theme: 'base',
};
/** The full path to the mermaid script. */
let mermaidScriptTagData;
/** Get the mermaid script file path, resolving it if necessary first. */
function getMermaidScriptTagData() {
    if (mermaidScriptTagData) {
        return mermaidScriptTagData;
    }
    return (mermaidScriptTagData = {
        path: runfiles_1.runfiles.resolve('npm/node_modules/mermaid/dist/mermaid.js'),
    });
}
/** Replace the code block content with the mermaid generated SVG element string in place. */
function processMermaidCodeBlock(token) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * The diagram source code contents. Marked reuses the token object, causing the need for
         * extracting the value before async actions occur in the function.
         */
        const diagram = token.code;
        // TODO(josephperrott): Determine if we can reuse the browser across token processing.
        /** Browser instance to run mermaid within. */
        const browser = yield playwright_core_1.chromium.launch({
            headless: true,
            // The browser binary needs to be discoverable in a build and test environment, which seems to only
            // work when provided at the execroot path. We choose to resolve it using the runfiles helper due
            // to this requirement.
            executablePath: runfiles_1.runfiles.resolveWorkspaceRelative(process.env['CHROME_BIN']),
            args: ['--no-sandbox'],
        });
        /** Page to run mermaid in. */
        const page = yield browser.newPage();
        try {
            // We goto a data URI so that we don't have to manage an html file and loading an html file.
            yield page.goto(`data:text/html,<html></html>`);
            yield page.addScriptTag(getMermaidScriptTagData());
            /** The generated SVG element string for the provided token's code. */
            let { svg } = yield page.evaluate(({ diagram, config }) => {
                mermaid.initialize(config);
                return mermaid.render('mermaid-generated-diagram', diagram);
            }, { diagram, config: mermaidConfig });
            // Replace the token's code content with the generated SVG.
            token.code = svg;
        }
        finally {
            yield browser.close();
        }
    });
}
