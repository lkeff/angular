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
exports.ImagePerformanceWarning = void 0;
const application_tokens_1 = require("./application/application_tokens");
const di_1 = require("./di");
const injector_compatibility_1 = require("./di/injector_compatibility");
const errors_1 = require("./errors");
const document_1 = require("./render3/interfaces/document");
// A delay in milliseconds before the scan is run after onLoad, to avoid any
// potential race conditions with other LCP-related functions. This delay
// happens outside of the main JavaScript execution and will only effect the timing
// on when the warning becomes visible in the console.
const SCAN_DELAY = 200;
const OVERSIZED_IMAGE_TOLERANCE = 1200;
let ImagePerformanceWarning = (() => {
    let _classDecorators = [(0, di_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImagePerformanceWarning = _classThis = class {
        constructor() {
            // Map of full image URLs -> original `ngSrc` values.
            this.window = null;
            this.observer = null;
            this.options = (0, injector_compatibility_1.inject)(application_tokens_1.IMAGE_CONFIG);
        }
        start() {
            var _a, _b;
            if ((typeof ngServerMode !== 'undefined' && ngServerMode) ||
                typeof PerformanceObserver === 'undefined' ||
                (((_a = this.options) === null || _a === void 0 ? void 0 : _a.disableImageSizeWarning) && ((_b = this.options) === null || _b === void 0 ? void 0 : _b.disableImageLazyLoadWarning))) {
                return;
            }
            this.observer = this.initPerformanceObserver();
            const doc = (0, document_1.getDocument)();
            const win = doc.defaultView;
            if (win) {
                this.window = win;
                // Wait to avoid race conditions where LCP image triggers
                // load event before it's recorded by the performance observer
                const waitToScan = () => {
                    setTimeout(this.scanImages.bind(this), SCAN_DELAY);
                };
                const setup = () => {
                    var _a;
                    // Consider the case when the application is created and destroyed multiple times.
                    // Typically, applications are created instantly once the page is loaded, and the
                    // `window.load` listener is always triggered. However, the `window.load` event will never
                    // be fired if the page is loaded, and the application is created later. Checking for
                    // `readyState` is the easiest way to determine whether the page has been loaded or not.
                    if (doc.readyState === 'complete') {
                        waitToScan();
                    }
                    else {
                        (_a = this.window) === null || _a === void 0 ? void 0 : _a.addEventListener('load', waitToScan, { once: true });
                    }
                };
                // Angular doesn't have to run change detection whenever any asynchronous tasks are invoked in
                // the scope of this functionality.
                if (typeof Zone !== 'undefined') {
                    Zone.root.run(() => setup());
                }
                else {
                    setup();
                }
            }
        }
        ngOnDestroy() {
            var _a;
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        }
        initPerformanceObserver() {
            if (typeof PerformanceObserver === 'undefined') {
                return null;
            }
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
                // Exclude `data:` and `blob:` URLs, since they are fetched resources.
                if (imgSrc.startsWith('data:') || imgSrc.startsWith('blob:'))
                    return;
                this.lcpImageUrl = imgSrc;
            });
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            return observer;
        }
        scanImages() {
            var _a;
            const images = (0, document_1.getDocument)().querySelectorAll('img');
            let lcpElementFound, lcpElementLoadedCorrectly = false;
            images.forEach((image) => {
                var _a, _b;
                if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.disableImageSizeWarning)) {
                    // Image elements using the NgOptimizedImage directive are excluded,
                    // as that directive has its own version of this check.
                    if (!image.getAttribute('ng-img') && this.isOversized(image)) {
                        logOversizedImageWarning(image.src);
                    }
                }
                if (!((_b = this.options) === null || _b === void 0 ? void 0 : _b.disableImageLazyLoadWarning) && this.lcpImageUrl) {
                    if (image.src === this.lcpImageUrl) {
                        lcpElementFound = true;
                        if (image.loading !== 'lazy' || image.getAttribute('ng-img')) {
                            // This variable is set to true and never goes back to false to account
                            // for the case where multiple images have the same src url, and some
                            // have lazy loading while others don't.
                            // Also ignore NgOptimizedImage because there's a different warning for that.
                            lcpElementLoadedCorrectly = true;
                        }
                    }
                }
            });
            if (lcpElementFound &&
                !lcpElementLoadedCorrectly &&
                this.lcpImageUrl &&
                !((_a = this.options) === null || _a === void 0 ? void 0 : _a.disableImageLazyLoadWarning)) {
                logLazyLCPWarning(this.lcpImageUrl);
            }
        }
        isOversized(image) {
            if (!this.window) {
                return false;
            }
            // The `isOversized` check may not be applicable or may require adjustments
            // for several types of image formats or scenarios. Currently, we specify only
            // `svg`, but this may also include `gif` since their quality isn’t tied to
            // dimensions in the same way as raster images.
            const nonOversizedImageExtentions = [
                // SVG images are vector-based, which means they can scale
                // to any size without losing quality.
                '.svg',
            ];
            // Convert it to lowercase because this may have uppercase
            // extensions, such as `IMAGE.SVG`.
            // We fallback to an empty string because `src` may be `undefined`
            // if it is explicitly set to `null` by some third-party code
            // (e.g., `image.src = null`).
            const imageSource = (image.src || '').toLowerCase();
            if (nonOversizedImageExtentions.some((extension) => imageSource.endsWith(extension))) {
                return false;
            }
            const computedStyle = this.window.getComputedStyle(image);
            let renderedWidth = parseFloat(computedStyle.getPropertyValue('width'));
            let renderedHeight = parseFloat(computedStyle.getPropertyValue('height'));
            const boxSizing = computedStyle.getPropertyValue('box-sizing');
            const objectFit = computedStyle.getPropertyValue('object-fit');
            if (objectFit === `cover`) {
                // Object fit cover may indicate a use case such as a sprite sheet where
                // this warning does not apply.
                return false;
            }
            if (boxSizing === 'border-box') {
                // If the image `box-sizing` is set to `border-box`, we adjust the rendered
                // dimensions by subtracting padding values.
                const paddingTop = computedStyle.getPropertyValue('padding-top');
                const paddingRight = computedStyle.getPropertyValue('padding-right');
                const paddingBottom = computedStyle.getPropertyValue('padding-bottom');
                const paddingLeft = computedStyle.getPropertyValue('padding-left');
                renderedWidth -= parseFloat(paddingRight) + parseFloat(paddingLeft);
                renderedHeight -= parseFloat(paddingTop) + parseFloat(paddingBottom);
            }
            const intrinsicWidth = image.naturalWidth;
            const intrinsicHeight = image.naturalHeight;
            const recommendedWidth = this.window.devicePixelRatio * renderedWidth;
            const recommendedHeight = this.window.devicePixelRatio * renderedHeight;
            const oversizedWidth = intrinsicWidth - recommendedWidth >= OVERSIZED_IMAGE_TOLERANCE;
            const oversizedHeight = intrinsicHeight - recommendedHeight >= OVERSIZED_IMAGE_TOLERANCE;
            return oversizedWidth || oversizedHeight;
        }
    };
    __setFunctionName(_classThis, "ImagePerformanceWarning");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImagePerformanceWarning = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImagePerformanceWarning = _classThis;
})();
exports.ImagePerformanceWarning = ImagePerformanceWarning;
function logLazyLCPWarning(src) {
    console.warn((0, errors_1.formatRuntimeError)(-913 /* RuntimeErrorCode.IMAGE_PERFORMANCE_WARNING */, `An image with src ${src} is the Largest Contentful Paint (LCP) element ` +
        `but was given a "loading" value of "lazy", which can negatively impact ` +
        `application loading performance. This warning can be addressed by ` +
        `changing the loading value of the LCP image to "eager", or by using the ` +
        `NgOptimizedImage directive's prioritization utilities. For more ` +
        `information about addressing or disabling this warning, see ` +
        `https://angular.dev/errors/NG0913`));
}
function logOversizedImageWarning(src) {
    console.warn((0, errors_1.formatRuntimeError)(-913 /* RuntimeErrorCode.IMAGE_PERFORMANCE_WARNING */, `An image with src ${src} has intrinsic file dimensions much larger than its ` +
        `rendered size. This can negatively impact application loading performance. ` +
        `For more information about addressing or disabling this warning, see ` +
        `https://angular.dev/errors/NG0913`));
}
