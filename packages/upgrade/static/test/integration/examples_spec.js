"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const static_1 = require("../../../static");
const angular = __importStar(require("../../../src/common/src/angular1"));
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const static_test_helpers_1 = require("./static_test_helpers");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('examples', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        it('should have AngularJS loaded', () => expect(angular.getAngularJSGlobal().version.major).toBe(1));
        it('should verify UpgradeAdapter example', (0, testing_1.waitForAsync)(() => {
            // This is wrapping (upgrading) an AngularJS component to be used in an Angular
            // component
            let Ng1Component = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = static_1.UpgradeComponent;
                let _title_decorators;
                let _title_initializers = [];
                let _title_extraInitializers = [];
                var Ng1Component = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1', elementRef, injector);
                        this.title = __runInitializers(this, _title_initializers, '');
                        __runInitializers(this, _title_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Ng1Component");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _title_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1Component = _classThis;
            })();
            // This is an Angular component that will be downgraded
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: 'ng2[<ng1 [title]="nameProp">transclude</ng1>](<ng-content></ng-content>)',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _nameProp_decorators;
                let _nameProp_initializers = [];
                let _nameProp_extraInitializers = [];
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.nameProp = __runInitializers(this, _nameProp_initializers, '');
                        __runInitializers(this, _nameProp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _nameProp_decorators = [(0, core_1.Input)('name')];
                    __esDecorate(null, null, _nameProp_decorators, { kind: "field", name: "nameProp", static: false, private: false, access: { has: obj => "nameProp" in obj, get: obj => obj.nameProp, set: (obj, value) => { obj.nameProp = value; } }, metadata: _metadata }, _nameProp_initializers, _nameProp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            // This module represents the Angular pieces of the application
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng1Component, Ng2Component],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() {
                        /* this is a placeholder to stop the bootstrapper from
                                              complaining */
                    }
                };
                __setFunctionName(_classThis, "Ng2Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Module = _classThis;
            })();
            // This module represents the AngularJS pieces of the application
            const ng1Module = angular
                .module_('myExample', [])
                // This is an AngularJS component that will be upgraded
                .directive('ng1', () => {
                return {
                    scope: { title: '=' },
                    transclude: true,
                    template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)',
                };
            })
                // This is wrapping (downgrading) an Angular component to be used in
                // AngularJS
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            // This is the (AngularJS) application bootstrap element
            // Notice that it is actually a downgraded Angular component
            const element = (0, common_test_helpers_1.html)('<ng2 name="World">project</ng2>');
            // Let's use a helper function to make this simpler
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2[ng1[Hello World!](transclude)](project)');
            });
        }));
    });
});
