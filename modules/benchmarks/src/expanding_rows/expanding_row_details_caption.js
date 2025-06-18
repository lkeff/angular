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
exports.ExpandingRowDetailsCaption = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const expanding_row_css_1 = require("./expanding_row_css");
/**
 * This component should be within cfc-expanding-row component. The caption
 * is only visible when the row is expanded.
 */
let ExpandingRowDetailsCaption = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cfc-expanding-row-details-caption',
            styles: [expanding_row_css_1.expanding_row_css],
            template: ` <div
    *ngIf="expandingRow.isExpanded"
    (click)="expandingRow.handleCaptionClick($event)"
    [style.backgroundColor]="color"
    class="cfc-expanding-row-details-caption"
  >
    <ng-content></ng-content>
  </div>`,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    var ExpandingRowDetailsCaption = _classThis = class {
        /**
         * We need a reference to parent cfc-expanding-row component here to hide
         * this component when the row is collapsed. We also need to relay clicks
         * to the parent component.
         */
        constructor(expandingRow, changeDetectorRef) {
            this.expandingRow = expandingRow;
            /** The background color of this component. */
            this.color = __runInitializers(this, _color_initializers, 'blue');
            /** This is triggered when this component is destroyed. */
            this.onDestroy = (__runInitializers(this, _color_extraInitializers), new rxjs_1.Subject());
            this.expandingRow.isExpandedChange.pipe((0, operators_1.takeUntil)(this.onDestroy)).subscribe(() => {
                changeDetectorRef.markForCheck();
            });
        }
        /** When component is destroyed, unlisten to isExpanded. */
        ngOnDestroy() {
            this.onDestroy.next();
        }
    };
    __setFunctionName(_classThis, "ExpandingRowDetailsCaption");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _color_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpandingRowDetailsCaption = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpandingRowDetailsCaption = _classThis;
})();
exports.ExpandingRowDetailsCaption = ExpandingRowDetailsCaption;
