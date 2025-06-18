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
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const docs_1 = require("@angular/docs");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const reference_scroll_handler_service_1 = require("../services/reference-scroll-handler.service");
const api_reference_prerender_constants_1 = require("../constants/api-reference-prerender.constants");
const HIGHLIGHTED_CARD_CLASS = 'docs-highlighted-card';
let ApiReferenceDetailsPage = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-reference-page',
            imports: [docs_1.DocViewer],
            templateUrl: './api-reference-details-page.component.html',
            styleUrls: ['./api-reference-details-page.component.scss'],
            providers: [reference_scroll_handler_service_1.ReferenceScrollHandler],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ApiReferenceDetailsPage = _classThis = class {
        constructor() {
            this.referenceScrollHandler = (0, core_1.inject)(reference_scroll_handler_service_1.ReferenceScrollHandler);
            this.route = (0, core_1.inject)(router_1.ActivatedRoute);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.renderer = (0, core_1.inject)(core_1.Renderer2);
            this.highlightedElement = null;
            this.docContent = (0, core_1.input)();
            this.urlFragment = (0, rxjs_interop_1.toSignal)(this.route.fragment);
            (0, core_1.effect)(() => this.highlightCard());
        }
        onContentLoaded() {
            this.referenceScrollHandler.setupListeners(api_reference_prerender_constants_1.API_SECTION_CLASS_NAME);
            this.scrollToSectionLegacy();
            this.highlightCard();
        }
        /** Handle legacy URLs with a `tab` query param from the old tab layout  */
        scrollToSectionLegacy() {
            const params = this.route.snapshot.queryParams;
            const tab = params['tab'];
            if (tab) {
                const section = this.document.getElementById(tab);
                if (section) {
                    // `scrollIntoView` is ignored even, if the element exists.
                    // It seems that it's related to: https://issues.chromium.org/issues/40715316
                    // Hence, the usage of `setTimeout`.
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        }
        /** Highlight the member card that corresponds to the URL fragment.  */
        highlightCard() {
            if (this.highlightedElement) {
                this.renderer.removeClass(this.highlightedElement, HIGHLIGHTED_CARD_CLASS);
                this.highlightedElement = null;
            }
            const fragment = this.urlFragment();
            if (fragment) {
                const element = this.document.getElementById(fragment);
                if (element) {
                    this.renderer.addClass(element, HIGHLIGHTED_CARD_CLASS);
                }
                this.highlightedElement = element;
            }
        }
    };
    __setFunctionName(_classThis, "ApiReferenceDetailsPage");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApiReferenceDetailsPage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApiReferenceDetailsPage = _classThis;
})();
exports.default = ApiReferenceDetailsPage;
