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
exports.ReferenceScrollHandler = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const rxjs_1 = require("rxjs");
const api_reference_prerender_constants_1 = require("../constants/api-reference-prerender.constants");
const router_1 = require("@angular/router");
let ReferenceScrollHandler = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReferenceScrollHandler = _classThis = class {
        constructor() {
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.router = (0, core_1.inject)(router_1.Router);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
        }
        setupListeners(tocClass) {
            if (!this.isBrowser) {
                return;
            }
            this.setupCodeToCListeners(tocClass);
        }
        setupCodeToCListeners(tocClass) {
            const tocContainer = this.document.querySelector(`.${tocClass}`);
            if (!tocContainer) {
                return;
            }
            (0, rxjs_1.fromEvent)(tocContainer, 'click')
                .pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe((event) => {
                if (event.target instanceof HTMLAnchorElement) {
                    event.stopPropagation();
                    return;
                }
                // Get the card member ID from the attributes
                const target = event.target instanceof HTMLButtonElement
                    ? event.target
                    : this.findButtonElement(event.target);
                const memberId = this.getMemberId(target);
                if (memberId) {
                    this.router.navigate([], { fragment: memberId, replaceUrl: true });
                }
            });
        }
        getMemberId(lineButton) {
            var _a;
            if (!lineButton) {
                return undefined;
            }
            return (_a = lineButton.attributes.getNamedItem(api_reference_prerender_constants_1.MEMBER_ID_ATTRIBUTE)) === null || _a === void 0 ? void 0 : _a.value;
        }
        findButtonElement(element) {
            let parent = element.parentElement;
            while (parent) {
                if (parent instanceof HTMLButtonElement) {
                    return parent;
                }
                parent = parent.parentElement;
            }
            return null;
        }
    };
    __setFunctionName(_classThis, "ReferenceScrollHandler");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReferenceScrollHandler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReferenceScrollHandler = _classThis;
})();
exports.ReferenceScrollHandler = ReferenceScrollHandler;
