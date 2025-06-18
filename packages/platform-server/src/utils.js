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
exports.SERVER_CONTEXT = exports.EVENT_DISPATCH_SCRIPT_ID = void 0;
exports.renderInternal = renderInternal;
exports.renderModule = renderModule;
exports.renderApplication = renderApplication;
const core_1 = require("@angular/core");
const platform_state_1 = require("./platform_state");
const server_1 = require("./server");
const tokens_1 = require("./tokens");
const transfer_state_1 = require("./transfer_state");
/**
 * Event dispatch (JSAction) script is inlined into the HTML by the build
 * process to avoid extra blocking request on a page. The script looks like this:
 * ```html
 * <script type="text/javascript" id="ng-event-dispatch-contract">...</script>
 * ```
 * This const represents the "id" attribute value.
 */
exports.EVENT_DISPATCH_SCRIPT_ID = 'ng-event-dispatch-contract';
/**
 * Creates an instance of a server platform (with or without JIT compiler support
 * depending on the `ngJitMode` global const value), using provided options.
 */
function createServerPlatform(options) {
    var _a;
    const extraProviders = (_a = options.platformProviders) !== null && _a !== void 0 ? _a : [];
    const measuringLabel = 'createServerPlatform';
    (0, core_1.ɵstartMeasuring)(measuringLabel);
    const platform = (0, server_1.platformServer)([
        { provide: tokens_1.INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders,
    ]);
    (0, core_1.ɵstopMeasuring)(measuringLabel);
    return platform;
}
/**
 * Finds and returns inlined event dispatch script if it exists.
 * See the `EVENT_DISPATCH_SCRIPT_ID` const docs for additional info.
 */
function findEventDispatchScript(doc) {
    return doc.getElementById(exports.EVENT_DISPATCH_SCRIPT_ID);
}
/**
 * Removes inlined event dispatch script if it exists.
 * See the `EVENT_DISPATCH_SCRIPT_ID` const docs for additional info.
 */
function removeEventDispatchScript(doc) {
    var _a;
    (_a = findEventDispatchScript(doc)) === null || _a === void 0 ? void 0 : _a.remove();
}
/**
 * Annotate nodes for hydration and remove event dispatch script when not needed.
 */
function prepareForHydration(platformState, applicationRef) {
    const measuringLabel = 'prepareForHydration';
    (0, core_1.ɵstartMeasuring)(measuringLabel);
    const environmentInjector = applicationRef.injector;
    const doc = platformState.getDocument();
    if (!environmentInjector.get(core_1.ɵIS_HYDRATION_DOM_REUSE_ENABLED, false)) {
        // Hydration is diabled, remove inlined event dispatch script.
        // (which was injected by the build process) from the HTML.
        removeEventDispatchScript(doc);
        return;
    }
    appendSsrContentIntegrityMarker(doc);
    const eventTypesToReplay = (0, core_1.ɵannotateForHydration)(applicationRef, doc);
    if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) {
        insertEventRecordScript(environmentInjector.get(core_1.APP_ID), doc, eventTypesToReplay, environmentInjector.get(core_1.CSP_NONCE, null));
    }
    else {
        // No events to replay, we should remove inlined event dispatch script
        // (which was injected by the build process) from the HTML.
        removeEventDispatchScript(doc);
    }
    (0, core_1.ɵstopMeasuring)(measuringLabel);
}
/**
 * Creates a marker comment node and append it into the `<body>`.
 * Some CDNs have mechanisms to remove all comment node from HTML.
 * This behaviour breaks hydration, so we'll detect on the client side if this
 * marker comment is still available or else throw an error
 */
function appendSsrContentIntegrityMarker(doc) {
    // Adding a ng hydration marker comment
    const comment = doc.createComment(core_1.ɵSSR_CONTENT_INTEGRITY_MARKER);
    doc.body.firstChild
        ? doc.body.insertBefore(comment, doc.body.firstChild)
        : doc.body.append(comment);
}
/**
 * Adds the `ng-server-context` attribute to host elements of all bootstrapped components
 * within a given application.
 */
