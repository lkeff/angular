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
exports.HttpClientHeroService = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const hero_service_1 = require("./hero-service");
const cudOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }),
};
let HttpClientHeroService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = hero_service_1.HeroService;
    var HttpClientHeroService = _classThis = class extends _classSuper {
        constructor(http) {
            super();
            this.http = http;
        }
        getHeroes() {
            return this.http.get(this.heroesUrl).pipe((0, operators_1.catchError)(this.handleError));
        }
        // This get-by-id will 404 when id not found
        getHero(id) {
            const url = `${this.heroesUrl}/${id}`;
            return this.http.get(url).pipe((0, operators_1.catchError)(this.handleError));
        }
        // This get-by-id does not 404; returns undefined when id not found
        // getHero<Data>(id: number): Observable<Hero> {
        //   const url = `${this._heroesUrl}/?id=${id}`;
        //   return this.http.get<Hero[]>(url)
        //     .map(heroes => heroes[0] as Hero)
        //     .catch(this.handleError);
        // }
        addHero(name) {
            const hero = { name };
            return this.http
                .post(this.heroesUrl, hero, cudOptions)
                .pipe((0, operators_1.catchError)(this.handleError));
        }
        deleteHero(hero) {
            const id = typeof hero === 'number' ? hero : hero.id;
            const url = `${this.heroesUrl}/${id}`;
            return this.http.delete(url, cudOptions).pipe((0, operators_1.catchError)(this.handleError));
        }
        searchHeroes(term) {
            term = term.trim();
            // add safe, encoded search parameter if term is present
            const options = term ? { params: new http_1.HttpParams().set('name', term) } : {};
            return this.http.get(this.heroesUrl, options).pipe((0, operators_1.catchError)(this.handleError));
        }
        updateHero(hero) {
            return this.http.put(this.heroesUrl, hero, cudOptions).pipe((0, operators_1.catchError)(this.handleError));
        }
        handleError(error) {
            // In a real world app, we might send the error to remote logging infrastructure
            // and reformat for user consumption
            return (0, rxjs_1.throwError)(error);
        }
    };
    __setFunctionName(_classThis, "HttpClientHeroService");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientHeroService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientHeroService = _classThis;
})();
exports.HttpClientHeroService = HttpClientHeroService;
