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
exports.TestHeroService = exports.getTestHeroes = exports.HeroService = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("../../../testing");
const operators_1 = require("rxjs/operators");
var hero_service_1 = require("../hero.service");
Object.defineProperty(exports, "HeroService", { enumerable: true, get: function () { return hero_service_1.HeroService; } });
var test_heroes_1 = require("./test-heroes");
Object.defineProperty(exports, "getTestHeroes", { enumerable: true, get: function () { return test_heroes_1.getTestHeroes; } });
const hero_service_2 = require("../hero.service");
const test_heroes_2 = require("./test-heroes");
let TestHeroService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = hero_service_2.HeroService;
    var TestHeroService = _classThis = class extends _classSuper {
        constructor() {
            // This is a fake testing service that won't be making HTTP
            // requests so we can pass in `null` as the HTTP client.
            super(null);
            this.heroes = (0, test_heroes_2.getTestHeroes)();
        }
        addHero(hero) {
            throw new Error('Method not implemented.');
        }
        deleteHero(hero) {
            throw new Error('Method not implemented.');
        }
        getHeroes() {
            return (this.lastResult = (0, testing_1.asyncData)(this.heroes));
        }
        getHero(id) {
            if (typeof id === 'string') {
                id = parseInt(id, 10);
            }
            const hero = this.heroes.find((h) => h.id === id);
            this.lastResult = (0, testing_1.asyncData)(hero);
            return this.lastResult;
        }
        updateHero(hero) {
            return (this.lastResult = this.getHero(hero.id).pipe((0, operators_1.map)((h) => {
                if (h) {
                    return Object.assign(h, hero);
                }
                throw new Error(`Hero ${hero.id} not found`);
            })));
        }
    };
    __setFunctionName(_classThis, "TestHeroService");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestHeroService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestHeroService = _classThis;
})();
exports.TestHeroService = TestHeroService;
