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
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const testing_1 = require("@angular/private/testing");
const index_1 = require("../index");
describe('view transitions', () => {
    if (isNode) {
        it('are not available in node environment', () => { });
        return;
    }
    beforeEach(core_1.destroyPlatform);
    afterEach(core_1.destroyPlatform);
    let App = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'test-app',
                template: ``,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var App = _classThis = class {
        };
        __setFunctionName(_classThis, "App");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            App = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return App = _classThis;
    })();
    beforeEach((0, testing_1.withBody)('<test-app></test-app>', () => { }));
    it('should skip initial transition', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = yield (0, platform_browser_1.bootstrapApplication)(App, {
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                (0, index_1.provideRouter)([{ path: '**', component: App }], (0, index_1.withDisabledInitialNavigation)(), (0, index_1.withViewTransitions)({ skipInitialTransition: true })),
            ],
        });
        const doc = appRef.injector.get(common_1.DOCUMENT);
        if (!doc.startViewTransition) {
            return;
        }
        const viewTransitionSpy = spyOn(doc, 'startViewTransition').and.callThrough();
        yield appRef.injector.get(index_1.Router).navigateByUrl('/a');
        expect(viewTransitionSpy).not.toHaveBeenCalled();
        yield appRef.injector.get(index_1.Router).navigateByUrl('/b');
        expect(viewTransitionSpy).toHaveBeenCalled();
    }));
    it('should have the correct event order when using view transitions', () => __awaiter(void 0, void 0, void 0, function* () {
        let ComponentB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'component-b',
                    template: `b`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentB = _classThis = class {
            };
            __setFunctionName(_classThis, "ComponentB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentB = _classThis;
        })();
        const res = yield (0, platform_browser_1.bootstrapApplication)(App, {
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                (0, index_1.provideRouter)([{ path: 'b', component: ComponentB }], (0, index_1.withViewTransitions)()),
            ],
        });
        const router = res.injector.get(index_1.Router);
        const eventLog = [];
        router.events.subscribe((e) => {
            eventLog.push(e);
        });
        yield router.navigateByUrl('/b');
        expect(eventLog[eventLog.length - 1]).toBeInstanceOf(index_1.NavigationEnd);
    }));
    describe('onViewTransitionCreated option', () => {
        it('should not create a view transition if only the fragment changes', () => __awaiter(void 0, void 0, void 0, function* () {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-app',
                        template: `{{checks}}`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.checks = 0;
                    }
                    ngDoCheck() {
                        this.checks++;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const transitionSpy = jasmine.createSpy();
            const appRef = yield (0, platform_browser_1.bootstrapApplication)(App, {
                providers: [
                    (0, core_1.provideZonelessChangeDetection)(),
                    (0, index_1.provideRouter)([{ path: '**', component: App }], (0, index_1.withDisabledInitialNavigation)(), (0, index_1.withViewTransitions)({ onViewTransitionCreated: transitionSpy })),
                ],
            });
            const doc = appRef.injector.get(common_1.DOCUMENT);
            if (!doc.startViewTransition) {
                return;
            }
            yield appRef.injector.get(index_1.Router).navigateByUrl('/a');
            expect(transitionSpy).toHaveBeenCalled();
        }));
    });
});
