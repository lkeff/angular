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
exports.TwainService = void 0;
// Mark Twain Quote service gets quotes from server
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let TwainService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TwainService = _classThis = class {
        constructor() {
            this.http = (0, core_1.inject)(http_1.HttpClient);
            this.nextId = 1;
        }
        getQuote() {
            return rxjs_1.Observable.create((observer) => observer.next(this.nextId++)).pipe(
            // tap((id: number) => console.log(id)),
            // tap((id: number) => { throw new Error('Simulated server error'); }),
            (0, operators_1.switchMap)((id) => this.http.get(`api/quotes/${id}`)), 
            // tap((q : Quote) => console.log(q)),
            (0, operators_1.map)((q) => q.quote), 
            // `errors` is observable of http.get errors
            (0, operators_1.retryWhen)((errors) => errors.pipe((0, operators_1.switchMap)((error) => {
                if (error.status === 404) {
                    // Queried for quote that doesn't exist.
                    this.nextId = 1; // retry with quote id:1
                    return (0, rxjs_1.of)(null); // signal OK to retry
                }
                // Some other HTTP error.
                console.error(error);
                return (0, rxjs_1.throwError)('Cannot get Twain quotes from the server');
            }), (0, operators_1.take)(2), 
            // If a second retry value, then didn't find id:1 and triggers the following error
            (0, operators_1.concat)((0, rxjs_1.throwError)('There are no Twain quotes')))));
        }
    };
    __setFunctionName(_classThis, "TwainService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TwainService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TwainService = _classThis;
})();
exports.TwainService = TwainService;
