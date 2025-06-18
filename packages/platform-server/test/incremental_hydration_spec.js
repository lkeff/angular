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
const dom_utils_1 = require("./dom_utils");
const hydration_utils_1 = require("./hydration_utils");
const document_1 = require("@angular/core/src/render3/interfaces/document");
const common_1 = require("@angular/common");
const platform_browser_1 = require("@angular/platform-browser");
const testing_1 = require("@angular/core/testing");
const platform_id_1 = require("@angular/common/src/platform_id");
const registry_1 = require("@angular/core/src/defer/registry");
const tokens_1 = require("@angular/core/src/hydration/tokens");
const event_delegation_utils_1 = require("@angular/core/src/event_delegation_utils");
const router_1 = require("@angular/router");
const testing_2 = require("@angular/common/testing");
const timer_scheduler_1 = require("@angular/core/src/defer/timer_scheduler");
/**
 * Emulates a dynamic import promise.
 *
 * Note: `setTimeout` is used to make `fixture.whenStable()` function
 * wait for promise resolution, since `whenStable()` relies on the state
 * of a macrotask queue.
 */
function dynamicImportOf(type, timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(type);
        }, timeout);
    });
}
/**
 * Emulates a failed dynamic import promise.
 */
function failedDynamicImport() {
    return new Promise((_, reject) => {
        setTimeout(() => reject());
    });
}
/**
 * Helper function to await all pending dynamic imports
 * emulated using `dynamicImportOf` function.
 */
