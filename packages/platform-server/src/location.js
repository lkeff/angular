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
exports.ServerPlatformLocation = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const RESOLVE_PROTOCOL = 'resolve:';
function parseUrl(urlStr) {
    const { hostname, protocol, port, pathname, search, hash } = new URL(urlStr, RESOLVE_PROTOCOL + '//');
    return {
        hostname,
        protocol: protocol === RESOLVE_PROTOCOL ? '' : protocol,
        port,
        pathname,
        search,
        hash,
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
let ServerPlatformLocation = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ServerPlatformLocation = _classThis = class {
        constructor(_doc, _config) {
            this._doc = _doc;
            this.href = '/';
            this.hostname = '/';
            this.protocol = '/';
            this.port = '/';
            this.pathname = '/';
            this.search = '';
            this.hash = '';
            this._hashUpdate = new rxjs_1.Subject();
            const config = _config;
            if (!config) {
                return;
            }
            if (config.url) {
                const url = parseUrl(config.url);
                this.protocol = url.protocol;
                this.hostname = url.hostname;
                this.port = url.port;
                this.pathname = url.pathname;
                this.search = url.search;
                this.hash = url.hash;
                this.href = _doc.location.href;
            }
        }
        getBaseHrefFromDOM() {
            return (0, common_1.ɵgetDOM)().getBaseHref(this._doc);
        }
        onPopState(fn) {
            // No-op: a state stack is not implemented, so
            // no events will ever come.
            return () => { };
        }
        onHashChange(fn) {
            const subscription = this._hashUpdate.subscribe(fn);
            return () => subscription.unsubscribe();
        }
        get url() {
            return `${this.pathname}${this.search}${this.hash}`;
        }
        setHash(value, oldUrl) {
            if (this.hash === value) {
                // Don't fire events if the hash has not changed.
                return;
            }
            this.hash = value;
            const newUrl = this.url;
            queueMicrotask(() => this._hashUpdate.next({
                type: 'hashchange',
                state: null,
                oldUrl,
                newUrl,
            }));
        }
        replaceState(state, title, newUrl) {
            const oldUrl = this.url;
            const parsedUrl = parseUrl(newUrl);
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.setHash(parsedUrl.hash, oldUrl);
        }
        pushState(state, title, newUrl) {
            this.replaceState(state, title, newUrl);
        }
        forward() {
            throw new Error('Not implemented');
        }
        back() {
            throw new Error('Not implemented');
        }
        // History API isn't available on server, therefore return undefined
        getState() {
            return undefined;
        }
    };
    __setFunctionName(_classThis, "ServerPlatformLocation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServerPlatformLocation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServerPlatformLocation = _classThis;
})();
exports.ServerPlatformLocation = ServerPlatformLocation;
