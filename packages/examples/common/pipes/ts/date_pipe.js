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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeprecatedDatePipeComponent = exports.DatePipeComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
// we need to import data for the french locale
const locale_fr_1 = __importDefault(require("./locale-fr"));
// registering french data
(0, common_1.registerLocaleData)(locale_fr_1.default);
let DatePipeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'date-pipe',
            template: `<div>
    <!--output 'Jun 15, 2015'-->
    <p>Today is {{ today | date }}</p>

    <!--output 'Monday, June 15, 2015'-->
    <p>Or if you prefer, {{ today | date: 'fullDate' }}</p>

    <!--output '9:43 AM'-->
    <p>The time is {{ today | date: 'shortTime' }}</p>

    <!--output 'Monday, June 15, 2015 at 9:03:01 AM GMT+01:00' -->
    <p>The full date/time is {{ today | date: 'full' }}</p>

    <!--output 'Lundi 15 Juin 2015 à 09:03:01 GMT+01:00'-->
    <p>The full date/time in french is: {{ today | date: 'full' : '' : 'fr' }}</p>

    <!--output '2015-06-15 05:03 PM GMT+9'-->
    <p>The custom date is {{ today | date: 'yyyy-MM-dd HH:mm a z' : '+0900' }}</p>

    <!--output '2015-06-15 09:03 AM GMT+9'-->
    <p>
      The custom date with fixed timezone is
      {{ fixedTimezone | date: 'yyyy-MM-dd HH:mm a z' : '+0900' }}
    </p>
  </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DatePipeComponent = _classThis = class {
        constructor() {
            this.today = Date.now();
            this.fixedTimezone = '2015-06-15T09:03:01+0900';
        }
    };
    __setFunctionName(_classThis, "DatePipeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DatePipeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DatePipeComponent = _classThis;
})();
exports.DatePipeComponent = DatePipeComponent;
let DeprecatedDatePipeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'deprecated-date-pipe',
            template: `<div>
    <!--output 'Sep 3, 2010'-->
    <p>Today is {{ today | date }}</p>

    <!--output 'Friday, September 3, 2010'-->
    <p>Or if you prefer, {{ today | date: 'fullDate' }}</p>

    <!--output '12:05 PM'-->
    <p>The time is {{ today | date: 'shortTime' }}</p>

    <!--output '2010-09-03 12:05 PM'-->
    <p>The custom date is {{ today | date: 'yyyy-MM-dd HH:mm a' }}</p>
  </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DeprecatedDatePipeComponent = _classThis = class {
        constructor() {
            this.today = Date.now();
        }
    };
    __setFunctionName(_classThis, "DeprecatedDatePipeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeprecatedDatePipeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeprecatedDatePipeComponent = _classThis;
})();
exports.DeprecatedDatePipeComponent = DeprecatedDatePipeComponent;