function allPendingDynamicImports() {
    return dynamicImportOf(null, 101);
}
describe('platform-server partial hydration integration', () => {
    const originalWindow = globalThis.window;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        globalThis.window = globalThis;
        yield Promise.resolve(`${'@angular/core/primitives/event-dispatch/contract_bundle_min.js'}`).then(s => __importStar(require(s)));
    }));
    afterAll(() => {
        globalThis.window = originalWindow;
    });
    afterEach(() => {
        (0, core_1.destroyPlatform)();
        window._ejsas = {};
    });
    describe('core functionality', () => {
        beforeEach(() => {
            (0, hydration_utils_1.clearConsole)(testing_1.TestBed.inject(core_1.ApplicationRef));
            (0, hydration_utils_1.resetNgDevModeCounters)();
        });
        afterEach(() => {
            (0, hydration_utils_1.clearConsole)(testing_1.TestBed.inject(core_1.ApplicationRef));
        });
        describe('annotation', () => {
            it('should annotate inner components with defer block id', () => __awaiter(void 0, void 0, void 0, function* () {
                let DepA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dep-a',
                            template: '<button (click)="null">Click A</button>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DepA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DepA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DepA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DepA = _classThis;
                })();
                let DepB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dep-b',
                            imports: [DepA],
                            template: `
        <dep-a />
        <button (click)="null">Click B</button>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DepB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DepB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DepB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DepB = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            imports: [DepB],
                            template: `
        <main (click)="fnA()">
          @defer (on viewport; hydrate on interaction) {
            <div (click)="fnA()">
              Main defer block rendered!
              @if (visible) {
                Defer events work!
              }
              <div id="outer-trigger" (mouseover)="showMessage()"></div>
              @defer (on viewport; hydrate on interaction) {
                <p (click)="fnA()">Nested defer block</p>
                <dep-b />
              } @placeholder {
                <span>Inner block placeholder</span>
              }
            </div>
          } @placeholder {
            <span>Outer block placeholder</span>
          }
        </main>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                            this.visible = false;
                        }
                        fnA() { }
                        showMessage() {
                            this.visible = true;
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)(), (0, platform_browser_1.withEventReplay)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<main jsaction="click:;">');
                // Buttons inside nested components inherit parent defer block namespace.
                expect(ssrContents).toContain('<button jsaction="click:;" ngb="d1">Click A</button>');
                expect(ssrContents).toContain('<button jsaction="click:;" ngb="d1">Click B</button>');
                expect(ssrContents).toContain('<!--ngh=d0-->');
                expect(ssrContents).toContain('<!--ngh=d1-->');
            }));
            it('should not include trigger array when only JSAction triggers are present', () => __awaiter(void 0, void 0, void 0, function* () {
                let DepA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dep-a',
                            template: '<button (click)="null">Click A</button>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DepA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DepA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DepA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DepA = _classThis;
                })();
                let DepB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dep-b',
                            imports: [DepA],
                            template: `
        <dep-a />
        <button (click)="null">Click B</button>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DepB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DepB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DepB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DepB = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            imports: [DepB],
                            template: `
        <main (click)="fnA()">
          @defer (on viewport; hydrate on interaction) {
            <div (click)="fnA()">
              Main defer block rendered!
              @if (visible) {
                Defer events work!
              }
              <div id="outer-trigger" (mouseover)="showMessage()"></div>
              @defer (on viewport; hydrate on interaction) {
                <p (click)="fnA()">Nested defer block</p>
                <dep-b />
              } @placeholder {
                <span>Inner block placeholder</span>
              }
            </div>
          } @placeholder {
            <span>Outer block placeholder</span>
          }
        </main>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                            this.visible = false;
                        }
                        fnA() { }
                        showMessage() {
                            this.visible = true;
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)(), (0, platform_browser_1.withEventReplay)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('"__nghDeferData__":{"d0":{"r":1,"s":2},"d1":{"r":2,"s":2,"p":"d0"}}');
            }));
            it('should include trigger array for non-jsaction triggers', () => __awaiter(void 0, void 0, void 0, function* () {
                let DepA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dep-a',
                            template: '<button (click)="null">Click A</button>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DepA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DepA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DepA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DepA = _classThis;
                })();
                let DepB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dep-b',
                            imports: [DepA],
                            template: `
        <dep-a />
        <button (click)="null">Click B</button>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DepB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DepB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DepB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DepB = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            imports: [DepB],
                            template: `
        <main (click)="fnA()">
          @defer (on viewport; hydrate on interaction) {
            <div (click)="fnA()">
              Main defer block rendered!
              @if (visible) {
                Defer events work!
              }
              <div id="outer-trigger" (mouseover)="showMessage()"></div>
              @defer (on viewport; hydrate on viewport) {
                <p (click)="fnA()">Nested defer block</p>
                <dep-b />
              } @placeholder {
                <span>Inner block placeholder</span>
              }
            </div>
          } @placeholder {
            <span>Outer block placeholder</span>
          }
        </main>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                            this.visible = false;
                        }
                        fnA() { }
                        showMessage() {
                            this.visible = true;
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)(), (0, platform_browser_1.withEventReplay)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('"__nghDeferData__":{"d0":{"r":1,"s":2},"d1":{"r":2,"s":2,"t":[2],"p":"d0"}}');
            }));
            it('should not include parent id in serialized data for top-level `@defer` blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
            @defer (on viewport; hydrate on interaction) {
              Hello world!
            } @placeholder {
              <span>Placeholder</span>
            }
        `,
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, {
                    envProviders: providers,
                    hydrationFeatures,
                });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // Assert that the serialized data doesn't contain the "p" field,
                // which contains parent id (which is not needed for top-level blocks).
                expect(ssrContents).toContain('"__nghDeferData__":{"d0":{"r":1,"s":2}}}');
            }));
        });
        describe('basic hydration behavior', () => {
            it('should SSR and hydrate top-level `@defer` blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <article (click)="fnA()">
                Main defer block rendered!
                @if (visible) {
                  Defer events work!
                }
                <aside id="outer-trigger" (mouseover)="showMessage()"></aside>
                @defer (on viewport; hydrate on interaction) {
                  <p (click)="fnA()">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                            this.visible = false;
                        }
                        fnA() { }
                        showMessage() {
                            this.visible = true;
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, {
                    envProviders: providers,
                    hydrationFeatures,
                });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // Assert that we have `jsaction` annotations and
                // defer blocks are triggered and rendered.
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // <div>s inside a defer block have `d0` as a namespace.
                expect(ssrContents).toContain('<article jsaction="click:;keydown:;" ngb="d0');
                expect(ssrContents).toContain('<aside id="outer-trigger" jsaction="mouseover:;" ngb="d0');
                // <p> is inside a nested defer block -> different namespace.
                expect(ssrContents).toContain('<p jsaction="click:;keydown:;" ngb="d1');
                // There is an extra annotation in the TransferState data.
                expect(ssrContents).toContain('"__nghDeferData__":{"d0":{"r":1,"s":2},"d1":{"r":1,"s":2,"p":"d0"}}');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('Main defer block rendered');
                // Inner defer block is rendered as well.
                expect(ssrContents).toContain('Nested defer block');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const appHostNode = compRef.location.nativeElement;
                // At this point an eager part of an app is hydrated,
                // but defer blocks are still in dehydrated state.
                // <main> no longer has `jsaction` attribute.
                expect(appHostNode.outerHTML).toContain('<main>');
                // Elements from @defer blocks still have `jsaction` annotations,
                // since they were not triggered yet.
                expect(appHostNode.outerHTML).toContain('<article jsaction="click:;keydown:;" ngb="d0');
                expect(appHostNode.outerHTML).toContain('<aside id="outer-trigger" jsaction="mouseover:;" ngb="d0');
                expect(appHostNode.outerHTML).toContain('<p jsaction="click:;keydown:;" ngb="d1');
                // Emit an event inside of a defer block, which should result
                // in triggering the defer block (start loading deps, etc) and
                // subsequent hydration.
                const inner = doc.getElementById('outer-trigger');
                const clickEvent2 = new CustomEvent('mouseover', { bubbles: true });
                inner.dispatchEvent(clickEvent2);
                yield allPendingDynamicImports();
                appRef.tick();
                // An event was replayed after hydration, which resulted in
                // an `@if` block becoming active and its inner content got
                // rendered/
                expect(appHostNode.outerHTML).toContain('Defer events work');
                // All outer defer block elements no longer have `jsaction` annotations.
                expect(appHostNode.outerHTML).not.toContain('<div jsaction="click:;" ngb="d0');
                expect(appHostNode.outerHTML).not.toContain('<div id="outer-trigger" jsaction="mouseover:;" ngb="d0');
                // Inner defer block was not triggered, thus it retains `jsaction` attributes.
                expect(appHostNode.outerHTML).toContain('<p jsaction="click:;keydown:;" ngb="d1');
            }));
            it('should SSR and hydrate nested `@defer` blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <div (click)="fnA()">
                Main defer block rendered!
                @if (visible) {
                  Defer events work!
                }
                <div id="outer-trigger" (mouseover)="showMessage()"></div>
                @defer (on viewport; hydrate on interaction) {
                  <p (click)="showMessage()">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                            this.visible = false;
                        }
                        fnA() { }
                        showMessage() {
                            this.visible = true;
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // Assert that we have `jsaction` annotations and
                // defer blocks are triggered and rendered.
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // <div>s inside a defer block have `d0` as a namespace.
                expect(ssrContents).toContain('<div jsaction="click:;keydown:;" ngb="d0"');
                expect(ssrContents).toContain('<div id="outer-trigger" jsaction="mouseover:;" ngb="d0"');
                // <p> is inside a nested defer block -> different namespace.
                expect(ssrContents).toContain('<p jsaction="click:;keydown:;" ngb="d1');
                // There is an extra annotation in the TransferState data.
                expect(ssrContents).toContain('"__nghDeferData__":{"d0":{"r":1,"s":2},"d1":{"r":1,"s":2,"p":"d0"}}');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('Main defer block rendered');
                // Inner defer block is rendered as well.
                expect(ssrContents).toContain('Nested defer block');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const appHostNode = compRef.location.nativeElement;
                // At this point an eager part of an app is hydrated,
                // but defer blocks are still in dehydrated state.
                // <main> no longer has `jsaction` attribute.
                expect(appHostNode.outerHTML).toContain('<main>');
                // Elements from @defer blocks still have `jsaction` annotations,
                // since they were not triggered yet.
                expect(appHostNode.outerHTML).toContain('<div jsaction="click:;keydown:;" ngb="d0"');
                expect(appHostNode.outerHTML).toContain('<div id="outer-trigger" jsaction="mouseover:;" ngb="d0');
                expect(appHostNode.outerHTML).toContain('<p jsaction="click:;keydown:;" ngb="d1"');
                // Emit an event inside of a defer block, which should result
                // in triggering the defer block (start loading deps, etc) and
                // subsequent hydration.
                const inner = doc.body.querySelector('p');
                const clickEvent = new CustomEvent('click', { bubbles: true });
                inner.dispatchEvent(clickEvent);
                yield allPendingDynamicImports();
                appRef.tick();
                // An event was replayed after hydration, which resulted in
                // an `@if` block becoming active and its inner content got
                // rendered/
                expect(appHostNode.outerHTML).toContain('Defer events work');
                // Since inner `@defer` block was triggered, all parent blocks
                // were hydrated as well, so all `jsaction` attributes are removed.
                expect(appHostNode.outerHTML).not.toContain('jsaction="');
            }));
            it('should SSR and hydrate only defer blocks with hydrate syntax', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (hydrate on interaction) {
              <div (click)="fnA()">
                Main defer block rendered!
                @if (visible) {
                  Defer events work!
                }
                <div id="outer-trigger" (mouseover)="showMessage()"></div>
                @defer (on interaction) {
                  <p (click)="showMessage()">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                            this.visible = false;
                        }
                        fnA() { }
                        showMessage() {
                            this.visible = true;
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }, (0, hydration_utils_1.withDebugConsole)()];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // Assert that we have `jsaction` annotations and
                // defer blocks are triggered and rendered.
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // <div>s inside a defer block have `d0` as a namespace.
                expect(ssrContents).toContain('<div jsaction="click:;keydown:;" ngb="d0"');
                expect(ssrContents).toContain('<div id="outer-trigger" jsaction="mouseover:;" ngb="d0"');
                // <p> is inside a nested defer block -> different namespace.
                // expect(ssrContents).toContain('<p jsaction="click:;" ngb="d1');
                // There is an extra annotation in the TransferState data.
                expect(ssrContents).toContain('"__nghDeferData__":{"d0":{"r":1,"s":2}}');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('Main defer block rendered');
                // Inner defer block should only display placeholder.
                expect(ssrContents).toContain('Inner block placeholder');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                (0, hydration_utils_1.verifyHasLog)(appRef, 'Angular hydrated 1 component(s) and 8 node(s), 0 component(s) were skipped. 1 defer block(s) were configured to use incremental hydration.');
                const appHostNode = compRef.location.nativeElement;
                // At this point an eager part of an app is hydrated,
                // but defer blocks are still in dehydrated state.
                // <main> no longer has `jsaction` attribute.
                expect(appHostNode.outerHTML).toContain('<main>');
                // Elements from @defer blocks still have `jsaction` annotations,
                // since they were not triggered yet.
                expect(appHostNode.outerHTML).toContain('<div jsaction="click:;keydown:;" ngb="d0"');
                expect(appHostNode.outerHTML).toContain('<div id="outer-trigger" jsaction="mouseover:;" ngb="d0');
                // expect(appHostNode.outerHTML).toContain('<p jsaction="click:;" ngb="d1"');
                // Emit an event inside of a defer block, which should result
                // in triggering the defer block (start loading deps, etc) and
                // subsequent hydration.
                const inner = doc.getElementById('outer-trigger');
                const clickEvent2 = new CustomEvent('mouseover', { bubbles: true });
                inner.dispatchEvent(clickEvent2);
                yield allPendingDynamicImports();
                appRef.tick();
                const innerParagraph = doc.body.querySelector('p');
                expect(innerParagraph).toBeUndefined();
                // An event was replayed after hydration, which resulted in
                // an `@if` block becoming active and its inner content got
                // rendered/
                expect(appHostNode.outerHTML).toContain('Defer events work');
                expect(appHostNode.outerHTML).toContain('Inner block placeholder');
                // Since inner `@defer` block was triggered, all parent blocks
                // were hydrated as well, so all `jsaction` attributes are removed.
                expect(appHostNode.outerHTML).not.toContain('jsaction="');
            }));
        });
        /* TODO: tests to add
    
          3. transfer state data is correct for parent / child defer blocks
        */
        describe('triggers', () => {
            describe('hydrate on interaction', () => {
                it('click', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
            <main (click)="fnA()">
              @defer (on viewport; hydrate on interaction) {
                <article>
                  defer block rendered!
                </article>
                <span id="test" (click)="fnB()">{{value()}}</span>
              } @placeholder {
                <span>Outer block placeholder</span>
              }
            </main>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article jsaction="click:;keydown:;"');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article jsaction="click:;keydown:;"');
                    // Emit an event inside of a defer block, which should result
                    // in triggering the defer block (start loading deps, etc) and
                    // subsequent hydration.
                    const article = doc.getElementsByTagName('article')[0];
                    const clickEvent = new CustomEvent('click', { bubbles: true });
                    article.dispatchEvent(clickEvent);
                    yield allPendingDynamicImports();
                    appRef.tick();
                    expect(appHostNode.outerHTML).not.toContain('<div jsaction="click:;keydown:;"');
                }));
                it('keydown', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
            <main (click)="fnA()">
              @defer (on viewport; hydrate on interaction) {
                <article>
                  defer block rendered!
                  <span id="test" (click)="fnB()">{{value()}}</span>
                  </article>
              } @placeholder {
                <span>Outer block placeholder</span>
              }
            </main>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article jsaction="click:;keydown:;"');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article jsaction="click:;keydown:;"');
                    // Emit an event inside of a defer block, which should result
                    // in triggering the defer block (start loading deps, etc) and
                    // subsequent hydration.
                    const article = doc.getElementsByTagName('article')[0];
                    const keydownEvent = new KeyboardEvent('keydown');
                    article.dispatchEvent(keydownEvent);
                    yield allPendingDynamicImports();
                    appRef.tick();
                    expect(appHostNode.outerHTML).not.toContain('<div jsaction="click:;keydown:;"');
                }));
            });
            describe('hydrate on hover', () => {
                it('mouseover', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
            <main (click)="fnA()">
              @defer (hydrate on hover) {
                <article>
                  defer block rendered!
                  <span id="test" (click)="fnB()">{{value()}}</span>
                </article>
              } @placeholder {
                <span>Outer block placeholder</span>
              }
            </main>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article jsaction="mouseenter:;mouseover:;focusin:;"');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article jsaction="mouseenter:;mouseover:;focusin:;"');
                    // Emit an event inside of a defer block, which should result
                    // in triggering the defer block (start loading deps, etc) and
                    // subsequent hydration.
                    const article = doc.getElementsByTagName('article')[0];
                    const hoverEvent = new CustomEvent('mouseover', { bubbles: true });
                    article.dispatchEvent(hoverEvent);
                    yield allPendingDynamicImports();
                    appRef.tick();
                    expect(appHostNode.outerHTML).not.toContain('<div jsaction="mouseenter:;mouseover:;focusin:;"');
                }));
                it('focusin', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
            <main (click)="fnA()">
              @defer (hydrate on hover) {
                <article>
                  defer block rendered!
                  <span id="test" (click)="fnB()">{{value()}}</span>
                </article>
              } @placeholder {
                <span>Outer block placeholder</span>
              }
            </main>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article jsaction="mouseenter:;mouseover:;focusin:;"');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article jsaction="mouseenter:;mouseover:;focusin:;"');
                    // Emit an event inside of a defer block, which should result
                    // in triggering the defer block (start loading deps, etc) and
                    // subsequent hydration.
                    const article = doc.getElementsByTagName('article')[0];
                    const focusEvent = new CustomEvent('focusin', { bubbles: true });
                    article.dispatchEvent(focusEvent);
                    yield allPendingDynamicImports();
                    appRef.tick();
                    expect(appHostNode.outerHTML).not.toContain('<div jsaction="mouseenter:;mouseover:;focusin:;"');
                }));
            });
            describe('viewport', () => {
                let activeObservers = [];
                let nativeIntersectionObserver;
                beforeEach(() => {
                    nativeIntersectionObserver = globalThis.IntersectionObserver;
                    globalThis.IntersectionObserver = MockIntersectionObserver;
                });
                afterEach(() => {
                    globalThis.IntersectionObserver = nativeIntersectionObserver;
                    activeObservers = [];
                });
                /**
                 * Mocked out implementation of the native IntersectionObserver API. We need to
                 * mock it out for tests, because it's unsupported in Domino and we can't trigger
                 * it reliably in the browser.
                 */
                class MockIntersectionObserver {
                    constructor(callback) {
                        this.callback = callback;
                        this.root = null;
                        this.rootMargin = null;
                        this.thresholds = null;
                        this.observedElements = new Set();
                        this.elementsInView = new Set();
                        activeObservers.push(this);
                    }
                    static invokeCallbacksForElement(element, isInView) {
                        for (const observer of activeObservers) {
                            const elements = observer.elementsInView;
                            const wasInView = elements.has(element);
                            if (isInView) {
                                elements.add(element);
                            }
                            else {
                                elements.delete(element);
                            }
                            observer.invokeCallback();
                            if (wasInView) {
                                elements.add(element);
                            }
                            else {
                                elements.delete(element);
                            }
                        }
                    }
                    invokeCallback() {
                        for (const el of this.observedElements) {
                            this.callback([
                                {
                                    target: el,
                                    isIntersecting: this.elementsInView.has(el),
                                    // Unsupported properties.
                                    boundingClientRect: null,
                                    intersectionRatio: null,
                                    intersectionRect: null,
                                    rootBounds: null,
                                    time: null,
                                },
                            ], this);
                        }
                    }
                    observe(element) {
                        this.observedElements.add(element);
                        // Native observers fire their callback as soon as an
                        // element is observed so we try to mimic it here.
                        this.invokeCallback();
                    }
                    unobserve(element) {
                        this.observedElements.delete(element);
                    }
                    disconnect() {
                        this.observedElements.clear();
                        this.elementsInView.clear();
                    }
                    takeRecords() {
                        throw new Error('Not supported');
                    }
                }
                it('viewport', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
          <main (click)="fnA()">
            @defer (hydrate on viewport) {
              <article>
                defer block rendered!
                <span id="test" (click)="fnB()">{{value()}}</span>
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<!--ngh=d0-->');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<span id="test" jsaction="click:;" ngb="d0">start</span>');
                    const article = document.getElementsByTagName('article')[0];
                    MockIntersectionObserver.invokeCallbacksForElement(article, false);
                    appRef.tick();
                    const testElement = doc.getElementById('test');
                    const clickEvent = new CustomEvent('click');
                    testElement.dispatchEvent(clickEvent);
                    appRef.tick();
                    expect(appHostNode.outerHTML).toContain('<span id="test" jsaction="click:;" ngb="d0">start</span>');
                    MockIntersectionObserver.invokeCallbacksForElement(article, true);
                    yield allPendingDynamicImports();
                    const clickEvent2 = new CustomEvent('click');
                    testElement.dispatchEvent(clickEvent2);
                    appRef.tick();
                    expect(appHostNode.outerHTML).toContain('<span id="test">end</span>');
                }));
            });
            it('immediate', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (hydrate on immediate) {
              <article>
                defer block rendered!
                <span id="test" (click)="fnB()">{{value()}}</span>
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.signal)('start');
                        }
                        fnA() { }
                        fnB() {
                            this.value.set('end');
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('defer block rendered');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                appRef.tick();
                const appHostNode = compRef.location.nativeElement;
                expect(appHostNode.outerHTML).toContain('<span id="test">start</span>');
                const testElement = doc.getElementById('test');
                const clickEvent2 = new CustomEvent('click');
                testElement.dispatchEvent(clickEvent2);
                appRef.tick();
                expect(appHostNode.outerHTML).toContain('<span id="test">end</span>');
            }));
            describe('idle', () => {
                /**
                 * Sets up interceptors for when an idle callback is requested
                 * and when it's cancelled. This is needed to keep track of calls
                 * made to `requestIdleCallback` and `cancelIdleCallback` APIs.
                 */
                let id = 0;
                let idleCallbacksRequested;
                let idleCallbacksInvoked;
                let idleCallbacksCancelled;
                const onIdleCallbackQueue = new Map();
                function resetCounters() {
                    idleCallbacksRequested = 0;
                    idleCallbacksInvoked = 0;
                    idleCallbacksCancelled = 0;
                }
                resetCounters();
                let nativeRequestIdleCallback;
                let nativeCancelIdleCallback;
                const mockRequestIdleCallback = (callback, options) => {
                    onIdleCallbackQueue.set(id, callback);
                    expect(idleCallbacksRequested).toBe(0);
                    expect(core_1.NgZone.isInAngularZone()).toBe(true);
                    idleCallbacksRequested++;
                    return id++;
                };
                const mockCancelIdleCallback = (id) => {
                    onIdleCallbackQueue.delete(id);
                    idleCallbacksRequested--;
                    idleCallbacksCancelled++;
                };
                const triggerIdleCallbacks = () => {
                    for (const [_, callback] of onIdleCallbackQueue) {
                        idleCallbacksInvoked++;
                        callback(null);
                    }
                    onIdleCallbackQueue.clear();
                };
                beforeEach(() => {
                    nativeRequestIdleCallback = globalThis.requestIdleCallback;
                    nativeCancelIdleCallback = globalThis.cancelIdleCallback;
                    globalThis.requestIdleCallback = mockRequestIdleCallback;
                    globalThis.cancelIdleCallback = mockCancelIdleCallback;
                    resetCounters();
                });
                afterEach(() => {
                    globalThis.requestIdleCallback = nativeRequestIdleCallback;
                    globalThis.cancelIdleCallback = nativeCancelIdleCallback;
                    onIdleCallbackQueue.clear();
                    resetCounters();
                });
                it('idle', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
        <main (click)="fnA()">
          @defer (hydrate on idle) {
            <article>
              defer block rendered!
              <span id="test" (click)="fnB()">{{value()}}</span>
            </article>
          } @placeholder {
            <span>Outer block placeholder</span>
          }
        </main>
      `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article>');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article>');
                    triggerIdleCallbacks();
                    yield allPendingDynamicImports();
                    appRef.tick();
                    expect(appHostNode.outerHTML).toContain('<span id="test">start</span>');
                    const testElement = doc.getElementById('test');
                    const clickEvent2 = new CustomEvent('click');
                    testElement.dispatchEvent(clickEvent2);
                    appRef.tick();
                    expect(appHostNode.outerHTML).toContain('<span id="test">end</span>');
                }));
            });
            describe('timer', () => {
                class FakeTimerScheduler {
                    add(delay, callback) {
                        callback();
                    }
                    remove(callback) {
                        /* noop */
                    }
                }
                it('top level timer', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
            <main (click)="fnA()">
              @defer (hydrate on timer(150)) {
                <article>
                  defer block rendered!
                  <span id="test" (click)="fnB()">{{value()}}</span>
                </article>
              } @placeholder {
                <span>Outer block placeholder</span>
              }
            </main>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                            }
                            fnA() { }
                            fnB() {
                                this.value.set('end');
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
                    const appId = 'custom-app-id';
                    const providers = [
                        { provide: core_1.APP_ID, useValue: appId },
                        { provide: timer_scheduler_1.TimerScheduler, useClass: FakeTimerScheduler },
                    ];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article>');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article>');
                    yield allPendingDynamicImports();
                    expect(appHostNode.outerHTML).toContain('<span id="test">start</span>');
                }));
                it('nested timer', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                template: `
            <main (click)="fnA()">
              @defer (on viewport; hydrate on interaction) {
                <div id="main" (click)="fnA()">
                  defer block rendered!
                  @defer (on viewport; hydrate on timer(150)) {
                    <article>
                      <p id="nested">Nested defer block</p>
                      <span id="test">{{value()}}</span>
                    </article>
                  } @placeholder {
                    <span>Inner block placeholder</span>
                  }
                </div>
              } @placeholder {
                <span>Outer block placeholder</span>
              }
            </main>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            fnA() { }
                            constructor() {
                                this.value = (0, core_1.signal)('start');
                                if (!(0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID))) {
                                    this.value.set('end');
                                }
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
                    const appId = 'custom-app-id';
                    const providers = [
                        { provide: core_1.APP_ID, useValue: appId },
                        { provide: timer_scheduler_1.TimerScheduler, useClass: FakeTimerScheduler },
                    ];
                    const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // <main> uses "eager" `custom-app-id` namespace.
                    expect(ssrContents).toContain('<main jsaction="click:;');
                    // <div>s inside a defer block have `d0` as a namespace.
                    expect(ssrContents).toContain('<article>');
                    // Outer defer block is rendered.
                    expect(ssrContents).toContain('defer block rendered');
                    // Internal cleanup before we do server->client transition in this test.
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    ////////////////////////////////
                    const doc = (0, document_1.getDocument)();
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    yield appRef.whenStable();
                    const appHostNode = compRef.location.nativeElement;
                    expect(appHostNode.outerHTML).toContain('<article>');
                    yield allPendingDynamicImports();
                    expect(appHostNode.outerHTML).toContain('<span id="test">end</span>');
                }));
            });
            it('when', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (on immediate; hydrate when iSaySo()) {
              <article>
                defer block rendered!
                <span id="test" (click)="fnB()">{{value()}}</span>
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
            <button id="hydrate-me" (click)="triggerHydration()">Click Here</button>
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.signal)('start');
                            this.iSaySo = (0, core_1.signal)(false);
                            this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                        }
                        fnA() { }
                        triggerHydration() {
                            this.iSaySo.set(true);
                        }
                        fnB() {
                            this.value.set('end');
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // <div>s inside a defer block have `d0` as a namespace.
                expect(ssrContents).toContain('<article>');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('defer block rendered');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                const registry = compRef.instance.registry;
                spyOn(registry, 'cleanup').and.callThrough();
                appRef.tick();
                yield appRef.whenStable();
                const appHostNode = compRef.location.nativeElement;
                const article = appHostNode.querySelector('article');
                (0, hydration_utils_1.verifyNodeWasNotHydrated)(article);
                expect(appHostNode.outerHTML).toContain('<span id="test" jsaction="click:;" ngb="d0">start</span>');
                expect(registry.has('d0')).toBeTruthy();
                const testElement = doc.getElementById('hydrate-me');
                const clickEvent = new CustomEvent('click');
                testElement.dispatchEvent(clickEvent);
                yield allPendingDynamicImports();
                appRef.tick();
                yield appRef.whenStable();
                (0, hydration_utils_1.verifyNodeWasHydrated)(article);
                expect(registry.cleanup).toHaveBeenCalledTimes(1);
                expect(registry.has('d0')).toBeFalsy();
                expect(appHostNode.outerHTML).toContain('<span id="test">start</span>');
            }));
            it('never', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (hydrate never) {
              <article>
                defer block rendered!
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.signal)('start');
                        }
                        fnA() { }
                        fnB() {
                            this.value.set('end');
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // <div>s inside a defer block have `d0` as a namespace.
                expect(ssrContents).toContain('<article>');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('defer block rendered');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const appHostNode = compRef.location.nativeElement;
                expect(appHostNode.outerHTML).toContain('<article>');
                yield (0, hydration_utils_1.timeout)(500); // wait for timer
                appRef.tick();
                yield allPendingDynamicImports();
                appRef.tick();
                expect(appHostNode.outerHTML).not.toContain('Outer block placeholder');
            }));
            it('defer triggers should not fire when hydrate never is used', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (on timer(1s); hydrate never) {
              <article>
                defer block rendered!
                <span id="test" (click)="fnB()">{{value()}}</span>
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.signal)('start');
                        }
                        fnA() { }
                        fnB() {
                            this.value.set('end');
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // <main> uses "eager" `custom-app-id` namespace.
                expect(ssrContents).toContain('<main jsaction="click:;');
                // <div>s inside a defer block have `d0` as a namespace.
                expect(ssrContents).toContain('<article>');
                // Outer defer block is rendered.
                expect(ssrContents).toContain('defer block rendered');
                // Internal cleanup before we do server->client transition in this test.
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                ////////////////////////////////
                const doc = (0, document_1.getDocument)();
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    hydrationFeatures,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const appHostNode = compRef.location.nativeElement;
                expect(appHostNode.outerHTML).toContain('<article>');
                expect(appHostNode.outerHTML).toContain('>start</span>');
                yield (0, hydration_utils_1.timeout)(500); // wait for timer
                appRef.tick();
                yield allPendingDynamicImports();
                appRef.tick();
                const testElement = doc.getElementById('test');
                const clickEvent2 = new CustomEvent('click');
                testElement.dispatchEvent(clickEvent2);
                appRef.tick();
                expect(appHostNode.outerHTML).toContain('>start</span>');
                expect(appHostNode.outerHTML).not.toContain('<span id="test">end</span>');
                expect(appHostNode.outerHTML).not.toContain('Outer block placeholder');
            }));
            it('should not annotate jsaction events for events inside a hydrate never block', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
          <main (click)="fnA()">
            @defer (on timer(1s); hydrate never) {
              <article>
                defer block rendered!
                <span id="test" (click)="fnB()">{{value()}}</span>
                @defer(on immediate; hydrate on idle) {
                  <p id="test2" (click)="fnB()">shouldn't be annotated</p>
                } @placeholder {
                  <p>blah de blah</p>
                }
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
            @defer (on timer(1s); hydrate on viewport) {
              <div>
                viewport section
                <p (click)="fnA()">has a binding</p>
            </div>
            } @placeholder {
              <span>another placeholder</span>
            }
          </main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.signal)('start');
                        }
                        fnA() { }
                        fnB() {
                            this.value.set('end');
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
                const appId = 'custom-app-id';
                const providers = [{ provide: core_1.APP_ID, useValue: appId }];
                const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).not.toContain('<span id="test" jsaction="click:;');
                expect(ssrContents).toContain('<span id="test">start</span>');
                expect(ssrContents).toContain('<p jsaction="click:;" ngb="d1">has a binding</p>');
                expect(ssrContents).not.toContain('<p id="test2" jsaction="click:;');
                expect(ssrContents).toContain('<p id="test2">shouldn\'t be annotated</p>');
            }));
        });
        it('should only count and log blocks that were skipped', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                <aside>Main defer block rendered!</aside>
                @defer (on viewport; hydrate on interaction) {
                  <p id="nested">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
            @defer (on viewport) {
              <p>This should remain in the registry</p>
            } @placeholder {
              <span>a second placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    fnA() { }
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }, (0, hydration_utils_1.withDebugConsole)()];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            appRef.tick();
            yield appRef.whenStable();
            (0, hydration_utils_1.verifyHasLog)(appRef, 'Angular hydrated 1 component(s) and 16 node(s), 0 component(s) were skipped. 2 defer block(s) were configured to use incremental hydration.');
        }));
    });
    describe('client side navigation', () => {
        beforeEach(() => {
            // This test emulates client-side behavior, set global server mode flag to `false`.
            globalThis['ngServerMode'] = false;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
                    (0, platform_browser_1.provideClientHydration)((0, platform_browser_1.withIncrementalHydration)()),
                ],
            });
        });
        afterEach(() => {
            globalThis['ngServerMode'] = undefined;
        });
        it('should not try to hydrate in CSR only cases', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          @defer (hydrate when true; on interaction) {
            <p>Defer block rendered!</p>
          } @placeholder {
            <span>Outer block placeholder</span>
          }
        `,
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
            const fixture = testing_1.TestBed.createComponent(SimpleComponent);
            fixture.detectChanges();
            // Verify that `hydrate when true` doesn't trigger rendering of the main
            // content in client-only use-cases (expecting to see placeholder content).
            expect(fixture.nativeElement.innerHTML).toContain('Outer block placeholder');
        }));
    });
    describe('control flow', () => {
        it('should support hydration for all items in a for loop', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main>
            @defer (on interaction; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                <p>Main defer block rendered!</p>
                @for (item of items; track $index) {
                  @defer (on interaction; hydrate on interaction) {
                    <article id="item-{{item}}">
                      defer block {{item}} rendered!
                      <span (click)="fnB()">{{value()}}</span>
                    </article>
                  } @placeholder {
                    <span>Outer block placeholder</span>
                  }
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('start');
                        this.items = [1, 2, 3, 4, 5, 6];
                        this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                    }
                    fnA() { }
                    fnB() {
                        this.value.set('end');
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            // <main> uses "eager" `custom-app-id` namespace.
            // <div>s inside a defer block have `d0` as a namespace.
            expect(ssrContents).toContain('<article id="item-1" jsaction="click:;keydown:;"');
            // Outer defer block is rendered.
            expect(ssrContents).toContain('defer block 1 rendered');
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            const registry = compRef.instance.registry;
            spyOn(registry, 'cleanup').and.callThrough();
            appRef.tick();
            yield appRef.whenStable();
            const appHostNode = compRef.location.nativeElement;
            expect(appHostNode.outerHTML).toContain('<article id="item-1" jsaction="click:;keydown:;"');
            // Emit an event inside of a defer block, which should result
            // in triggering the defer block (start loading deps, etc) and
            // subsequent hydration.
            const article = doc.getElementById('item-1');
            const clickEvent = new CustomEvent('click', { bubbles: true });
            article.dispatchEvent(clickEvent);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(appHostNode.outerHTML).not.toContain('<article id="item-1" jsaction="click:;keydown:;"');
            expect(appHostNode.outerHTML).not.toContain('<span>Outer block placeholder</span>');
            expect(registry.cleanup).toHaveBeenCalledTimes(1);
        }));
        it('should handle hydration and cleanup when if then condition changes', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main>
            @defer (on interaction; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                <p>Main defer block rendered!</p>
                @if (isServer) {
                  @defer (on interaction; hydrate on interaction) {
                    <article id="item">
                      nested defer block rendered!
                    </article>
                  } @placeholder {
                    <span>Outer block placeholder</span>
                  }
                } @else {
                  <p>client side</p>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('start');
                        this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                    }
                    fnA() { }
                    fnB() {
                        this.value.set('end');
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(ssrContents).toContain('<article id="item" jsaction="click:;keydown:;"');
            expect(ssrContents).toContain('nested defer block rendered');
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            appRef.tick();
            yield appRef.whenStable();
            const appHostNode = compRef.location.nativeElement;
            expect(appHostNode.outerHTML).toContain('nested defer block rendered');
            const article = doc.getElementById('item');
            const clickEvent = new CustomEvent('click', { bubbles: true });
            article.dispatchEvent(clickEvent);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(appHostNode.outerHTML).not.toContain('nested defer block rendered');
            expect(appHostNode.outerHTML).toContain('<p>client side</p>');
            // Emit an event inside of a defer block, which should result
            // in triggering the defer block (start loading deps, etc) and
            // subsequent hydration.
            expect(appHostNode.outerHTML).not.toContain('<span>Outer block placeholder</span>');
        }));
        it('should render an error block when loading fails and cleanup the original content', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        standalone: true,
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'app',
                        imports: [NestedCmp],
                        template: `
          <main>
            @defer (on interaction; hydrate on interaction) {
              <article id="item">
                <nested-cmp [block]="'primary'" />
              </article>
            } @placeholder {
              <span>Outer block placeholder</span>
            } @error {
              <p>Failed to load dependencies :(</p>
              <nested-cmp [block]="'error'" />
            }
          </main>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _cmps_decorators;
                let _cmps_initializers = [];
                let _cmps_extraInitializers = [];
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.cmps = __runInitializers(this, _cmps_initializers, void 0);
                        this.value = (__runInitializers(this, _cmps_extraInitializers), (0, core_1.signal)('start'));
                    }
                    fnA() { }
                    fnB() {
                        this.value.set('end');
                    }
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _cmps_decorators = [(0, core_1.ViewChildren)(NestedCmp)];
                    __esDecorate(null, null, _cmps_decorators, { kind: "field", name: "cmps", static: false, private: false, access: { has: obj => "cmps" in obj, get: obj => obj.cmps, set: (obj, value) => { obj.cmps = value; } }, metadata: _metadata }, _cmps_initializers, _cmps_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => [failedDynamicImport()];
                },
            };
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(ssrContents).toContain('<article id="item" jsaction="click:;keydown:;"');
            expect(ssrContents).toContain('Rendering primary block');
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [
                    ...providers,
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                ],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            appRef.tick();
            yield appRef.whenStable();
            const appHostNode = compRef.location.nativeElement;
            expect(appHostNode.outerHTML).toContain('Rendering primary block');
            const article = doc.getElementById('item');
            const clickEvent = new CustomEvent('click', { bubbles: true });
            article.dispatchEvent(clickEvent);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(appHostNode.outerHTML).not.toContain('Rendering primary block');
            expect(appHostNode.outerHTML).toContain('Rendering error block');
        }));
    });
    describe('cleanup', () => {
        it('should cleanup partial hydration blocks appropriately', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main (click)="fnA()">
            @defer (on idle; hydrate on interaction) {
              <p id="test">inside defer block</p>
              @if (isServer) {
                <span>Server!</span>
              } @else {
                <span>Client!</span>
              }
            } @loading {
              <span>Loading...</span>
            } @placeholder {
              <p>Placeholder!</p>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                    }
                    fnA() { }
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            // <main> uses "eager" `custom-app-id` namespace.
            expect(ssrContents).toContain('<main jsaction="click:;');
            // <div>s inside a defer block have `d0` as a namespace.
            expect(ssrContents).toContain('<p id="test" jsaction="click:;keydown:;" ngb="d0">inside defer block</p>');
            // Outer defer block is rendered.
            expect(ssrContents).toContain('<span jsaction="click:;keydown:;" ngb="d0">Server!</span>');
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            const registry = compRef.instance.registry;
            spyOn(registry, 'cleanup').and.callThrough();
            appRef.tick();
            yield appRef.whenStable();
            const appHostNode = compRef.location.nativeElement;
            expect(appHostNode.outerHTML).toContain('<p id="test" jsaction="click:;keydown:;" ngb="d0">inside defer block</p>');
            expect(appHostNode.outerHTML).toContain('<span jsaction="click:;keydown:;" ngb="d0">Server!</span>');
            const testElement = doc.getElementById('test');
            const clickEvent = new CustomEvent('click', { bubbles: true });
            testElement.dispatchEvent(clickEvent);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(appHostNode.outerHTML).toContain('<span>Client!</span>');
            expect(appHostNode.outerHTML).not.toContain('>Server!</span>');
            expect(registry.cleanup).toHaveBeenCalledTimes(1);
        }));
        it('should clear registry of blocks as they are hydrated', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                Main defer block rendered!
                @defer (on viewport; hydrate on interaction) {
                  <p id="nested">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                        this.jsActionMap = (0, core_1.inject)(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
                        this.contract = (0, core_1.inject)(event_delegation_utils_1.JSACTION_EVENT_CONTRACT);
                    }
                    fnA() { }
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            appRef.tick();
            yield appRef.whenStable();
            const registry = compRef.instance.registry;
            const jsActionMap = compRef.instance.jsActionMap;
            const contract = compRef.instance.contract;
            spyOn(contract.instance, 'cleanUp').and.callThrough();
            spyOn(registry, 'cleanup').and.callThrough();
            expect(registry.size).toBe(1);
            expect(jsActionMap.size).toBe(2);
            expect(registry.has('d0')).toBeTruthy();
            const mainBlock = doc.getElementById('main');
            const clickEvent = new CustomEvent('click', { bubbles: true });
            mainBlock.dispatchEvent(clickEvent);
            yield allPendingDynamicImports();
            expect(registry.size).toBe(1);
            expect(registry.has('d0')).toBeFalsy();
            expect(jsActionMap.size).toBe(1);
            expect(registry.cleanup).toHaveBeenCalledTimes(1);
            const nested = doc.getElementById('nested');
            const clickEvent2 = new CustomEvent('click', { bubbles: true });
            nested.dispatchEvent(clickEvent2);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(registry.size).toBe(0);
            expect(jsActionMap.size).toBe(0);
            expect(contract.instance.cleanUp).toHaveBeenCalled();
            expect(registry.cleanup).toHaveBeenCalledTimes(2);
        }));
        it('should clear registry of multiple blocks if they are hydrated in one go', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                Main defer block rendered!
                @defer (on viewport; hydrate on interaction) {
                  <p id="nested">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                        this.jsActionMap = (0, core_1.inject)(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
                        this.contract = (0, core_1.inject)(event_delegation_utils_1.JSACTION_EVENT_CONTRACT);
                    }
                    fnA() { }
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            appRef.tick();
            yield appRef.whenStable();
            const registry = compRef.instance.registry;
            const jsActionMap = compRef.instance.jsActionMap;
            const contract = compRef.instance.contract;
            spyOn(contract.instance, 'cleanUp').and.callThrough();
            expect(registry.size).toBe(1);
            expect(jsActionMap.size).toBe(2);
            expect(registry.has('d0')).toBeTruthy();
            const nested = doc.getElementById('nested');
            const clickEvent2 = new CustomEvent('click', { bubbles: true });
            nested.dispatchEvent(clickEvent2);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(registry.size).toBe(0);
            expect(jsActionMap.size).toBe(0);
            expect(contract.instance.cleanUp).toHaveBeenCalled();
        }));
        it('should clean up only one time per stack of blocks post hydration', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                Main defer block rendered!
                @defer (on viewport; hydrate on interaction) {
                  <p id="nested">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                        this.jsActionMap = (0, core_1.inject)(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
                        this.contract = (0, core_1.inject)(event_delegation_utils_1.JSACTION_EVENT_CONTRACT);
                    }
                    fnA() { }
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            appRef.tick();
            yield appRef.whenStable();
            const registry = compRef.instance.registry;
            const jsActionMap = compRef.instance.jsActionMap;
            const contract = compRef.instance.contract;
            spyOn(contract.instance, 'cleanUp').and.callThrough();
            spyOn(registry, 'cleanup').and.callThrough();
            expect(registry.size).toBe(1);
            expect(jsActionMap.size).toBe(2);
            expect(registry.has('d0')).toBeTruthy();
            const nested = doc.getElementById('nested');
            const clickEvent2 = new CustomEvent('click', { bubbles: true });
            nested.dispatchEvent(clickEvent2);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(registry.size).toBe(0);
            expect(jsActionMap.size).toBe(0);
            expect(contract.instance.cleanUp).toHaveBeenCalled();
            expect(registry.cleanup).toHaveBeenCalledTimes(1);
        }));
        it('should leave blocks in registry when not hydrated', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on interaction) {
              <div id="main" (click)="fnA()">
                <aside>Main defer block rendered!</aside>
                @defer (on viewport; hydrate on interaction) {
                  <p id="nested">Nested defer block</p>
                } @placeholder {
                  <span>Inner block placeholder</span>
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
            @defer (on viewport; hydrate on hover) {
              <p>This should remain in the registry</p>
            } @placeholder {
              <span>a second placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.registry = (0, core_1.inject)(registry_1.DEHYDRATED_BLOCK_REGISTRY);
                        this.jsActionMap = (0, core_1.inject)(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
                        this.contract = (0, core_1.inject)(event_delegation_utils_1.JSACTION_EVENT_CONTRACT);
                    }
                    fnA() { }
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
            const appId = 'custom-app-id';
            const providers = [{ provide: core_1.APP_ID, useValue: appId }];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            // Internal cleanup before we do server->client transition in this test.
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
            ////////////////////////////////
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers, { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            appRef.tick();
            yield appRef.whenStable();
            const contract = compRef.instance.contract;
            spyOn(contract.instance, 'cleanUp').and.callThrough();
            const registry = compRef.instance.registry;
            const jsActionMap = compRef.instance.jsActionMap;
            spyOn(registry, 'cleanup').and.callThrough();
            // registry size should be the number of highest level dehydrated defer blocks
            // in this case, 2.
            expect(registry.size).toBe(2);
            // jsactionmap should include all elements that have jsaction on them, in this
            // case, 3, due to the defer block root nodes.
            expect(jsActionMap.size).toBe(3);
            expect(registry.has('d0')).toBeTruthy();
            const nested = doc.getElementById('nested');
            const clickEvent2 = new CustomEvent('click', { bubbles: true });
            nested.dispatchEvent(clickEvent2);
            yield allPendingDynamicImports();
            appRef.tick();
            expect(registry.size).toBe(1);
            expect(jsActionMap.size).toBe(1);
            expect(registry.has('d2')).toBeTruthy();
            expect(contract.instance.cleanUp).not.toHaveBeenCalled();
            expect(registry.cleanup).toHaveBeenCalledTimes(1);
        }));
    });
    describe('Router', () => {
        it('should trigger event replay after next render', () => __awaiter(void 0, void 0, void 0, function* () {
            let DeferredCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'deferred',
                        template: `<p>Deferred content</p>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DeferredCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "DeferredCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DeferredCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DeferredCmp = _classThis;
            })();
            let OtherCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'other',
                        template: `<p>OtherCmp content</p>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "OtherCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherCmp = _classThis;
            })();
            let HomeCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'home',
                        imports: [router_1.RouterLink, DeferredCmp],
                        template: `
          <main (click)="fnA()">
            @defer (on viewport; hydrate on hover) {
              <div id="main" (click)="fnA()">
                <aside>Main defer block rendered!</aside>
                @if (true) {
                  @defer (on viewport; hydrate on hover) {
                    <deferred />
                    <p id="nested">Nested defer block</p>
                    <a id="route-link" [routerLink]="[path, thing(), stuff()]">Go There</a>
                  } @placeholder {
                    <span>Inner block placeholder</span>
                  }
                }
              </div>
            } @placeholder {
              <span>Outer block placeholder</span>
            }
          </main>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HomeCmp = _classThis = class {
                    constructor() {
                        this.path = 'other';
                        this.thing = (0, core_1.signal)('thing');
                        this.stuff = (0, core_1.signal)('stuff');
                    }
                    fnA() { }
                };
                __setFunctionName(_classThis, "HomeCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HomeCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HomeCmp = _classThis;
            })();
            const routes = [
                {
                    path: '',
                    component: HomeCmp,
                },
                {
                    path: 'other/thing/stuff',
                    component: OtherCmp,
                },
            ];
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        imports: [router_1.RouterOutlet],
                        template: `
          Works!
          <router-outlet />
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.location = (0, core_1.inject)(common_1.Location);
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
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        return [dynamicImportOf(DeferredCmp, 100)];
                    };
                },
            };
            const appId = 'custom-app-id';
            const providers = [
                { provide: core_1.APP_ID, useValue: appId },
                { provide: common_1.PlatformLocation, useClass: testing_2.MockPlatformLocation },
                { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                (0, router_1.provideRouter)(routes),
            ];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent, HomeCmp, DeferredCmp);
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            yield appRef.whenStable();
            const appHostNode = compRef.location.nativeElement;
            const location = compRef.instance.location;
            const routeLink = doc.getElementById('route-link');
            routeLink.click();
            yield allPendingDynamicImports();
            appRef.tick();
            yield allPendingDynamicImports();
            yield appRef.whenStable();
            expect(location.path()).toBe('/other/thing/stuff');
            expect(appHostNode.outerHTML).toContain('<p>OtherCmp content</p>');
        }));
        it('should trigger immediate with a lazy loaded route', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedMoreCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-more',
                        template: `
          <div>
            @defer(hydrate on immediate) {
              <button id="click-me" (click)="clickMe()">Click me I'm dehydrated?</button>
              <p id="hydrated">{{hydrated()}}</p>
            }
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NestedMoreCmp = _classThis = class {
                    constructor() {
                        this.hydrated = (0, core_1.signal)('nope');
                        if (!(0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID))) {
                            this.hydrated.set('yup');
                        }
                    }
                };
                __setFunctionName(_classThis, "NestedMoreCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedMoreCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedMoreCmp = _classThis;
            })();
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested',
                        imports: [NestedMoreCmp],
                        template: `
          <div>
            @defer(hydrate on interaction) {
              <nested-more />
            }
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NestedCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let LazyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        imports: [NestedCmp],
                        template: `
          @defer (hydrate on interaction) {
            <nested />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyCmp = _classThis;
            })();
            const routes = [
                {
                    path: '',
                    loadComponent: () => dynamicImportOf(LazyCmp, 50),
                },
            ];
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        imports: [router_1.RouterOutlet],
                        template: `
          Works!
          <router-outlet />
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                    constructor() {
                        this.location = (0, core_1.inject)(common_1.Location);
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
            const appId = 'custom-app-id';
            const providers = [
                { provide: core_1.APP_ID, useValue: appId },
                { provide: common_1.PlatformLocation, useClass: testing_2.MockPlatformLocation },
                (0, router_1.provideRouter)(routes),
            ];
            const hydrationFeatures = () => [(0, platform_browser_1.withIncrementalHydration)()];
            const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders: providers, hydrationFeatures });
            const ssrContents = (0, dom_utils_1.getAppContents)(html);
            expect(ssrContents).toContain(`<button id="click-me" jsaction="click:;" ngb="d2">Click me I'm dehydrated?</button>`);
            expect(ssrContents).toContain(`<p id="hydrated">nope</p>`);
            (0, dom_utils_1.resetTViewsFor)(SimpleComponent, LazyCmp);
            const doc = (0, document_1.getDocument)();
            const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                envProviders: [...providers],
                hydrationFeatures,
            });
            const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
            yield appRef.whenStable();
            yield allPendingDynamicImports();
            const appHostNode = compRef.location.nativeElement;
            expect(appHostNode.outerHTML).toContain(`<button id="click-me">Click me I'm dehydrated?</button>`);
            expect(appHostNode.outerHTML).toContain(`<p id="hydrated">yup</p>`);
        }));
    });
});
