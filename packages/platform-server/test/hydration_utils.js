"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConsole = exports.DEFAULT_DOCUMENT = exports.EVENT_DISPATCH_SCRIPT = exports.TRANSFER_STATE_TOKEN_ID = exports.SKIP_HYDRATION_ATTR_NAME_LOWER_CASE = exports.SKIP_HYDRATION_ATTR_NAME = exports.TEXT_NODE_SEPARATOR_COMMENT = exports.EMPTY_TEXT_NODE_COMMENT = exports.NGH_ATTR_NAME = void 0;
exports.getComponentRef = getComponentRef;
exports.stripSsrIntegrityMarker = stripSsrIntegrityMarker;
exports.stripTransferDataScript = stripTransferDataScript;
exports.stripExcessiveSpaces = stripExcessiveSpaces;
exports.verifyClientAndSSRContentsMatch = verifyClientAndSSRContentsMatch;
exports.verifyNodeHasMismatchInfo = verifyNodeHasMismatchInfo;
exports.isTransferStateScript = isTransferStateScript;
exports.isSsrContentsIntegrityMarker = isSsrContentsIntegrityMarker;
exports.verifyAllNodesClaimedForHydration = verifyAllNodesClaimedForHydration;
exports.verifyAllChildNodesClaimedForHydration = verifyAllChildNodesClaimedForHydration;
exports.verifyNodeWasHydrated = verifyNodeWasHydrated;
exports.verifyNodeWasNotHydrated = verifyNodeWasNotHydrated;
exports.verifyNoNodesWereClaimedForHydration = verifyNoNodesWereClaimedForHydration;
exports.verifyNodeHasSkipHydrationMarker = verifyNodeHasSkipHydrationMarker;
exports.verifyHasLog = verifyHasLog;
exports.verifyHasNoLog = verifyHasNoLog;
exports.timeout = timeout;
exports.getHydrationInfoFromTransferState = getHydrationInfoFromTransferState;
exports.withNoopErrorHandler = withNoopErrorHandler;
exports.withDebugConsole = withDebugConsole;
exports.ssr = ssr;
exports.verifyEmptyConsole = verifyEmptyConsole;
exports.clearConsole = clearConsole;
exports.resetNgDevModeCounters = resetNgDevModeCounters;
const core_1 = require("@angular/core");
const console_1 = require("@angular/core/src/console");
const utils_1 = require("@angular/core/src/hydration/utils");
const platform_browser_1 = require("@angular/platform-browser");
const public_api_1 = require("../public_api");
const utils_2 = require("../src/utils");
const dom_utils_1 = require("./dom_utils");
/**
 * The name of the attribute that contains a slot index
 * inside the TransferState storage where hydration info
 * could be found.
 */
exports.NGH_ATTR_NAME = 'ngh';
exports.EMPTY_TEXT_NODE_COMMENT = 'ngetn';
exports.TEXT_NODE_SEPARATOR_COMMENT = 'ngtns';
exports.SKIP_HYDRATION_ATTR_NAME = 'ngSkipHydration';
exports.SKIP_HYDRATION_ATTR_NAME_LOWER_CASE = exports.SKIP_HYDRATION_ATTR_NAME.toLowerCase();
exports.TRANSFER_STATE_TOKEN_ID = '__nghData__';
/**
 * Represents the <script> tag added by the build process to inject
 * event dispatch (JSAction) logic.
 */
