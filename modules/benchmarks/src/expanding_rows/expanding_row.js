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
exports.ExpandingRow = exports.EXPANDING_ROW_HOST_INJECTION_TOKEN = void 0;
const core_1 = require("@angular/core");
const expanding_row_css_1 = require("./expanding_row_css");
/**
 * Injection token to break cylic dependency between ExpandingRow and
 * ExpandingRowHost
 */
exports.EXPANDING_ROW_HOST_INJECTION_TOKEN = new core_1.InjectionToken('ExpandingRowHost');
/**
 * This component is used to render a single expanding row. It should contain
 * cfc-expanding-row-summary, cfc-expanding-row-details-caption and
 * cfc-expanding-row-details-content components.
 */
let ExpandingRow = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cfc-expanding-row',
            styles: [expanding_row_css_1.expanding_row_css],
            template: ` <div
    #expandingRowMainElement
    class="cfc-expanding-row"
    cdkMonitorSubtreeFocus
    [attr.tabindex]="isExpanded ? '0' : '-1'"
    [class.cfc-expanding-row-has-focus]="isFocused"
    [class.cfc-expanding-row-is-expanded]="isExpanded"
    ve="CfcExpandingRow"
  >
    <ng-content></ng-content>
  </div>`,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _rowId_decorators;
    let _rowId_initializers = [];
    let _rowId_extraInitializers = [];
    let _expandingRowMainElement_decorators;
    let _expandingRowMainElement_initializers = [];
    let _expandingRowMainElement_extraInitializers = [];
    let _onToggle_decorators;
    let _onToggle_initializers = [];
    let _onToggle_extraInitializers = [];
    let _handleKeyDown_decorators;
    var ExpandingRow = _classThis = class {
        /**
         * A boolean indicating if this node is expanded. This value is used to
         * hide/show summary, caption, and content of the expanding row. There should
         * only be one expanded row within [cfcExpandingRowHost] directive. And if
         * there is an expanded row, there shouldn't be any focused rows.
         */
        set isExpanded(value) {
            const changed = this.isExpandedInternal !== value;
            this.isExpandedInternal = value;
            if (changed) {
                this.isExpandedChange.emit();
                this.changeDetectorRef.markForCheck();
            }
        }
        /** TS getter for isExpanded property. */
        get isExpanded() {
            return this.isExpandedInternal;
        }
        /**
         * A boolean indicating if this node is focused. This value is used to add
         * a CSS class that should render a blue border on the right. There should
         * only be one focused row in [cfcExpandingRowHost] directive.
         */
        set isFocused(value) {
            this.isFocusedInternal = value;
            this.changeDetectorRef.markForCheck();
        }
        /** TS getter for isFocused property. */
        get isFocused() {
            return this.isFocusedInternal;
        }
        /** The index of the row in the context of the entire collection. */
        set index(value) {
            const changed = this.indexInternal !== value;
            this.indexInternal = value;
            if (changed) {
                this.indexChange.emit();
                this.changeDetectorRef.markForCheck();
            }
        }
        /** TS getter for index property. */
        get index() {
            return this.indexInternal;
        }
        /**
         * This holds a reference to [cfcExpandingRowHost] directive. We need
         * this reference to notify the host when this row expands/collapses or is
         * focused.
         */
        constructor(elementRef, expandingRowHost, changeDetectorRef) {
            this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
            this.expandingRowHost = expandingRowHost;
            this.changeDetectorRef = changeDetectorRef;
            /**
             * The identifier for this node provided by the user code. We need this
             * while we are emitting onToggle event.
             */
            this.rowId = __runInitializers(this, _rowId_initializers, void 0);
            /**
             * An ElementRef to the main element in this component. We need a reference
             * to this element to compute the height. The height of cfc-expanding-row
             * is used in [cfcExpandingRowHost] directive for scroll adjustments.
             */
            this.expandingRowMainElement = (__runInitializers(this, _rowId_extraInitializers), __runInitializers(this, _expandingRowMainElement_initializers, void 0));
            /**
             * This @Output event emitter will be triggered when the user expands or
             * collapses this node.
             */
            this.onToggle = (__runInitializers(this, _expandingRowMainElement_extraInitializers), __runInitializers(this, _onToggle_initializers, new core_1.EventEmitter()));
            /** Triggered when isExpanded property changes. */
            this.isExpandedChange = (__runInitializers(this, _onToggle_extraInitializers), new core_1.EventEmitter());
            /** Triggered when index property changes. */
            this.indexChange = new core_1.EventEmitter();
            /**
             * We compute the collapsed height (which is just height of
             * cfc-expanding-row-summary component) in this component. This is used in
             * [cfcExpandingRowHost] for scroll adjustment calculation.
             */
            this.collapsedHeight = -1;
            /** Internal storage for isExpanded public property. */
            this.isExpandedInternal = false;
            /** Internal storage for isFocused public property. */
            this.isFocusedInternal = false;
        }
        /**
         * Handles click on cfc-expanding-row-summary component. This will expand
         * this row and collapse the previously expanded row. The collapse & blur
         * is handled in [cfcExpandingRowHost] directive.
         */
        handleSummaryClick() {
            this.collapsedHeight = this.elementRef.nativeElement.querySelector('.cfc-expanding-row-summary').offsetHeight;
            this.expandingRowHost.handleRowSummaryClick(this);
            this.expand();
        }
        /**
         * When user tabs into child cfc-expanding-row-summary component. This method
         * will make sure we focuse on this row, and blur on previously focused row.
         */
        handleSummaryFocus() {
            this.focus();
        }
        /**
         * cfc-expanding-row-details-caption component will call this function to
         * notify click on its host element. Note that caption is only shown when
         * the row is expanded. Hence this will collapse this row and put the focus
         * on it.
         * If an uncollapsible element exists in the caption, clicking that element will
         * not trigger the row collapse.
         */
        handleCaptionClick(event) {
            if (this.expandingRowHost.isCollapsible(event.target)) {
                this.expandingRowHost.handleRowCaptionClick(this);
                this.collapse();
                this.focus();
            }
        }
        /**
         * Gets the height of this component. This height is used in parent
         * [cfcExpandingRowHost] directive to compute scroll adjustment.
         */
        getHeight() {
            return this.expandingRowMainElement.nativeElement.offsetHeight;
        }
        /**
         * Expands this row. This will notify the host so that it can collapse
         * previously expanded row. This function also emits onToggle @Output event
         * to the user code.
         */
        expand() {
            this.isExpanded = true;
            this.expandingRowHost.handleRowExpand(this);
            // setTimeout here makes sure we scroll this row into view after animation.
            setTimeout(() => {
                this.expandingRowMainElement.nativeElement.focus();
            });
            this.onToggle.emit({ rowId: this.rowId, isExpand: true });
        }
        /**
         * Collapses this row. Setting isExpanded to false will make sure we hide
         * the caption and details, and show cfc-expanding-row-summary component.
         * This also emits onToggle @Output event to the user code.
         */
        collapse() {
            this.isExpanded = false;
            this.onToggle.emit({ rowId: this.rowId, isExpand: false });
        }
        /**
         * Blurs this row. This should remove the blue border on the left if there
         * is any. This function will remove DOM focus on the
         * cfc-expanding-row-summary
         * component.
         */
        blur() {
            this.isFocused = false;
            this.summaryViewChild.blur();
        }
        /**
         * Focuses this row. This should put blue border on the left. If there is
         * any previous focus/selection, those should be gone. Parent
         * [cfcExpandingRowHost] component takes care of that.
         */
        focus() {
            this.isFocused = true;
            this.expandingRowHost.handleRowFocus(this);
            // Summary child is not present currently. We need to NG2 to update the
            // template.
            setTimeout(() => {
                this.summaryViewChild.focus();
            });
        }
        /**
         * We listen for TAB press here to make sure we trap the focus on the
         * expanded
         * row. If the row is not expanded, we don't care about this event since focus
         * trap should work for expanded rows only.
         */
        handleKeyDown(event) {
            const charCode = event.which || event.keyCode;
            switch (charCode) {
                case 9:
                    if (!this.isExpanded) {
                        return;
                    }
                    this.trapFocus(event);
                    break;
                default:
                    break;
            }
        }
        /**
         * When this row is expanded, this function traps the focus between focusable
         * elements contained in this row.
         */
        trapFocus(event) {
            const rowElement = this.expandingRowMainElement.nativeElement;
            const focusableEls = [];
            let lastFocusableEl = rowElement;
            if (focusableEls.length) {
                lastFocusableEl = focusableEls[focusableEls.length - 1];
            }
            if (event.target === lastFocusableEl && !event.shiftKey) {
                rowElement.focus();
                event.preventDefault();
            }
            else if (event.target === rowElement && event.shiftKey) {
                lastFocusableEl.focus();
                event.preventDefault();
            }
        }
    };
    __setFunctionName(_classThis, "ExpandingRow");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _rowId_decorators = [(0, core_1.Input)()];
        _expandingRowMainElement_decorators = [(0, core_1.ViewChild)('expandingRowMainElement', { static: true })];
        _onToggle_decorators = [(0, core_1.Output)()];
        _handleKeyDown_decorators = [(0, core_1.HostListener)('keydown', ['$event'])];
        __esDecorate(_classThis, null, _handleKeyDown_decorators, { kind: "method", name: "handleKeyDown", static: false, private: false, access: { has: obj => "handleKeyDown" in obj, get: obj => obj.handleKeyDown }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _rowId_decorators, { kind: "field", name: "rowId", static: false, private: false, access: { has: obj => "rowId" in obj, get: obj => obj.rowId, set: (obj, value) => { obj.rowId = value; } }, metadata: _metadata }, _rowId_initializers, _rowId_extraInitializers);
        __esDecorate(null, null, _expandingRowMainElement_decorators, { kind: "field", name: "expandingRowMainElement", static: false, private: false, access: { has: obj => "expandingRowMainElement" in obj, get: obj => obj.expandingRowMainElement, set: (obj, value) => { obj.expandingRowMainElement = value; } }, metadata: _metadata }, _expandingRowMainElement_initializers, _expandingRowMainElement_extraInitializers);
        __esDecorate(null, null, _onToggle_decorators, { kind: "field", name: "onToggle", static: false, private: false, access: { has: obj => "onToggle" in obj, get: obj => obj.onToggle, set: (obj, value) => { obj.onToggle = value; } }, metadata: _metadata }, _onToggle_initializers, _onToggle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpandingRow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpandingRow = _classThis;
})();
exports.ExpandingRow = ExpandingRow;
