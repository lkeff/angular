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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ng2CModule = exports.Ng2CComponent = exports.Ng2BModule = exports.Ng2BComponent = exports.Ng2AModule = exports.Ng2AComponent = exports.Ng2RootModule = exports.Ng2Service = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const static_1 = require("@angular/upgrade/static");
// An Angular service provided in root. Each instance of the service will get a new ID.
let Ng2Service = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2Service = _classThis = class {
        constructor() {
            this.id = Ng2Service.nextId++;
        }
    };
    __setFunctionName(_classThis, "Ng2Service");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2Service = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.nextId = 1;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2Service = _classThis;
})();
exports.Ng2Service = Ng2Service;
// An Angular module that will act as "root" for all downgraded modules, so that injectables
// provided in root will be available to all.
let Ng2RootModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2RootModule = _classThis = class {
        ngDoBootstrap() { }
    };
    __setFunctionName(_classThis, "Ng2RootModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2RootModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2RootModule = _classThis;
})();
exports.Ng2RootModule = Ng2RootModule;
// An Angular module that declares an Angular component,
// which in turn uses an Angular service from the root module.
let Ng2AComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2A',
            template: 'Component A (Service ID: {{ service.id }})',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2AComponent = _classThis = class {
        constructor(service) {
            this.service = service;
        }
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
let Ng2AModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [Ng2AComponent],
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
// Another Angular module that declares an Angular component, which uses the same service.
let Ng2BComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2B',
            template: 'Component B (Service ID: {{ service.id }})',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2BComponent = _classThis = class {
        constructor(service) {
            this.service = service;
        }
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
// A third Angular module that declares an Angular component, which uses the same service.
let Ng2CComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng2C',
            template: 'Component C (Service ID: {{ service.id }})',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2CComponent = _classThis = class {
        constructor(service) {
            this.service = service;
        }
    };
    __setFunctionName(_classThis, "Ng2CComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2CComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2CComponent = _classThis;
})();
exports.Ng2CComponent = Ng2CComponent;
let Ng2CModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [Ng2CComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2CModule = _classThis = class {
        ngDoBootstrap() { }
    };
    __setFunctionName(_classThis, "Ng2CModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2CModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2CModule = _classThis;
})();
exports.Ng2CModule = Ng2CModule;
// The downgraded Angular modules. Modules A and B share a common root module. Module C does not.
// #docregion shared-root-module
let rootInjectorPromise = null;
const getRootInjector = (extraProviders) => {
    if (!rootInjectorPromise) {
        rootInjectorPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)
            .bootstrapModule(Ng2RootModule)
            .then((moduleRef) => moduleRef.injector);
    }
    return rootInjectorPromise;
};
const downgradedNg2AModule = (0, static_1.downgradeModule)((extraProviders) => __awaiter(void 0, void 0, void 0, function* () {
    const rootInjector = yield getRootInjector(extraProviders);
    const moduleAFactory = yield rootInjector.get(core_1.Compiler).compileModuleAsync(Ng2AModule);
    return moduleAFactory.create(rootInjector);
}));
const downgradedNg2BModule = (0, static_1.downgradeModule)((extraProviders) => __awaiter(void 0, void 0, void 0, function* () {
    const rootInjector = yield getRootInjector(extraProviders);
    const moduleBFactory = yield rootInjector.get(core_1.Compiler).compileModuleAsync(Ng2BModule);
    return moduleBFactory.create(rootInjector);
}));
// #enddocregion shared-root-module
const downgradedNg2CModule = (0, static_1.downgradeModule)((extraProviders) => ((0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)).bootstrapModule(Ng2CModule));
// The AngularJS app including downgraded modules and components.
// #docregion shared-root-module
const appModule = angular
    .module('exampleAppModule', [downgradedNg2AModule, downgradedNg2BModule, downgradedNg2CModule])
    // #enddocregion shared-root-module
    .component('exampleApp', { template: '<ng2-a></ng2-a> | <ng2-b></ng2-b> | <ng2-c></ng2-c>' })
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
    .directive('ng2C', (0, static_1.downgradeComponent)({
    component: Ng2CComponent,
    // Since there is more than one downgraded Angular module,
    // specify which module this component belongs to.
    downgradedModule: downgradedNg2CModule,
    propagateDigest: false,
}));
// Bootstrap the AngularJS app.
angular.bootstrap(document.body, [appModule.name]);
