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
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
let SecondDeferredComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'second-deferred-comp',
            template: `<div class="more">More Deferred Component</div>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SecondDeferredComp = _classThis = class {
    };
    __setFunctionName(_classThis, "SecondDeferredComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SecondDeferredComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SecondDeferredComp = _classThis;
})();
const COMMON_PROVIDERS = [{ provide: core_1.PLATFORM_ID, useValue: common_1.ɵPLATFORM_BROWSER_ID }];
describe('DeferFixture', () => {
    it('should start in manual behavior mode', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
            teardown: { destroyAfterEach: true },
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const el = componentFixture.nativeElement;
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
    }));
    it('should start in manual trigger mode by default', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const el = componentFixture.nativeElement;
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
    }));
    it('should defer load immediately on playthrough', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (when shouldLoad) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
                constructor() {
                    this.shouldLoad = false;
                }
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const el = componentFixture.nativeElement;
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
        componentFixture.componentInstance.shouldLoad = true;
        componentFixture.detectChanges();
        yield componentFixture.whenStable(); // await loading of deps
        (0, matchers_1.expect)(el.querySelector('.more')).toBeDefined();
    }));
    it('should not defer load immediately when set to manual', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (when shouldLoad) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
                constructor() {
                    this.shouldLoad = false;
                }
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const el = componentFixture.nativeElement;
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
        componentFixture.componentInstance.shouldLoad = true;
        componentFixture.detectChanges();
        yield componentFixture.whenStable(); // await loading of deps
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
    }));
    it('should render a completed defer state', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        const el = componentFixture.nativeElement;
        yield deferBlock.render(testing_1.DeferBlockState.Complete);
        (0, matchers_1.expect)(el.querySelector('.more')).toBeDefined();
    }));
    it('should not wait forever if application is unstable for a long time', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
                constructor(taskService) {
                    // Add a task and never remove it. Keeps application unstable forever
                    taskService.add();
                }
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        const el = componentFixture.nativeElement;
        yield deferBlock.render(testing_1.DeferBlockState.Complete);
        (0, matchers_1.expect)(el.querySelector('.more')).toBeDefined();
    }));
    it('should work with templates that have local refs', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <ng-template #template>Hello</ng-template>
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        const el = componentFixture.nativeElement;
        yield deferBlock.render(testing_1.DeferBlockState.Complete);
        (0, matchers_1.expect)(el.querySelector('.more')).toBeDefined();
    }));
    it('should render a placeholder defer state', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          } @placeholder {
            <span class="ph">This is placeholder content</span>
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        const el = componentFixture.nativeElement;
        yield deferBlock.render(testing_1.DeferBlockState.Placeholder);
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
        const phContent = el.querySelector('.ph');
        (0, matchers_1.expect)(phContent).toBeDefined();
        (0, matchers_1.expect)(phContent === null || phContent === void 0 ? void 0 : phContent.innerHTML).toBe('This is placeholder content');
    }));
    it('should render a loading defer state', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          } @loading {
            <span class="loading">Loading...</span>
          }w
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        const el = componentFixture.nativeElement;
        yield deferBlock.render(testing_1.DeferBlockState.Loading);
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
        const loadingContent = el.querySelector('.loading');
        (0, matchers_1.expect)(loadingContent).toBeDefined();
        (0, matchers_1.expect)(loadingContent === null || loadingContent === void 0 ? void 0 : loadingContent.innerHTML).toBe('Loading...');
    }));
    it('should render an error defer state', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          } @error {
            <span class="error">Flagrant Error!</span>
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        const el = componentFixture.nativeElement;
        yield deferBlock.render(testing_1.DeferBlockState.Error);
        (0, matchers_1.expect)(el.querySelectorAll('.more').length).toBe(0);
        const errContent = el.querySelector('.error');
        (0, matchers_1.expect)(errContent).toBeDefined();
        (0, matchers_1.expect)(errContent === null || errContent === void 0 ? void 0 : errContent.innerHTML).toBe('Flagrant Error!');
    }));
    it('should throw when rendering a template that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        try {
            yield deferBlock.render(testing_1.DeferBlockState.Placeholder);
        }
        catch (er) {
            (0, matchers_1.expect)(er.message).toBe('Tried to render this defer block in the `Placeholder` state, but' +
                ' there was no @placeholder block defined in a template.');
        }
    }));
    it('should transition between states when `after` and `minimum` are used', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            Main content
          } @loading (after 1s) {
            Loading
          } @placeholder (minimum 2s) {
            Placeholder
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        yield deferBlock.render(testing_1.DeferBlockState.Placeholder);
        (0, matchers_1.expect)(componentFixture.nativeElement.outerHTML).toContain('Placeholder');
        yield deferBlock.render(testing_1.DeferBlockState.Loading);
        (0, matchers_1.expect)(componentFixture.nativeElement.outerHTML).toContain('Loading');
        yield deferBlock.render(testing_1.DeferBlockState.Complete);
        (0, matchers_1.expect)(componentFixture.nativeElement.outerHTML).toContain('Main');
    }));
    it('should get child defer blocks', () => __awaiter(void 0, void 0, void 0, function* () {
        let DeferredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'deferred-comp',
                    imports: [SecondDeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <second-deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferredComp = _classThis;
        })();
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    imports: [DeferredComp],
                    template: `
        <div>
          @defer (on immediate) {
            <deferred-comp />
          }
        </div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp, DeferredComp, SecondDeferredComp],
            providers: COMMON_PROVIDERS,
        });
        const componentFixture = testing_1.TestBed.createComponent(DeferComp);
        const deferBlock = (yield componentFixture.getDeferBlocks())[0];
        yield deferBlock.render(testing_1.DeferBlockState.Complete);
        const fixtures = yield deferBlock.getDeferBlocks();
        (0, matchers_1.expect)(fixtures.length).toBe(1);
    }));
});
