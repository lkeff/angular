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
exports.ExpandingRowHost = exports.EXPANDING_ROW_KEYPRESS_THORTTLE_MS = void 0;
const core_1 = require("@angular/core");
const expanding_row_1 = require("./expanding_row");
/**
 * We use this class in <cfc-expanding-row/> template to identify the row.
 * The [cfcExpandingRowHost] directive also uses this class to check if a given
 * HTMLElement is within an <cfc-expanding-row/>.
 */
const EXPANDING_ROW_CLASS_NAME = 'cfc-expanding-row';
/** Throttle duration in milliseconds for repeated key presses. */
exports.EXPANDING_ROW_KEYPRESS_THORTTLE_MS = 50;
/**
 * This is the wrapper directive for the cfc-expanding-row components. Note that
 * we wanted to make this a directive instead of component because child
 * cfc-expanding-row components does not have to be a direct child.
 */
let ExpandingRowHost = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cfc-expanding-row-host',
            template: ` <div #firstFocusable (focus)="focusOnLastFocusedRow()" tabindex="0"></div>
    <ng-content></ng-content>
    <div #lastFocusable (focus)="focusOnLastFocusedRow()" tabindex="0"></div>`,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [{ provide: expanding_row_1.EXPANDING_ROW_HOST_INJECTION_TOKEN, useExisting: ExpandingRowHost }],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _scrollElementSelector_decorators;
    let _scrollElementSelector_initializers = [];
    let _scrollElementSelector_extraInitializers = [];
    let _clickRootElementSelector_decorators;
    let _clickRootElementSelector_initializers = [];
    let _clickRootElementSelector_extraInitializers = [];
    let _onPrepend_decorators;
    let _onPrepend_initializers = [];
    let _onPrepend_extraInitializers = [];
    let _lastFocusableElement_decorators;
    let _lastFocusableElement_initializers = [];
    let _lastFocusableElement_extraInitializers = [];
    let _firstFocusableElement_decorators;
    let _firstFocusableElement_initializers = [];
    let _firstFocusableElement_extraInitializers = [];
    let _contentRows_decorators;
    let _contentRows_initializers = [];
    let _contentRows_extraInitializers = [];
    let _handleKeyDown_decorators;
    var ExpandingRowHost = _classThis = class {
        constructor() {
            /**
             * An HTML selector (e.g. "body") for the scroll element. We need this to
             * make some scroll adjustments.
             */
            this.scrollElementSelector = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _scrollElementSelector_initializers, '.cfc-panel-body-scrollable'));
            /**
             * An HTML selector (e.g. "body") for the click root. While the row is
             * expanded, and user clicks outside of the expanded row, we collapse this row
             * But to do this, we need to know the clickable area.
             */
            this.clickRootElementSelector = (__runInitializers(this, _scrollElementSelector_extraInitializers), __runInitializers(this, _clickRootElementSelector_initializers, 'cfc-panel-body'));
            /**
             * The @Output will be triggered when the user wants to focus on the
             * previously expanded row, and we are already at the first row. The logs team
             * will use this to prepend data on demand.
             */
            this.onPrepend = (__runInitializers(this, _clickRootElementSelector_extraInitializers), __runInitializers(this, _onPrepend_initializers, new core_1.EventEmitter()));
            /** A reference to the last focusable element in list of expanding rows. */
            this.lastFocusableElement = (__runInitializers(this, _onPrepend_extraInitializers), __runInitializers(this, _lastFocusableElement_initializers, void 0));
            /** A reference to the first focusable element in list of expanding rows. */
            this.firstFocusableElement = (__runInitializers(this, _lastFocusableElement_extraInitializers), __runInitializers(this, _firstFocusableElement_initializers, void 0));
            /**
             * A reference to all child cfc-expanding-row elements. We will need for
             * keyboard accessibility and scroll adjustments. For example, we need to know
             * which row is previous row when user presses "left arrow" on a focused row.
             */
            this.contentRows = (__runInitializers(this, _firstFocusableElement_extraInitializers), __runInitializers(this, _contentRows_initializers, void 0));
            /**
             * Keeps track of the last row that had focus before focus left the list
             * of expanding rows.
             */
            this.lastFocusedRow = (__runInitializers(this, _contentRows_extraInitializers), undefined);
            /**
             * Focused rows just show a blue left border. This node is not expanded. We
             * need to keep a reference to the focused row to unfocus when another row
             * is focused.
             */
            this.focusedRow = undefined;
            /**
             * This is the expanded row. If there is an expanded row there shouldn't be
             * any focused rows. We need a reference to this. For example we need to
             * collapse the currently expanded row, if another row is expanded.
             */
            this.expandedRow = undefined;
            /**
             * This is just handleRootMouseUp.bind(this). handleRootMouseUp handles
             * click events on root element (defined by clickRootElementSelector @Input)
             * Since we attach the click listener dynamically, we need to keep this
             * function around. This enables us to detach the click listener when
             * component is destroyed.
             */
            this.handleRootMouseUpBound = this.handleRootMouseUp.bind(this);
        }
        /**
         * When component initializes we need to attach click listener to the root
         * element. This click listener will allows us to collapse the
         * currently expanded row when user clicks outside of it.
         */
        ngAfterViewInit() {
            const clickRootElement = this.getClickRootElement();
            if (!clickRootElement) {
                return;
            }
            clickRootElement.addEventListener('mouseup', this.handleRootMouseUpBound);
            this.rowChangeSubscription = this.contentRows.changes.subscribe(() => {
                this.recalcRowIndexes();
            });
            this.recalcRowIndexes();
        }
        /**
         * Detaches the click listener on the root element. Note that we are attaching
         * this listener on ngAfterViewInit function.
         */
        ngOnDestroy() {
            const clickRootElement = this.getClickRootElement();
            if (!clickRootElement) {
                return;
            }
            clickRootElement.removeEventListener('mouseup', this.handleRootMouseUpBound);
            if (this.rowChangeSubscription) {
                this.rowChangeSubscription.unsubscribe();
            }
        }
        /**
         * Handles caption element click on a cfc-expanding-row component. Note
         * that caption element is visible only when the row is expanded. So this
         * means we will collapse the expanded row. The scroll adjustment below
         * makes sure that the mouse stays under the summary of the expanded row
         * when the row collapses.
         */
        handleRowCaptionClick(row) {
            const scrollAdjustment = -ExpandingRowHost.rowMargin;
            const scrollElement = this.getScrollElement();
            if (!scrollElement) {
                return;
            }
            scrollElement.scrollTop += scrollAdjustment;
        }
        /**
         * Handles summary element click on a cfc-expanding-row component. Note
         * that summary element is visible only when the row is collapsed. So this
         * event will fired prior to expansion of a collapsed row. Scroll adjustment
         * below makes sure mouse stays on the caption element when the collapsed
         * row expands.
         */
        handleRowSummaryClick(row) {
            const hadPreviousSelection = !!this.expandedRow;
            const previousSelectedRowIndex = this.getRowIndex(this.expandedRow);
            const newSelectedRowIndex = this.getRowIndex(row);
            const previousCollapsedHeight = this.getSelectedRowCollapsedHeight();
            const previousExpansionHeight = this.getSelectedRowExpandedHeight();
            if (this.expandedRow) {
                return;
            }
            let scrollAdjustment = 0;
            const scrollElement = this.getScrollElement();
            if (!scrollElement) {
                return;
            }
            if (previousExpansionHeight > 0 && previousCollapsedHeight >= 0) {
                scrollAdjustment = previousExpansionHeight - previousCollapsedHeight;
            }
            const newSelectionIsInfrontOfPrevious = newSelectedRowIndex > previousSelectedRowIndex;
            const multiplier = newSelectionIsInfrontOfPrevious ? -1 : 0;
            scrollAdjustment = scrollAdjustment * multiplier + ExpandingRowHost.rowMargin;
            scrollElement.scrollTop += scrollAdjustment;
        }
        /**
         * Handles expansion of a row. When a new row expands, we need to remove
         * previous expansion and collapse. We also need to save the currently
         * expanded row so that we can collapse this row once another row expands.
         */
        handleRowExpand(row) {
            this.removePreviousFocus();
            this.removePreviousExpansion();
            this.expandedRow = row;
        }
        /**
         * Handles focus on a row. When a new row gets focus (note that this is
         * different from expansion), we need to remove previous focus and expansion.
         * We need to save the reference to this focused row so that we can unfocus
         * this row when another row is focused.
         */
        handleRowFocus(row) {
            // Do not blur then refocus the row if it's already selected.
            if (row === this.focusedRow) {
                return;
            }
            this.removePreviousFocus();
            this.removePreviousExpansion();
            this.focusedRow = row;
        }
        /**
         * Called when shift+tabbing from the first focusable element after the list
         * of expanding rows or tabbing from the last focusable element before.
         */
        focusOnLastFocusedRow() {
            if (!this.lastFocusedRow) {
                this.lastFocusedRow = this.contentRows.toArray()[0];
            }
            this.lastFocusedRow.focus();
        }
        /**
         * Function that is called by expanding row summary to focus on the last
         * focusable element before the list of expanding rows.
         */
        focusOnPreviousFocusableElement() {
            this.lastFocusedRow = this.focusedRow;
        }
        /**
         * Function that is called by expanding row summary to focus on the next
         * focusable element after the list of expanding rows.
         */
        focusOnNextFocusableElement() {
            this.lastFocusedRow = this.focusedRow;
        }
        /**
         * Handles keydown event on the host. We are just concerned with up,
         * down arrow, ESC, and ENTER presses here. Note that Up/Down presses
         * can be repeated.
         *
         * - Up: Focuses on the row above.
         * - Down: Focuses on the row below.
         * - Escape: Collapses the expanded row.
         * - Enter: Expands the focused row.
         */
        handleKeyDown(event) { }
        /**
         * Recursively returns true if target HTMLElement is within a
         * cfc-expanding-row component. It will return false otherwise.
         * We need this function in handleRootMouseUp to collapse the expanded row
         * when user clicks outside of all expanded rows.
         */
        isTargetInRow(target) {
            return target.classList.contains(EXPANDING_ROW_CLASS_NAME);
        }
        /**
         * Gets the click root element that is described by clickRootElementSelector
         * @Input value.
         */
        getClickRootElement() {
            return document.querySelector(this.clickRootElementSelector);
        }
        /**
         * Handles all of the mouseup events on the click root. When user clicks
         * outside of an expanded row, we need to collapse that row.
         * We trigger collapse by calling handleCaptionClick() on the expanded row.
         */
        handleRootMouseUp(event) {
            if (!this.expandedRow) {
                return;
            }
            if (!this.isTargetInRow(event.target)) {
                this.expandedRow.handleCaptionClick(event);
            }
        }
        /**
         * Check if element is collapsible.  Elements marked as uncollapsible will not collapse an
         * open row when clicked.
         */
        isCollapsible(element) {
            const clickRoot = this.getClickRootElement();
            while (element && element !== clickRoot) {
                if (element.hasAttribute('cfcUncollapsible')) {
                    return false;
                }
                element = element.parentElement;
            }
            return true;
        }
        /**
         * Removes focus state from a previously focused row. We blur this row and
         * set the focusedRow to undefined in this method. This usually happens when
         * another row is focused.
         */
        removePreviousFocus() {
            if (this.focusedRow) {
                this.focusedRow.blur();
                this.focusedRow = undefined;
            }
        }
        /**
         * Removes the expanded state from a previously expanded row. We collapse this
         * row and set the expandedRow to undefined in this method. This usually
         * happens when another row is expanded.
         */
        removePreviousExpansion() {
            if (this.expandedRow) {
                this.expandedRow.collapse();
                this.expandedRow = undefined;
            }
        }
        /**
         * Gets the collapsed height of the currently expanded row. We need this for
         * scroll adjustments. Note that collapsed height of a cfc-expanding-row
         * component is equal to height of cfc-expanding-row-summary component within
         * the row.
         */
        getSelectedRowCollapsedHeight() {
            if (this.expandedRow) {
                return this.expandedRow.collapsedHeight;
            }
            else {
                return -1;
            }
        }
        /**
         * Gets the current height of the expanded row. We need this value for the
         * scroll adjustment computation.
         */
        getSelectedRowExpandedHeight() {
            if (this.expandedRow) {
                return this.expandedRow.getHeight();
            }
            else {
                return -1;
            }
        }
        /**
         * Gets the HTML element described by scrollElementSelector @Input value.
         * We need this value for scroll adjustments.
         */
        getScrollElement() {
            if (!this.scrollElementSelector) {
                return undefined;
            }
            return document.querySelector(this.scrollElementSelector);
        }
        /**
         * Handles escape presses on the host element. Escape removes previous focus
         * if there is one. If there is an expanded row, escape row collapses this
         * row and focuses on it. A subsequent escape press will blur this row.
         */
        handleEscapePress() {
            this.removePreviousFocus();
            if (this.expandedRow) {
                this.expandedRow.collapse();
                this.expandedRow.focus();
                this.expandedRow = undefined;
            }
        }
        /**
         * Handles enter keypress. If there is a focused row, an enter key press on
         * host element will expand this row.
         */
        handleEnterPress() {
            if (document.activeElement !== this.focusedRowSummary()) {
                return;
            }
            if (this.focusedRow) {
                this.focusedRow.expand();
            }
        }
        /** Returns the HTMLElement that is the currently focused row summary. */
        focusedRowSummary() {
            return this.focusedRow
                ? this.focusedRow.summaryViewChild.mainElementRef.nativeElement
                : undefined;
        }
        /**
         * Returns the index of a given row. This enables us to figure out the row
         * above/below the focused row.
         */
        getRowIndex(rowToLookFor) {
            return rowToLookFor ? rowToLookFor.index : -1;
        }
        /**
         * Handles up/down arrow presses on the host element. Up arrow press will
         * focus/expand on the row above. Down arrow press will focus/expand the row
         * below. If we have a focus on the current row, this function will focus on
         * the computed (the one above or below) row. If host has an expanded row,
         * this function will expand the computed row.
         */
        handleUpOrDownPressOnce(upOrDown, event) {
            event.preventDefault();
            // If row is expanded but focus is inside the expanded element, arrow
            // key presses should not do anything.
            if (this.expandedRow &&
                document.activeElement !== this.expandedRow.expandingRowMainElement.nativeElement) {
                return;
            }
            // If focus is inside a collapsed row header, arrow key presses should not
            // do anything.
            if (this.focusedRow && document.activeElement !== this.focusedRowSummary()) {
                return;
            }
            // We only want screen reader to read the message the first time we enter
            // the list of expanding rows, so we must reset the variable here
            this.lastFocusedRow = undefined;
            const rowToLookFor = this.expandedRow || this.focusedRow;
            if (!rowToLookFor) {
                return;
            }
            const isFocus = rowToLookFor === this.focusedRow;
            const rowIndex = this.getRowIndex(rowToLookFor);
            const contentRowsArray = this.contentRows.toArray();
            if (rowIndex < 0) {
                return;
            }
            const potentialIndex = (upOrDown === 'up' ? -1 : +1) + rowIndex;
            if (potentialIndex < 0) {
                this.onPrepend.emit();
                return;
            }
            if (potentialIndex >= contentRowsArray.length) {
                return;
            }
            const potentialRow = contentRowsArray[potentialIndex];
            if (isFocus) {
                potentialRow.focus();
            }
            else {
                potentialRow.expand();
            }
        }
        // Updates all of the rows with their new index.
        recalcRowIndexes() {
            let index = 0;
            setTimeout(() => {
                this.contentRows.forEach((row) => {
                    row.index = index++;
                });
            });
        }
    };
    __setFunctionName(_classThis, "ExpandingRowHost");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _scrollElementSelector_decorators = [(0, core_1.Input)()];
        _clickRootElementSelector_decorators = [(0, core_1.Input)()];
        _onPrepend_decorators = [(0, core_1.Output)()];
        _lastFocusableElement_decorators = [(0, core_1.ViewChild)('lastFocusable', { static: true })];
        _firstFocusableElement_decorators = [(0, core_1.ViewChild)('firstFocusable', { static: true })];
        _contentRows_decorators = [(0, core_1.ContentChildren)((0, core_1.forwardRef)(() => expanding_row_1.ExpandingRow), { descendants: true })];
        _handleKeyDown_decorators = [(0, core_1.HostListener)('keydown', ['$event'])];
        __esDecorate(_classThis, null, _handleKeyDown_decorators, { kind: "method", name: "handleKeyDown", static: false, private: false, access: { has: obj => "handleKeyDown" in obj, get: obj => obj.handleKeyDown }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _scrollElementSelector_decorators, { kind: "field", name: "scrollElementSelector", static: false, private: false, access: { has: obj => "scrollElementSelector" in obj, get: obj => obj.scrollElementSelector, set: (obj, value) => { obj.scrollElementSelector = value; } }, metadata: _metadata }, _scrollElementSelector_initializers, _scrollElementSelector_extraInitializers);
        __esDecorate(null, null, _clickRootElementSelector_decorators, { kind: "field", name: "clickRootElementSelector", static: false, private: false, access: { has: obj => "clickRootElementSelector" in obj, get: obj => obj.clickRootElementSelector, set: (obj, value) => { obj.clickRootElementSelector = value; } }, metadata: _metadata }, _clickRootElementSelector_initializers, _clickRootElementSelector_extraInitializers);
        __esDecorate(null, null, _onPrepend_decorators, { kind: "field", name: "onPrepend", static: false, private: false, access: { has: obj => "onPrepend" in obj, get: obj => obj.onPrepend, set: (obj, value) => { obj.onPrepend = value; } }, metadata: _metadata }, _onPrepend_initializers, _onPrepend_extraInitializers);
        __esDecorate(null, null, _lastFocusableElement_decorators, { kind: "field", name: "lastFocusableElement", static: false, private: false, access: { has: obj => "lastFocusableElement" in obj, get: obj => obj.lastFocusableElement, set: (obj, value) => { obj.lastFocusableElement = value; } }, metadata: _metadata }, _lastFocusableElement_initializers, _lastFocusableElement_extraInitializers);
        __esDecorate(null, null, _firstFocusableElement_decorators, { kind: "field", name: "firstFocusableElement", static: false, private: false, access: { has: obj => "firstFocusableElement" in obj, get: obj => obj.firstFocusableElement, set: (obj, value) => { obj.firstFocusableElement = value; } }, metadata: _metadata }, _firstFocusableElement_initializers, _firstFocusableElement_extraInitializers);
        __esDecorate(null, null, _contentRows_decorators, { kind: "field", name: "contentRows", static: false, private: false, access: { has: obj => "contentRows" in obj, get: obj => obj.contentRows, set: (obj, value) => { obj.contentRows = value; } }, metadata: _metadata }, _contentRows_initializers, _contentRows_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpandingRowHost = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /**
     * 16px is the margin animation we have on cfc-expanding-row component.
     * We need this value to compute scroll adjustments.
     */
    _classThis.rowMargin = 16;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpandingRowHost = _classThis;
})();
exports.ExpandingRowHost = ExpandingRowHost;
