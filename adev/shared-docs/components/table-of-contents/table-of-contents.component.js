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
exports.TableOfContents = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const index_1 = require("../../interfaces/index");
const table_of_contents_loader_service_1 = require("../../services/table-of-contents-loader.service");
const icon_component_1 = require("../icon/icon.component");
let TableOfContents = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'docs-table-of-contents',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './table-of-contents.component.html',
            styleUrls: ['./table-of-contents.component.scss'],
            imports: [icon_component_1.IconComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TableOfContents = _classThis = class {
        constructor() {
            // Element that contains the content from which the Table of Contents is built
            this.contentSourceElement = core_1.input.required();
            this.location = (0, core_1.inject)(common_1.Location);
            this.tableOfContentsLoader = (0, core_1.inject)(table_of_contents_loader_service_1.TableOfContentsLoader);
            this.viewportScroller = (0, core_1.inject)(common_1.ViewportScroller);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.tableOfContentItems = this.tableOfContentsLoader.tableOfContentItems;
            this.activeItemId = (0, core_1.signal)(null);
            this.TableOfContentsLevel = index_1.TableOfContentsLevel;
            (0, core_1.afterNextRender)({
                read: () => {
                    this.tableOfContentsLoader.buildTableOfContent(this.contentSourceElement());
                    this.setupActiveItemListener(this.contentSourceElement());
                },
            });
        }
        scrollToTop() {
            this.viewportScroller.scrollToPosition([0, 0]);
        }
        setupActiveItemListener(contentSourceElement) {
            if (contentSourceElement) {
                this.tableOfContentsLoader.setupIntersectionObserver(contentSourceElement, this.destroyRef, (id) => {
                    this.activeItemId.set(id);
                });
            }
        }
    };
    __setFunctionName(_classThis, "TableOfContents");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TableOfContents = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TableOfContents = _classThis;
})();
exports.TableOfContents = TableOfContents;
