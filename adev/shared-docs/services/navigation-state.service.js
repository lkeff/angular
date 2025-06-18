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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationState = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let NavigationState = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NavigationState = _classThis = class {
        constructor() {
            this.router = (0, core_1.inject)(router_1.Router);
            this._activeNavigationItem = (0, core_1.signal)(null);
            this._expandedItems = (0, core_1.signal)([]);
            this._isMobileNavVisible = (0, core_1.signal)(false);
            this._level = (0, core_1.linkedSignal)(() => this._expandedItems().length);
            this.primaryActiveRouteItem = (0, core_1.signal)(null);
            this.activeNavigationItem = this._activeNavigationItem.asReadonly();
            this.expandedItems = this._expandedItems.asReadonly();
            this.isMobileNavVisible = this._isMobileNavVisible.asReadonly();
            this.level = this._level.asReadonly();
        }
        toggleItem(item) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!item.children) {
                    return;
                }
                if (item.isExpanded) {
                    this.collapse(item);
                }
                else if (item.children && item.children.length > 0 && item.children[0].path) {
                    // It resolves false, when the user has displayed the page, then changed the slide to a secondary navigation component
                    // and wants to reopen the slide, where the first item is the currently displayed page
                    const navigationSucceeds = yield this.navigateToFirstPageOfTheCategory(item.children[0].path);
                    if (!navigationSucceeds) {
                        this.expand(item);
                    }
                }
            });
        }
        cleanExpandedState() {
            this._expandedItems.set([]);
        }
        expandItemHierarchy(item, shouldExpand, skipExpandPredicateFn) {
            if (skipExpandPredicateFn && skipExpandPredicateFn(item)) {
                // When `skipExpandPredicateFn` returns `true` then we should trigger `cleanExpandedState`
                // to be sure that first navigation slide will be displayed.
                this.cleanExpandedState();
                return;
            }
            // Returns item when parent node was already expanded
            const parentItem = this.actualExpandedItems().find((expandedItem) => { var _a, _b; return ((_a = item.parent) === null || _a === void 0 ? void 0 : _a.label) === expandedItem.label && ((_b = item.parent) === null || _b === void 0 ? void 0 : _b.path) === expandedItem.path; });
            if (parentItem) {
                // If the parent item is expanded, then we should display all expanded items up to the active item level.
                // This provides us with an appropriate list of expanded elements also when the user navigates using browser buttons.
                this._expandedItems.update((expandedItems) => expandedItems.filter((item) => item.level !== undefined &&
                    parentItem.level !== undefined &&
                    item.level <= parentItem.level));
            }
            else {
                let itemsToExpand = [];
                let node = item.parent;
                while (node && shouldExpand(node)) {
                    itemsToExpand.push(Object.assign(Object.assign({}, node), { isExpanded: true }));
                    node = node.parent;
                }
                this._expandedItems.set(itemsToExpand.reverse());
            }
        }
        setActiveNavigationItem(item) {
            this._activeNavigationItem.set(item);
        }
        setMobileNavigationListVisibility(isVisible) {
            this._isMobileNavVisible.set(isVisible);
        }
        expand(item) {
            // Add item to the expanded items list
            this._expandedItems.update((expandedItems) => {
                var _a;
                return [...((_a = this.actualExpandedItems()) !== null && _a !== void 0 ? _a : []), Object.assign(Object.assign({}, item), { isExpanded: true })];
            });
            // No need to update the level here, this is handled by linkedSignal already
        }
        collapse(item) {
            item.isExpanded = false;
            // We won't remove the item, just update the level,
            // this allows animation on the items to hide them without destroying them
            this._level.set(this.actualExpandedItems().length - 1);
        }
        /**
         * return the actual navigation items, that is to say the one that match the current level
         */
        actualExpandedItems() {
            return this.expandedItems().slice(0, this.level());
        }
        navigateToFirstPageOfTheCategory(path) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.router.navigateByUrl(path);
            });
        }
    };
    __setFunctionName(_classThis, "NavigationState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NavigationState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NavigationState = _classThis;
})();
exports.NavigationState = NavigationState;
