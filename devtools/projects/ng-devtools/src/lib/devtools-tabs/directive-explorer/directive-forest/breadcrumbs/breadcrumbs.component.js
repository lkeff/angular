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
exports.BreadcrumbsComponent = void 0;
const core_1 = require("@angular/core");
const button_1 = require("@angular/material/button");
const icon_1 = require("@angular/material/icon");
const card_1 = require("@angular/material/card");
let BreadcrumbsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-breadcrumbs',
            templateUrl: './breadcrumbs.component.html',
            styleUrls: ['./breadcrumbs.component.scss'],
            imports: [card_1.MatCard, icon_1.MatIcon, button_1.MatButton],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BreadcrumbsComponent = _classThis = class {
        constructor() {
            this.parents = core_1.input.required();
            this.handleSelect = (0, core_1.output)();
            this.mouseOverNode = (0, core_1.output)();
            this.mouseLeaveNode = (0, core_1.output)();
            this.breadcrumbsScrollContent = core_1.viewChild.required('breadcrumbs');
            this.showScrollLeftButton = (0, core_1.computed)(() => {
                const value = this.breadcrumbsScrollLayout();
                return value && value.scrollLeft > 0;
            });
            this.showScrollRightButton = (0, core_1.computed)(() => {
                const value = this.breadcrumbsScrollLayout();
                if (!value) {
                    return false;
                }
                const { clientWidth, scrollWidth, scrollLeft } = value;
                return scrollWidth > clientWidth && scrollLeft + clientWidth < scrollWidth;
            });
            this.breadcrumbsScrollLayout = (0, core_1.signal)(undefined);
            (0, core_1.effect)((cleanup) => {
                const observer = new ResizeObserver(() => this.updateScrollButtonVisibility());
                observer.observe(this.breadcrumbsScrollContent().nativeElement);
                cleanup(() => observer.disconnect());
            });
        }
        scroll(pixels) {
            this.breadcrumbsScrollContent().nativeElement.scrollLeft += pixels;
            this.updateScrollButtonVisibility();
        }
        updateScrollButtonVisibility() {
            const { clientWidth, scrollWidth, scrollLeft } = this.breadcrumbsScrollContent().nativeElement;
            this.breadcrumbsScrollLayout.set({ clientWidth, scrollWidth, scrollLeft });
        }
    };
    __setFunctionName(_classThis, "BreadcrumbsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BreadcrumbsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BreadcrumbsComponent = _classThis;
})();
exports.BreadcrumbsComponent = BreadcrumbsComponent;
