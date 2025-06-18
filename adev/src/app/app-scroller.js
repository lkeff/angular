"use strict";
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
exports.AppScroller = void 0;
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
let AppScroller = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppScroller = _classThis = class {
        get lastScrollEvent() {
            return this._lastScrollEvent;
        }
        constructor() {
            this.router = (0, core_1.inject)(router_1.Router);
            this.viewportScroller = (0, core_1.inject)(common_1.ViewportScroller);
            this.appRef = (0, core_1.inject)(core_1.ApplicationRef);
            this.injector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.canScroll = false;
            this.viewportScroller.setHistoryScrollRestoration('manual');
            this.router.events
                .pipe((0, rxjs_1.filter)((e) => e instanceof router_1.Scroll), (0, rxjs_1.tap)((e) => {
                var _a;
                (_a = this.cancelScroll) === null || _a === void 0 ? void 0 : _a.call(this);
                this.canScroll = true;
                this._lastScrollEvent = e;
            }), (0, rxjs_1.filter)(() => {
                var _a;
                const info = (_a = this.router.lastSuccessfulNavigation) === null || _a === void 0 ? void 0 : _a.extras.info;
                return !(info === null || info === void 0 ? void 0 : info['disableScrolling']);
            }), (0, rxjs_1.switchMap)((e) => {
                return (0, rxjs_1.firstValueFrom)(this.appRef.isStable.pipe((0, rxjs_1.filter)((stable) => stable), (0, rxjs_1.map)(() => e)));
            }))
                .subscribe(() => {
                this.scroll();
            });
        }
        scroll(injector) {
            if (!this._lastScrollEvent || !this.canScroll) {
                return;
            }
            // Prevent double scrolling on the same event
            this.canScroll = false;
            const { anchor, position } = this._lastScrollEvent;
            // Don't scroll during rendering
            const ref = (0, core_1.afterNextRender)({
                write: () => {
                    if (position) {
                        this.viewportScroller.scrollToPosition(position);
                    }
                    else if (anchor) {
                        this.viewportScroller.scrollToAnchor(anchor);
                    }
                    else {
                        this.viewportScroller.scrollToPosition([0, 0]);
                    }
                },
            }, 
            // Use the component injector when provided so that the manager can
            // deregister the sequence once the component is destroyed.
            { injector: injector !== null && injector !== void 0 ? injector : this.injector });
            this.cancelScroll = () => {
                ref.destroy();
            };
        }
    };
    __setFunctionName(_classThis, "AppScroller");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppScroller = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppScroller = _classThis;
})();
exports.AppScroller = AppScroller;
