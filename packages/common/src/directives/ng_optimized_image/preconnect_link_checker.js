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
exports.PreconnectLinkChecker = exports.PRECONNECT_CHECK_BLOCKLIST = void 0;
const core_1 = require("@angular/core");
const asserts_1 = require("./asserts");
const error_helper_1 = require("./error_helper");
const url_1 = require("./url");
// Set of origins that are always excluded from the preconnect checks.
const INTERNAL_PRECONNECT_CHECK_BLOCKLIST = new Set(['localhost', '127.0.0.1', '0.0.0.0']);
/**
 * Injection token to configure which origins should be excluded
 * from the preconnect checks. It can either be a single string or an array of strings
 * to represent a group of origins, for example:
 *
 * ```ts
 *  {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
 * ```
 *
 * or:
 *
 * ```ts
 *  {provide: PRECONNECT_CHECK_BLOCKLIST,
 *   useValue: ['https://your-domain-1.com', 'https://your-domain-2.com']}
 * ```
 *
 * @publicApi
 */
exports.PRECONNECT_CHECK_BLOCKLIST = new core_1.InjectionToken(ngDevMode ? 'PRECONNECT_CHECK_BLOCKLIST' : '');
/**
 * Contains the logic to detect whether an image, marked with the "priority" attribute
 * has a corresponding `<link rel="preconnect">` tag in the `document.head`.
 *
 * Note: this is a dev-mode only class, which should not appear in prod bundles,
 * thus there is no `ngDevMode` use in the code.
 */
let PreconnectLinkChecker = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PreconnectLinkChecker = _classThis = class {
        constructor() {
            this.document = (0, core_1.inject)(core_1.DOCUMENT);
            /**
             * Set of <link rel="preconnect"> tags found on this page.
             * The `null` value indicates that there was no DOM query operation performed.
             */
            this.preconnectLinks = null;
            /*
             * Keep track of all already seen origin URLs to avoid repeating the same check.
             */
            this.alreadySeen = new Set();
            this.window = this.document.defaultView;
            this.blocklist = new Set(INTERNAL_PRECONNECT_CHECK_BLOCKLIST);
            (0, asserts_1.assertDevMode)('preconnect link checker');
            const blocklist = (0, core_1.inject)(exports.PRECONNECT_CHECK_BLOCKLIST, { optional: true });
            if (blocklist) {
                this.populateBlocklist(blocklist);
            }
        }
        populateBlocklist(origins) {
            if (Array.isArray(origins)) {
                deepForEach(origins, (origin) => {
                    this.blocklist.add((0, url_1.extractHostname)(origin));
                });
            }
            else {
                this.blocklist.add((0, url_1.extractHostname)(origins));
            }
        }
        /**
         * Checks that a preconnect resource hint exists in the head for the
         * given src.
         *
         * @param rewrittenSrc src formatted with loader
         * @param originalNgSrc ngSrc value
         */
        assertPreconnect(rewrittenSrc, originalNgSrc) {
            var _a;
            if (typeof ngServerMode !== 'undefined' && ngServerMode)
                return;
            const imgUrl = (0, url_1.getUrl)(rewrittenSrc, this.window);
            if (this.blocklist.has(imgUrl.hostname) || this.alreadySeen.has(imgUrl.origin))
                return;
            // Register this origin as seen, so we don't check it again later.
            this.alreadySeen.add(imgUrl.origin);
            // Note: we query for preconnect links only *once* and cache the results
            // for the entire lifespan of an application, since it's unlikely that the
            // list would change frequently. This allows to make sure there are no
            // performance implications of making extra DOM lookups for each image.
            (_a = this.preconnectLinks) !== null && _a !== void 0 ? _a : (this.preconnectLinks = this.queryPreconnectLinks());
            if (!this.preconnectLinks.has(imgUrl.origin)) {
                console.warn((0, core_1.ɵformatRuntimeError)(2956 /* RuntimeErrorCode.PRIORITY_IMG_MISSING_PRECONNECT_TAG */, `${(0, error_helper_1.imgDirectiveDetails)(originalNgSrc)} there is no preconnect tag present for this ` +
                    `image. Preconnecting to the origin(s) that serve priority images ensures that these ` +
                    `images are delivered as soon as possible. To fix this, please add the following ` +
                    `element into the <head> of the document:\n` +
                    `  <link rel="preconnect" href="${imgUrl.origin}">`));
            }
        }
        queryPreconnectLinks() {
            const preconnectUrls = new Set();
            const links = this.document.querySelectorAll('link[rel=preconnect]');
            for (const link of links) {
                const url = (0, url_1.getUrl)(link.href, this.window);
                preconnectUrls.add(url.origin);
            }
            return preconnectUrls;
        }
        ngOnDestroy() {
            var _a;
            (_a = this.preconnectLinks) === null || _a === void 0 ? void 0 : _a.clear();
            this.alreadySeen.clear();
        }
    };
    __setFunctionName(_classThis, "PreconnectLinkChecker");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PreconnectLinkChecker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PreconnectLinkChecker = _classThis;
})();
exports.PreconnectLinkChecker = PreconnectLinkChecker;
/**
 * Invokes a callback for each element in the array. Also invokes a callback
 * recursively for each nested array.
 */
function deepForEach(input, fn) {
    for (let value of input) {
        Array.isArray(value) ? deepForEach(value, fn) : fn(value);
    }
}
