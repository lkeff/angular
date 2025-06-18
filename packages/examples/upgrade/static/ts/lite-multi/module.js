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
exports.Ng2BModule = exports.Ng2BComponent = exports.Ng2AModule = exports.Ng2AService = exports.Ng1AComponentFacade = exports.Ng2AComponent = void 0;
// #docplaster
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const static_1 = require("@angular/upgrade/static");
// An Angular module that declares an Angular service and a component,
// which in turn uses an upgraded AngularJS component.
let Ng2AComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2A',
            template: 'Component A | <ng1A></ng1A>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2AComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "Ng2AComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2AComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2AComponent = _classThis;
})();
exports.Ng2AComponent = Ng2AComponent;
let Ng1AComponentFacade = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'ng1A',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = static_1.UpgradeComponent;
    var Ng1AComponentFacade = _classThis = class extends _classSuper {
        constructor(elementRef, injector) {
            super('ng1A', elementRef, injector);
        }
    };
    __setFunctionName(_classThis, "Ng1AComponentFacade");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng1AComponentFacade = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng1AComponentFacade = _classThis;
})();
exports.Ng1AComponentFacade = Ng1AComponentFacade;
let Ng2AService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2AService = _classThis = class {
        getValue() {
            return 'ng2';
        }
    };
    __setFunctionName(_classThis, "Ng2AService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2AService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2AService = _classThis;
})();
exports.Ng2AService = Ng2AService;
let Ng2AModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            providers: [Ng2AService],
            declarations: [Ng1AComponentFacade, Ng2AComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2AModule = _classThis = class {
        ngDoBootstrap() { }
    };
    __setFunctionName(_classThis, "Ng2AModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2AModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2AModule = _classThis;
})();
exports.Ng2AModule = Ng2AModule;
// Another Angular module that declares an Angular component.
let Ng2BComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2B',
            template: 'Component B',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2BComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "Ng2BComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2BComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2BComponent = _classThis;
})();
exports.Ng2BComponent = Ng2BComponent;
let Ng2BModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [Ng2BComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2BModule = _classThis = class {
        ngDoBootstrap() { }
    };
    __setFunctionName(_classThis, "Ng2BModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2BModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2BModule = _classThis;
})();
exports.Ng2BModule = Ng2BModule;
// The downgraded Angular modules.
const downgradedNg2AModule = (0, static_1.downgradeModule)((extraProviders) => ((0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)).bootstrapModule(Ng2AModule));
const downgradedNg2BModule = (0, static_1.downgradeModule)((extraProviders) => ((0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)).bootstrapModule(Ng2BModule));
// The AngularJS app including downgraded modules, components and injectables.
const appModule = angular
    .module('exampleAppModule', [downgradedNg2AModule, downgradedNg2BModule])
    .component('exampleApp', {
    template: `
        <nav>
          <button ng-click="$ctrl.page = page" ng-repeat="page in ['A', 'B']">
            Page {{ page }}
          </button>
        </nav>
        <hr />
        <main ng-switch="$ctrl.page">
          <ng2-a ng-switch-when="A"></ng2-a>
          <ng2-b ng-switch-when="B"></ng2-b>
        </main>
      `,
    controller: class ExampleAppController {
        constructor() {
            this.page = 'A';
        }
    },
})
    .component('ng1A', {
    template: 'ng1({{ $ctrl.value }})',
    controller: [
        'ng2AService',
        class Ng1AController {
            constructor(ng2AService) {
                this.ng2AService = ng2AService;
                this.value = this.ng2AService.getValue();
            }
        },
    ],
})
    .directive('ng2A', (0, static_1.downgradeComponent)({
    component: Ng2AComponent,
    // Since there is more than one downgraded Angular module,
    // specify which module this component belongs to.
    downgradedModule: downgradedNg2AModule,
    propagateDigest: false,
}))
    .directive('ng2B', (0, static_1.downgradeComponent)({
    component: Ng2BComponent,
    // Since there is more than one downgraded Angular module,
    // specify which module this component belongs to.
    downgradedModule: downgradedNg2BModule,
    propagateDigest: false,
}))
    .factory('ng2AService', (0, static_1.downgradeInjectable)(Ng2AService, downgradedNg2AModule));
// Bootstrap the AngularJS app.
angular.bootstrap(document.body, [appModule.name]);
