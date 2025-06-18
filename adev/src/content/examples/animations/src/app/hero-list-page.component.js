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
exports.HeroListPageComponent = void 0;
// #docplaster
// #docregion
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
const mock_heroes_1 = require("./mock-heroes");
// #docregion filter-animations
let HeroListPageComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            // #enddocregion filter-animations
            selector: 'app-hero-list-page',
            templateUrl: 'hero-list-page.component.html',
            styleUrls: ['hero-list-page.component.css'],
            // #docregion page-animations, filter-animations
            animations: [
                // #enddocregion filter-animations
                (0, animations_1.trigger)('pageAnimations', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.query)('.hero', [
                            (0, animations_1.style)({ opacity: 0, transform: 'translateY(-100px)' }),
                            (0, animations_1.stagger)(30, [
                                (0, animations_1.animate)('500ms cubic-bezier(0.35, 0, 0.25, 1)', (0, animations_1.style)({ opacity: 1, transform: 'none' })),
                            ]),
                        ]),
                    ]),
                ]),
                // #enddocregion page-animations
                // #docregion increment
                // #docregion filter-animations
                (0, animations_1.trigger)('filterAnimation', [
                    (0, animations_1.transition)(':enter, * => 0, * => -1', []),
                    (0, animations_1.transition)(':increment', [
                        (0, animations_1.query)(':enter', [
                            (0, animations_1.style)({ opacity: 0, width: 0 }),
                            (0, animations_1.stagger)(50, [(0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ opacity: 1, width: '*' }))]),
                        ], { optional: true }),
                    ]),
                    (0, animations_1.transition)(':decrement', [
                        (0, animations_1.query)(':leave', [(0, animations_1.stagger)(50, [(0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ opacity: 0, width: 0 }))])]),
                    ]),
                ]),
                // #enddocregion  increment
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _animatePage_decorators;
    let _animatePage_initializers = [];
    let _animatePage_extraInitializers = [];
    var HeroListPageComponent = _classThis = class {
        constructor() {
            // #enddocregion filter-animations
            this.animatePage = __runInitializers(this, _animatePage_initializers, true);
            // #docregion filter-animations
            this.heroesTotal = (__runInitializers(this, _animatePage_extraInitializers), -1);
            this._heroes = [];
        }
        get heroes() {
            return this._heroes;
        }
        ngOnInit() {
            this._heroes = mock_heroes_1.HEROES;
        }
        updateCriteria(criteria) {
            criteria = criteria ? criteria.trim() : '';
            this._heroes = mock_heroes_1.HEROES.filter((hero) => hero.name.toLowerCase().includes(criteria.toLowerCase()));
            const newTotal = this.heroes.length;
            if (this.heroesTotal !== newTotal) {
                this.heroesTotal = newTotal;
            }
            else if (!criteria) {
                this.heroesTotal = -1;
            }
        }
    };
    __setFunctionName(_classThis, "HeroListPageComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _animatePage_decorators = [(0, core_1.HostBinding)('@pageAnimations')];
        __esDecorate(null, null, _animatePage_decorators, { kind: "field", name: "animatePage", static: false, private: false, access: { has: obj => "animatePage" in obj, get: obj => obj.animatePage, set: (obj, value) => { obj.animatePage = value; } }, metadata: _metadata }, _animatePage_initializers, _animatePage_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroListPageComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroListPageComponent = _classThis;
})();
exports.HeroListPageComponent = HeroListPageComponent;
// #enddocregion filter-animations
