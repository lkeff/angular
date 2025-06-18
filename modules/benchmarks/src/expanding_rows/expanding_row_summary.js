"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingRowSummary = void 0;
const core_1 = require("@angular/core");
const expanding_row_css_1 = require("./expanding_row_css");
const KEY_CODE_TAB = 9;
/**
 * This component should be used within cfc-expanding-row component. Note that
 * summary is visible only when the row is collapsed.
 */
let ExpandingRowSummary = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cfc-expanding-row-summary',
            styles: [expanding_row_css_1.expanding_row_css],
            template: ` <div
    *ngIf="!expandingRow.isExpanded"
    #expandingRowSummaryMainElement
    class="cfc-expanding-row-summary"
    tabindex="-1"
    (click)="expandingRow.handleSummaryClick()"
    (focus)="handleFocus()"
  >
    <ng-content></ng-content>
    <div class="cfc-expanding-row-accessibility-text">.</div>
    <div
      class="cfc-expanding-row-accessibility-text"
      i18n="This is the label used to indicate that the user is in a list of expanding rows."
    >
      Row {{ expandingRow.index + 1 }} in list of expanding rows.
    </div>
    <div
      *ngIf="isPreviouslyFocusedRow()"
      class="cfc-expanding-row-accessibility-text"
      i18n="This is the label used for the first row in list of expanding rows."
    >
      Use arrow keys to navigate.
    </div>
  </div>`,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _mainElementRef_decorators;
    let _mainElementRef_initializers = [];
    let _mainElementRef_extraInitializers = [];
    let _handleKeyDown_decorators;
    var ExpandingRowSummary = _classThis = class {
        /**
         * We need the parent cfc-expanding-row component here to hide this element
         * when the row is expanded. cfc-expanding-row-details-caption element
         * will act as a header for expanded rows. We also need to relay tab-in and
         * click events to the parent.
         */
        constructor(expandingRow, changeDetectorRef) {
            this.expandingRow = (__runInitializers(this, _instanceExtraInitializers), expandingRow);
            /**
             * A reference to the main element. This element should be focusable. We need
             * reference to compute collapsed height of the row. We also use this
             * reference for focus and blur methods below.
             */
            this.mainElementRef = __runInitializers(this, _mainElementRef_initializers, void 0);
            /** Subscription for changes in parent isExpanded property. */
            this.isExpandedSubscription = __runInitializers(this, _mainElementRef_extraInitializers);
            this.expandingRow.summaryViewChild = this;
            this.isExpandedSubscription = this.expandingRow.isExpandedChange.subscribe(() => {
                changeDetectorRef.markForCheck();
            });
            this.indexSubscription = this.expandingRow.indexChange.subscribe(() => {
                changeDetectorRef.markForCheck();
            });
        }
        /** When component is destroyed, unlisten to isExpanded. */
        ngOnDestroy() {
            if (this.isExpandedSubscription) {
                this.isExpandedSubscription.unsubscribe();
            }
            if (this.indexSubscription) {
                this.indexSubscription.unsubscribe();
            }
        }
        /**
         * Handles focus event on the element. We basically want to detect any focus
         * in this component and relay this information to parent cfc-expanding-row
         * component.
         */
        handleFocus() {
            // Clicking causes a focus event to occur before the click event. Filter
            // out click events using the cdkFocusMonitor.
            //
            // TODO(b/62385992) Use the KeyboardFocusService to detect focus cause
            // instead of creating multiple monitors on a page.
            if (this.expandingRow.expandingRowMainElement.nativeElement.classList.contains('cdk-mouse-focused')) {
                return;
            }
            if (!this.expandingRow.isFocused && !this.expandingRow.isExpanded) {
                this.expandingRow.handleSummaryFocus();
            }
        }
        /**
         * Handles tab & shift+tab presses on expanding row summaries in case there
         * are tabbable elements inside the summaries.
         */
        handleKeyDown(event) {
            const charCode = event.which || event.keyCode;
            if (charCode === KEY_CODE_TAB) {
                this.handleTabKeypress(event);
            }
        }
        /**
         * Handles tab and shift+tab presses inside expanding row summaries;
         *
         * From inside collapsed row summary:
         * - Tab: If focus was on the last focusable child, should shift focus to
         *        the next focusable element outside the list of expanding rows.
         * - Shift+tab: If focus was on first focusable child, should shift focus to
         *              the main collapsed row summary element
         *              If focus was on main collapsed row summary element, should
         *              shift focus to the last focusable element before the list of
         *              expanding rows.
         */
        handleTabKeypress(event) {
            const focusableChildren = this.getFocusableChildren();
            if (focusableChildren.length === 0) {
                return;
            }
            // Shift+tab on expanding row summary should focus on last focusable element
            // before expanding row list. Otherwise, if shift+tab is pressed on first
            // focusable child inside expanding row summary, it should focus on main
            // expanding row summary element.
            if (event.shiftKey && document.activeElement === this.mainElementRef.nativeElement) {
                event.preventDefault();
                this.expandingRow.expandingRowHost.focusOnPreviousFocusableElement();
                return;
            }
            else if (event.shiftKey && document.activeElement === focusableChildren[0]) {
                event.preventDefault();
                this.expandingRow.focus();
            }
            // If tab is pressed on the last focusable element inside an expanding row
            // summary, focus should be set to the next focusable element after the list
            // of expanding rows.
            if (!event.shiftKey &&
                document.activeElement === focusableChildren[focusableChildren.length - 1]) {
                event.preventDefault();
                this.expandingRow.expandingRowHost.focusOnNextFocusableElement();
            }
        }
        /**
         * Finds the row that had focus before focus left the list of expanding rows
         * and checks if the current row summary is that row.
         */
        isPreviouslyFocusedRow() {
            if (!this.expandingRow.expandingRowHost.contentRows) {
                return false;
            }
            const expandingRowHost = this.expandingRow.expandingRowHost;
            if (!this.mainElementRef || !expandingRowHost.lastFocusedRow) {
                return false;
            }
            if (!expandingRowHost.lastFocusedRow.summaryViewChild.mainElementRef) {
                return false;
            }
            // If the current expanding row summary was the last focused one before
            // focus exited the list, then return true to trigger the screen reader
            if (this.mainElementRef.nativeElement ===
                expandingRowHost.lastFocusedRow.summaryViewChild.mainElementRef.nativeElement) {
                return true;
            }
            return false;
        }
        /** Puts the DOM focus on the main element. */
        focus() {
            if (this.mainElementRef && document.activeElement !== this.mainElementRef.nativeElement) {
                this.mainElementRef.nativeElement.focus();
            }
        }
        /** Removes the DOM focus on the main element. */
        blur() {
            if (!this.mainElementRef) {
                return;
            }
            this.mainElementRef.nativeElement.blur();
        }
        /** Returns array of focusable elements within this component. */
        getFocusableChildren() {
            return [];
        }
    };
    __setFunctionName(_classThis, "ExpandingRowSummary");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _mainElementRef_decorators = [(0, core_1.ViewChild)('expandingRowSummaryMainElement')];
        _handleKeyDown_decorators = [(0, core_1.HostListener)('keydown', ['$event'])];
        __esDecorate(_classThis, null, _handleKeyDown_decorators, { kind: "method", name: "handleKeyDown", static: false, private: false, access: { has: obj => "handleKeyDown" in obj, get: obj => obj.handleKeyDown }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _mainElementRef_decorators, { kind: "field", name: "mainElementRef", static: false, private: false, access: { has: obj => "mainElementRef" in obj, get: obj => obj.mainElementRef, set: (obj, value) => { obj.mainElementRef = value; } }, metadata: _metadata }, _mainElementRef_initializers, _mainElementRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpandingRowSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpandingRowSummary = _classThis;
})();
exports.ExpandingRowSummary = ExpandingRowSummary;
