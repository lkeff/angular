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
exports.AppModuleThree = exports.AppModuleTwo = exports.AppModule = exports.ComponentFour = exports.ComponentThree = exports.ComponentTwo = exports.ComponentOne = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let ComponentOne = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: ` <h1>Component One</h1> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentOne = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentOne");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentOne = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentOne = _classThis;
})();
exports.ComponentOne = ComponentOne;
let ComponentTwo = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: ` <h1>Component Two</h1> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentTwo = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentTwo");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentTwo = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentTwo = _classThis;
})();
exports.ComponentTwo = ComponentTwo;
let ComponentThree = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: ` <h1>Component Three</h1> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentThree = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentThree");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentThree = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentThree = _classThis;
})();
exports.ComponentThree = ComponentThree;
let ComponentFour = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: ` <h1>Component Four</h1> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentFour = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentFour");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentFour = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentFour = _classThis;
})();
exports.ComponentFour = ComponentFour;
let AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: [ComponentOne, ComponentTwo] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
        // #docregion componentSelector
        ngDoBootstrap(appRef) {
            this.fetchDataFromApi().then((componentName) => {
                if (componentName === 'ComponentOne') {
                    appRef.bootstrap(ComponentOne);
                }
                else {
                    appRef.bootstrap(ComponentTwo);
                }
            });
        }
        // #enddocregion
        fetchDataFromApi() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('ComponentTwo');
                }, 2000);
            });
        }
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
let AppModuleTwo = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: [ComponentThree] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModuleTwo = _classThis = class {
        // #docregion cssSelector
        ngDoBootstrap(appRef) {
            appRef.bootstrap(ComponentThree, '#root-element');
        }
    };
    __setFunctionName(_classThis, "AppModuleTwo");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModuleTwo = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModuleTwo = _classThis;
})();
exports.AppModuleTwo = AppModuleTwo;
let AppModuleThree = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: [ComponentFour] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModuleThree = _classThis = class {
        // #docregion domNode
        ngDoBootstrap(appRef) {
            const element = document.querySelector('#root-element');
            appRef.bootstrap(ComponentFour, element);
        }
    };
    __setFunctionName(_classThis, "AppModuleThree");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModuleThree = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModuleThree = _classThis;
})();
exports.AppModuleThree = AppModuleThree;
