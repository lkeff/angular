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
    describe('content projection', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        it('should instantiate ng2 in ng1 template and project content', (0, testing_1.waitForAsync)(() => {
            // the ng2 component that will be used in ng1 (downgraded)
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: `{{ prop }}(<ng-content></ng-content>)`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.prop = 'NG2';
                        this.ngContent = 'ng2-content';
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            // our upgrade module to host the component to downgrade
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
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
            // the ng1 app module that will consume the downgraded component
            const ng1Module = angular
                .module_('ng1', [])
                // create an ng1 facade of the ng2 component
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }))
                .run(($rootScope) => {
                $rootScope['prop'] = 'NG1';
                $rootScope['ngContent'] = 'ng1-content';
            });
            const element = (0, common_test_helpers_1.html)("<div>{{ 'ng1[' }}<ng2>~{{ ngContent }}~</ng2>{{ ']' }}</div>");
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect(document.body.textContent).toEqual('ng1[NG2(~ng1-content~)]');
            });
        }));
        it('should correctly project structural directives', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: 'ng2-{{ itemId }}(<ng-content></ng-content>)',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _itemId_decorators;
                let _itemId_initializers = [];
                let _itemId_extraInitializers = [];
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.itemId = __runInitializers(this, _itemId_initializers, '');
                        __runInitializers(this, _itemId_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _itemId_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _itemId_decorators, { kind: "field", name: "itemId", static: false, private: false, access: { has: obj => "itemId" in obj, get: obj => obj.itemId, set: (obj, value) => { obj.itemId = value; } }, metadata: _metadata }, _itemId_initializers, _itemId_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                        declarations: [Ng2Component],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
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
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }))
                .run(($rootScope) => {
                $rootScope['items'] = [
                    { id: 'a', subitems: [1, 2, 3] },
                    { id: 'b', subitems: [4, 5, 6] },
                    { id: 'c', subitems: [7, 8, 9] },
                ];
            });
            const element = (0, common_test_helpers_1.html)(`
           <ng2 ng-repeat="item in items" [item-id]="item.id">
             <div ng-repeat="subitem in item.subitems">{{ subitem }}</div>
           </ng2>
         `);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2-a( 123 )ng2-b( 456 )ng2-c( 789 )');
            });
        }));
        it('should instantiate ng1 in ng2 template and project content', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: `{{ 'ng2(' }}<ng1>{{ transclude }}</ng1
          >{{ ')' }}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() {
                        this.prop = 'ng2';
                        this.transclude = 'ng2-transclude';
                    }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng1WrapperComponent = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = static_1.UpgradeComponent;
                var Ng1WrapperComponent = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1WrapperComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1WrapperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1WrapperComponent = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng1WrapperComponent, Ng2Component],
                        imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
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
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng1', () => ({
                transclude: true,
                template: '{{ prop }}(<ng-transclude></ng-transclude>)',
            }))
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }))
                .run(($rootScope) => {
                $rootScope['prop'] = 'ng1';
                $rootScope['transclude'] = 'ng1-transclude';
            });
            const element = (0, common_test_helpers_1.html)("<div>{{ 'ng1(' }}<ng2></ng2>{{ ')' }}</div>");
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect(document.body.textContent).toEqual('ng1(ng2(ng1(ng2-transclude)))');
            });
        }));
        it('should support multi-slot projection', (0, testing_1.waitForAsync)(() => {
            let Ng2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2',
                        template: '2a(<ng-content select=".ng1a"></ng-content>)' +
                            '2b(<ng-content select=".ng1b"></ng-content>)',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Component = _classThis = class {
                    constructor() { }
                };
                __setFunctionName(_classThis, "Ng2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2Component = _classThis;
            })();
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2Module = _classThis = class {
                    ngDoBootstrap() { }
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
            const ng1Module = angular
                .module_('ng1', [])
                .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component }));
            // The ng-if on one of the projected children is here to make sure
            // the correct slot is targeted even with structural directives in play.
            const element = (0, common_test_helpers_1.html)('<ng2><div ng-if="true" class="ng1a">1a</div><div' + ' class="ng1b">1b</div></ng2>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                expect(document.body.textContent).toEqual('2a(1a)2b(1b)');
            });
        }));
    });
});
