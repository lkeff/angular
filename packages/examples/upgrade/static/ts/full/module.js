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
exports.ng1AppModule = exports.Ng2AppModule = exports.Ng1HeroComponentWrapper = exports.HeroesService = exports.Ng2HeroesComponent = exports.TextFormatter = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// #docplaster
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const static_1 = require("@angular/upgrade/static");
// #docregion ng1-text-formatter-service
class TextFormatter {
    titleCase(value) {
        return value.replace(/((^|\s)[a-z])/g, (_, c) => c.toUpperCase());
    }
}
exports.TextFormatter = TextFormatter;
// #enddocregion
// #docregion ng2-heroes
// This Angular component will be "downgraded" to be used in AngularJS
let Ng2HeroesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2-heroes',
            // This template uses the upgraded `ng1-hero` component
            // Note that because its element is compiled by Angular we must use camelCased attribute names
            template: `<header><ng-content selector="h1"></ng-content></header>
    <ng-content selector=".extra"></ng-content>
    <div *ngFor="let hero of heroes">
      <ng1-hero [hero]="hero" (onRemove)="removeHero.emit(hero)"
        ><strong>Super Hero</strong></ng1-hero
      >
    </div>
    <button (click)="addHero.emit()">Add Hero</button>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _heroes_decorators;
    let _heroes_initializers = [];
    let _heroes_extraInitializers = [];
    let _addHero_decorators;
    let _addHero_initializers = [];
    let _addHero_extraInitializers = [];
    let _removeHero_decorators;
    let _removeHero_initializers = [];
    let _removeHero_extraInitializers = [];
    var Ng2HeroesComponent = _classThis = class {
        constructor() {
            this.heroes = __runInitializers(this, _heroes_initializers, void 0);
            this.addHero = (__runInitializers(this, _heroes_extraInitializers), __runInitializers(this, _addHero_initializers, new core_1.EventEmitter()));
            this.removeHero = (__runInitializers(this, _addHero_extraInitializers), __runInitializers(this, _removeHero_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _removeHero_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Ng2HeroesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _heroes_decorators = [(0, core_1.Input)()];
        _addHero_decorators = [(0, core_1.Output)()];
        _removeHero_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _heroes_decorators, { kind: "field", name: "heroes", static: false, private: false, access: { has: obj => "heroes" in obj, get: obj => obj.heroes, set: (obj, value) => { obj.heroes = value; } }, metadata: _metadata }, _heroes_initializers, _heroes_extraInitializers);
        __esDecorate(null, null, _addHero_decorators, { kind: "field", name: "addHero", static: false, private: false, access: { has: obj => "addHero" in obj, get: obj => obj.addHero, set: (obj, value) => { obj.addHero = value; } }, metadata: _metadata }, _addHero_initializers, _addHero_extraInitializers);
        __esDecorate(null, null, _removeHero_decorators, { kind: "field", name: "removeHero", static: false, private: false, access: { has: obj => "removeHero" in obj, get: obj => obj.removeHero, set: (obj, value) => { obj.removeHero = value; } }, metadata: _metadata }, _removeHero_initializers, _removeHero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2HeroesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2HeroesComponent = _classThis;
})();
exports.Ng2HeroesComponent = Ng2HeroesComponent;
// #enddocregion
// #docregion ng2-heroes-service
// This Angular service will be "downgraded" to be used in AngularJS
let HeroesService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroesService = _classThis = class {
        // #docregion use-ng1-upgraded-service
        constructor(textFormatter) {
            this.heroes = [
                { name: 'superman', description: 'The man of steel' },
                { name: 'wonder woman', description: 'Princess of the Amazons' },
                { name: 'thor', description: 'The hammer-wielding god' },
            ];
            // Change all the hero names to title case, using the "upgraded" AngularJS service
            this.heroes.forEach((hero) => (hero.name = textFormatter.titleCase(hero.name)));
        }
        // #enddocregion
        addHero() {
            this.heroes = this.heroes.concat([
                { name: 'Kamala Khan', description: 'Epic shape-shifting healer' },
            ]);
        }
        removeHero(hero) {
            this.heroes = this.heroes.filter((item) => item !== hero);
        }
    };
    __setFunctionName(_classThis, "HeroesService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroesService = _classThis;
})();
exports.HeroesService = HeroesService;
// #enddocregion
// #docregion ng1-hero-wrapper
// This Angular directive will act as an interface to the "upgraded" AngularJS component
let Ng1HeroComponentWrapper = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'ng1-hero',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = static_1.UpgradeComponent;
    let _hero_decorators;
    let _hero_initializers = [];
    let _hero_extraInitializers = [];
    let _onRemove_decorators;
    let _onRemove_initializers = [];
    let _onRemove_extraInitializers = [];
    var Ng1HeroComponentWrapper = _classThis = class extends _classSuper {
        constructor(elementRef, injector) {
            // We must pass the name of the directive as used by AngularJS to the super
            super('ng1Hero', elementRef, injector);
            // The names of the input and output properties here must match the names of the
            // `<` and `&` bindings in the AngularJS component that is being wrapped
            this.hero = __runInitializers(this, _hero_initializers, void 0);
            this.onRemove = (__runInitializers(this, _hero_extraInitializers), __runInitializers(this, _onRemove_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _onRemove_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Ng1HeroComponentWrapper");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _hero_decorators = [(0, core_1.Input)()];
        _onRemove_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _hero_decorators, { kind: "field", name: "hero", static: false, private: false, access: { has: obj => "hero" in obj, get: obj => obj.hero, set: (obj, value) => { obj.hero = value; } }, metadata: _metadata }, _hero_initializers, _hero_extraInitializers);
        __esDecorate(null, null, _onRemove_decorators, { kind: "field", name: "onRemove", static: false, private: false, access: { has: obj => "onRemove" in obj, get: obj => obj.onRemove, set: (obj, value) => { obj.onRemove = value; } }, metadata: _metadata }, _onRemove_initializers, _onRemove_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng1HeroComponentWrapper = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng1HeroComponentWrapper = _classThis;
})();
exports.Ng1HeroComponentWrapper = Ng1HeroComponentWrapper;
// #enddocregion
// #docregion ng2-module
// This NgModule represents the Angular pieces of the application
let Ng2AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [Ng2HeroesComponent, Ng1HeroComponentWrapper],
            providers: [
                HeroesService,
                // #docregion upgrade-ng1-service
                // Register an Angular provider whose value is the "upgraded" AngularJS service
                { provide: TextFormatter, useFactory: (i) => i.get('textFormatter'), deps: ['$injector'] },
                // #enddocregion
            ],
            // We must import `UpgradeModule` to get access to the AngularJS core services
            imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2AppModule = _classThis = class {
        // #enddocregion ng2-module
        constructor(upgrade) {
            this.upgrade = upgrade;
        }
        ngDoBootstrap() {
            // We bootstrap the AngularJS app.
            this.upgrade.bootstrap(document.body, [exports.ng1AppModule.name]);
        }
    };
    __setFunctionName(_classThis, "Ng2AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2AppModule = _classThis;
})();
exports.Ng2AppModule = Ng2AppModule;
// #enddocregion bootstrap-ng1
// #enddocregion ng2-module
// This Angular 1 module represents the AngularJS pieces of the application
exports.ng1AppModule = angular.module('ng1AppModule', []);
// #docregion ng1-hero
// This AngularJS component will be "upgraded" to be used in Angular
exports.ng1AppModule.component('ng1Hero', {
    bindings: { hero: '<', onRemove: '&' },
    transclude: true,
    template: `<div class="title" ng-transclude></div>
             <h2>{{ $ctrl.hero.name }}</h2>
             <p>{{ $ctrl.hero.description }}</p>
             <button ng-click="$ctrl.onRemove()">Remove</button>`,
});
// #enddocregion
// #docregion ng1-text-formatter-service
// This AngularJS service will be "upgraded" to be used in Angular
exports.ng1AppModule.service('textFormatter', [TextFormatter]);
// #enddocregion
// #docregion downgrade-ng2-heroes-service
// Register an AngularJS service, whose value is the "downgraded" Angular injectable.
exports.ng1AppModule.factory('heroesService', (0, static_1.downgradeInjectable)(HeroesService));
// #enddocregion
// #docregion ng2-heroes-wrapper
// This directive will act as the interface to the "downgraded" Angular component
exports.ng1AppModule.directive('ng2Heroes', (0, static_1.downgradeComponent)({ component: Ng2HeroesComponent }));
// #enddocregion
// #docregion example-app
// This is our top level application component
exports.ng1AppModule.component('exampleApp', {
    // We inject the "downgraded" HeroesService into this AngularJS component
    // (We don't need the `HeroesService` type for AngularJS DI - it just helps with TypeScript
    // compilation)
    controller: [
        'heroesService',
        function (heroesService) {
            this.heroesService = heroesService;
        },
    ],
    // This template makes use of the downgraded `ng2-heroes` component
    // Note that because its element is compiled by AngularJS we must use kebab-case attributes
    // for inputs and outputs
    template: `<link rel="stylesheet" href="./styles.css">
          <ng2-heroes [heroes]="$ctrl.heroesService.heroes" (add-hero)="$ctrl.heroesService.addHero()" (remove-hero)="$ctrl.heroesService.removeHero($event)">
            <h1>Heroes</h1>
            <p class="extra">There are {{ $ctrl.heroesService.heroes.length }} heroes.</p>
          </ng2-heroes>`,
});
// #enddocregion
// #docregion bootstrap-ng2
// We bootstrap the Angular module as we would do in a normal Angular app.
// (We are using the dynamic browser platform as this example has not been compiled AOT.)
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2AppModule);
// #enddocregion
