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
// #docplaster
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
// #docregion basic-how-to
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// #enddocregion
// #docregion basic-how-to
const static_1 = require("@angular/upgrade/static");
// This Angular service will use an "upgraded" AngularJS service.
let HeroesService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroesService = _classThis = class {
        constructor(titleCase) {
            this.heroes = [
                { name: 'superman', description: 'The man of steel' },
                { name: 'wonder woman', description: 'Princess of the Amazons' },
                { name: 'thor', description: 'The hammer-wielding god' },
            ];
            // Change all the hero names to title case, using the "upgraded" AngularJS service.
            this.heroes.forEach((hero) => (hero.name = titleCase(hero.name)));
        }
        addHero() {
            const newHero = { name: 'Kamala Khan', description: 'Epic shape-shifting healer' };
            this.heroes = this.heroes.concat([newHero]);
            return newHero;
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
// This Angular component will be "downgraded" to be used in AngularJS.
let Ng2HeroesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2-heroes',
            // This template uses the "upgraded" `ng1-hero` component
            // (Note that because its element is compiled by Angular we must use camelCased attribute names.)
            template: `
    <div class="ng2-heroes">
      <header><ng-content selector="h1"></ng-content></header>
      <ng-content selector=".extra"></ng-content>
      <div *ngFor="let hero of this.heroesService.heroes">
        <ng1-hero [hero]="hero" (onRemove)="onRemoveHero(hero)">
          <strong>Super Hero</strong>
        </ng1-hero>
      </div>
      <button (click)="onAddHero()">Add Hero</button>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _addHero_decorators;
    let _addHero_initializers = [];
    let _addHero_extraInitializers = [];
    let _removeHero_decorators;
    let _removeHero_initializers = [];
    let _removeHero_extraInitializers = [];
    var Ng2HeroesComponent = _classThis = class {
        constructor($rootScope, heroesService) {
            this.$rootScope = $rootScope;
            this.heroesService = heroesService;
            this.addHero = __runInitializers(this, _addHero_initializers, new core_1.EventEmitter());
            this.removeHero = (__runInitializers(this, _addHero_extraInitializers), __runInitializers(this, _removeHero_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _removeHero_extraInitializers);
            this.$rootScope = $rootScope;
            this.heroesService = heroesService;
        }
        onAddHero() {
            const newHero = this.heroesService.addHero();
            this.addHero.emit(newHero);
            // When a new instance of an "upgraded" component - such as `ng1Hero` - is created, we want to
            // run a `$digest` to initialize its bindings. Here, the component will be created by `ngFor`
            // asynchronously, thus we have to schedule the `$digest` to also happen asynchronously.
            this.$rootScope.$applyAsync();
        }
        onRemoveHero(hero) {
            this.heroesService.removeHero(hero);
            this.removeHero.emit(hero);
        }
    };
    __setFunctionName(_classThis, "Ng2HeroesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _addHero_decorators = [(0, core_1.Output)()];
        _removeHero_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _addHero_decorators, { kind: "field", name: "addHero", static: false, private: false, access: { has: obj => "addHero" in obj, get: obj => obj.addHero, set: (obj, value) => { obj.addHero = value; } }, metadata: _metadata }, _addHero_initializers, _addHero_extraInitializers);
        __esDecorate(null, null, _removeHero_decorators, { kind: "field", name: "removeHero", static: false, private: false, access: { has: obj => "removeHero" in obj, get: obj => obj.removeHero, set: (obj, value) => { obj.removeHero = value; } }, metadata: _metadata }, _removeHero_initializers, _removeHero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2HeroesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2HeroesComponent = _classThis;
})();
// This Angular directive will act as an interface to the "upgraded" AngularJS component.
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
            // We must pass the name of the directive as used by AngularJS to the super.
            super('ng1Hero', elementRef, injector);
            // The names of the input and output properties here must match the names of the
            // `<` and `&` bindings in the AngularJS component that is being wrapped.
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
// This Angular module represents the Angular pieces of the application.
let MyLazyAngularModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [Ng2HeroesComponent, Ng1HeroComponentWrapper],
            providers: [
                HeroesService,
                // Register an Angular provider whose value is the "upgraded" AngularJS service.
                { provide: 'titleCase', useFactory: (i) => i.get('titleCase'), deps: ['$injector'] },
            ],
            // Note that there are no `bootstrap` components, since the "downgraded" component
            // will be instantiated by ngUpgrade.
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyLazyAngularModule = _classThis = class {
        // Empty placeholder method to prevent the `Compiler` from complaining.
        ngDoBootstrap() { }
    };
    __setFunctionName(_classThis, "MyLazyAngularModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyLazyAngularModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyLazyAngularModule = _classThis;
})();
// #docregion basic-how-to
// The function that will bootstrap the Angular module (when/if necessary).
// (This would be omitted if we provided an `NgModuleFactory` directly.)
const ng2BootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(MyLazyAngularModule);
// #enddocregion
// (We are using the dynamic browser platform, as this example has not been compiled AOT.)
// #docregion basic-how-to
// This AngularJS module represents the AngularJS pieces of the application.
const myMainAngularJsModule = angular.module('myMainAngularJsModule', [
    // We declare a dependency on the "downgraded" Angular module.
    (0, static_1.downgradeModule)(ng2BootstrapFn),
    // or
    // downgradeModule(MyLazyAngularModuleFactory)
]);
// #enddocregion
// This AngularJS component will be "upgraded" to be used in Angular.
myMainAngularJsModule.component('ng1Hero', {
    bindings: { hero: '<', onRemove: '&' },
    transclude: true,
    template: `
    <div class="ng1-hero">
      <div class="title" ng-transclude></div>
      <h2>{{ $ctrl.hero.name }}</h2>
      <p>{{ $ctrl.hero.description }}</p>
      <button ng-click="$ctrl.onRemove()">Remove</button>
    </div>
  `,
});
// This AngularJS service will be "upgraded" to be used in Angular.
myMainAngularJsModule.factory('titleCase', () => (value) => value.replace(/(^|\s)[a-z]/g, (m) => m.toUpperCase()));
// This directive will act as the interface to the "downgraded" Angular component.
myMainAngularJsModule.directive('ng2Heroes', (0, static_1.downgradeComponent)({
    component: Ng2HeroesComponent,
    // Optionally, disable `$digest` propagation to avoid unnecessary change detection.
    // (Change detection is still run when the inputs of a "downgraded" component change.)
    propagateDigest: false,
}));
// This is our top level application component.
myMainAngularJsModule.component('exampleApp', {
    // This template makes use of the "downgraded" `ng2-heroes` component,
    // but loads it lazily only when/if the user clicks the button.
    // (Note that because its element is compiled by AngularJS,
    //  we must use kebab-case attributes for inputs and outputs.)
    template: `
    <link rel="stylesheet" href="./styles.css">
    <button ng-click="$ctrl.toggleHeroes()">{{ $ctrl.toggleBtnText() }}</button>
    <ng2-heroes
        ng-if="$ctrl.showHeroes"
        (add-hero)="$ctrl.setStatusMessage('Added hero ' + $event.name)"
        (remove-hero)="$ctrl.setStatusMessage('Removed hero ' + $event.name)">
      <h1>Heroes</h1>
      <p class="extra">Status: {{ $ctrl.statusMessage }}</p>
    </ng2-heroes>
  `,
    controller: function () {
        this.showHeroes = false;
        this.statusMessage = 'Ready';
        this.setStatusMessage = (msg) => (this.statusMessage = msg);
        this.toggleHeroes = () => (this.showHeroes = !this.showHeroes);
        this.toggleBtnText = () => `${this.showHeroes ? 'Hide' : 'Show'} heroes`;
    },
});
// We bootstrap the Angular module as we would do in a normal Angular app.
angular.bootstrap(document.body, [myMainAngularJsModule.name]);
