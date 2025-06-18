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
exports.stripUtilAttributes = stripUtilAttributes;
exports.getAppContents = getAppContents;
exports.resetTViewsFor = resetTViewsFor;
exports.hydrate = hydrate;
exports.insertDomInDocument = insertDomInDocument;
exports.prepareEnvironment = prepareEnvironment;
exports.prepareEnvironmentAndHydrate = prepareEnvironmentAndHydrate;
exports.clearDocument = clearDocument;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const api_1 = require("@angular/core/src/hydration/api");
const def_getters_1 = require("@angular/core/src/render3/def_getters");
const platform_browser_1 = require("@angular/platform-browser");
/**
 * The name of the attribute that contains a slot index
 * inside the TransferState storage where hydration info
 * could be found.
 */
const NGH_ATTR_NAME = 'ngh';
const EMPTY_TEXT_NODE_COMMENT = 'ngetn';
const TEXT_NODE_SEPARATOR_COMMENT = 'ngtns';
const NGH_ATTR_REGEXP = new RegExp(` ${NGH_ATTR_NAME}=".*?"`, 'g');
const EMPTY_TEXT_NODE_REGEXP = new RegExp(`<!--${EMPTY_TEXT_NODE_COMMENT}-->`, 'g');
const TEXT_NODE_SEPARATOR_REGEXP = new RegExp(`<!--${TEXT_NODE_SEPARATOR_COMMENT}-->`, 'g');
/**
 * Drop utility attributes such as `ng-version`, `ng-server-context` and `ngh`,
 * so that it's easier to make assertions in tests.
 */
function stripUtilAttributes(html, keepNgh) {
    html = html
        .replace(/ ng-version=".*?"/g, '')
        .replace(/ ng-server-context=".*?"/g, '')
        .replace(/ ng-reflect-(.*?)=".*?"/g, '')
        .replace(/ _nghost(.*?)=""/g, '')
        .replace(/ _ngcontent(.*?)=""/g, '');
    if (!keepNgh) {
        html = html
            .replace(NGH_ATTR_REGEXP, '')
            .replace(EMPTY_TEXT_NODE_REGEXP, '')
            .replace(TEXT_NODE_SEPARATOR_REGEXP, '');
    }
    return html;
}
/**
 * Extracts a portion of HTML located inside of the `<body>` element.
 * This content belongs to the application view (and supporting TransferState
 * scripts) rendered on the server.
 */
function getAppContents(html) {
    const result = stripUtilAttributes(html, true).match(/<body>(.*?)<\/body>/s);
    return result ? result[1] : html;
}
/**
 * Converts a static HTML to a DOM structure.
 *
 * @param html the rendered html in test
 * @param doc the document object
 * @returns a div element containing a copy of the app contents
 */
function convertHtmlToDom(html, doc) {
    const contents = getAppContents(html);
    const container = doc.createElement('div');
    container.innerHTML = contents;
    return container;
}
/**
 * Reset TView, so that we re-enter the first create pass as
 * we would normally do when we hydrate on the client. Otherwise,
 * hydration info would not be applied to T data structures.
 */
function resetTViewsFor(...types) {
    for (const type of types) {
        (0, def_getters_1.getComponentDef)(type).tView = null;
    }
}
function hydrate(doc, component, options = {}) {
    const { envProviders = [], hydrationFeatures = () => [] } = options;
    // Apply correct reference to the `document` object,
    // which will be used by runtime.
    (0, core_1.ɵsetDocument)(doc);
    // Define `document` to make `DefaultDomRenderer2` work, since it
    // references `document` directly to create style tags.
    global.document = doc;
    const providers = [
        ...envProviders,
        { provide: core_1.PLATFORM_ID, useValue: 'browser' },
        { provide: common_1.DOCUMENT, useFactory: () => doc },
        (0, platform_browser_1.provideClientHydration)(...hydrationFeatures()),
    ];
    return (0, platform_browser_1.bootstrapApplication)(component, { providers });
}
function insertDomInDocument(doc, html) {
    // Get HTML contents of the `<app>`, create a DOM element and append it into the body.
    const container = convertHtmlToDom(html, doc);
    // If there was a client render mode marker present in HTML - apply it to the <body>
    // element as well.
    const hasClientModeMarker = new RegExp(` ${api_1.CLIENT_RENDER_MODE_FLAG}`, 'g').test(html);
    if (hasClientModeMarker) {
        doc.body.setAttribute(api_1.CLIENT_RENDER_MODE_FLAG, '');
    }
    Array.from(container.childNodes).forEach((node) => doc.body.appendChild(node));
}
/**
 * This prepares the environment before hydration begins.
 *
 * @param doc the document object
 * @param html the server side rendered DOM string to be hydrated
 * @returns a promise with the application ref
 */
function prepareEnvironment(doc, html) {
    var _a;
    insertDomInDocument(doc, html);
    globalThis.document = doc;
    const scripts = doc.getElementsByTagName('script');
    for (const script of Array.from(scripts)) {
        if ((_a = script === null || script === void 0 ? void 0 : script.textContent) === null || _a === void 0 ? void 0 : _a.startsWith('window.__jsaction_bootstrap')) {
            eval(script.textContent);
        }
    }
}
/**
 * This bootstraps an application with existing html and enables hydration support
 * causing hydration to be invoked.
 *
 * @param html the server side rendered DOM string to be hydrated
 * @param component the root component
 * @param envProviders the environment providers
 * @returns a promise with the application ref
 */
function prepareEnvironmentAndHydrate(doc, html, component, options) {
    return __awaiter(this, void 0, void 0, function* () {
        prepareEnvironment(doc, html);
        return hydrate(doc, component, options);
    });
}
/**
 * Clears document contents to have a clean state for the next test.
 */
function clearDocument(doc) {
    doc.body.textContent = '';
    doc.body.removeAttribute(api_1.CLIENT_RENDER_MODE_FLAG);
}
