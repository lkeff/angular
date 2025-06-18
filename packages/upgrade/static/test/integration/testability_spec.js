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
    describe('testability', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        let Ng2Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule, static_1.UpgradeModule] })];
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
        it('should handle deferred bootstrap', (0, testing_1.fakeAsync)(() => {
            let applicationRunning = false;
            let stayedInTheZone = undefined;
            const ng1Module = angular.module_('ng1', []).run(() => {
                applicationRunning = true;
                stayedInTheZone = core_1.NgZone.isInAngularZone();
            });
            const element = (0, common_test_helpers_1.html)('<div></div>');
            window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module);
            setTimeout(() => {
                window.angular.resumeBootstrap();
            }, 100);
            expect(applicationRunning).toEqual(false);
            (0, testing_1.tick)(100);
            expect(applicationRunning).toEqual(true);
            expect(stayedInTheZone).toEqual(true);
        }));
        it('should propagate return value of resumeBootstrap', (0, testing_1.fakeAsync)(() => {
            const ng1Module = angular.module_('ng1', []);
            let a1Injector;
            ng1Module.run([
                '$injector',
                function ($injector) {
                    a1Injector = $injector;
                },
            ]);
            const element = (0, common_test_helpers_1.html)('<div></div>');
            window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module);
            (0, testing_1.tick)(100);
            const value = window.angular.resumeBootstrap();
            expect(value).toBe(a1Injector);
            (0, testing_1.flush)();
        }));
        it('should wait for ng2 testability', (0, testing_1.fakeAsync)(() => {
            const ng1Module = angular.module_('ng1', []);
            const element = (0, common_test_helpers_1.html)('<div></div>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const zone = upgrade.injector.get(core_1.NgZone);
                let ng2Stable = false;
                let ng1Stable = false;
                zone.run(() => {
                    setTimeout(() => {
                        ng2Stable = true;
                    }, 100);
                });
                angular.getTestability(element).whenStable(() => {
                    ng1Stable = true;
                });
                expect(ng1Stable).toEqual(false);
                expect(ng2Stable).toEqual(false);
                (0, testing_1.tick)(100);
                expect(ng1Stable).toEqual(true);
                expect(ng2Stable).toEqual(true);
            });
        }));
        it('should not wait for $interval', (0, testing_1.fakeAsync)(() => {
            const ng1Module = angular.module_('ng1', []);
            const element = (0, common_test_helpers_1.html)('<div></div>');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                const ng2Testability = upgrade.injector.get(core_1.Testability);
                const $interval = upgrade.$injector.get('$interval');
                let ng2Stable = false;
                let intervalDone = false;
                const id = $interval((arg) => {
                    // should only be called once
                    expect(intervalDone).toEqual(false);
                    intervalDone = true;
                    expect(core_1.NgZone.isInAngularZone()).toEqual(true);
                    expect(arg).toEqual('passed argument');
                }, 200, 0, true, 'passed argument');
                ng2Testability.whenStable(() => {
                    ng2Stable = true;
                });
                (0, testing_1.tick)(100);
                expect(intervalDone).toEqual(false);
                expect(ng2Stable).toEqual(true);
                (0, testing_1.tick)(200);
                expect(intervalDone).toEqual(true);
                expect($interval.cancel(id)).toEqual(true);
                // Interval should not fire after cancel
                (0, testing_1.tick)(200);
            });
        }));
    });
});
