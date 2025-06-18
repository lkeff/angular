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
exports.HeroService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let HeroService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroService = _classThis = class {
        constructor(http, messageService) {
            this.http = http;
            this.messageService = messageService;
            this.heroesUrl = 'api/heroes'; // URL to web api
            this.httpOptions = {
                headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }),
            };
        }
        /** GET heroes from the server */
        getHeroes() {
            return this.http.get(this.heroesUrl).pipe((0, operators_1.tap)((_) => this.log('fetched heroes')), (0, operators_1.catchError)(this.handleError('getHeroes', [])));
        }
        /** GET hero by id. Return `undefined` when id not found */
        getHeroNo404(id) {
            const url = `${this.heroesUrl}/?id=${id}`;
            return this.http.get(url).pipe((0, operators_1.map)((heroes) => heroes[0]), // returns a {0|1} element array
            (0, operators_1.tap)((h) => {
                const outcome = h ? 'fetched' : 'did not find';
                this.log(`${outcome} hero id=${id}`);
            }), (0, operators_1.catchError)(this.handleError(`getHero id=${id}`)));
        }
        /** GET hero by id. Will 404 if id not found */
        getHero(id) {
            const url = `${this.heroesUrl}/${id}`;
            return this.http.get(url).pipe((0, operators_1.tap)((_) => this.log(`fetched hero id=${id}`)), (0, operators_1.catchError)(this.handleError(`getHero id=${id}`)));
        }
        /* GET heroes whose name contains search term */
        searchHeroes(term) {
            if (!term.trim()) {
                // if not search term, return empty hero array.
                return (0, rxjs_1.of)([]);
            }
            return this.http.get(`${this.heroesUrl}/?name=${term}`).pipe((0, operators_1.tap)((x) => x.length
                ? this.log(`found heroes matching "${term}"`)
                : this.log(`no heroes matching "${term}"`)), (0, operators_1.catchError)(this.handleError('searchHeroes', [])));
        }
        //////// Save methods //////////
        /** POST: add a new hero to the server */
        addHero(hero) {
            return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe((0, operators_1.tap)((newHero) => this.log(`added hero w/ id=${newHero.id}`)), (0, operators_1.catchError)(this.handleError('addHero')));
        }
        /** DELETE: delete the hero from the server */
        deleteHero(hero) {
            const id = typeof hero === 'number' ? hero : hero.id;
            const url = `${this.heroesUrl}/${id}`;
            return this.http.delete(url, this.httpOptions).pipe((0, operators_1.tap)((_) => this.log(`deleted hero id=${id}`)), (0, operators_1.catchError)(this.handleError('deleteHero')));
        }
        /** PUT: update the hero on the server */
        updateHero(hero) {
            return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe((0, operators_1.tap)((_) => this.log(`updated hero id=${hero.id}`)), (0, operators_1.catchError)(this.handleError('updateHero')));
        }
        /**
         * Handle Http operation that failed.
         * Let the app continue.
         *
         * @param operation - name of the operation that failed
         * @param result - optional value to return as the observable result
         */
        handleError(operation = 'operation', result) {
            return (error) => {
                // TODO: send the error to remote logging infrastructure
                console.error(error); // log to console instead
                // TODO: better job of transforming error for user consumption
                this.log(`${operation} failed: ${error.message}`);
                // Let the app keep running by returning an empty result.
                return (0, rxjs_1.of)(result);
            };
        }
        /** Log a HeroService message with the MessageService */
        log(message) {
            this.messageService.add(`HeroService: ${message}`);
        }
    };
    __setFunctionName(_classThis, "HeroService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroService = _classThis;
})();
exports.HeroService = HeroService;