function appendServerContextInfo(applicationRef) {
    const injector = applicationRef.injector;
    let serverContext = sanitizeServerContext(injector.get(exports.SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
    applicationRef.components.forEach((componentRef) => {
        const renderer = componentRef.injector.get(core_1.Renderer2);
        const element = componentRef.location.nativeElement;
        if (element) {
            renderer.setAttribute(element, 'ng-server-context', serverContext);
        }
    });
}
function insertEventRecordScript(appId, doc, eventTypesToReplay, nonce) {
    const measuringLabel = 'insertEventRecordScript';
    (0, core_1.ɵstartMeasuring)(measuringLabel);
    const { regular, capture } = eventTypesToReplay;
    const eventDispatchScript = findEventDispatchScript(doc);
    // Note: this is only true when build with the CLI tooling, which inserts the script in the HTML
    if (eventDispatchScript) {
        // This is defined in packages/core/primitives/event-dispatch/contract_binary.ts
        const replayScriptContents = `window.__jsaction_bootstrap(` +
            `document.body,` +
            `"${appId}",` +
            `${JSON.stringify(Array.from(regular))},` +
            `${JSON.stringify(Array.from(capture))}` +
            `);`;
        const replayScript = (0, transfer_state_1.createScript)(doc, replayScriptContents, nonce);
        // Insert replay script right after inlined event dispatch script, since it
        // relies on `__jsaction_bootstrap` to be defined in the global scope.
        eventDispatchScript.after(replayScript);
    }
    (0, core_1.ɵstopMeasuring)(measuringLabel);
}
/**
 * Renders an Angular application to a string.
 *
 * @private
 *
 * @param platformRef - Reference to the Angular platform.
 * @param applicationRef - Reference to the Angular application.
 * @returns A promise that resolves to the rendered string.
 */
function renderInternal(platformRef, applicationRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const platformState = platformRef.injector.get(platform_state_1.PlatformState);
        prepareForHydration(platformState, applicationRef);
        appendServerContextInfo(applicationRef);
        // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
        const environmentInjector = applicationRef.injector;
        const callbacks = environmentInjector.get(tokens_1.BEFORE_APP_SERIALIZED, null);
        if (callbacks) {
            const asyncCallbacks = [];
            for (const callback of callbacks) {
                try {
                    const callbackResult = callback();
                    if (callbackResult) {
                        asyncCallbacks.push(callbackResult);
                    }
                }
                catch (e) {
                    // Ignore exceptions.
                    console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                }
            }
            if (asyncCallbacks.length) {
                for (const result of yield Promise.allSettled(asyncCallbacks)) {
                    if (result.status === 'rejected') {
                        console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', result.reason);
                    }
                }
            }
        }
        return platformState.renderToString();
    });
}
/**
 * Destroy the application in a macrotask, this allows pending promises to be settled and errors
 * to be surfaced to the users.
 */
function asyncDestroyPlatform(platformRef) {
    return new Promise((resolve) => {
        setTimeout(() => {
            platformRef.destroy();
            resolve();
        }, 0);
    });
}
/**
 * Specifies the value that should be used if no server context value has been provided.
 */
const DEFAULT_SERVER_CONTEXT = 'other';
/**
 * An internal token that allows providing extra information about the server context
 * (e.g. whether SSR or SSG was used). The value is a string and characters other
 * than [a-zA-Z0-9\-] are removed. See the default value in `DEFAULT_SERVER_CONTEXT` const.
 */
exports.SERVER_CONTEXT = new core_1.InjectionToken('SERVER_CONTEXT');
/**
 * Sanitizes provided server context:
 * - removes all characters other than a-z, A-Z, 0-9 and `-`
 * - returns `other` if nothing is provided or the string is empty after sanitization
 */
function sanitizeServerContext(serverContext) {
    const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, '');
    return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
/**
 * Bootstraps an application using provided NgModule and serializes the page content to string.
 *
 * @param moduleType A reference to an NgModule that should be used for bootstrap.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `extraProviders` - set of platform level providers for the current render request.
 *
 * @publicApi
 */
function renderModule(moduleType, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { document, url, extraProviders: platformProviders } = options;
        const platformRef = createServerPlatform({ document, url, platformProviders });
        try {
            const moduleRef = yield platformRef.bootstrapModule(moduleType);
            const applicationRef = moduleRef.injector.get(core_1.ApplicationRef);
            const measuringLabel = 'whenStable';
            (0, core_1.ɵstartMeasuring)(measuringLabel);
            // Block until application is stable.
            yield applicationRef.whenStable();
            (0, core_1.ɵstopMeasuring)(measuringLabel);
            return yield renderInternal(platformRef, applicationRef);
        }
        finally {
            yield asyncDestroyPlatform(platformRef);
        }
    });
}
/**
 * Bootstraps an instance of an Angular application and renders it to a string.

 * ```ts
 * const bootstrap = () => bootstrapApplication(RootComponent, appConfig);
 * const output: string = await renderApplication(bootstrap);
 * ```
 *
 * @param bootstrap A method that when invoked returns a promise that returns an `ApplicationRef`
 *     instance once resolved.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `platformProviders` - the platform level providers for the current render request.
 *
 * @returns A Promise, that returns serialized (to a string) rendered page, once resolved.
 *
 * @publicApi
 */
function renderApplication(bootstrap, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const renderAppLabel = 'renderApplication';
        const bootstrapLabel = 'bootstrap';
        const _renderLabel = '_render';
        (0, core_1.ɵstartMeasuring)(renderAppLabel);
        const platformRef = createServerPlatform(options);
        try {
            (0, core_1.ɵstartMeasuring)(bootstrapLabel);
            const applicationRef = yield bootstrap();
            (0, core_1.ɵstopMeasuring)(bootstrapLabel);
            (0, core_1.ɵstartMeasuring)(_renderLabel);
            const measuringLabel = 'whenStable';
            (0, core_1.ɵstartMeasuring)(measuringLabel);
            // Block until application is stable.
            yield applicationRef.whenStable();
            (0, core_1.ɵstopMeasuring)(measuringLabel);
            const rendered = yield renderInternal(platformRef, applicationRef);
            (0, core_1.ɵstopMeasuring)(_renderLabel);
            return rendered;
        }
        finally {
            yield asyncDestroyPlatform(platformRef);
            (0, core_1.ɵstopMeasuring)(renderAppLabel);
        }
    });
}
