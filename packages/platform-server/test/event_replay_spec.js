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
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const platform_browser_1 = require("@angular/platform-browser");
const event_dispatch_1 = require("@angular/core/primitives/event-dispatch");
const dom_utils_1 = require("./dom_utils");
const document_1 = require("@angular/core/src/render3/interfaces/document");
const hydration_utils_1 = require("./hydration_utils");
const utils_1 = require("../src/utils");
/** Checks whether event dispatch script is present in the generated HTML */
function hasEventDispatchScript(content) {
    return content.includes(utils_1.EVENT_DISPATCH_SCRIPT_ID);
}
/** Checks whether there are any `jsaction` attributes present in the generated HTML */
function hasJSActionAttrs(content) {
    return content.includes('jsaction="');
}
/**
 * Enables strict error handler that fails a test
 * if there was an error reported to the ErrorHandler.
 */
function withStrictErrorHandler() {
    class StrictErrorHandler extends core_1.ErrorHandler {
        handleError(error) {
            fail(error);
        }
    }
    return [
        {
            provide: core_1.ErrorHandler,
            useClass: StrictErrorHandler,
        },
    ];
}
describe('event replay', () => {
    const originalDocument = globalThis.document;
    const originalWindow = globalThis.window;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        globalThis.window = globalThis;
        yield Promise.resolve(`${'@angular/core/primitives/event-dispatch/contract_bundle_min.js'}`).then(s => __importStar(require(s)));
    }));
    beforeEach(() => {
        (0, core_1.destroyPlatform)();
    });
    afterAll(() => {
        globalThis.window = originalWindow;
        globalThis.document = originalDocument;
    });
    afterEach(() => {
        (0, core_1.destroyPlatform)();
        window._ejsas = {};
    });
    it('should work for elements with local refs', () => __awaiter(void 0, void 0, void 0, function* () {
        const onClickSpy = jasmine.createSpy();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    standalone: true,
                    template: `
        <button id="btn" (click)="onClick()" #localRef></button>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    this.onClick = onClickSpy;
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
        const html = yield (0, hydration_utils_1.ssr)(AppComponent, { hydrationFeatures });
        const ssrContents = (0, dom_utils_1.getAppContents)(html);
        const doc = (0, document_1.getDocument)();
        (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
        (0, dom_utils_1.resetTViewsFor)(AppComponent);
        const btn = doc.getElementById('btn');
        btn.click();
        const appRef = yield (0, dom_utils_1.hydrate)(doc, AppComponent, { hydrationFeatures });
        appRef.tick();
        expect(onClickSpy).toHaveBeenCalled();
    }));
    it('stash event listeners should not conflict when multiple apps are bootstrapped', () => __awaiter(void 0, void 0, void 0, function* () {
        const onClickSpy = jasmine.createSpy();
        let AppComponent_1 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    standalone: true,
                    template: `
        <button id="btn-1" (click)="onClick()"></button>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent_1 = _classThis = class {
                constructor() {
                    this.onClick = onClickSpy;
                }
            };
            __setFunctionName(_classThis, "AppComponent_1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent_1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent_1 = _classThis;
        })();
        let AppComponent_2 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-2',
                    standalone: true,
                    template: `
        <button id="btn-2" (click)="onClick()"></button>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent_2 = _classThis = class {
                onClick() { }
            };
            __setFunctionName(_classThis, "AppComponent_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent_2 = _classThis;
        })();
        const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
        const docHtml = `
      <html>
      <head></head>
      <body>
        ${hydration_utils_1.EVENT_DISPATCH_SCRIPT}
        <app></app>
        <app-2></app-2>
      </body>
      </html>
    `;
        const html = yield (0, hydration_utils_1.ssr)(AppComponent_1, { hydrationFeatures, doc: docHtml });
        const ssrContents = (0, dom_utils_1.getAppContents)(html);
        const doc = (0, document_1.getDocument)();
        (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
        (0, dom_utils_1.resetTViewsFor)(AppComponent_1);
        const btn = doc.getElementById('btn-1');
        btn.click();
        // It's hard to server-side render multiple applications in this
        // particular unit test and hydrate them on the client, so instead,
        // let's render the application with `provideClientHydration` to enable
        // event replay features and ensure the stash event listener is set.
        yield (0, platform_browser_1.bootstrapApplication)(AppComponent_2, {
            providers: [
                (0, platform_browser_1.provideClientHydration)((0, platform_browser_1.withEventReplay)()),
                { provide: core_1.APP_ID, useValue: 'random_name' },
            ],
        });
        // Now let's hydrate the second application and ensure that the
        // button click event has been replayed.
        const appRef = yield (0, dom_utils_1.hydrate)(doc, AppComponent_1, { hydrationFeatures });
        appRef.tick();
        expect(onClickSpy).toHaveBeenCalled();
    }));
    it('should cleanup `window._ejsas[appId]` once app is destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    standalone: true,
                    template: `
        <button id="btn" (click)="onClick()"></button>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                onClick() { }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
        const html = yield (0, hydration_utils_1.ssr)(AppComponent, { hydrationFeatures });
        const ssrContents = (0, dom_utils_1.getAppContents)(html);
        const doc = (0, document_1.getDocument)();
        (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
        (0, dom_utils_1.resetTViewsFor)(AppComponent);
        const btn = doc.getElementById('btn');
        btn.click();
        const appRef = yield (0, dom_utils_1.hydrate)(doc, AppComponent, { hydrationFeatures });
        appRef.tick();
        const appId = appRef.injector.get(core_1.APP_ID);
        appRef.destroy();
        // This ensure that `_ejsas` for the current application is cleaned up
        // once the application is destroyed.
        expect(window._ejsas[appId]).toBeUndefined();
    }));
    it('should route to the appropriate component with content projection', () => __awaiter(void 0, void 0, void 0, function* () {
        const outerOnClickSpy = jasmine.createSpy();
        const innerOnClickSpy = jasmine.createSpy();
        let CardComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-card',
                    standalone: true,
                    template: `
        <div class="card">
          <button id="inner-button" (click)="onClick()"></button>
          <ng-content></ng-content>
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CardComponent = _classThis = class {
                constructor() {
                    this.onClick = innerOnClickSpy;
                }
            };
            __setFunctionName(_classThis, "CardComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CardComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CardComponent = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    imports: [CardComponent],
                    standalone: true,
                    template: `
        <app-card>
          <h2>Card Title</h2>
          <p>This is some card content.</p>
          <button id="outer-button" (click)="onClick()">Click Me</button>
        </app-card>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    this.onClick = outerOnClickSpy;
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
        const html = yield (0, hydration_utils_1.ssr)(AppComponent, { hydrationFeatures });
        const ssrContents = (0, dom_utils_1.getAppContents)(html);
        const doc = (0, document_1.getDocument)();
        (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
        (0, dom_utils_1.resetTViewsFor)(AppComponent);
        const outer = doc.getElementById('outer-button');
        const inner = doc.getElementById('inner-button');
        outer.click();
        inner.click();
        yield (0, dom_utils_1.hydrate)(doc, AppComponent, {
            envProviders: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }],
            hydrationFeatures,
        });
        expect(outerOnClickSpy).toHaveBeenCalledBefore(innerOnClickSpy);
    }));
    describe('host bindings', () => {
        it('should not error when when binding to document:click on a container', () => __awaiter(void 0, void 0, void 0, function* () {
            const clickSpy = jasmine.createSpy();
            let AddGlobalListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[add-listener]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _handleClick_decorators;
                let _handleClick_initializers = [];
                let _handleClick_extraInitializers = [];
                var AddGlobalListener = _classThis = class {
                    constructor() {
                        this.handleClick = __runInitializers(this, _handleClick_initializers, clickSpy);
                        __runInitializers(this, _handleClick_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AddGlobalListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('document:click')];
                    __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AddGlobalListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AddGlobalListener = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <ng-container add-listener>
            <button id="click-me">Click me!</button>
          </ng-container>`,
                        imports: [AddGlobalListener],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(AppComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            const doc = (0, document_1.getDocument)();
            (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
            (0, dom_utils_1.resetTViewsFor)(AppComponent);
            const clickMe = doc.getElementById('click-me');
            clickMe.click();
            yield (0, dom_utils_1.hydrate)(doc, AppComponent, {
                envProviders: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }, ...providers],
                hydrationFeatures,
            });
            expect(clickSpy).not.toHaveBeenCalled();
        }));
        it('should not error when when binding to window:click on a container', () => __awaiter(void 0, void 0, void 0, function* () {
            const clickSpy = jasmine.createSpy();
            let AddGlobalListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[add-listener]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _handleClick_decorators;
                let _handleClick_initializers = [];
                let _handleClick_extraInitializers = [];
                var AddGlobalListener = _classThis = class {
                    constructor() {
                        this.handleClick = __runInitializers(this, _handleClick_initializers, clickSpy);
                        __runInitializers(this, _handleClick_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AddGlobalListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('window:click')];
                    __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AddGlobalListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AddGlobalListener = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <ng-container add-listener>
            <button id="click-me">Click me!</button>
          </ng-container>`,
                        imports: [AddGlobalListener],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(AppComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            const doc = (0, document_1.getDocument)();
            (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
            (0, dom_utils_1.resetTViewsFor)(AppComponent);
            const clickMe = doc.getElementById('click-me');
            clickMe.click();
            yield (0, dom_utils_1.hydrate)(doc, AppComponent, {
                envProviders: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }, ...providers],
                hydrationFeatures,
            });
            expect(clickSpy).not.toHaveBeenCalled();
        }));
        it('should not error when when binding to body:click on a container', () => __awaiter(void 0, void 0, void 0, function* () {
            const clickSpy = jasmine.createSpy();
            let AddGlobalListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[add-listener]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _handleClick_decorators;
                let _handleClick_initializers = [];
                let _handleClick_extraInitializers = [];
                var AddGlobalListener = _classThis = class {
                    constructor() {
                        this.handleClick = __runInitializers(this, _handleClick_initializers, clickSpy);
                        __runInitializers(this, _handleClick_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AddGlobalListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('body:click')];
                    __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AddGlobalListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AddGlobalListener = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <ng-container add-listener>
            <button id="click-me">Click me!</button>
          </ng-container>`,
                        imports: [AddGlobalListener],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(AppComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            const doc = (0, document_1.getDocument)();
            (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
            (0, dom_utils_1.resetTViewsFor)(AppComponent);
            const clickMe = doc.getElementById('click-me');
            clickMe.click();
            yield (0, dom_utils_1.hydrate)(doc, AppComponent, {
                envProviders: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }, ...providers],
                hydrationFeatures,
            });
            expect(clickSpy).not.toHaveBeenCalled();
        }));
    });
    it('should remove jsaction attributes, but continue listening to events.', () => __awaiter(void 0, void 0, void 0, function* () {
        let SimpleComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    selector: 'app',
                    template: `
            <div (click)="onClick()" id="1">
              <div (click)="onClick()" id="2"></div>
            </div>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SimpleComponent = _classThis = class {
                onClick() { }
            };
            __setFunctionName(_classThis, "SimpleComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SimpleComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SimpleComponent = _classThis;
        })();
        const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
        const ssrContents = (0, dom_utils_1.getAppContents)(html);
        const doc = (0, document_1.getDocument)();
        (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
        const el = doc.getElementById('1');
        expect(el.hasAttribute('jsaction')).toBeTrue();
        expect(el.firstChild.hasAttribute('jsaction')).toBeTrue();
        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
        yield (0, dom_utils_1.hydrate)(doc, SimpleComponent, { hydrationFeatures });
        expect(el.hasAttribute('jsaction')).toBeFalse();
        expect(el.firstChild.hasAttribute('jsaction')).toBeFalse();
    }));
    it(`should add 'nonce' attribute to event record script when 'ngCspNonce' is provided`, () => __awaiter(void 0, void 0, void 0, function* () {
        let SimpleComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    selector: 'app',
                    template: `
            <div (click)="onClick()">
                <div (blur)="onClick()"></div>
            </div>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SimpleComponent = _classThis = class {
                onClick() { }
            };
            __setFunctionName(_classThis, "SimpleComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SimpleComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SimpleComponent = _classThis;
        })();
        const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
        const doc = `<html><head></head><body>${hydration_utils_1.EVENT_DISPATCH_SCRIPT}` +
            `<app ngCspNonce="{{nonce}}"></app></body></html>`;
        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { doc, hydrationFeatures });
        expect((0, dom_utils_1.getAppContents)(html)).toContain('<script nonce="{{nonce}}">window.__jsaction_bootstrap');
    }));
    it('should not throw an error when app is destroyed before becoming stable', () => __awaiter(void 0, void 0, void 0, function* () {
        // Spy manually, because we may not be able to retrieve the `Console`
        // after we destroy the application, but we still want to ensure that
        // no error is thrown in the console.
        const errorSpy = spyOn(console, 'error').and.callThrough();
        const logs = [];
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    standalone: true,
                    template: `
        <button id="btn" (click)="onClick()"></button>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    const isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
                    if (isBrowser) {
                        const pendingTasks = (0, core_1.inject)(core_1.PendingTasks);
                        // Given that, in a real-world scenario, some APIs add a pending
                        // task and don't remove it until the app is destroyed.
                        // This could be an HTTP request that contributes to app stability
                        // and does not respond until the app is destroyed.
                        pendingTasks.add();
                    }
                }
                onClick() { }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        const html = yield (0, hydration_utils_1.ssr)(AppComponent);
        const ssrContents = (0, dom_utils_1.getAppContents)(html);
        const doc = (0, document_1.getDocument)();
        (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
        (0, dom_utils_1.resetTViewsFor)(AppComponent);
        const btn = doc.getElementById('btn');
        btn.click();
        const appRef = yield (0, dom_utils_1.hydrate)(doc, AppComponent, {
            hydrationFeatures: () => [(0, platform_browser_1.withEventReplay)()],
        });
        appRef.isStable.subscribe((isStable) => {
            logs.push(`isStable=${isStable}`);
        });
        // Destroy the application before it becomes stable, because we added
        // a task and didn't remove it explicitly.
        appRef.destroy();
        // Wait for a microtask so that `whenStable` resolves.
        yield Promise.resolve();
        expect(logs).toEqual([
            'isStable=false',
            // In the end, the application became stable while being destroyed.
            'isStable=true',
        ]);
        // Ensure no error has been logged in the console,
        // such as "injector has already been destroyed."
        expect(errorSpy).not.toHaveBeenCalledWith(/Injector has already been destroyed/);
    }));
    describe('bubbling behavior', () => {
        it('should propagate events', () => __awaiter(void 0, void 0, void 0, function* () {
            const onClickSpy = jasmine.createSpy();
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: `
            <div id="top" (click)="onClick()">
                <div id="bottom" (click)="onClick()"></div>
            </div>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.onClick = onClickSpy;
                    }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            const doc = (0, document_1.getDocument)();
            (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            const bottomEl = doc.getElementById('bottom');
            bottomEl.click();
            yield (0, dom_utils_1.hydrate)(doc, SimpleComponent, {
                envProviders: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            expect(onClickSpy).toHaveBeenCalledTimes(2);
            onClickSpy.calls.reset();
            bottomEl.click();
            expect(onClickSpy).toHaveBeenCalledTimes(2);
        }));
        it('should not propagate events if stopPropagation is called', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: `
            <div id="top" (click)="onClick($event)">
                <div id="bottom" (click)="onClick($event)"></div>
            </div>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    onClick(e) {
                        e.stopPropagation();
                    }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const onClickSpy = spyOn(SimpleComponent.prototype, 'onClick').and.callThrough();
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            const doc = (0, document_1.getDocument)();
            (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            const bottomEl = doc.getElementById('bottom');
            bottomEl.click();
            yield (0, dom_utils_1.hydrate)(doc, SimpleComponent, { hydrationFeatures });
            expect(onClickSpy).toHaveBeenCalledTimes(1);
            onClickSpy.calls.reset();
            bottomEl.click();
            expect(onClickSpy).toHaveBeenCalledTimes(1);
        }));
        it('should not have differences in event fields', () => __awaiter(void 0, void 0, void 0, function* () {
            let currentEvent;
            let latestTarget = null;
            let latestCurrentTarget = null;
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: `
            <div id="top" (click)="onClick($event)">
                <div id="bottom" (click)="onClick($event)"></div>
            </div>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    onClick(event) {
                        currentEvent = event;
                        latestTarget = event.target;
                        latestCurrentTarget = event.currentTarget;
                    }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            const doc = (0, document_1.getDocument)();
            (0, dom_utils_1.prepareEnvironment)(doc, ssrContents);
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            const bottomEl = doc.getElementById('bottom');
            bottomEl.click();
            yield (0, dom_utils_1.hydrate)(doc, SimpleComponent, {
                envProviders: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const replayedEvent = currentEvent;
            expect(replayedEvent.target).not.toBeNull();
            expect(replayedEvent.currentTarget).not.toBeNull();
            expect(replayedEvent.eventPhase).toBe(event_dispatch_1.EventPhase.REPLAY);
            bottomEl.click();
            expect(replayedEvent.target).toBe(latestTarget);
            expect(replayedEvent.currentTarget).toBe(latestCurrentTarget);
        }));
    });
    describe('event dispatch script', () => {
        it('should not be present on a page when hydration is disabled', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: '<input (click)="onClick()" />',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    onClick() { }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { enableHydration: false });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(hasJSActionAttrs(ssrContents)).toBeFalse();
            expect(hasEventDispatchScript(ssrContents)).toBeFalse();
        }));
        it('should not be present on a page if there are no events to replay', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: 'Some text',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(hasJSActionAttrs(ssrContents)).toBeFalse();
            expect(hasEventDispatchScript(ssrContents)).toBeFalse();
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            const doc = (0, document_1.getDocument)();
            yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, ssrContents, SimpleComponent, {
                envProviders: [
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    // This ensures that there are no errors while bootstrapping an application
                    // that has no events, but enables Event Replay feature.
                    withStrictErrorHandler(),
                ],
                hydrationFeatures,
            });
        }));
        it('should not replay mouse events', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: '<div (mouseenter)="doThing()"><div>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    doThing() { }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(hasJSActionAttrs(ssrContents)).toBeFalse();
            expect(hasEventDispatchScript(ssrContents)).toBeFalse();
        }));
        it('should not be present on a page where event replay is not enabled', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: '<input (click)="onClick()" />',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    onClick() { }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, {});
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            // Expect that there are no JSAction artifacts in the HTML
            // (even though there are events in a template), since event
            // replay is disabled in the config.
            expect(hasJSActionAttrs(ssrContents)).toBeFalse();
            expect(hasEventDispatchScript(ssrContents)).toBeFalse();
        }));
        it('should be retained if there are events to replay', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        template: '<input (click)="onClick()" />',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    onClick() { }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const hydrationFeatures = () => [(0, platform_browser_1.withEventReplay)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(hasJSActionAttrs(ssrContents)).toBeTrue();
            expect(hasEventDispatchScript(ssrContents)).toBeTrue();
            // Verify that inlined event delegation script goes first and
            // event contract setup goes second (since it uses some code from
            // the inlined script).
            expect(ssrContents).toContain(`<script type="text/javascript" id="ng-event-dispatch-contract"></script>` +
                `<script>window.__jsaction_bootstrap(document.body,"ng",["click"],[]);</script>`);
        }));
    });
});
