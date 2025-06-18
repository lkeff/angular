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
exports.NgControlStatusGroup = exports.NgControlStatus = exports.ngGroupStatusHost = exports.ngControlStatusHost = exports.AbstractControlStatus = void 0;
const core_1 = require("@angular/core");
// DO NOT REFACTOR!
// Each status is represented by a separate function to make sure that
// advanced Closure Compiler optimizations related to property renaming
// can work correctly.
class AbstractControlStatus {
    constructor(cd) {
        this._cd = cd;
    }
    get isTouched() {
        var _a, _b, _c, _d, _e;
        // track the touched signal
        (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b._touched) === null || _c === void 0 ? void 0 : _c.call(_b);
        return !!((_e = (_d = this._cd) === null || _d === void 0 ? void 0 : _d.control) === null || _e === void 0 ? void 0 : _e.touched);
    }
    get isUntouched() {
        var _a, _b;
        return !!((_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.untouched);
    }
    get isPristine() {
        var _a, _b, _c, _d, _e;
        // track the pristine signal
        (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b._pristine) === null || _c === void 0 ? void 0 : _c.call(_b);
        return !!((_e = (_d = this._cd) === null || _d === void 0 ? void 0 : _d.control) === null || _e === void 0 ? void 0 : _e.pristine);
    }
    get isDirty() {
        var _a, _b;
        // pristine signal already tracked above
        return !!((_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.dirty);
    }
    get isValid() {
        var _a, _b, _c, _d, _e;
        // track the status signal
        (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b._status) === null || _c === void 0 ? void 0 : _c.call(_b);
        return !!((_e = (_d = this._cd) === null || _d === void 0 ? void 0 : _d.control) === null || _e === void 0 ? void 0 : _e.valid);
    }
    get isInvalid() {
        var _a, _b;
        // status signal already tracked above
        return !!((_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.invalid);
    }
    get isPending() {
        var _a, _b;
        // status signal already tracked above
        return !!((_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.pending);
    }
    get isSubmitted() {
        var _a, _b, _c;
        // track the submitted signal
        (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a._submitted) === null || _b === void 0 ? void 0 : _b.call(_a);
        // We check for the `submitted` field from `NgForm` and `FormGroupDirective` classes, but
        // we avoid instanceof checks to prevent non-tree-shakable references to those types.
        return !!((_c = this._cd) === null || _c === void 0 ? void 0 : _c.submitted);
    }
}
exports.AbstractControlStatus = AbstractControlStatus;
exports.ngControlStatusHost = {
    '[class.ng-untouched]': 'isUntouched',
    '[class.ng-touched]': 'isTouched',
    '[class.ng-pristine]': 'isPristine',
    '[class.ng-dirty]': 'isDirty',
    '[class.ng-valid]': 'isValid',
    '[class.ng-invalid]': 'isInvalid',
    '[class.ng-pending]': 'isPending',
};
exports.ngGroupStatusHost = Object.assign(Object.assign({}, exports.ngControlStatusHost), { '[class.ng-submitted]': 'isSubmitted' });
/**
 * @description
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status.
 *
 * @usageNotes
 *
 * ### CSS classes applied
 *
 * The following classes are applied as the properties become true:
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NgControlStatus = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formControlName],[ngModel],[formControl]',
            host: exports.ngControlStatusHost,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractControlStatus;
    var NgControlStatus = _classThis = class extends _classSuper {
        constructor(cd) {
            super(cd);
        }
    };
    __setFunctionName(_classThis, "NgControlStatus");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgControlStatus = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgControlStatus = _classThis;
})();
exports.NgControlStatus = NgControlStatus;
/**
 * @description
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc). On groups, this includes the additional
 * class ng-submitted.
 *
 * @see {@link NgControlStatus}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NgControlStatusGroup = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
            host: exports.ngGroupStatusHost,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractControlStatus;
    var NgControlStatusGroup = _classThis = class extends _classSuper {
        constructor(cd) {
            super(cd);
        }
    };
    __setFunctionName(_classThis, "NgControlStatusGroup");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgControlStatusGroup = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgControlStatusGroup = _classThis;
})();
exports.NgControlStatusGroup = NgControlStatusGroup;
