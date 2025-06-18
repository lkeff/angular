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
exports.HeroInMemDataOverrideService = void 0;
/**
 * This is an example of a Hero-oriented InMemoryDbService with method overrides.
 */
const core_1 = require("@angular/core");
const angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
const hero_in_mem_data_service_1 = require("./hero-in-mem-data-service");
const villains = [
    // deliberately using string ids that look numeric
    { id: 100, name: 'Snidley Wipsnatch' },
    { id: 101, name: 'Boris Badenov' },
    { id: 103, name: 'Natasha Fatale' },
];
// Pseudo guid generator
function guid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
let HeroInMemDataOverrideService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = hero_in_mem_data_service_1.HeroInMemDataService;
    var HeroInMemDataOverrideService = _classThis = class extends _classSuper {
        // Overrides id generator and delivers next available `id`, starting with 1001.
        genId(collection, collectionName) {
            if (collectionName === 'nobodies') {
                return guid();
            }
            else if (collection) {
                return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
            }
        }
        // HTTP GET interceptor
        get(reqInfo) {
            const collectionName = reqInfo.collectionName;
            if (collectionName === 'villains') {
                return this.getVillains(reqInfo);
            }
            return undefined; // let the default GET handle all others
        }
        // HTTP GET interceptor handles requests for villains
        getVillains(reqInfo) {
            return reqInfo.utils.createResponse$(() => {
                const collection = villains.slice();
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const id = reqInfo.id;
                const data = id == null ? collection : reqInfo.utils.findById(collection, id);
                const options = data
                    ? { body: dataEncapsulation ? { data } : data, status: angular_in_memory_web_api_1.STATUS.OK }
                    : { body: { error: `'Villains' with id='${id}' not found` }, status: angular_in_memory_web_api_1.STATUS.NOT_FOUND };
                return this.finishOptions(options, reqInfo);
            });
        }
        // parseRequestUrl override
        // Do this to manipulate the request URL or the parsed result
        // into something your data store can handle.
        // This example turns a request for `/foo/heroes` into just `/heroes`.
        // It leaves other URLs untouched and forwards to the default parser.
        // It also logs the result of the default parser.
        parseRequestUrl(url, utils) {
            const newUrl = url.replace(/\/foo\/heroes/, '/heroes');
            return utils.parseRequestUrl(newUrl);
        }
        responseInterceptor(resOptions, reqInfo) {
            if (resOptions.headers) {
                resOptions.headers = resOptions.headers.set('x-test', 'test-header');
            }
            return resOptions;
        }
        finishOptions(options, { headers, url }) {
            options.statusText = options.status == null ? undefined : (0, angular_in_memory_web_api_1.getStatusText)(options.status);
            options.headers = headers;
            options.url = url;
            return options;
        }
    };
    __setFunctionName(_classThis, "HeroInMemDataOverrideService");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroInMemDataOverrideService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroInMemDataOverrideService = _classThis;
})();
exports.HeroInMemDataOverrideService = HeroInMemDataOverrideService;
