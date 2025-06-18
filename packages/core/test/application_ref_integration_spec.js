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
const common_1 = require("@angular/common");
const core_1 = require("../src/core");
const testing_1 = require("../testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/private/testing");
const ng_module_ref_1 = require("../src/render3/ng_module_ref");
describe('ApplicationRef bootstrap', () => {
    let HelloWorldComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'hello-world',
                template: '<div>Hello {{ name }}</div>',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var HelloWorldComponent = _classThis = class {
            constructor() {
                this.log = [];
                this.name = 'World';
            }
            ngOnInit() {
                this.log.push('OnInit');
            }
            ngDoCheck() {
                this.log.push('DoCheck');
            }
        };
        __setFunctionName(_classThis, "HelloWorldComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HelloWorldComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return HelloWorldComponent = _classThis;
    })();
    let MyAppModule = (() => {
        let _classDecorators = [(0, core_1.NgModule)({
                declarations: [HelloWorldComponent],
                bootstrap: [HelloWorldComponent],
                imports: [platform_browser_1.BrowserModule],
                providers: [{ provide: common_1.DOCUMENT, useFactory: () => document }],
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyAppModule = _classThis = class {
        };
        __setFunctionName(_classThis, "MyAppModule");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyAppModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyAppModule = _classThis;
    })();
    it('should bootstrap hello world', (0, testing_2.withBody)('<hello-world></hello-world>', () => __awaiter(void 0, void 0, void 0, function* () {
        const MyAppModuleFactory = new ng_module_ref_1.NgModuleFactory(MyAppModule);
        const moduleRef = yield (0, testing_1.getTestBed)().platform.bootstrapModuleFactory(MyAppModuleFactory, {
            ngZone: 'noop',
        });
        const appRef = moduleRef.injector.get(core_1.ApplicationRef);
        const helloWorldComponent = appRef.components[0].instance;
        expect(document.body.innerHTML).toEqual('<hello-world ng-version="0.0.0-PLACEHOLDER"><div>Hello World</div></hello-world>');
        expect(helloWorldComponent.log).toEqual(['OnInit', 'DoCheck']);
        helloWorldComponent.name = 'Mundo';
        appRef.tick();
        expect(document.body.innerHTML).toEqual('<hello-world ng-version="0.0.0-PLACEHOLDER"><div>Hello Mundo</div></hello-world>');
        expect(helloWorldComponent.log).toEqual(['OnInit', 'DoCheck', 'DoCheck']);
        // Cleanup TestabilityRegistry
        const registry = (0, testing_1.getTestBed)().inject(core_1.TestabilityRegistry);
        registry.unregisterAllApplications();
    })));
    it('should expose the `window.ng` global utilities', (0, testing_2.withBody)('<hello-world></hello-world>', () => __awaiter(void 0, void 0, void 0, function* () {
        const MyAppModuleFactory = new ng_module_ref_1.NgModuleFactory(MyAppModule);
        const moduleRef = yield (0, testing_1.getTestBed)().platform.bootstrapModuleFactory(MyAppModuleFactory, {
            ngZone: 'noop',
        });
        const glob = typeof global !== 'undefined' ? global : window;
        const ngUtils = glob.ng;
        expect(ngUtils.getComponent).toBeTruthy();
    })));
});
