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
exports.TopLevelBannerComponent = exports.STORAGE_KEY_PREFIX = void 0;
const core_1 = require("@angular/core");
const directives_1 = require("../../directives");
const providers_1 = require("../../providers");
const icon_component_1 = require("../icon/icon.component");
exports.STORAGE_KEY_PREFIX = 'docs-was-closed-top-banner-';
let TopLevelBannerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'docs-top-level-banner',
            imports: [directives_1.ExternalLink, icon_component_1.IconComponent],
            templateUrl: './top-level-banner.component.html',
            styleUrl: './top-level-banner.component.scss',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TopLevelBannerComponent = _classThis = class {
        constructor() {
            this.localStorage = (0, core_1.inject)(providers_1.LOCAL_STORAGE);
            /**
             * Unique identifier for the banner. This ID is required to ensure that
             * the state of the banner (e.g., whether it has been closed) is tracked
             * separately for different events or instances. Without a unique ID,
             * closing one banner could inadvertently hide other banners for different events.
             */
            this.id = core_1.input.required();
            // Optional URL link that the banner should navigate to when clicked.
            this.link = (0, core_1.input)();
            // Text content to be displayed in the banner.
            this.text = core_1.input.required();
            // Optional expiry date. Setting the default expiry as a future date so we
            // don't have to deal with undefined signal values.
            this.expiry = (0, core_1.input)(new Date('3000-01-01'), { transform: parseDate });
            // Whether the user has closed the banner or the survey has expired.
            this.hasClosed = (0, core_1.signal)(false);
        }
        ngOnInit() {
            var _a;
            const expired = Date.now() > this.expiry().getTime();
            // Needs to be in a try/catch, because some browsers will
            // throw when using `localStorage` in private mode.
            try {
                this.hasClosed.set(((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(this.getBannerStorageKey())) === 'true' || expired);
            }
            catch (_b) {
                this.hasClosed.set(false);
            }
        }
        close() {
            var _a;
            (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(this.getBannerStorageKey(), 'true');
            this.hasClosed.set(true);
        }
        getBannerStorageKey() {
            return `${exports.STORAGE_KEY_PREFIX}${this.id()}`;
        }
    };
    __setFunctionName(_classThis, "TopLevelBannerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TopLevelBannerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TopLevelBannerComponent = _classThis;
})();
exports.TopLevelBannerComponent = TopLevelBannerComponent;
const parseDate = (inputDate) => {
    if (inputDate instanceof Date) {
        return inputDate;
    }
    const outputDate = new Date(inputDate);
    if (isNaN(outputDate.getTime())) {
        throw new Error(`Invalid date string: ${inputDate}`);
    }
    return outputDate;
};
