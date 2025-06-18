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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCPImageObserver = void 0;
const core_1 = require("@angular/core");
const asserts_1 = require("./asserts");
const error_helper_1 = require("./error_helper");
const url_1 = require("./url");
/**
 * Observer that detects whether an image with `NgOptimizedImage`
 * is treated as a Largest Contentful Paint (LCP) element. If so,
 * asserts that the image has the `priority` attribute.
 *
 * Note: this is a dev-mode only class and it does not appear in prod bundles,
 * thus there is no `ngDevMode` use in the code.
 *
 * Based on https://web.dev/lcp/#measure-lcp-in-javascript.
 */
let LCPImageObserver = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LCPImageObserver = _classThis = class {
        constructor() {
            // Map of full image URLs -> original `ngSrc` values.
            this.images = new Map();
            this.window = (0, core_1.inject)(core_1.DOCUMENT).defaultView;
            this.observer = null;
            (0, asserts_1.assertDevMode)('LCP checker');
            if ((typeof ngServerMode === 'undefined' || !ngServerMode) &&
                typeof PerformanceObserver !== 'undefined') {
                this.observer = this.initPerformanceObserver();
            }
        }
        /**
         * Inits PerformanceObserver and subscribes to LCP events.
         * Based on https://web.dev/lcp/#measure-lcp-in-javascript
         */
        initPerformanceObserver() {
            const observer = new PerformanceObserver((entryList) => {
                var _a, _b;
                const entries = entryList.getEntries();
                if (entries.length === 0)
                    return;
                // We use the latest entry produced by the `PerformanceObserver` as the best
                // signal on which element is actually an LCP one. As an example, the first image to load on
                // a page, by virtue of being the only thing on the page so far, is often a LCP candidate
                // and gets reported by PerformanceObserver, but isn't necessarily the LCP element.
                const lcpElement = entries[entries.length - 1];
                // Cast to `any` due to missing `element` on the `LargestContentfulPaint` type of entry.
                // See https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint
                const imgSrc = (_b = (_a = lcpElement.element) === null || _a === void 0 ? void 0 : _a.src) !== null && _b !== void 0 ? _b : '';
                // Exclude `data:` and `blob:` URLs, since they are not supported by the directive.
                if (imgSrc.startsWith('data:') || imgSrc.startsWith('blob:'))
                    return;
                const img = this.images.get(imgSrc);
                if (!img)
                    return;
                if (!img.priority && !img.alreadyWarnedPriority) {
                    img.alreadyWarnedPriority = true;
                    logMissingPriorityError(imgSrc);
                }
                if (img.modified && !img.alreadyWarnedModified) {
                    img.alreadyWarnedModified = true;
                    logModifiedWarning(imgSrc);
                }
            });
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            return observer;
        }
        registerImage(rewrittenSrc, originalNgSrc, isPriority) {
            if (!this.observer)
                return;
            const newObservedImageState = {
                priority: isPriority,
                modified: false,
                alreadyWarnedModified: false,
                alreadyWarnedPriority: false,
            };
            this.images.set((0, url_1.getUrl)(rewrittenSrc, this.window).href, newObservedImageState);
        }
        unregisterImage(rewrittenSrc) {
            if (!this.observer)
                return;
            this.images.delete((0, url_1.getUrl)(rewrittenSrc, this.window).href);
        }
        updateImage(originalSrc, newSrc) {
            if (!this.observer)
                return;
            const originalUrl = (0, url_1.getUrl)(originalSrc, this.window).href;
            const img = this.images.get(originalUrl);
            if (img) {
                img.modified = true;
                this.images.set((0, url_1.getUrl)(newSrc, this.window).href, img);
                this.images.delete(originalUrl);
            }
        }
        ngOnDestroy() {
            if (!this.observer)
                return;
            this.observer.disconnect();
            this.images.clear();
        }
    };
    __setFunctionName(_classThis, "LCPImageObserver");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LCPImageObserver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LCPImageObserver = _classThis;
})();
exports.LCPImageObserver = LCPImageObserver;
function logMissingPriorityError(ngSrc) {
    const directiveDetails = (0, error_helper_1.imgDirectiveDetails)(ngSrc);
    console.error((0, core_1.ɵformatRuntimeError)(2955 /* RuntimeErrorCode.LCP_IMG_MISSING_PRIORITY */, `${directiveDetails} this image is the Largest Contentful Paint (LCP) ` +
        `element but was not marked "priority". This image should be marked ` +
        `"priority" in order to prioritize its loading. ` +
        `To fix this, add the "priority" attribute.`));
}
function logModifiedWarning(ngSrc) {
    const directiveDetails = (0, error_helper_1.imgDirectiveDetails)(ngSrc);
    console.warn((0, core_1.ɵformatRuntimeError)(2964 /* RuntimeErrorCode.LCP_IMG_NGSRC_MODIFIED */, `${directiveDetails} this image is the Largest Contentful Paint (LCP) ` +
        `element and has had its "ngSrc" attribute modified. This can cause ` +
        `slower loading performance. It is recommended not to modify the "ngSrc" ` +
        `property on any image which could be the LCP element.`));
}