exports.EVENT_DISPATCH_SCRIPT = `<script type="text/javascript" id="${utils_2.EVENT_DISPATCH_SCRIPT_ID}"></script>`;
exports.DEFAULT_DOCUMENT = `<html><head></head><body>${exports.EVENT_DISPATCH_SCRIPT}<app></app></body></html>`;
function getComponentRef(appRef) {
    return appRef.components[0];
}
function stripSsrIntegrityMarker(input) {
    return input.replace(`<!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}-->`, '');
}
function stripTransferDataScript(input) {
    return input.replace(/<script (.*?)<\/script>/s, '');
}
function stripExcessiveSpaces(html) {
    return html.replace(/\s+/g, ' ');
}
function verifyClientAndSSRContentsMatch(ssrContents, clientAppRootElement) {
    const clientContents = stripSsrIntegrityMarker(stripTransferDataScript((0, dom_utils_1.stripUtilAttributes)(clientAppRootElement.outerHTML, false)));
    ssrContents = stripSsrIntegrityMarker(stripTransferDataScript((0, dom_utils_1.stripUtilAttributes)(ssrContents, false)));
    expect((0, dom_utils_1.getAppContents)(clientContents)).toBe(ssrContents, 'Client and server contents mismatch');
}
function verifyNodeHasMismatchInfo(doc, selector = 'app') {
    var _a;
    expect((_a = (0, utils_1.readHydrationInfo)(doc.querySelector(selector))) === null || _a === void 0 ? void 0 : _a.status).toBe(utils_1.HydrationStatus.Mismatched);
}
/** Checks whether a given element is a <script> that contains transfer state data. */
function isTransferStateScript(el) {
    return (el.nodeType === Node.ELEMENT_NODE &&
        el.tagName.toLowerCase() === 'script' &&
        el.getAttribute('id') === 'ng-state');
}
function isSsrContentsIntegrityMarker(el) {
    var _a;
    return (el.nodeType === Node.COMMENT_NODE && ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === utils_1.SSR_CONTENT_INTEGRITY_MARKER);
}
/**
 * Walks over DOM nodes starting from a given node and checks
 * whether all nodes were claimed for hydration, i.e. annotated
 * with a special monkey-patched flag (which is added in dev mode
 * only). It skips any nodes with the skip hydration attribute.
 */
function verifyAllNodesClaimedForHydration(el, exceptions = []) {
    var _a;
    if ((el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(exports.SKIP_HYDRATION_ATTR_NAME_LOWER_CASE)) ||
        exceptions.includes(el) ||
        isTransferStateScript(el) ||
        isSsrContentsIntegrityMarker(el)) {
        return;
    }
    if (((_a = (0, utils_1.readHydrationInfo)(el)) === null || _a === void 0 ? void 0 : _a.status) !== utils_1.HydrationStatus.Hydrated) {
        fail('Hydration error: the node is *not* hydrated: ' + el.outerHTML);
    }
    verifyAllChildNodesClaimedForHydration(el, exceptions);
}
function verifyAllChildNodesClaimedForHydration(el, exceptions = []) {
    let current = el.firstChild;
    while (current) {
        verifyAllNodesClaimedForHydration(current, exceptions);
        current = current.nextSibling;
    }
}
function verifyNodeWasHydrated(el) {
    var _a;
    if (((_a = (0, utils_1.readHydrationInfo)(el)) === null || _a === void 0 ? void 0 : _a.status) !== utils_1.HydrationStatus.Hydrated) {
        fail('Hydration error: the node is *not* hydrated: ' + el.outerHTML);
    }
}
function verifyNodeWasNotHydrated(el) {
    var _a;
    if (((_a = (0, utils_1.readHydrationInfo)(el)) === null || _a === void 0 ? void 0 : _a.status) === utils_1.HydrationStatus.Hydrated) {
        fail('Hydration error: the node is hydrated and should not be: ' + el.outerHTML);
    }
}
/**
 * Walks over DOM nodes starting from a given node and make sure
 * those nodes were not annotated as "claimed" by hydration.
 * This helper function is needed to verify that the non-destructive
 * hydration feature can be turned off.
 */
function verifyNoNodesWereClaimedForHydration(el) {
    var _a;
    if (((_a = (0, utils_1.readHydrationInfo)(el)) === null || _a === void 0 ? void 0 : _a.status) === utils_1.HydrationStatus.Hydrated) {
        fail('Unexpected state: the following node was hydrated, when the test ' +
            'expects the node to be re-created instead: ' +
            el.outerHTML);
    }
    let current = el.firstChild;
    while (current) {
        verifyNoNodesWereClaimedForHydration(current);
        current = current.nextSibling;
    }
}
function verifyNodeHasSkipHydrationMarker(element) {
    var _a;
    expect((_a = (0, utils_1.readHydrationInfo)(element)) === null || _a === void 0 ? void 0 : _a.status).toBe(utils_1.HydrationStatus.Skipped);
}
/**
 * Verifies whether a console has a log entry that contains a given message.
 */
