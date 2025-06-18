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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterScroller = exports.ROUTER_SCROLLER = void 0;
const core_1 = require("@angular/core");
const events_1 = require("./events");
exports.ROUTER_SCROLLER = new core_1.InjectionToken('');
let RouterScroller = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouterScroller = _classThis = class {
        /** @nodoc */
        constructor(urlSerializer, transitions, viewportScroller, zone, options = {}) {
            this.urlSerializer = urlSerializer;
            this.transitions = transitions;
            this.viewportScroller = viewportScroller;
            this.zone = zone;
            this.options = options;
            this.lastId = 0;
            this.lastSource = events_1.IMPERATIVE_NAVIGATION;
            this.restoredId = 0;
            this.store = {};
            // Default both options to 'disabled'
            options.scrollPositionRestoration || (options.scrollPositionRestoration = 'disabled');
            options.anchorScrolling || (options.anchorScrolling = 'disabled');
        }
        init() {
            // we want to disable the automatic scrolling because having two places
            // responsible for scrolling results race conditions, especially given
            // that browser don't implement this behavior consistently
            if (this.options.scrollPositionRestoration !== 'disabled') {
                this.viewportScroller.setHistoryScrollRestoration('manual');
            }
            this.routerEventsSubscription = this.createScrollEvents();
            this.scrollEventsSubscription = this.consumeScrollEvents();
        }
        createScrollEvents() {
            return this.transitions.events.subscribe((e) => {
                if (e instanceof events_1.NavigationStart) {
                    // store the scroll position of the current stable navigations.
                    this.store[this.lastId] = this.viewportScroller.getScrollPosition();
                    this.lastSource = e.navigationTrigger;
                    this.restoredId = e.restoredState ? e.restoredState.navigationId : 0;
                }
                else if (e instanceof events_1.NavigationEnd) {
                    this.lastId = e.id;
                    this.scheduleScrollEvent(e, this.urlSerializer.parse(e.urlAfterRedirects).fragment);
                }
                else if (e instanceof events_1.NavigationSkipped &&
                    e.code === events_1.NavigationSkippedCode.IgnoredSameUrlNavigation) {
                    this.lastSource = undefined;
                    this.restoredId = 0;
                    this.scheduleScrollEvent(e, this.urlSerializer.parse(e.url).fragment);
                }
            });
        }
        consumeScrollEvents() {
            return this.transitions.events.subscribe((e) => {
                if (!(e instanceof events_1.Scroll))
                    return;
                // a popstate event. The pop state event will always ignore anchor scrolling.
                if (e.position) {
                    if (this.options.scrollPositionRestoration === 'top') {
                        this.viewportScroller.scrollToPosition([0, 0]);
                    }
                    else if (this.options.scrollPositionRestoration === 'enabled') {
                        this.viewportScroller.scrollToPosition(e.position);
                    }
                    // imperative navigation "forward"
                }
                else {
                    if (e.anchor && this.options.anchorScrolling === 'enabled') {
                        this.viewportScroller.scrollToAnchor(e.anchor);
                    }
                    else if (this.options.scrollPositionRestoration !== 'disabled') {
                        this.viewportScroller.scrollToPosition([0, 0]);
                    }
                }
            });
        }
        scheduleScrollEvent(routerEvent, anchor) {
            this.zone.runOutsideAngular(() => __awaiter(this, void 0, void 0, function* () {
                // The scroll event needs to be delayed until after change detection. Otherwise, we may
                // attempt to restore the scroll position before the router outlet has fully rendered the
                // component by executing its update block of the template function.
                //
                // #57109 (we need to wait at least a macrotask before scrolling. AfterNextRender resolves in microtask event loop with Zones)
                // We could consider _also_ waiting for a render promise though one should have already happened or been scheduled by this point
                // and should definitely happen before rAF/setTimeout.
                // #53985 (cannot rely solely on setTimeout because a frame may paint before the timeout)
                yield new Promise((resolve) => {
                    setTimeout(resolve);
                    if (typeof requestAnimationFrame !== 'undefined') {
                        requestAnimationFrame(resolve);
                    }
                });
                this.zone.run(() => {
                    this.transitions.events.next(new events_1.Scroll(routerEvent, this.lastSource === 'popstate' ? this.store[this.restoredId] : null, anchor));
                });
            }));
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a, _b;
            (_a = this.routerEventsSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            (_b = this.scrollEventsSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        }
    };
    __setFunctionName(_classThis, "RouterScroller");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterScroller = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterScroller = _classThis;
})();
exports.RouterScroller = RouterScroller;
