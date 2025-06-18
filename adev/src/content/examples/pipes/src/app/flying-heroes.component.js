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
exports.FlyingHeroesImpureComponent = exports.FlyingHeroesComponent = void 0;
// #docplaster
// #docregion
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const flying_heroes_pipe_1 = require("./flying-heroes.pipe");
const heroes_1 = require("./heroes");
let FlyingHeroesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-flying-heroes',
            templateUrl: './flying-heroes.component.html',
            imports: [common_1.CommonModule, forms_1.FormsModule, flying_heroes_pipe_1.FlyingHeroesPipe],
            styles: [
                `
    #flyers, #all {font-style: italic}
    button {display: block}
    input {margin: .25rem .25rem .5rem 0;}
  `,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FlyingHeroesComponent = _classThis = class {
        // #docregion v1
        constructor() {
            this.heroes = [];
            this.canFly = true;
            // #enddocregion v1
            this.mutate = true;
            this.title = 'Flying Heroes (pure pipe)';
            this.reset();
        }
        addHero(name) {
            name = name.trim();
            if (!name) {
                return;
            }
            const hero = { name, canFly: this.canFly };
            // #enddocregion v1
            if (this.mutate) {
                // Pure pipe won't update display because heroes array reference is unchanged
                // Impure pipe will display
                // #docregion v1
                // #docregion push
                this.heroes.push(hero);
                // #enddocregion push
                // #enddocregion v1
            }
            else {
                // Pipe updates display because heroes array is a new object
                this.heroes = this.heroes.concat(hero);
            }
            // #docregion v1
        }
        reset() {
            this.heroes = heroes_1.HEROES.slice();
        }
    };
    __setFunctionName(_classThis, "FlyingHeroesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FlyingHeroesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FlyingHeroesComponent = _classThis;
})();
exports.FlyingHeroesComponent = FlyingHeroesComponent;
// #enddocregion v1
////// Identical except for impure pipe //////
let FlyingHeroesImpureComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-flying-heroes-impure',
            templateUrl: './flying-heroes-impure.component.html',
            imports: [common_1.CommonModule, forms_1.FormsModule, flying_heroes_pipe_1.FlyingHeroesImpurePipe],
            styles: [
                '#flyers, #all {font-style: italic}',
                'button {display: block}',
                'input {margin: .25rem .25rem .5rem 0;}',
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = FlyingHeroesComponent;
    var FlyingHeroesImpureComponent = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.title = 'Flying Heroes (impure pipe)';
        }
    };
    __setFunctionName(_classThis, "FlyingHeroesImpureComponent");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FlyingHeroesImpureComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FlyingHeroesImpureComponent = _classThis;
})();
exports.FlyingHeroesImpureComponent = FlyingHeroesImpureComponent;