function verifyHasLog(appRef, message) {
    const console = appRef.injector.get(console_1.Console);
    const context = `Expected '${message}' to be present in the log, but it was not found. ` +
        `Logs content: ${JSON.stringify(console.logs)}`;
    expect(console.logs.some((log) => log.includes(message)))
        .withContext(context)
        .toBe(true);
}
/**
 * Verifies that there is no message with a particular content in a console.
 */
function verifyHasNoLog(appRef, message) {
    const console = appRef.injector.get(console_1.Console);
    const context = `Expected '${message}' to be present in the log, but it was not found. ` +
        `Logs content: ${JSON.stringify(console.logs)}`;
    expect(console.logs.some((log) => log.includes(message)))
        .withContext(context)
        .toBe(false);
}
function timeout(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
function getHydrationInfoFromTransferState(input) {
    var _a;
    return (_a = input.match(/<script[^>]+>(.*?)<\/script>/)) === null || _a === void 0 ? void 0 : _a[1];
}
function withNoopErrorHandler() {
    class NoopErrorHandler extends core_1.ErrorHandler {
        handleError(error) {
            // noop
        }
    }
    return [
        {
            provide: core_1.ErrorHandler,
            useClass: NoopErrorHandler,
        },
    ];
}
let DebugConsole = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = console_1.Console;
    var DebugConsole = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.logs = [];
        }
        log(message) {
            this.logs.push(message);
        }
        warn(message) {
            this.logs.push(message);
        }
    };
    __setFunctionName(_classThis, "DebugConsole");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DebugConsole = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DebugConsole = _classThis;
})();
exports.DebugConsole = DebugConsole;
function withDebugConsole() {
    return [{ provide: console_1.Console, useClass: DebugConsole }];
}
/**
 * This renders the application with server side rendering logic.
 *
 * @param component the test component to be rendered
 * @param doc the document
 * @param envProviders the environment providers
 * @returns a promise containing the server rendered app as a string
 */
function ssr(component_1) {
    return __awaiter(this, arguments, void 0, function* (component, options = {}) {
        var _a;
        try {
            // Enter server mode for the duration of this function.
            globalThis['ngServerMode'] = true;
            const defaultHtml = exports.DEFAULT_DOCUMENT;
            const { enableHydration = true, envProviders = [], hydrationFeatures = () => [] } = options;
            const providers = [
                ...envProviders,
                (0, public_api_1.provideServerRendering)(),
                enableHydration ? (0, platform_browser_1.provideClientHydration)(...hydrationFeatures()) : [],
            ];
            const bootstrap = () => (0, platform_browser_1.bootstrapApplication)(component, { providers });
            return yield (0, utils_2.renderApplication)(bootstrap, {
                document: (_a = options === null || options === void 0 ? void 0 : options.doc) !== null && _a !== void 0 ? _a : defaultHtml,
            });
        }
        finally {
            // Leave server mode so the remaining test is back in "client mode".
            globalThis['ngServerMode'] = undefined;
        }
    });
}
/**
 * Verifies that there are no messages in a console.
 */
function verifyEmptyConsole(appRef) {
    const console = appRef.injector.get(console_1.Console);
    const logs = console.logs.filter((msg) => !msg.startsWith('Angular is running in development mode'));
    expect(logs).toEqual([]);
}
/**
 * Clears the Debug console
 */
function clearConsole(appRef) {
    const console = appRef.injector.get(console_1.Console);
    console.logs = [];
}
// Clears all the counts in ngDevMode
function resetNgDevModeCounters() {
    if (typeof ngDevMode === 'object') {
        // Reset all ngDevMode counters.
        for (const metric of Object.keys(ngDevMode)) {
            const currentValue = ngDevMode[metric];
            if (typeof currentValue === 'number') {
                // Rest only numeric values, which represent counters.
                ngDevMode[metric] = 0;
            }
        }
    }
}
