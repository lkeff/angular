"use strict";
/*!
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
exports.TableOfContentsLoader = exports.TOC_SKIP_CONTENT_MARKER = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
/**
 * Name of an attribute that is set on an element that should be
 * excluded from the `TableOfContentsLoader` lookup. This is needed
 * to exempt SSR'ed content of the `TableOfContents` component from
 * being inspected and accidentally pulling more content into ToC.
 */
exports.TOC_SKIP_CONTENT_MARKER = 'toc-skip-content';
let TableOfContentsLoader = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TableOfContentsLoader = _classThis = class {
        constructor() {
            // There are some cases when default browser anchor scrolls a little above the
            // heading In that cases wrong item was selected. The value found by trial and
            // error.
            this.toleranceThreshold = 40;
            this.tableOfContentItems = (0, core_1.signal)([]);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
        }
        buildTableOfContent(docElement) {
            const headings = this.getHeadings(docElement);
            const tocList = headings.map((heading) => ({
                id: heading.id,
                level: heading.tagName.toLowerCase(),
                title: this.getHeadingTitle(heading),
            }));
            this.tableOfContentItems.set(tocList);
        }
        getHeadingTitle(heading) {
            const div = this.document.createElement('div');
            div.innerHTML = heading.innerHTML;
            return (div.textContent || '').trim();
        }
        // Get all headings (h2 and h3) with ids, which are not children of the
        // docs-example-viewer component.
        getHeadings(element) {
            return Array.from(element.querySelectorAll(`h2[id]:not(docs-example-viewer h2):not([${exports.TOC_SKIP_CONTENT_MARKER}]),` +
                `h3[id]:not(docs-example-viewer h3):not([${exports.TOC_SKIP_CONTENT_MARKER}])`));
        }
        /**
         * The methods setups several IntersectionObservers to determine when a heading is at the top of
         * the viewport. Using an IntersectionObserver is more efficient than reading DOM position
         * as it won't trigger any reflow.
         */
        setupIntersectionObserver(element, destroyRef, onActiveId) {
            // If we're at the top the we need the default active id to be the first heading.
            const headings = this.getHeadings(element);
            onActiveId(headings[0].id);
            headings.forEach((heading) => {
                const ioConfiguration = {
                    /**
                     * This rootMargin creates a horizontal line at 5% from the top of the viewport
                     * that will help trigger an intersection at that the very point.
                     */
                    rootMargin: '0% 0% -95% 0%',
                    /** 0 is the default  */
                    threshold: 0,
                };
                const observer = new IntersectionObserver((entries, o) => {
                    if (entries[0].isIntersecting) {
                        onActiveId(entries[0].target.id);
                    }
                }, ioConfiguration);
                observer.observe(heading);
                destroyRef.onDestroy(() => observer.disconnect());
            });
        }
    };
    __setFunctionName(_classThis, "TableOfContentsLoader");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TableOfContentsLoader = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TableOfContentsLoader = _classThis;
})();
exports.TableOfContentsLoader = TableOfContentsLoader;
