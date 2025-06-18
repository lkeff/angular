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
exports.SpyLocation = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @publicApi
 */
let SpyLocation = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SpyLocation = _classThis = class {
        constructor() {
            this.urlChanges = [];
            this._history = [new LocationState('', '', null)];
            this._historyIndex = 0;
            /** @internal */
            this._subject = new rxjs_1.Subject();
            /** @internal */
            this._basePath = '';
            /** @internal */
            this._locationStrategy = null;
            /** @internal */
            this._urlChangeListeners = [];
            /** @internal */
            this._urlChangeSubscription = null;
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            (_a = this._urlChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this._urlChangeListeners = [];
        }
        setInitialPath(url) {
            this._history[this._historyIndex].path = url;
        }
        setBaseHref(url) {
            this._basePath = url;
        }
        path() {
            return this._history[this._historyIndex].path;
        }
        getState() {
            return this._history[this._historyIndex].state;
        }
        isCurrentPathEqualTo(path, query = '') {
            const givenPath = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
            const currPath = this.path().endsWith('/')
                ? this.path().substring(0, this.path().length - 1)
                : this.path();
            return currPath == givenPath + (query.length > 0 ? '?' + query : '');
        }
        simulateUrlPop(pathname) {
            this._subject.next({ 'url': pathname, 'pop': true, 'type': 'popstate' });
        }
        simulateHashChange(pathname) {
            const path = this.prepareExternalUrl(pathname);
            this.pushHistory(path, '', null);
            this.urlChanges.push('hash: ' + pathname);
            // the browser will automatically fire popstate event before each `hashchange` event, so we need
            // to simulate it.
            this._subject.next({ 'url': pathname, 'pop': true, 'type': 'popstate' });
            this._subject.next({ 'url': pathname, 'pop': true, 'type': 'hashchange' });
        }
        prepareExternalUrl(url) {
            if (url.length > 0 && !url.startsWith('/')) {
                url = '/' + url;
            }
            return this._basePath + url;
        }
        go(path, query = '', state = null) {
            path = this.prepareExternalUrl(path);
            this.pushHistory(path, query, state);
            const locationState = this._history[this._historyIndex - 1];
            if (locationState.path == path && locationState.query == query) {
                return;
            }
            const url = path + (query.length > 0 ? '?' + query : '');
            this.urlChanges.push(url);
            this._notifyUrlChangeListeners(path + (0, common_1.ɵnormalizeQueryParams)(query), state);
        }
        replaceState(path, query = '', state = null) {
            path = this.prepareExternalUrl(path);
            const history = this._history[this._historyIndex];
            history.state = state;
            if (history.path == path && history.query == query) {
                return;
            }
            history.path = path;
            history.query = query;
            const url = path + (query.length > 0 ? '?' + query : '');
            this.urlChanges.push('replace: ' + url);
            this._notifyUrlChangeListeners(path + (0, common_1.ɵnormalizeQueryParams)(query), state);
        }
        forward() {
            if (this._historyIndex < this._history.length - 1) {
                this._historyIndex++;
                this._subject.next({
                    'url': this.path(),
                    'state': this.getState(),
                    'pop': true,
                    'type': 'popstate',
                });
            }
        }
        back() {
            if (this._historyIndex > 0) {
                this._historyIndex--;
                this._subject.next({
                    'url': this.path(),
                    'state': this.getState(),
                    'pop': true,
                    'type': 'popstate',
                });
            }
        }
        historyGo(relativePosition = 0) {
            const nextPageIndex = this._historyIndex + relativePosition;
            if (nextPageIndex >= 0 && nextPageIndex < this._history.length) {
                this._historyIndex = nextPageIndex;
                this._subject.next({
                    'url': this.path(),
                    'state': this.getState(),
                    'pop': true,
                    'type': 'popstate',
                });
            }
        }
        onUrlChange(fn) {
            var _a;
            this._urlChangeListeners.push(fn);
            (_a = this._urlChangeSubscription) !== null && _a !== void 0 ? _a : (this._urlChangeSubscription = this.subscribe((v) => {
                this._notifyUrlChangeListeners(v.url, v.state);
            }));
            return () => {
                var _a;
                const fnIndex = this._urlChangeListeners.indexOf(fn);
                this._urlChangeListeners.splice(fnIndex, 1);
                if (this._urlChangeListeners.length === 0) {
                    (_a = this._urlChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                    this._urlChangeSubscription = null;
                }
            };
        }
        /** @internal */
        _notifyUrlChangeListeners(url = '', state) {
            this._urlChangeListeners.forEach((fn) => fn(url, state));
        }
        subscribe(onNext, onThrow, onReturn) {
            return this._subject.subscribe({
                next: onNext,
                error: onThrow !== null && onThrow !== void 0 ? onThrow : undefined,
                complete: onReturn !== null && onReturn !== void 0 ? onReturn : undefined,
            });
        }
        normalize(url) {
            return null;
        }
        pushHistory(path, query, state) {
            if (this._historyIndex > 0) {
                this._history.splice(this._historyIndex + 1);
            }
            this._history.push(new LocationState(path, query, state));
            this._historyIndex = this._history.length - 1;
        }
    };
    __setFunctionName(_classThis, "SpyLocation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SpyLocation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SpyLocation = _classThis;
})();
exports.SpyLocation = SpyLocation;
class LocationState {
    constructor(path, query, state) {
        this.path = path;
        this.query = query;
        this.state = state;
    }
}
