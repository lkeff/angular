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
exports.PreloadLinkCreator = void 0;
const core_1 = require("@angular/core");
const tokens_1 = require("./tokens");
/**
 * @description Contains the logic needed to track and add preload link tags to the `<head>` tag. It
 * will also track what images have already had preload link tags added so as to not duplicate link
 * tags.
 *
 * In dev mode this service will validate that the number of preloaded images does not exceed the
 * configured default preloaded images limit: {@link DEFAULT_PRELOADED_IMAGES_LIMIT}.
 */
let PreloadLinkCreator = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PreloadLinkCreator = _classThis = class {
        constructor() {
            this.preloadedImages = (0, core_1.inject)(tokens_1.PRELOADED_IMAGES);
            this.document = (0, core_1.inject)(core_1.DOCUMENT);
            this.errorShown = false;
        }
        /**
         * @description Add a preload `<link>` to the `<head>` of the `index.html` that is served from the
         * server while using Angular Universal and SSR to kick off image loads for high priority images.
         *
         * The `sizes` (passed in from the user) and `srcset` (parsed and formatted from `ngSrcset`)
         * properties used to set the corresponding attributes, `imagesizes` and `imagesrcset`
         * respectively, on the preload `<link>` tag so that the correctly sized image is preloaded from
         * the CDN.
         *
         * {@link https://web.dev/preload-responsive-images/#imagesrcset-and-imagesizes}
         *
         * @param renderer The `Renderer2` passed in from the directive
         * @param src The original src of the image that is set on the `ngSrc` input.
         * @param srcset The parsed and formatted srcset created from the `ngSrcset` input
         * @param sizes The value of the `sizes` attribute passed in to the `<img>` tag
         */
        createPreloadLinkTag(renderer, src, srcset, sizes) {
            if (ngDevMode &&
                !this.errorShown &&
                this.preloadedImages.size >= tokens_1.DEFAULT_PRELOADED_IMAGES_LIMIT) {
                this.errorShown = true;
                console.warn((0, core_1.ɵformatRuntimeError)(2961 /* RuntimeErrorCode.TOO_MANY_PRELOADED_IMAGES */, `The \`NgOptimizedImage\` directive has detected that more than ` +
                    `${tokens_1.DEFAULT_PRELOADED_IMAGES_LIMIT} images were marked as priority. ` +
                    `This might negatively affect an overall performance of the page. ` +
                    `To fix this, remove the "priority" attribute from images with less priority.`));
            }
            if (this.preloadedImages.has(src)) {
                return;
            }
            this.preloadedImages.add(src);
            const preload = renderer.createElement('link');
            renderer.setAttribute(preload, 'as', 'image');
            renderer.setAttribute(preload, 'href', src);
            renderer.setAttribute(preload, 'rel', 'preload');
            renderer.setAttribute(preload, 'fetchpriority', 'high');
            if (sizes) {
                renderer.setAttribute(preload, 'imageSizes', sizes);
            }
            if (srcset) {
                renderer.setAttribute(preload, 'imageSrcset', srcset);
            }
            renderer.appendChild(this.document.head, preload);
        }
    };
    __setFunctionName(_classThis, "PreloadLinkCreator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PreloadLinkCreator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PreloadLinkCreator = _classThis;
})();
exports.PreloadLinkCreator = PreloadLinkCreator;
