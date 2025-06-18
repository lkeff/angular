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
exports.ProgressBarComponent = exports.PROGRESS_BAR_DELAY = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const ngx_progressbar_1 = require("ngx-progressbar");
const router_1 = require("@angular/router");
const operators_1 = require("rxjs/operators");
/** Time to wait after navigation starts before showing the progress bar. This delay allows a small amount of time to skip showing the progress bar when a navigation is effectively immediate. 30ms is approximately the amount of time we can wait before a delay is perceptible.*/
exports.PROGRESS_BAR_DELAY = 30;
let ProgressBarComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-progress-bar',
            imports: [ngx_progressbar_1.NgProgressbar],
            template: `
    <ng-progress aria-label="Page load progress" />
  `,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProgressBarComponent = _classThis = class {
        constructor() {
            this.router = (0, core_1.inject)(router_1.Router);
            this.progressBar = core_1.viewChild.required(ngx_progressbar_1.NgProgressRef);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
        }
        ngOnInit() {
            this.setupPageNavigationDimming();
        }
        /**
         * Dims the main router-outlet content when navigating to a new page.
         */
        setupPageNavigationDimming() {
            if (!this.isBrowser) {
                return;
            }
            this.router.events
                .pipe((0, operators_1.filter)((e) => e instanceof router_1.NavigationStart), (0, operators_1.map)(() => {
                // Only apply set the property if the navigation is not "immediate"
                return setTimeout(() => {
                    this.progressBar().start();
                }, exports.PROGRESS_BAR_DELAY);
            }), (0, operators_1.switchMap)((timeoutId) => {
                return this.router.events.pipe((0, operators_1.filter)((e) => {
                    return (e instanceof router_1.NavigationEnd ||
                        e instanceof router_1.NavigationCancel ||
                        e instanceof router_1.NavigationSkipped ||
                        e instanceof router_1.NavigationError);
                }), (0, operators_1.take)(1), (0, operators_1.map)(() => timeoutId));
            }))
                .subscribe((timeoutId) => {
                // When the navigation finishes, prevent the navigating class from being applied in the timeout.
                clearTimeout(timeoutId);
                this.progressBar().complete();
            });
        }
    };
    __setFunctionName(_classThis, "ProgressBarComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProgressBarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProgressBarComponent = _classThis;
})();
exports.ProgressBarComponent = ProgressBarComponent;
