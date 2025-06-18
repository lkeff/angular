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
exports.InMemoryBackendConfig = exports.InMemoryBackendConfigArgs = exports.InMemoryDbService = void 0;
exports.parseUri = parseUri;
exports.removeTrailingSlash = removeTrailingSlash;
const core_1 = require("@angular/core");
/**
 * Interface for a class that creates an in-memory database
 *
 * Its `createDb` method creates a hash of named collections that represents the database
 *
 * For maximum flexibility, the service may define HTTP method overrides.
 * Such methods must match the spelling of an HTTP method in lower case (e.g, "get").
 * If a request has a matching method, it will be called as in
 * `get(info: requestInfo, db: {})` where `db` is the database object described above.
 */
class InMemoryDbService {
}
exports.InMemoryDbService = InMemoryDbService;
/**
 * Interface for InMemoryBackend configuration options
 */
class InMemoryBackendConfigArgs {
}
exports.InMemoryBackendConfigArgs = InMemoryBackendConfigArgs;
/////////////////////////////////
/**
 *  InMemoryBackendService configuration options
 *  Usage:
 *    InMemoryWebApiModule.forRoot(InMemHeroService, {delay: 600})
 *
 *  or if providing separately:
 *    provide(InMemoryBackendConfig, {useValue: {delay: 600}}),
 */
let InMemoryBackendConfig = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InMemoryBackendConfig = _classThis = class {
        constructor(config = {}) {
            Object.assign(this, {
                // default config:
                caseSensitiveSearch: false,
                dataEncapsulation: false, // do NOT wrap content within an object with a `data` property
                delay: 500, // simulate latency by delaying response
                delete404: false, // don't complain if can't find entity to delete
                passThruUnknownUrl: false, // 404 if can't process URL
                post204: true, // don't return the item after a POST
                post409: false, // don't update existing item with that ID
                put204: true, // don't return the item after a PUT
                put404: false, // create new item if PUT item with that ID not found
                apiBase: undefined, // assumed to be the first path segment
                host: undefined, // default value is actually set in InMemoryBackendService ctor
                rootPath: undefined, // default value is actually set in InMemoryBackendService ctor
            }, config);
        }
    };
    __setFunctionName(_classThis, "InMemoryBackendConfig");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InMemoryBackendConfig = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InMemoryBackendConfig = _classThis;
})();
exports.InMemoryBackendConfig = InMemoryBackendConfig;
/** Return information (UriInfo) about a URI  */
function parseUri(str) {
    // Adapted from parseuri package - http://blog.stevenlevithan.com/archives/parseuri
    const URL_REGEX = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    const m = URL_REGEX.exec(str);
    const uri = {
        source: '',
        protocol: '',
        authority: '',
        userInfo: '',
        user: '',
        password: '',
        host: '',
        port: '',
        relative: '',
        path: '',
        directory: '',
        file: '',
        query: '',
        anchor: '',
    };
    const keys = Object.keys(uri);
    let i = keys.length;
    while (i--) {
        uri[keys[i]] = (m && m[i]) || '';
    }
    return uri;
}
function removeTrailingSlash(path) {
    return path.replace(/\/$/, '');
}
