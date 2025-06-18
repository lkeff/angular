"use strict";
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
exports.NgStyle = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
/**
 * @ngModule CommonModule
 *
 * @usageNotes
 *
 * Set the width of the containing element to a pixel value returned by an expression.
 *
 * ```html
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 * ```
 *
 * Set a collection of style values using an expression that returns key-value pairs.
 *
 * ```html
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * For more simple use cases you can use the [style bindings](/guide/templates/binding#css-class-and-style-property-bindings) directly.
 * It doesn't require importing a directive.
 *
 * Set the font of the containing element to the result of an expression.
 *
 * ```html
 * <some-element [style]="{'font-style': styleExp}">...</some-element>
 * ```
 *
 * @description
 *
 * An attribute directive that updates styles for the containing HTML element.
 * Sets one or more style properties, specified as colon-separated key-value pairs.
 * The key is a style name, with an optional `.<unit>` suffix
 * (such as 'top.px', 'font-style.em').
 * The value is an expression to be evaluated.
 * The resulting non-null value, expressed in the given unit,
 * is assigned to the given style property.
 * If the result of evaluation is null, the corresponding style is removed.
 *
 * @see [Style bindings](/guide/templates/binding#css-class-and-style-property-bindings)
 *
 * @publicApi
 */
let NgStyle = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[ngStyle]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_ngStyle_decorators;
    var NgStyle = _classThis = class {
        constructor(_ngEl, _differs, _renderer) {
            this._ngEl = (__runInitializers(this, _instanceExtraInitializers), _ngEl);
            this._differs = _differs;
            this._renderer = _renderer;
            this._ngStyle = null;
            this._differ = null;
        }
        set ngStyle(values) {
            this._ngStyle = values;
            if (!this._differ && values) {
                this._differ = this._differs.find(values).create();
            }
        }
        ngDoCheck() {
            if (this._differ) {
                const changes = this._differ.diff(this._ngStyle);
                if (changes) {
                    this._applyChanges(changes);
                }
            }
        }
        _setStyle(nameAndUnit, value) {
            const [name, unit] = nameAndUnit.split('.');
            const flags = name.indexOf('-') === -1 ? undefined : core_1.RendererStyleFlags2.DashCase;
            if (value != null) {
                this._renderer.setStyle(this._ngEl.nativeElement, name, unit ? `${value}${unit}` : value, flags);
            }
            else {
                this._renderer.removeStyle(this._ngEl.nativeElement, name, flags);
            }
        }
        _applyChanges(changes) {
            changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
            changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
            changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
        }
    };
    __setFunctionName(_classThis, "NgStyle");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_ngStyle_decorators = [(0, core_1.Input)('ngStyle')];
        __esDecorate(_classThis, null, _set_ngStyle_decorators, { kind: "setter", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgStyle = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgStyle = _classThis;
})();
exports.NgStyle = NgStyle;
