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
const animations_1 = require("@angular/animations");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const application_ref_1 = require("@angular/core/src/application/application_ref");
const console_1 = require("@angular/core/src/console");
const platform_1 = require("@angular/core/src/platform/platform");
const testing_1 = require("@angular/core/testing");
const testing_internal_1 = require("@angular/core/testing/src/testing_internal");
const index_1 = require("../../index");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const animations_2 = require("../../animations");
const matchers_1 = require("../../testing/src/matchers");
const browser_1 = require("../../src/browser");
let NonExistentComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'non-existent',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NonExistentComp = _classThis = class {
    };
    __setFunctionName(_classThis, "NonExistentComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NonExistentComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NonExistentComp = _classThis;
})();
let HelloRootCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-app',
            template: '{{greeting}} world!',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloRootCmp = _classThis = class {
        constructor() {
            this.greeting = 'hello';
        }
    };
    __setFunctionName(_classThis, "HelloRootCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloRootCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloRootCmp = _classThis;
})();
let HelloRootCmp2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-app-2',
            template: '{{greeting}} world, again!',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloRootCmp2 = _classThis = class {
        constructor() {
            this.greeting = 'hello';
        }
    };
    __setFunctionName(_classThis, "HelloRootCmp2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloRootCmp2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloRootCmp2 = _classThis;
})();
let HelloRootCmp3 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-app',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloRootCmp3 = _classThis = class {
        constructor(appBinding) {
            this.appBinding = appBinding;
        }
    };
    __setFunctionName(_classThis, "HelloRootCmp3");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloRootCmp3 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloRootCmp3 = _classThis;
})();
let HelloRootCmp4 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-app',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloRootCmp4 = _classThis = class {
        constructor(appRef) {
            this.appRef = appRef;
        }
    };
    __setFunctionName(_classThis, "HelloRootCmp4");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloRootCmp4 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloRootCmp4 = _classThis;
})();
let HelloRootDirectiveIsNotCmp = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'hello-app',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloRootDirectiveIsNotCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "HelloRootDirectiveIsNotCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloRootDirectiveIsNotCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloRootDirectiveIsNotCmp = _classThis;
})();
let HelloOnDestroyTickCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-app',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloOnDestroyTickCmp = _classThis = class {
        constructor(appRef) {
            this.appRef = appRef;
        }
        ngOnDestroy() {
            this.appRef.tick();
        }
    };
    __setFunctionName(_classThis, "HelloOnDestroyTickCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloOnDestroyTickCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloOnDestroyTickCmp = _classThis;
})();
let HelloCmpUsingCustomElement = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-app',
            template: '<some-el [someProp]="true">hello world!</some-el>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloCmpUsingCustomElement = _classThis = class {
    };
    __setFunctionName(_classThis, "HelloCmpUsingCustomElement");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloCmpUsingCustomElement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloCmpUsingCustomElement = _classThis;
})();
class MockConsole {
    constructor() {
        this.res = [];
    }
    error(...s) {
        this.res.push(s);
    }
}
class DummyConsole {
    constructor() {
        this.warnings = [];
    }
    log(message) { }
    warn(message) {
        this.warnings.push(message);
    }
}
function bootstrap(cmpType, providers = [], platformProviders = [], imports = []) {
    let TestModule = (() => {
        let _classDecorators = [(0, core_1.NgModule)({
                imports: [index_1.BrowserModule, ...imports],
                declarations: [cmpType],
                bootstrap: [cmpType],
                providers: providers,
                schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var TestModule = _classThis = class {
        };
        __setFunctionName(_classThis, "TestModule");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TestModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return TestModule = _classThis;
    })();
    return (0, platform_browser_dynamic_1.platformBrowserDynamic)(platformProviders).bootstrapModule(TestModule);
}
describe('bootstrap factory method', () => {
    let el;
    let el2;
    let testProviders;
    let lightDom;
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    let compilerConsole;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: [testing_internal_1.Log] });
    });
    beforeEach((0, testing_1.inject)([common_1.DOCUMENT], (doc) => {
        (0, platform_1.destroyPlatform)();
        compilerConsole = new DummyConsole();
        testProviders = [{ provide: console_1.Console, useValue: compilerConsole }];
        const oldRoots = doc.querySelectorAll('hello-app,hello-app-2,light-dom-el');
        for (let i = 0; i < oldRoots.length; i++) {
            (0, common_1.ɵgetDOM)().remove(oldRoots[i]);
        }
        el = (0, common_1.ɵgetDOM)().createElement('hello-app', doc);
        el2 = (0, common_1.ɵgetDOM)().createElement('hello-app-2', doc);
        lightDom = (0, common_1.ɵgetDOM)().createElement('light-dom-el', doc);
        doc.body.appendChild(el);
        doc.body.appendChild(el2);
        el.appendChild(lightDom);
        lightDom.textContent = 'loading';
    }));
    afterEach(platform_1.destroyPlatform);
    describe('bootstrapApplication', () => {
        const NAME = new core_1.InjectionToken('name');
        let SimpleComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    selector: 'hello-app',
                    template: 'Hello from {{ name }}!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SimpleComp = _classThis = class {
                constructor() {
                    this.name = 'SimpleComp';
                }
            };
            __setFunctionName(_classThis, "SimpleComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SimpleComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SimpleComp = _classThis;
        })();
        let SimpleComp2 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    selector: 'hello-app-2',
                    template: 'Hello from {{ name }}!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SimpleComp2 = _classThis = class {
                constructor() {
                    this.name = 'SimpleComp2';
                }
            };
            __setFunctionName(_classThis, "SimpleComp2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SimpleComp2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SimpleComp2 = _classThis;
        })();
        let ComponentWithDeps = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    selector: 'hello-app',
                    template: 'Hello from {{ name }}!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentWithDeps = _classThis = class {
                constructor(name) {
                    this.name = name;
                }
            };
            __setFunctionName(_classThis, "ComponentWithDeps");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentWithDeps = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentWithDeps = _classThis;
        })();
        let NonStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'hello-app-2',
                    template: 'Hello from {{ name }}!',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneComp = _classThis = class {
                constructor() {
                    this.name = 'NonStandaloneComp';
                }
            };
            __setFunctionName(_classThis, "NonStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandaloneComp = _classThis;
        })();
        let NonStandaloneCompModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [NonStandaloneComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneCompModule = _classThis = class {
            };
            __setFunctionName(_classThis, "NonStandaloneCompModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandaloneCompModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandaloneCompModule = _classThis;
        })();
        it('should work for simple standalone components', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, browser_1.bootstrapApplication)(SimpleComp);
            (0, matchers_1.expect)(el.innerText).toBe('Hello from SimpleComp!');
        }));
        it('should allow passing providers during the bootstrap', () => __awaiter(void 0, void 0, void 0, function* () {
            const providers = [{ provide: NAME, useValue: 'Name via DI' }];
            yield (0, browser_1.bootstrapApplication)(ComponentWithDeps, { providers });
            (0, matchers_1.expect)(el.innerText).toBe('Hello from Name via DI!');
        }));
        it('should reuse existing platform', () => __awaiter(void 0, void 0, void 0, function* () {
            const platformProviders = [{ provide: NAME, useValue: 'Name via DI (Platform level)' }];
            (0, platform_browser_dynamic_1.platformBrowserDynamic)(platformProviders);
            yield (0, browser_1.bootstrapApplication)(ComponentWithDeps);
            (0, matchers_1.expect)(el.innerText).toBe('Hello from Name via DI (Platform level)!');
        }));
        it('should allow bootstrapping multiple apps', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, browser_1.bootstrapApplication)(SimpleComp);
            yield (0, browser_1.bootstrapApplication)(SimpleComp2);
            (0, matchers_1.expect)(el.innerText).toBe('Hello from SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from SimpleComp2!');
        }));
        it('should keep change detection isolated for separately bootstrapped apps', () => __awaiter(void 0, void 0, void 0, function* () {
            const appRef1 = yield (0, browser_1.bootstrapApplication)(SimpleComp);
            const appRef2 = yield (0, browser_1.bootstrapApplication)(SimpleComp2);
            (0, matchers_1.expect)(el.innerText).toBe('Hello from SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from SimpleComp2!');
            // Update name in both components, but trigger change detection only in the first one.
            appRef1.components[0].instance.name = 'Updated SimpleComp';
            appRef2.components[0].instance.name = 'Updated SimpleComp2';
            // Trigger change detection for the first app.
            appRef1.tick();
            // Expect that the first component content is updated, but the second one remains the same.
            (0, matchers_1.expect)(el.innerText).toBe('Hello from Updated SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from SimpleComp2!');
            // Trigger change detection for the second app.
            appRef2.tick();
            // Now the second component should be updated as well.
            (0, matchers_1.expect)(el.innerText).toBe('Hello from Updated SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from Updated SimpleComp2!');
        }));
        it('should allow bootstrapping multiple standalone components within the same app', () => __awaiter(void 0, void 0, void 0, function* () {
            const appRef = yield (0, browser_1.bootstrapApplication)(SimpleComp);
            appRef.bootstrap(SimpleComp2);
            (0, matchers_1.expect)(el.innerText).toBe('Hello from SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from SimpleComp2!');
            // Update name in both components.
            appRef.components[0].instance.name = 'Updated SimpleComp';
            appRef.components[1].instance.name = 'Updated SimpleComp2';
            // Run change detection for the app.
            appRef.tick();
            // Expect both components to be updated, since they belong to the same app.
            (0, matchers_1.expect)(el.innerText).toBe('Hello from Updated SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from Updated SimpleComp2!');
        }));
        it('should allow bootstrapping non-standalone components within the same app', () => __awaiter(void 0, void 0, void 0, function* () {
            const appRef = yield (0, browser_1.bootstrapApplication)(SimpleComp);
            // ApplicationRef should still allow bootstrapping non-standalone
            // components into the same application.
            appRef.bootstrap(NonStandaloneComp);
            (0, matchers_1.expect)(el.innerText).toBe('Hello from SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from NonStandaloneComp!');
            // Update name in both components.
            appRef.components[0].instance.name = 'Updated SimpleComp';
            appRef.components[1].instance.name = 'Updated NonStandaloneComp';
            // Run change detection for the app.
            appRef.tick();
            // Expect both components to be updated, since they belong to the same app.
            (0, matchers_1.expect)(el.innerText).toBe('Hello from Updated SimpleComp!');
            (0, matchers_1.expect)(el2.innerText).toBe('Hello from Updated NonStandaloneComp!');
        }));
        it('should throw when trying to bootstrap a non-standalone component', () => __awaiter(void 0, void 0, void 0, function* () {
            const msg = 'NG0907: The NonStandaloneComp component is not marked as standalone, ' +
                'but Angular expects to have a standalone component here. Please make sure the ' +
                'NonStandaloneComp component has the `standalone: true` flag in the decorator.';
            let bootstrapError = null;
            try {
                yield (0, browser_1.bootstrapApplication)(NonStandaloneComp);
            }
            catch (e) {
                bootstrapError = e.message;
            }
            (0, matchers_1.expect)(bootstrapError).toBe(msg);
        }));
        it('should throw when trying to bootstrap a standalone directive', () => __awaiter(void 0, void 0, void 0, function* () {
            let StandaloneDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: true,
                        selector: '[dir]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneDirective = _classThis;
            })();
            const msg = //
             'NG0906: The StandaloneDirective is not an Angular component, ' +
                'make sure it has the `@Component` decorator.';
            let bootstrapError = null;
            try {
                yield (0, browser_1.bootstrapApplication)(StandaloneDirective);
            }
            catch (e) {
                bootstrapError = e.message;
            }
            (0, matchers_1.expect)(bootstrapError).toBe(msg);
        }));
        it('should throw when trying to bootstrap a non-annotated class', () => __awaiter(void 0, void 0, void 0, function* () {
            class NonAnnotatedClass {
            }
            const msg = //
             'NG0906: The NonAnnotatedClass is not an Angular component, ' +
                'make sure it has the `@Component` decorator.';
            let bootstrapError = null;
            try {
                yield (0, browser_1.bootstrapApplication)(NonAnnotatedClass);
            }
            catch (e) {
                bootstrapError = e.message;
            }
            (0, matchers_1.expect)(bootstrapError).toBe(msg);
        }));
        it('should have the TransferState token available', () => __awaiter(void 0, void 0, void 0, function* () {
            let state;
            let StandaloneComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'hello-app',
                        standalone: true,
                        template: '...',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneComponent = _classThis = class {
                    constructor() {
                        state = (0, core_1.inject)(core_1.TransferState);
                    }
                };
                __setFunctionName(_classThis, "StandaloneComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneComponent = _classThis;
            })();
            yield (0, browser_1.bootstrapApplication)(StandaloneComponent);
            (0, matchers_1.expect)(state).toBeInstanceOf(core_1.TransferState);
        }));
        it('should reject the bootstrapApplication promise if an imported module throws', (done) => {
            let ErrorModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ErrorModule = _classThis = class {
                    constructor() {
                        throw new Error('This error should be in the promise rejection');
                    }
                };
                __setFunctionName(_classThis, "ErrorModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ErrorModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ErrorModule = _classThis;
            })();
            (0, browser_1.bootstrapApplication)(SimpleComp, {
                providers: [(0, core_1.importProvidersFrom)(ErrorModule)],
            }).then(() => done.fail('Expected bootstrap promised to be rejected'), () => done());
        });
        describe('with animations', () => {
            let AnimationCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        selector: 'hello-app',
                        template: '<div @myAnimation (@myAnimation.start)="onStart($event)">Hello from AnimationCmp!</div>',
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('void => *', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(5)])]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnimationCmp = _classThis = class {
                    constructor() {
                        var _a;
                        this.renderer = (_a = (0, core_1.inject)(core_1.ANIMATION_MODULE_TYPE, { optional: true })) !== null && _a !== void 0 ? _a : 'not found';
                    }
                    onStart(event) {
                        this.startEvent = event;
                    }
                };
                __setFunctionName(_classThis, "AnimationCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationCmp = _classThis;
            })();
            it('should enable animations when using provideAnimations()', () => __awaiter(void 0, void 0, void 0, function* () {
                const appRef = yield (0, browser_1.bootstrapApplication)(AnimationCmp, {
                    providers: [(0, animations_2.provideAnimations)()],
                });
                const cmp = appRef.components[0].instance;
                // Wait until animation is completed.
                yield new Promise((resolve) => setTimeout(resolve, 10));
                (0, matchers_1.expect)(cmp.renderer).toBe('BrowserAnimations');
                (0, matchers_1.expect)(cmp.startEvent.triggerName).toEqual('myAnimation');
                (0, matchers_1.expect)(cmp.startEvent.phaseName).toEqual('start');
                (0, matchers_1.expect)(el.innerText).toBe('Hello from AnimationCmp!');
            }));
            it('should use noop animations renderer when using provideNoopAnimations()', () => __awaiter(void 0, void 0, void 0, function* () {
                const appRef = yield (0, browser_1.bootstrapApplication)(AnimationCmp, {
                    providers: [(0, animations_2.provideNoopAnimations)()],
                });
                const cmp = appRef.components[0].instance;
                // Wait until animation is completed.
                yield new Promise((resolve) => setTimeout(resolve, 10));
                (0, matchers_1.expect)(cmp.renderer).toBe('NoopAnimations');
                (0, matchers_1.expect)(cmp.startEvent.triggerName).toEqual('myAnimation');
                (0, matchers_1.expect)(cmp.startEvent.phaseName).toEqual('start');
                (0, matchers_1.expect)(el.innerText).toBe('Hello from AnimationCmp!');
            }));
        });
        it('initializes modules inside the NgZone when using `provideZoneChangeDetection`', () => __awaiter(void 0, void 0, void 0, function* () {
            let moduleInitialized = false;
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                    constructor() {
                        (0, matchers_1.expect)(core_1.NgZone.isInAngularZone()).toBe(true);
                        moduleInitialized = true;
                    }
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            let AnimationCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        selector: 'hello-app',
                        imports: [SomeModule],
                        standalone: true,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnimationCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AnimationCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationCmp = _classThis;
            })();
            yield (0, browser_1.bootstrapApplication)(AnimationCmp, {
                providers: [(0, core_1.provideZoneChangeDetection)({ eventCoalescing: true })],
            });
            (0, matchers_1.expect)(moduleInitialized).toBe(true);
        }));
    });
    it('should throw if bootstrapped Directive is not a Component', (done) => {
        const logger = new MockConsole();
        const errorHandler = new core_1.ErrorHandler();
        errorHandler._console = logger;
        bootstrap(HelloRootDirectiveIsNotCmp, [{ provide: core_1.ErrorHandler, useValue: errorHandler }]).catch((error) => {
            (0, matchers_1.expect)(error).toEqual(new Error(`HelloRootDirectiveIsNotCmp cannot be used as an entry component.`));
            done();
        });
    });
    it('should have the TransferState token available in NgModule bootstrap', () => __awaiter(void 0, void 0, void 0, function* () {
        let state;
        let NonStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'hello-app',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneComponent = _classThis = class {
                constructor() {
                    state = (0, core_1.inject)(core_1.TransferState);
                }
            };
            __setFunctionName(_classThis, "NonStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandaloneComponent = _classThis;
        })();
        yield bootstrap(NonStandaloneComponent);
        (0, matchers_1.expect)(state).toBeInstanceOf(core_1.TransferState);
    }));
    it('should retrieve sanitizer', (0, testing_1.inject)([core_1.Injector], (injector) => {
        const sanitizer = injector.get(core_1.Sanitizer, null);
        // We don't want to have sanitizer in DI. We use DI only to overwrite the
        // sanitizer, but not for default one. The default one is pulled in by the Ivy
        // instructions as needed.
        (0, matchers_1.expect)(sanitizer).toBe(null);
    }));
    it('should throw if no element is found', (done) => {
        const logger = new MockConsole();
        const errorHandler = new core_1.ErrorHandler();
        errorHandler._console = logger;
        bootstrap(NonExistentComp, [{ provide: core_1.ErrorHandler, useValue: errorHandler }]).then(null, (reason) => {
            (0, matchers_1.expect)(reason.message).toContain('The selector "non-existent" did not match any elements');
            done();
            return null;
        });
    });
    it('should throw if no provider', () => __awaiter(void 0, void 0, void 0, function* () {
        const logger = new MockConsole();
        const errorHandler = new core_1.ErrorHandler();
        errorHandler._console = logger;
        class IDontExist {
        }
        let CustomCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'cmp',
                    template: 'Cmp',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CustomCmp = _classThis = class {
                constructor(iDontExist) { }
            };
            __setFunctionName(_classThis, "CustomCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CustomCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CustomCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'hello-app',
                    template: '<cmp></cmp>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        let CustomModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ declarations: [CustomCmp], exports: [CustomCmp] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CustomModule = _classThis = class {
            };
            __setFunctionName(_classThis, "CustomModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CustomModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CustomModule = _classThis;
        })();
        yield expectAsync(bootstrap(RootCmp, [{ provide: core_1.ErrorHandler, useValue: errorHandler }], [], [CustomModule])).toBeRejected();
    }));
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
        it('should forward the error to promise when bootstrap fails', (done) => {
            const logger = new MockConsole();
            const errorHandler = new core_1.ErrorHandler();
            errorHandler._console = logger;
            const refPromise = bootstrap(NonExistentComp, [
                { provide: core_1.ErrorHandler, useValue: errorHandler },
            ]);
            refPromise.then(null, (reason) => {
                (0, matchers_1.expect)(reason.message).toContain('The selector "non-existent" did not match any elements');
                done();
            });
        });
        it('should invoke the default exception handler when bootstrap fails', (done) => {
            const logger = new MockConsole();
            const errorHandler = new core_1.ErrorHandler();
            errorHandler._console = logger;
            const refPromise = bootstrap(NonExistentComp, [
                { provide: core_1.ErrorHandler, useValue: errorHandler },
            ]);
            refPromise.then(null, (reason) => {
                (0, matchers_1.expect)(logger.res[0].join('#')).toContain('ERROR#Error: NG05104: The selector "non-existent" did not match any elements');
                done();
                return null;
            });
        });
    }
    it('should create an injector promise', () => __awaiter(void 0, void 0, void 0, function* () {
        const refPromise = bootstrap(HelloRootCmp, testProviders);
        (0, matchers_1.expect)(refPromise).toEqual(jasmine.any(Promise));
        yield refPromise; // complete component initialization before switching to the next test
    }));
    it('should set platform name to browser', (done) => {
        const refPromise = bootstrap(HelloRootCmp, testProviders);
        refPromise.then((ref) => {
            (0, matchers_1.expect)((0, common_1.isPlatformBrowser)(ref.injector.get(core_1.PLATFORM_ID))).toBe(true);
            done();
        }, done.fail);
    });
    it('should display hello world', (done) => {
        const refPromise = bootstrap(HelloRootCmp, testProviders);
        refPromise.then((ref) => {
            (0, matchers_1.expect)(el).toHaveText('hello world!');
            (0, matchers_1.expect)(el.getAttribute('ng-version')).toEqual(core_1.VERSION.full);
            done();
        }, done.fail);
    });
    it('should throw a descriptive error if BrowserModule is installed again via a lazily loaded module', (done) => {
        let AsyncModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.BrowserModule] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AsyncModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AsyncModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AsyncModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AsyncModule = _classThis;
        })();
        bootstrap(HelloRootCmp, testProviders)
            .then((ref) => {
            const compiler = ref.injector.get(core_1.Compiler);
            return compiler.compileModuleAsync(AsyncModule).then((factory) => {
                (0, matchers_1.expect)(() => factory.create(ref.injector)).toThrowError('NG05100: Providers from the `BrowserModule` have already been loaded. ' +
                    'If you need access to common directives such as NgIf and NgFor, ' +
                    'import the `CommonModule` instead.');
            });
        })
            .then(() => done(), (err) => done.fail(err));
    });
    it('should support multiple calls to bootstrap', (done) => {
        const refPromise1 = bootstrap(HelloRootCmp, testProviders);
        const refPromise2 = bootstrap(HelloRootCmp2, testProviders);
        Promise.all([refPromise1, refPromise2]).then((refs) => {
            (0, matchers_1.expect)(el).toHaveText('hello world!');
            (0, matchers_1.expect)(el2).toHaveText('hello world, again!');
            done();
        }, done.fail);
    });
    it('should not crash if change detection is invoked when the root component is disposed', (done) => {
        bootstrap(HelloOnDestroyTickCmp, testProviders).then((ref) => {
            (0, matchers_1.expect)(() => ref.destroy()).not.toThrow();
            done();
        });
    });
    it('should unregister change detectors when components are disposed', (done) => {
        bootstrap(HelloRootCmp, testProviders).then((ref) => {
            const appRef = ref.injector.get(application_ref_1.ApplicationRef);
            ref.destroy();
            (0, matchers_1.expect)(() => appRef.tick()).not.toThrow();
            done();
        }, done.fail);
    });
    it('should make the provided bindings available to the application component', (done) => {
        const refPromise = bootstrap(HelloRootCmp3, [
            testProviders,
            { provide: 'appBinding', useValue: 'BoundValue' },
        ]);
        refPromise.then((ref) => {
            (0, matchers_1.expect)(ref.injector.get('appBinding')).toEqual('BoundValue');
            done();
        }, done.fail);
    });
    it('should not override locale provided during bootstrap', (done) => {
        const refPromise = bootstrap(HelloRootCmp, [testProviders], [{ provide: core_1.LOCALE_ID, useValue: 'fr-FR' }]);
        refPromise.then((ref) => {
            (0, matchers_1.expect)(ref.injector.get(core_1.LOCALE_ID)).toEqual('fr-FR');
            done();
        }, done.fail);
    });
    it('should avoid cyclic dependencies when root component requires Lifecycle through DI', (done) => {
        const refPromise = bootstrap(HelloRootCmp4, testProviders);
        refPromise.then((ref) => {
            const appRef = ref.injector.get(application_ref_1.ApplicationRef);
            (0, matchers_1.expect)(appRef).toBeDefined();
            done();
        }, done.fail);
    });
    it('should run platform initializers', (done) => {
        (0, testing_1.inject)([testing_internal_1.Log], (log) => {
            const p = (0, core_1.createPlatformFactory)(platform_browser_dynamic_1.platformBrowserDynamic, 'someName', [
                { provide: core_1.PLATFORM_INITIALIZER, useValue: log.fn('platform_init1'), multi: true },
                { provide: core_1.PLATFORM_INITIALIZER, useValue: log.fn('platform_init2'), multi: true },
            ])();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [index_1.BrowserModule],
                        providers: [
                            { provide: core_1.APP_INITIALIZER, useValue: log.fn('app_init1'), multi: true },
                            { provide: core_1.APP_INITIALIZER, useValue: log.fn('app_init2'), multi: true },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                    ngDoBootstrap() { }
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            (0, matchers_1.expect)(log.result()).toEqual('platform_init1; platform_init2');
            log.clear();
            p.bootstrapModule(SomeModule).then(() => {
                (0, matchers_1.expect)(log.result()).toEqual('app_init1; app_init2');
                done();
            }, done.fail);
        })();
    });
    it('should allow provideZoneChangeDetection in bootstrapModule', () => __awaiter(void 0, void 0, void 0, function* () {
        let SomeModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.BrowserModule], providers: [(0, core_1.provideZoneChangeDetection)()] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeModule = _classThis = class {
                ngDoBootstrap() { }
            };
            __setFunctionName(_classThis, "SomeModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeModule = _classThis;
        })();
        yield expectAsync((0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(SomeModule)).toBeResolved();
    }));
    it('should register each application with the testability registry', () => __awaiter(void 0, void 0, void 0, function* () {
        const ngModuleRef1 = yield bootstrap(HelloRootCmp, testProviders);
        const ngModuleRef2 = yield bootstrap(HelloRootCmp2, testProviders);
        // The `TestabilityRegistry` is provided in the "platform", so the same instance is available
        // to both `NgModuleRef`s and it can be retrieved from any ref (we use the first one).
        const registry = ngModuleRef1.injector.get(core_1.TestabilityRegistry);
        (0, matchers_1.expect)(registry.findTestabilityInTree(el)).toEqual(ngModuleRef1.injector.get(core_1.Testability));
        (0, matchers_1.expect)(registry.findTestabilityInTree(el2)).toEqual(ngModuleRef2.injector.get(core_1.Testability));
    }));
    it('should allow to pass schemas', (done) => {
        bootstrap(HelloCmpUsingCustomElement, testProviders).then(() => {
            (0, matchers_1.expect)(el).toHaveText('hello world!');
            done();
        }, done.fail);
    });
    describe('change detection', () => {
        const log = [];
        let CompA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'hello-app',
                    template: '<div id="button-a" (click)="onClick()">{{title}}</div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CompA = _classThis = class {
                constructor() {
                    this.title = '';
                }
                ngDoCheck() {
                    log.push('CompA:ngDoCheck');
                }
                onClick() {
                    this.title = 'CompA';
                    log.push('CompA:onClick');
                }
            };
            __setFunctionName(_classThis, "CompA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompA = _classThis;
        })();
        let CompB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'hello-app-2',
                    template: '<div id="button-b" (click)="onClick()">{{title}}</div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CompB = _classThis = class {
                constructor() {
                    this.title = '';
                }
                ngDoCheck() {
                    log.push('CompB:ngDoCheck');
                }
                onClick() {
                    this.title = 'CompB';
                    log.push('CompB:onClick');
                }
            };
            __setFunctionName(_classThis, "CompB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompB = _classThis;
        })();
        it('should be triggered for all bootstrapped components in case change happens in one of them', (done) => {
            let TestModuleA = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [index_1.BrowserModule],
                        declarations: [CompA, CompB],
                        bootstrap: [CompA, CompB],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModuleA = _classThis = class {
                };
                __setFunctionName(_classThis, "TestModuleA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModuleA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModuleA = _classThis;
            })();
            (0, platform_browser_dynamic_1.platformBrowserDynamic)()
                .bootstrapModule(TestModuleA)
                .then((ref) => {
                log.length = 0;
                el.querySelectorAll('#button-a')[0].click();
                (0, matchers_1.expect)(log).toContain('CompA:onClick');
                (0, matchers_1.expect)(log).toContain('CompA:ngDoCheck');
                (0, matchers_1.expect)(log).toContain('CompB:ngDoCheck');
                log.length = 0;
                el2.querySelectorAll('#button-b')[0].click();
                (0, matchers_1.expect)(log).toContain('CompB:onClick');
                (0, matchers_1.expect)(log).toContain('CompA:ngDoCheck');
                (0, matchers_1.expect)(log).toContain('CompB:ngDoCheck');
                done();
            }, done.fail);
        });
        it('should work in isolation for each component bootstrapped individually', (done) => {
            const refPromise1 = bootstrap(CompA);
            const refPromise2 = bootstrap(CompB);
            Promise.all([refPromise1, refPromise2]).then((refs) => {
                log.length = 0;
                el.querySelectorAll('#button-a')[0].click();
                (0, matchers_1.expect)(log).toContain('CompA:onClick');
                (0, matchers_1.expect)(log).toContain('CompA:ngDoCheck');
                (0, matchers_1.expect)(log).not.toContain('CompB:ngDoCheck');
                log.length = 0;
                el2.querySelectorAll('#button-b')[0].click();
                (0, matchers_1.expect)(log).toContain('CompB:onClick');
                (0, matchers_1.expect)(log).toContain('CompB:ngDoCheck');
                (0, matchers_1.expect)(log).not.toContain('CompA:ngDoCheck');
                done();
            }, done.fail);
        });
    });
});
describe('providePlatformInitializer', () => {
    beforeEach(() => (0, platform_1.destroyPlatform)());
    afterEach(() => (0, platform_1.destroyPlatform)());
    it('should call the provided function when platform is initialized', () => {
        let initialized = false;
        createPlatformInjector([(0, platform_1.providePlatformInitializer)(() => (initialized = true))]);
        (0, matchers_1.expect)(initialized).toBe(true);
    });
    it('should be able to inject dependencies', () => {
        const TEST_TOKEN = new core_1.InjectionToken('TEST_TOKEN');
        let injectedValue;
        createPlatformInjector([
            { provide: TEST_TOKEN, useValue: 'test' },
            (0, platform_1.providePlatformInitializer)(() => {
                injectedValue = (0, core_1.inject)(TEST_TOKEN);
            }),
        ]);
        (0, matchers_1.expect)(injectedValue).toBe('test');
    });
    function createPlatformInjector(providers) {
        /* TODO: should we change `createOrReusePlatformInjector` type to allow `EnvironmentProviders`?
         */
        return (0, platform_1.createOrReusePlatformInjector)(providers);
    }
});
/**
 * Typing tests.
 */
let Test = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            // @ts-expect-error: `providePlatformInitializer()` should not work with Component.providers, as
            // it wouldn't be executed anyway.
            providers: [(0, platform_1.providePlatformInitializer)(() => { })],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Test = _classThis = class {
    };
    __setFunctionName(_classThis, "Test");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Test = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Test = _classThis;
})();
