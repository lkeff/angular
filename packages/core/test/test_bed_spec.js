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
exports.HelloWorldModule = exports.ComponentWithInlineTemplate = exports.SimpleApp = exports.ComponentWithPropBindings = exports.HostBindingDir = exports.InheritedCmp = exports.WithRefsCmp = exports.SimpleCmp = exports.GreetingModule = exports.GreetingCmp = exports.HelloWorld = void 0;
const platform_id_1 = require("@angular/common/src/platform_id");
const core_1 = require("../src/core");
const testing_1 = require("../testing");
const test_bed_1 = require("../testing/src/test_bed");
const platform_browser_1 = require("@angular/platform-browser");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const deps_tracker_1 = require("../src/render3/deps_tracker/deps_tracker");
const metadata_1 = require("../src/render3/metadata");
const test_bed_common_1 = require("../testing/src/test_bed_common");
const NAME = new core_1.InjectionToken('name');
let SimpleService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleService = _classThis = class {
        constructor() {
            this.id = 1;
        }
        ngOnDestroy() {
            SimpleService.ngOnDestroyCalls++;
        }
    };
    __setFunctionName(_classThis, "SimpleService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.ngOnDestroyCalls = 0;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleService = _classThis;
})();
// -- module: HWModule
let HelloWorld = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-world',
            template: '<greeting-cmp></greeting-cmp>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloWorld = _classThis = class {
    };
    __setFunctionName(_classThis, "HelloWorld");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloWorld = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloWorld = _classThis;
})();
exports.HelloWorld = HelloWorld;
// -- module: Greeting
let GreetingCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'greeting-cmp',
            template: 'Hello {{ name }}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GreetingCmp = _classThis = class {
        constructor(name, service) {
            this.name = name || 'nobody!';
        }
    };
    __setFunctionName(_classThis, "GreetingCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GreetingCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GreetingCmp = _classThis;
})();
exports.GreetingCmp = GreetingCmp;
let CmpWithProviders = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-with-providers',
            template: '<hello-world></hello-world>',
            providers: [
                SimpleService, //
                { provide: NAME, useValue: `from Component` },
            ],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpWithProviders = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpWithProviders");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpWithProviders = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpWithProviders = _classThis;
})();
let GreetingModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [GreetingCmp],
            exports: [GreetingCmp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GreetingModule = _classThis = class {
    };
    __setFunctionName(_classThis, "GreetingModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GreetingModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GreetingModule = _classThis;
})();
exports.GreetingModule = GreetingModule;
let SimpleCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-cmp',
            template: '<b>simple</b>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleCmp = _classThis;
})();
exports.SimpleCmp = SimpleCmp;
let WithRefsCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'with-refs-cmp',
            template: '<div #firstDiv></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WithRefsCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "WithRefsCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WithRefsCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WithRefsCmp = _classThis;
})();
exports.WithRefsCmp = WithRefsCmp;
let InheritedCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'inherited-cmp',
            template: 'inherited',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SimpleCmp;
    var InheritedCmp = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "InheritedCmp");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InheritedCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InheritedCmp = _classThis;
})();
exports.InheritedCmp = InheritedCmp;
let HostBindingDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[hostBindingDir]',
            host: { '[id]': 'id' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HostBindingDir = _classThis = class {
        constructor() {
            this.id = 'one';
        }
    };
    __setFunctionName(_classThis, "HostBindingDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HostBindingDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HostBindingDir = _classThis;
})();
exports.HostBindingDir = HostBindingDir;
let ComponentWithPropBindings = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'component-with-prop-bindings',
            template: `
    <div hostBindingDir [title]="title" [attr.aria-label]="label"></div>
    <p title="( {{ label }} - {{ title }} )" [attr.aria-label]="label" id="[ {{ label }} ] [ {{ title }} ]">
    </p>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithPropBindings = _classThis = class {
        constructor() {
            this.title = 'some title';
            this.label = 'some label';
        }
    };
    __setFunctionName(_classThis, "ComponentWithPropBindings");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithPropBindings = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithPropBindings = _classThis;
})();
exports.ComponentWithPropBindings = ComponentWithPropBindings;
let SimpleApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-app',
            template: `
    <simple-cmp></simple-cmp> - <inherited-cmp></inherited-cmp>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleApp = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleApp = _classThis;
})();
exports.SimpleApp = SimpleApp;
let ComponentWithInlineTemplate = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'inline-template',
            template: '<p>Hello</p>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithInlineTemplate = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentWithInlineTemplate");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithInlineTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithInlineTemplate = _classThis;
})();
exports.ComponentWithInlineTemplate = ComponentWithInlineTemplate;
let HelloWorldModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                HelloWorld,
                SimpleCmp,
                WithRefsCmp,
                InheritedCmp,
                SimpleApp,
                ComponentWithPropBindings,
                HostBindingDir,
                CmpWithProviders,
            ],
            imports: [GreetingModule],
            providers: [{ provide: NAME, useValue: 'World!' }],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloWorldModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HelloWorldModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloWorldModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloWorldModule = _classThis;
})();
exports.HelloWorldModule = HelloWorldModule;
describe('TestBed', () => {
    // This test is extracted to an individual `describe` block to avoid any extra TestBed
    // initialization logic that happens in the `beforeEach` functions in other `describe` sections.
    it('should apply scopes correctly for components in the lazy-loaded module', () => {
        // Reset TestBed to the initial state, emulating an invocation of a first test.
        // Check `TestBed.checkGlobalCompilationFinished` for additional info.
        test_bed_1.TestBedImpl.INSTANCE.globalCompilationChecked = false;
        let Root = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root',
                    template: '<div dirA></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Root = _classThis = class {
            };
            __setFunctionName(_classThis, "Root");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Root = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Root = _classThis;
        })();
        let DirA = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirA]',
                    host: { 'title': 'Test title' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirA = _classThis = class {
            };
            __setFunctionName(_classThis, "DirA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirA = _classThis;
        })();
        // Note: this module is not directly reference in the test intentionally.
        // Its presence triggers a side-effect of patching correct scopes on the declared components.
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [Root, DirA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({});
        // Trigger TestBed initialization.
        test_bed_1.TestBed.inject(core_1.Injector);
        // Emulate the end of a test (trigger module scoping queue flush).
        test_bed_1.TestBed.resetTestingModule();
        // Emulate a lazy-loading scenario by creating a component
        // without importing a module into a TestBed testing module.
        test_bed_1.TestBed.configureTestingModule({});
        const fixture = test_bed_1.TestBed.createComponent(Root);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.firstChild.getAttribute('title')).toEqual('Test title');
    });
});
describe('TestBed with Standalone types', () => {
    beforeEach(() => {
        test_bed_1.TestBed.resetTestingModule();
    });
    it('should override dependencies of standalone components', () => {
        let MainDep = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'dep',
                    template: 'main dep',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainDep = _classThis = class {
            };
            __setFunctionName(_classThis, "MainDep");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainDep = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainDep = _classThis;
        })();
        let MockDep = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'dep',
                    template: 'mock dep',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MockDep = _classThis = class {
            };
            __setFunctionName(_classThis, "MockDep");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MockDep = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MockDep = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-root',
                    imports: [MainDep],
                    template: '<dep />',
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
        test_bed_1.TestBed.configureTestingModule({ imports: [AppComponent] });
        let fixture = test_bed_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        // No overrides defined, expecting main dependency to be used.
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<dep>main dep</dep>');
        // Emulate an end of a test.
        test_bed_1.TestBed.resetTestingModule();
        // Emulate the start of a next test, make sure previous overrides
        // are not persisted across tests.
        test_bed_1.TestBed.configureTestingModule({ imports: [AppComponent] });
        test_bed_1.TestBed.overrideComponent(AppComponent, { set: { imports: [MockDep] } });
        fixture = test_bed_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        // Main dependency was overridden, expect to see a mock.
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<dep>mock dep</dep>');
    });
    it('should override providers on standalone component itself', () => {
        const A = new core_1.InjectionToken('A');
        let MyStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{ a }}',
                    providers: [{ provide: A, useValue: 'A' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComp = _classThis = class {
                constructor(a) {
                    this.a = a;
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComp = _classThis;
        })();
        // NOTE: the `TestBed.configureTestingModule` is load-bearing here: it instructs
        // TestBed to examine and override providers in dependencies.
        test_bed_1.TestBed.configureTestingModule({ imports: [MyStandaloneComp] });
        test_bed_1.TestBed.overrideProvider(A, { useValue: 'Overridden A' });
        const fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('Overridden A');
    });
    it('should override providers on components used as standalone component dependency', () => {
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                constructor() {
                    this.id = 'Service(original)';
                }
            };
            __setFunctionName(_classThis, "Service");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Service = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Service = _classThis;
        })();
        let MockService = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MockService = _classThis = class {
                constructor() {
                    this.id = 'Service(mock)';
                }
            };
            __setFunctionName(_classThis, "MockService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MockService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MockService = _classThis;
        })();
        let Dep = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'dep',
                    template: '{{ service.id }}',
                    providers: [Service],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dep = _classThis = class {
                constructor() {
                    this.service = (0, core_1.inject)(Service);
                }
            };
            __setFunctionName(_classThis, "Dep");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dep = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dep = _classThis;
        })();
        let MyStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<dep />',
                    imports: [Dep],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComp = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ imports: [MyStandaloneComp] });
        test_bed_1.TestBed.overrideProvider(Service, { useFactory: () => new MockService() });
        let fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<dep>Service(mock)</dep>');
        // Emulate an end of a test.
        test_bed_1.TestBed.resetTestingModule();
        // Emulate the start of a next test, make sure previous overrides
        // are not persisted across tests.
        test_bed_1.TestBed.configureTestingModule({ imports: [MyStandaloneComp] });
        fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        // No provider overrides, expect original provider value to be used.
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<dep>Service(original)</dep>');
    });
    it('should override providers in standalone component dependencies via overrideProvider', () => {
        const A = new core_1.InjectionToken('A');
        let ComponentDependenciesModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: A, useValue: 'A' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentDependenciesModule = _classThis = class {
            };
            __setFunctionName(_classThis, "ComponentDependenciesModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentDependenciesModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentDependenciesModule = _classThis;
        })();
        let MyStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{ a }}',
                    imports: [ComponentDependenciesModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComp = _classThis = class {
                constructor(a) {
                    this.a = a;
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComp = _classThis;
        })();
        // NOTE: the `TestBed.configureTestingModule` is load-bearing here: it instructs
        // TestBed to examine and override providers in dependencies.
        test_bed_1.TestBed.configureTestingModule({ imports: [MyStandaloneComp] });
        test_bed_1.TestBed.overrideProvider(A, { useValue: 'Overridden A' });
        const fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('Overridden A');
    });
    it('should override providers in standalone component dependencies via overrideModule', () => {
        const A = new core_1.InjectionToken('A');
        let ComponentDependenciesModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: A, useValue: 'A' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentDependenciesModule = _classThis = class {
            };
            __setFunctionName(_classThis, "ComponentDependenciesModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentDependenciesModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentDependenciesModule = _classThis;
        })();
        let MyStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{ a }}',
                    imports: [ComponentDependenciesModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComp = _classThis = class {
                constructor(a) {
                    this.a = a;
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComp = _classThis;
        })();
        // NOTE: the `TestBed.configureTestingModule` is *not* needed here, since the TestBed
        // knows which NgModule was overridden and needs re-compilation.
        test_bed_1.TestBed.overrideModule(ComponentDependenciesModule, {
            set: { providers: [{ provide: A, useValue: 'Overridden A' }] },
        });
        const fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('Overridden A');
    });
    it('should allow overriding a template of a standalone component', () => {
        let MyStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Original',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComp = _classThis;
        })();
        // NOTE: the `TestBed.configureTestingModule` call is *not* required here, since TestBed already
        // knows that the `MyStandaloneComp` should be overridden/recompiled.
        test_bed_1.TestBed.overrideComponent(MyStandaloneComp, { set: { template: 'Overridden' } });
        const fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('Overridden');
    });
    it('should allow overriding the set of directives and pipes used in a standalone component', () => {
        let MyStandaloneDirectiveA = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    host: { '[id]': 'id' },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneDirectiveA = _classThis = class {
                constructor() {
                    this.id = 'A';
                }
            };
            __setFunctionName(_classThis, "MyStandaloneDirectiveA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneDirectiveA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneDirectiveA = _classThis;
        })();
        let MyStandaloneDirectiveB = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    host: { '[id]': 'id' },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneDirectiveB = _classThis = class {
                constructor() {
                    this.id = 'B';
                }
            };
            __setFunctionName(_classThis, "MyStandaloneDirectiveB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneDirectiveB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneDirectiveB = _classThis;
        })();
        let MyStandalonePipeA = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandalonePipeA = _classThis = class {
                transform(value) {
                    return `transformed ${value} (A)`;
                }
            };
            __setFunctionName(_classThis, "MyStandalonePipeA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandalonePipeA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandalonePipeA = _classThis;
        })();
        let MyStandalonePipeB = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'pipe' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandalonePipeB = _classThis = class {
                transform(value) {
                    return `transformed ${value} (B)`;
                }
            };
            __setFunctionName(_classThis, "MyStandalonePipeB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandalonePipeB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandalonePipeB = _classThis;
        })();
        let MyStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div dir>{{ name | pipe }}</div>',
                    imports: [MyStandalonePipeA, MyStandaloneDirectiveA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComp = _classThis = class {
                constructor() {
                    this.name = 'MyStandaloneComp';
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComp = _classThis;
        })();
        // NOTE: the `TestBed.configureTestingModule` call is *not* required here, since TestBed
        // already knows that the `MyStandaloneComp` should be overridden/recompiled.
        test_bed_1.TestBed.overrideComponent(MyStandaloneComp, {
            set: { imports: [MyStandalonePipeB, MyStandaloneDirectiveB] },
        });
        const fixture = test_bed_1.TestBed.createComponent(MyStandaloneComp);
        fixture.detectChanges();
        const rootElement = fixture.nativeElement.firstChild;
        (0, matchers_1.expect)(rootElement.id).toBe('B');
        (0, matchers_1.expect)(rootElement.innerHTML).toBe('transformed MyStandaloneComp (B)');
    });
    it('should reflect overrides on imported standalone directive', () => {
        let DepStandaloneDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    host: { '[id]': 'id' },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DepStandaloneDirective = _classThis = class {
                constructor() {
                    this.id = 'A';
                }
            };
            __setFunctionName(_classThis, "DepStandaloneDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DepStandaloneDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DepStandaloneDirective = _classThis;
        })();
        let DepStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone-cmp',
                    template: 'Original MyStandaloneComponent',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DepStandaloneComponent = _classThis = class {
                constructor() {
                    this.id = 'A';
                }
            };
            __setFunctionName(_classThis, "DepStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DepStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DepStandaloneComponent = _classThis;
        })();
        let RootStandaloneComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<standalone-cmp dir>Hello world!</standalone-cmp>',
                    imports: [DepStandaloneDirective, DepStandaloneComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootStandaloneComp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootStandaloneComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootStandaloneComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootStandaloneComp = _classThis;
        })();
        // NOTE: the `TestBed.configureTestingModule` call is *not* required here, since TestBed
        // already knows which Components/Directives are overridden and should be recompiled.
        test_bed_1.TestBed.overrideComponent(DepStandaloneComponent, {
            set: { template: 'Overridden MyStandaloneComponent' },
        });
        test_bed_1.TestBed.overrideDirective(DepStandaloneDirective, { set: { host: { '[id]': "'Overridden'" } } });
        const fixture = test_bed_1.TestBed.createComponent(RootStandaloneComp);
        fixture.detectChanges();
        const rootElement = fixture.nativeElement.firstChild;
        (0, matchers_1.expect)(rootElement.id).toBe('Overridden');
        (0, matchers_1.expect)(rootElement.innerHTML).toBe('Overridden MyStandaloneComponent');
    });
    it('should make overridden providers available in pipes', () => {
        const TOKEN_A = new core_1.InjectionToken('TOKEN_A');
        let TestPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'testPipe',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestPipe = _classThis = class {
                constructor(token) {
                    this.token = token;
                }
                transform(value) {
                    return `transformed ${value} using ${this.token} token`;
                }
            };
            __setFunctionName(_classThis, "TestPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestPipe = _classThis;
        })();
        let TestNgModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [TestPipe],
                    exports: [TestPipe],
                    providers: [{ provide: TOKEN_A, useValue: 'A' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestNgModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestNgModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestNgModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestNgModule = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [TestNgModule],
                    template: `{{ 'original value' | testPipe }}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            imports: [TestComponent],
        });
        test_bed_1.TestBed.overrideProvider(TOKEN_A, { useValue: 'Overridden A' });
        const fixture = test_bed_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.firstChild;
        (0, matchers_1.expect)(hostElement.textContent).toBe('transformed original value using Overridden A token');
    });
    describe('NgModules as dependencies', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.testField = 'default';
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        let MockTestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MockTestComponent = _classThis = class {
                constructor() {
                    this.testField = 'overridden';
                }
            };
            __setFunctionName(_classThis, "MockTestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MockTestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MockTestComponent = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [TestComponent],
                    exports: [TestComponent],
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
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-root',
                    template: `<test-cmp #testCmpCtrl></test-cmp>`,
                    imports: [TestModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _testCmpCtrl_decorators;
            let _testCmpCtrl_initializers = [];
            let _testCmpCtrl_extraInitializers = [];
            var AppComponent = _classThis = class {
                constructor() {
                    this.testCmpCtrl = __runInitializers(this, _testCmpCtrl_initializers, void 0);
                    __runInitializers(this, _testCmpCtrl_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _testCmpCtrl_decorators = [(0, core_1.ViewChild)('testCmpCtrl', { static: true })];
                __esDecorate(null, null, _testCmpCtrl_decorators, { kind: "field", name: "testCmpCtrl", static: false, private: false, access: { has: obj => "testCmpCtrl" in obj, get: obj => obj.testCmpCtrl, set: (obj, value) => { obj.testCmpCtrl = value; } }, metadata: _metadata }, _testCmpCtrl_initializers, _testCmpCtrl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        it('should allow declarations and exports overrides on an imported NgModule', () => {
            // replace TestComponent with MockTestComponent
            test_bed_1.TestBed.overrideModule(TestModule, {
                remove: { declarations: [TestComponent], exports: [TestComponent] },
                add: { declarations: [MockTestComponent], exports: [MockTestComponent] },
            });
            const fixture = test_bed_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const app = fixture.componentInstance;
            (0, matchers_1.expect)(app.testCmpCtrl.testField).toBe('overridden');
        });
        it('should allow removing an import via `overrideModule`', () => {
            const fooToken = new core_1.InjectionToken('foo');
            let ImportedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: fooToken, useValue: 'FOO' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ImportedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ImportedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ImportedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ImportedModule = _classThis;
            })();
            let ImportingModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [ImportedModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ImportingModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ImportingModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ImportingModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ImportingModule = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({
                imports: [ImportingModule],
            });
            test_bed_1.TestBed.overrideModule(ImportingModule, {
                remove: {
                    imports: [ImportedModule],
                },
            });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(fooToken, 'BAR')).toBe('BAR');
            // Emulate an end of a test.
            test_bed_1.TestBed.resetTestingModule();
            // Emulate the start of a next test, make sure previous overrides
            // are not persisted across tests.
            test_bed_1.TestBed.configureTestingModule({
                imports: [ImportingModule],
            });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(fooToken, 'BAR')).toBe('FOO');
        });
    });
});
describe('TestBed', () => {
    beforeEach(() => {
        test_bed_1.TestBed.resetTestingModule();
        test_bed_1.TestBed.configureTestingModule({ imports: [HelloWorldModule] });
    });
    it('should compile and render a component', () => {
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Hello World!');
    });
    it('should not allow overrides of the `standalone` field', () => {
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone-comp',
                    template: '...',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
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
        let NonStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'non-standalone-comp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneComponent = _classThis = class {
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
        let StandaloneDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
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
        let NonStandaloneDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneDirective = _classThis = class {
            };
            __setFunctionName(_classThis, "NonStandaloneDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandaloneDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandaloneDirective = _classThis;
        })();
        let StandalonePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandalonePipe = _classThis = class {
            };
            __setFunctionName(_classThis, "StandalonePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandalonePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandalonePipe = _classThis;
        })();
        let NonStandalonePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandalonePipe = _classThis = class {
            };
            __setFunctionName(_classThis, "NonStandalonePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandalonePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandalonePipe = _classThis;
        })();
        const getExpectedError = (typeName) => `An override for the ${typeName} class has the \`standalone\` flag. ` +
            `Changing the \`standalone\` flag via TestBed overrides is not supported.`;
        const overrides = [
            { set: { standalone: false } },
            { add: { standalone: false } },
            { remove: { standalone: true } },
        ];
        const scenarios = [
            [test_bed_1.TestBed.overrideComponent, StandaloneComponent, NonStandaloneComponent],
            [test_bed_1.TestBed.overrideDirective, StandaloneDirective, NonStandaloneDirective],
            [test_bed_1.TestBed.overridePipe, StandalonePipe, NonStandalonePipe],
        ];
        overrides.forEach((override) => {
            scenarios.forEach(([fn, standaloneType, nonStandaloneType]) => {
                (0, matchers_1.expect)(() => fn(standaloneType, override)).toThrowError(getExpectedError(standaloneType.name));
                (0, matchers_1.expect)(() => fn(nonStandaloneType, override)).toThrowError(getExpectedError(nonStandaloneType.name));
            });
        });
    });
    it('should give access to the component instance', () => {
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.componentInstance).toBeInstanceOf(HelloWorld);
    });
    it('should give the ability to query by css', () => {
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        const greetingByCss = hello.debugElement.query(platform_browser_1.By.css('greeting-cmp'));
        (0, matchers_1.expect)(greetingByCss.nativeElement).toHaveText('Hello World!');
        (0, matchers_1.expect)(greetingByCss.componentInstance).toBeInstanceOf(GreetingCmp);
    });
    it('should give the ability to trigger the change detection', () => {
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        const greetingByCss = hello.debugElement.query(platform_browser_1.By.css('greeting-cmp'));
        (0, matchers_1.expect)(greetingByCss.nativeElement).toHaveText('Hello World!');
        greetingByCss.componentInstance.name = 'TestBed!';
        hello.detectChanges();
        (0, matchers_1.expect)(greetingByCss.nativeElement).toHaveText('Hello TestBed!');
    });
    it('should give the ability to access property bindings on a node', () => {
        const fixture = test_bed_1.TestBed.createComponent(ComponentWithPropBindings);
        fixture.detectChanges();
        const divElement = fixture.debugElement.query(platform_browser_1.By.css('div'));
        (0, matchers_1.expect)(divElement.properties['id']).toEqual('one');
        (0, matchers_1.expect)(divElement.properties['title']).toEqual('some title');
    });
    it('should give the ability to access interpolated properties on a node', () => {
        const fixture = test_bed_1.TestBed.createComponent(ComponentWithPropBindings);
        fixture.detectChanges();
        const paragraphEl = fixture.debugElement.query(platform_browser_1.By.css('p'));
        (0, matchers_1.expect)(paragraphEl.properties['title']).toEqual('( some label - some title )');
        (0, matchers_1.expect)(paragraphEl.properties['id']).toEqual('[ some label ] [ some title ]');
    });
    it('should give access to the node injector', () => {
        const fixture = test_bed_1.TestBed.createComponent(HelloWorld);
        fixture.detectChanges();
        const injector = fixture.debugElement.query(platform_browser_1.By.css('greeting-cmp')).injector;
        // from the node injector
        const greetingCmp = injector.get(GreetingCmp);
        (0, matchers_1.expect)(greetingCmp.constructor).toBe(GreetingCmp);
        // from the node injector (inherited from a parent node)
        const helloWorldCmp = injector.get(HelloWorld);
        (0, matchers_1.expect)(fixture.componentInstance).toBe(helloWorldCmp);
        const nameInjected = injector.get(NAME);
        (0, matchers_1.expect)(nameInjected).toEqual('World!');
    });
    it('should give access to the node injector for root node', () => {
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        const injector = hello.debugElement.injector;
        // from the node injector
        const helloInjected = injector.get(HelloWorld);
        (0, matchers_1.expect)(helloInjected).toBe(hello.componentInstance);
        // from the module injector
        const nameInjected = injector.get(NAME);
        (0, matchers_1.expect)(nameInjected).toEqual('World!');
    });
    it('should give access to local refs on a node', () => {
        const withRefsCmp = test_bed_1.TestBed.createComponent(WithRefsCmp);
        const firstDivDebugEl = withRefsCmp.debugElement.query(platform_browser_1.By.css('div'));
        // assert that a native element is referenced by a local ref
        (0, matchers_1.expect)(firstDivDebugEl.references['firstDiv'].tagName.toLowerCase()).toBe('div');
    });
    it('should give the ability to query by directive', () => {
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        const greetingByDirective = hello.debugElement.query(platform_browser_1.By.directive(GreetingCmp));
        (0, matchers_1.expect)(greetingByDirective.componentInstance).toBeInstanceOf(GreetingCmp);
    });
    it('should allow duplicate NgModule registrations with the same id', () => {
        const id = 'registered';
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ id })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        (0, matchers_1.expect)((0, core_1.getNgModuleById)(id)).toBe(ModuleA);
        // This would ordinarily error, if not in a test scenario.
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ id })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        (0, matchers_1.expect)((0, core_1.getNgModuleById)(id)).toBe(ModuleB);
    });
    it('allow to override a template', () => {
        // use original template when there is no override
        let hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Hello World!');
        // override the template
        test_bed_1.TestBed.resetTestingModule();
        test_bed_1.TestBed.configureTestingModule({ imports: [HelloWorldModule] });
        test_bed_1.TestBed.overrideComponent(GreetingCmp, { set: { template: `Bonjour {{ name }}` } });
        hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Bonjour World!');
        // restore the original template by calling `.resetTestingModule()`
        test_bed_1.TestBed.resetTestingModule();
        test_bed_1.TestBed.configureTestingModule({ imports: [HelloWorldModule] });
        hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Hello World!');
    });
    // https://github.com/angular/angular/issues/42734
    it('should override a component which is declared in an NgModule which is imported as a `ModuleWithProviders`', () => {
        // This test verifies that an overridden component that is declared in an NgModule that has
        // been imported as a `ModuleWithProviders` continues to have access to the declaration scope
        // of the NgModule.
        test_bed_1.TestBed.resetTestingModule();
        const moduleWithProviders = { ngModule: HelloWorldModule };
        test_bed_1.TestBed.configureTestingModule({ imports: [moduleWithProviders] });
        test_bed_1.TestBed.overrideComponent(HelloWorld, {
            set: { template: 'Overridden <greeting-cmp></greeting-cmp>' },
        });
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Overridden Hello World!');
    });
    it('should run `APP_INITIALIZER` before accessing `LOCALE_ID` provider', () => {
        let locale = '';
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        { provide: core_1.APP_INITIALIZER, useValue: () => (locale = 'fr-FR'), multi: true },
                        { provide: core_1.LOCALE_ID, useFactory: () => locale },
                    ],
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
        test_bed_1.TestBed.configureTestingModule({ imports: [TestModule] });
        (0, matchers_1.expect)(test_bed_1.TestBed.inject(core_1.LOCALE_ID)).toBe('fr-FR');
    });
    it('allow to override a provider', () => {
        test_bed_1.TestBed.overrideProvider(NAME, { useValue: 'injected World!' });
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Hello injected World!');
    });
    it('uses the most recent provider override', () => {
        test_bed_1.TestBed.overrideProvider(NAME, { useValue: 'injected World!' });
        test_bed_1.TestBed.overrideProvider(NAME, { useValue: 'injected World a second time!' });
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Hello injected World a second time!');
    });
    it('overrides a providers in an array', () => {
        test_bed_1.TestBed.configureTestingModule({
            imports: [HelloWorldModule],
            providers: [[{ provide: NAME, useValue: 'injected World!' }]],
        });
        test_bed_1.TestBed.overrideProvider(NAME, { useValue: 'injected World a second time!' });
        const hello = test_bed_1.TestBed.createComponent(HelloWorld);
        hello.detectChanges();
        (0, matchers_1.expect)(hello.nativeElement).toHaveText('Hello injected World a second time!');
    });
    it('should not call ngOnDestroy for a service that was overridden', () => {
        SimpleService.ngOnDestroyCalls = 0;
        test_bed_1.TestBed.overrideProvider(SimpleService, { useValue: { id: 2, ngOnDestroy: () => { } } });
        const fixture = test_bed_1.TestBed.createComponent(CmpWithProviders);
        fixture.detectChanges();
        const service = test_bed_1.TestBed.inject(SimpleService);
        (0, matchers_1.expect)(service.id).toBe(2);
        fixture.destroy();
        // verify that original `ngOnDestroy` was not called
        (0, matchers_1.expect)(SimpleService.ngOnDestroyCalls).toBe(0);
    });
    it('should be able to create a fixture if a test module is reset mid-compilation', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = new core_1.InjectionToken('value');
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'hello {{_token}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor(_token) {
                    this._token = _token;
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        test_bed_1.TestBed.resetTestingModule(); // Reset the state from `beforeEach`.
        function compile(tokenValue) {
            return test_bed_1.TestBed.configureTestingModule({
                declarations: [TestComponent],
                providers: [{ provide: token, useValue: tokenValue }],
                teardown: { destroyAfterEach: true },
            }).compileComponents();
        }
        const initialCompilation = compile(1);
        test_bed_1.TestBed.resetTestingModule();
        yield initialCompilation;
        yield compile(2);
        const fixture = test_bed_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello 2');
    }));
    describe('module overrides using TestBed.overrideModule', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.testField = 'default';
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [TestComponent],
                    exports: [TestComponent],
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
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-root',
                    template: `<test-cmp #testCmpCtrl></test-cmp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _testCmpCtrl_decorators;
            let _testCmpCtrl_initializers = [];
            let _testCmpCtrl_extraInitializers = [];
            var AppComponent = _classThis = class {
                constructor() {
                    this.testCmpCtrl = __runInitializers(this, _testCmpCtrl_initializers, void 0);
                    __runInitializers(this, _testCmpCtrl_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _testCmpCtrl_decorators = [(0, core_1.ViewChild)('testCmpCtrl', { static: true })];
                __esDecorate(null, null, _testCmpCtrl_decorators, { kind: "field", name: "testCmpCtrl", static: false, private: false, access: { has: obj => "testCmpCtrl" in obj, get: obj => obj.testCmpCtrl, set: (obj, value) => { obj.testCmpCtrl = value; } }, metadata: _metadata }, _testCmpCtrl_initializers, _testCmpCtrl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [AppComponent],
                    imports: [TestModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
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
        let MockTestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MockTestComponent = _classThis = class {
                constructor() {
                    this.testField = 'overwritten';
                }
            };
            __setFunctionName(_classThis, "MockTestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MockTestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MockTestComponent = _classThis;
        })();
        it('should allow declarations override', () => {
            test_bed_1.TestBed.configureTestingModule({
                imports: [AppModule],
            });
            // replace TestComponent with MockTestComponent
            test_bed_1.TestBed.overrideModule(TestModule, {
                remove: { declarations: [TestComponent], exports: [TestComponent] },
                add: { declarations: [MockTestComponent], exports: [MockTestComponent] },
            });
            const fixture = test_bed_1.TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;
            (0, matchers_1.expect)(app.testCmpCtrl.testField).toBe('overwritten');
        });
    });
    describe('nested module overrides using TestBed.overrideModule', () => {
        // Set up an NgModule hierarchy with two modules, A and B, each with their own component.
        // Module B additionally re-exports module A. Also declare two mock components which can be
        // used in tests to verify that overrides within this hierarchy are working correctly.
        // ModuleA content:
        let CompA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-a',
                    template: 'comp-a content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CompA = _classThis = class {
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
        let MockCompA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-a',
                    template: 'comp-a mock content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MockCompA = _classThis = class {
            };
            __setFunctionName(_classThis, "MockCompA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MockCompA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MockCompA = _classThis;
        })();
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [CompA],
                    exports: [CompA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        // ModuleB content:
        let CompB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-b',
                    template: 'comp-b content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CompB = _classThis = class {
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
        let MockCompB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-b',
                    template: 'comp-b mock content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MockCompB = _classThis = class {
            };
            __setFunctionName(_classThis, "MockCompB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MockCompB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MockCompB = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleA],
                    declarations: [CompB],
                    exports: [CompB, ModuleA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        // AppModule content:
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `
        <comp-a></comp-a>
        <comp-b></comp-b>
      `,
                    standalone: false,
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
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleB],
                    exports: [ModuleB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
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
        it('should detect nested module override', () => {
            test_bed_1.TestBed.configureTestingModule({
                declarations: [App],
                // AppModule -> ModuleB -> ModuleA (to be overridden)
                imports: [AppModule],
            })
                .overrideModule(ModuleA, {
                remove: { declarations: [CompA], exports: [CompA] },
                add: { declarations: [MockCompA], exports: [MockCompA] },
            })
                .compileComponents();
            const fixture = test_bed_1.TestBed.createComponent(App);
            fixture.detectChanges();
            // CompA is overridden, expect mock content.
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('comp-a mock content');
            // CompB is not overridden, expect original content.
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('comp-b content');
        });
        it('should detect chained modules override', () => {
            test_bed_1.TestBed.configureTestingModule({
                declarations: [App],
                // AppModule -> ModuleB (to be overridden) -> ModuleA (to be overridden)
                imports: [AppModule],
            })
                .overrideModule(ModuleA, {
                remove: { declarations: [CompA], exports: [CompA] },
                add: { declarations: [MockCompA], exports: [MockCompA] },
            })
                .overrideModule(ModuleB, {
                remove: { declarations: [CompB], exports: [CompB] },
                add: { declarations: [MockCompB], exports: [MockCompB] },
            })
                .compileComponents();
            const fixture = test_bed_1.TestBed.createComponent(App);
            fixture.detectChanges();
            // Both CompA and CompB are overridden, expect mock content for both.
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('comp-a mock content');
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('comp-b mock content');
        });
    });
    describe('multi providers', () => {
        const multiToken = new core_1.InjectionToken('multiToken');
        const singleToken = new core_1.InjectionToken('singleToken');
        const multiTokenToOverrideAtModuleLevel = new core_1.InjectionToken('moduleLevelMultiOverride');
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: multiToken, useValue: 'valueFromModule', multi: true }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule = _classThis;
        })();
        let MyModule2 = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        { provide: singleToken, useValue: 't1' },
                        {
                            provide: multiTokenToOverrideAtModuleLevel,
                            useValue: 'multiTokenToOverrideAtModuleLevelOriginal',
                            multi: true,
                        },
                        { provide: multiToken, useValue: 'valueFromModule2', multi: true },
                        { provide: multiToken, useValue: 'secondValueFromModule2', multi: true },
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule2 = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModule2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule2 = _classThis;
        })();
        beforeEach(() => {
            test_bed_1.TestBed.configureTestingModule({
                imports: [
                    MyModule,
                    {
                        ngModule: MyModule2,
                        providers: [
                            { provide: multiTokenToOverrideAtModuleLevel, useValue: 'override', multi: true },
                        ],
                    },
                ],
            });
        });
        it('is preserved when other provider is overridden', () => {
            test_bed_1.TestBed.overrideProvider(singleToken, { useValue: '' });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(multiToken).length).toEqual(3);
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(multiTokenToOverrideAtModuleLevel).length).toEqual(2);
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(multiTokenToOverrideAtModuleLevel)).toEqual([
                'multiTokenToOverrideAtModuleLevelOriginal',
                'override',
            ]);
        });
        it('overridden with an array', () => {
            const overrideValue = ['override'];
            test_bed_1.TestBed.overrideProvider(multiToken, { useValue: overrideValue, multi: true });
            const value = test_bed_1.TestBed.inject(multiToken);
            (0, matchers_1.expect)(value.length).toEqual(overrideValue.length);
            (0, matchers_1.expect)(value).toEqual(overrideValue);
        });
        it('overridden with a non-array', () => {
            // This is actually invalid because multi providers return arrays. We have this here so we can
            // ensure Ivy behaves the same as VE does currently.
            const overrideValue = 'override';
            test_bed_1.TestBed.overrideProvider(multiToken, { useValue: overrideValue, multi: true });
            const value = test_bed_1.TestBed.inject(multiToken);
            (0, matchers_1.expect)(value.length).toEqual(overrideValue.length);
            (0, matchers_1.expect)(value).toEqual(overrideValue);
        });
    });
    describe('overrides providers in ModuleWithProviders', () => {
        const TOKEN = new core_1.InjectionToken('token');
        let MyMod = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyMod = _classThis = class {
                static forRoot() {
                    return {
                        ngModule: MyMod,
                        providers: [{ provide: TOKEN, multi: MyMod.multi, useValue: 'forRootValue' }],
                    };
                }
            };
            __setFunctionName(_classThis, "MyMod");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyMod = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            })();
            _classThis.multi = false;
            (() => {
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyMod = _classThis;
        })();
        beforeEach(() => (MyMod.multi = true));
        it('when provider is a "regular" provider', () => {
            MyMod.multi = false;
            let MyMod2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [MyMod.forRoot()] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyMod2 = _classThis = class {
                };
                __setFunctionName(_classThis, "MyMod2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyMod2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyMod2 = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({ imports: [MyMod2] });
            test_bed_1.TestBed.overrideProvider(TOKEN, { useValue: ['override'] });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN)).toEqual(['override']);
        });
        it('when provider is multi', () => {
            let MyMod2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [MyMod.forRoot()] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyMod2 = _classThis = class {
                };
                __setFunctionName(_classThis, "MyMod2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyMod2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyMod2 = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({ imports: [MyMod2] });
            test_bed_1.TestBed.overrideProvider(TOKEN, { useValue: ['override'] });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN)).toEqual(['override']);
        });
        it('restores the original value', () => {
            let MyMod2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [MyMod.forRoot()] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyMod2 = _classThis = class {
                };
                __setFunctionName(_classThis, "MyMod2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyMod2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyMod2 = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({ imports: [MyMod2] });
            test_bed_1.TestBed.overrideProvider(TOKEN, { useValue: ['override'] });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN)).toEqual(['override']);
            test_bed_1.TestBed.resetTestingModule();
            test_bed_1.TestBed.configureTestingModule({ imports: [MyMod2] });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN)).toEqual(['forRootValue']);
        });
    });
    it('should allow overriding a provider defined via ModuleWithProviders (using TestBed.overrideProvider)', () => {
        const serviceOverride = {
            get() {
                return 'override';
            },
        };
        let MyService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyService = _classThis = class {
                get() {
                    return 'original';
                }
            };
            __setFunctionName(_classThis, "MyService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyService = _classThis;
        })();
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule = _classThis = class {
                static forRoot() {
                    return {
                        ngModule: MyModule,
                        providers: [MyService],
                    };
                }
            };
            __setFunctionName(_classThis, "MyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule = _classThis;
        })();
        test_bed_1.TestBed.overrideProvider(MyService, { useValue: serviceOverride });
        test_bed_1.TestBed.configureTestingModule({
            imports: [MyModule.forRoot()],
        });
        const service = test_bed_1.TestBed.inject(MyService);
        (0, matchers_1.expect)(service.get()).toEqual('override');
    });
    it('should handle overrides for a provider that has `ChangeDetectorRef` as a dependency', () => {
        let MyService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyService = _classThis = class {
                constructor(cdr) {
                    this.cdr = cdr;
                    this.token = 'original';
                }
            };
            __setFunctionName(_classThis, "MyService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyService = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({});
        test_bed_1.TestBed.overrideProvider(MyService, { useValue: { token: 'override' } });
        const service = test_bed_1.TestBed.inject(MyService);
        (0, matchers_1.expect)(service.token).toBe('override');
    });
    it('should allow overriding a provider defined via ModuleWithProviders (using TestBed.configureTestingModule)', () => {
        const serviceOverride = {
            get() {
                return 'override';
            },
        };
        let MyService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyService = _classThis = class {
                get() {
                    return 'original';
                }
            };
            __setFunctionName(_classThis, "MyService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyService = _classThis;
        })();
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule = _classThis = class {
                static forRoot() {
                    return {
                        ngModule: MyModule,
                        providers: [MyService],
                    };
                }
            };
            __setFunctionName(_classThis, "MyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            imports: [MyModule.forRoot()],
            providers: [{ provide: MyService, useValue: serviceOverride }],
        });
        const service = test_bed_1.TestBed.inject(MyService);
        (0, matchers_1.expect)(service.get()).toEqual('override');
    });
    it('should allowing overriding a module with a cyclic structure in its metadata', () => {
        class Cyclic {
            constructor(name) {
                this.name = name;
                this.cycle = this;
            }
        }
        const CYCLES = new core_1.InjectionToken('cycles', { factory: () => [] });
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        { provide: CYCLES, useValue: new Cyclic('a'), multi: true },
                        { provide: CYCLES, useValue: new Cyclic('b'), multi: true },
                    ],
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
        test_bed_1.TestBed.configureTestingModule({
            imports: [TestModule],
        })
            .overrideModule(TestModule, {
            remove: {
                providers: [
                    // Removing the cycle named "a" should result in removing the provider for "a".
                    // Note: although this removes a different instance than the one provided, metadata
                    // overrides compare objects by value, not by reference.
                    { provide: CYCLES, useValue: new Cyclic('a'), multi: true },
                    // Also attempt to remove a cycle named "B" (which does not exist) to verify that
                    // objects are correctly compared by value.
                    { provide: CYCLES, useValue: new Cyclic('B'), multi: true },
                ],
            },
            add: {
                providers: [{ provide: CYCLES, useValue: new Cyclic('c'), multi: true }],
            },
        })
            .compileComponents();
        const values = test_bed_1.TestBed.inject(CYCLES);
        (0, matchers_1.expect)(values.map((v) => v.name)).toEqual(['b', 'c']);
    });
    it('overrides injectable that is using providedIn: AModule', () => {
        let ServiceModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ServiceModule = _classThis = class {
            };
            __setFunctionName(_classThis, "ServiceModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ServiceModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ServiceModule = _classThis;
        })();
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: ServiceModule })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
            };
            __setFunctionName(_classThis, "Service");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Service = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Service = _classThis;
        })();
        const fake = 'fake';
        test_bed_1.TestBed.overrideProvider(Service, { useValue: fake });
        // Create an injector whose source is the ServiceModule, not DynamicTestModule.
        const ngModuleFactory = test_bed_1.TestBed.inject(core_1.Compiler).compileModuleSync(ServiceModule);
        const injector = ngModuleFactory.create(test_bed_1.TestBed.inject(core_1.Injector)).injector;
        const service = injector.get(Service);
        (0, matchers_1.expect)(service).toBe(fake);
    });
    it('allow to override multi provider', () => {
        const MY_TOKEN = new core_1.InjectionToken('MyProvider');
        class MyProvider {
        }
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(myProviders) {
                    this.myProviders = myProviders;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            declarations: [MyComp],
            providers: [{ provide: MY_TOKEN, useValue: { value: 'old provider' }, multi: true }],
        });
        const multiOverride = { useValue: [{ value: 'new provider' }], multi: true };
        test_bed_1.TestBed.overrideProvider(MY_TOKEN, multiOverride);
        const fixture = test_bed_1.TestBed.createComponent(MyComp);
        (0, matchers_1.expect)(fixture.componentInstance.myProviders).toEqual([{ value: 'new provider' }]);
    });
    it('should resolve components that are extended by other components', () => {
        // SimpleApp uses SimpleCmp in its template, which is extended by InheritedCmp
        const simpleApp = test_bed_1.TestBed.createComponent(SimpleApp);
        simpleApp.detectChanges();
        (0, matchers_1.expect)(simpleApp.nativeElement).toHaveText('simple - inherited');
    });
    it('should not trigger change detection for ComponentA while calling TestBed.createComponent for ComponentB', () => {
        const log = [];
        let CompA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-a',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _inputA_decorators;
            let _inputA_initializers = [];
            let _inputA_extraInitializers = [];
            var CompA = _classThis = class {
                ngOnInit() {
                    log.push('CompA:ngOnInit', this.inputA);
                }
                constructor() {
                    this.inputA = __runInitializers(this, _inputA_initializers, '');
                    __runInitializers(this, _inputA_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CompA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _inputA_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompA = _classThis;
        })();
        let CompB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-b',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _inputB_decorators;
            let _inputB_initializers = [];
            let _inputB_extraInitializers = [];
            var CompB = _classThis = class {
                ngOnInit() {
                    log.push('CompB:ngOnInit', this.inputB);
                }
                constructor() {
                    this.inputB = __runInitializers(this, _inputB_initializers, '');
                    __runInitializers(this, _inputB_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CompB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _inputB_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompB = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [CompA, CompB] });
        log.length = 0;
        const appA = test_bed_1.TestBed.createComponent(CompA);
        appA.componentInstance.inputA = 'a';
        appA.autoDetectChanges();
        (0, matchers_1.expect)(log).toEqual(['CompA:ngOnInit', 'a']);
        log.length = 0;
        const appB = test_bed_1.TestBed.createComponent(CompB);
        appB.componentInstance.inputB = 'b';
        appB.autoDetectChanges();
        (0, matchers_1.expect)(log).toEqual(['CompB:ngOnInit', 'b']);
    });
    it('should resolve components without async resources synchronously', (done) => {
        test_bed_1.TestBed.configureTestingModule({
            declarations: [ComponentWithInlineTemplate],
        })
            .compileComponents()
            .then(done)
            .catch((error) => {
            // This should not throw any errors. If an error is thrown, the test will fail.
            // Specifically use `catch` here to mark the test as done and *then* throw the error
            // so that the test isn't treated as a timeout.
            done();
            throw error;
        });
        // Intentionally call `createComponent` before `compileComponents` is resolved. We want this to
        // work for components that don't have any async resources (templateUrl, styleUrls).
        test_bed_1.TestBed.createComponent(ComponentWithInlineTemplate);
    });
    it('should be able to override the ErrorHandler via an import', () => {
        class CustomErrorHandler {
        }
        let ProvidesErrorHandler = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: core_1.ErrorHandler, useClass: CustomErrorHandler }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProvidesErrorHandler = _classThis = class {
            };
            __setFunctionName(_classThis, "ProvidesErrorHandler");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProvidesErrorHandler = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProvidesErrorHandler = _classThis;
        })();
        test_bed_1.TestBed.resetTestingModule();
        test_bed_1.TestBed.configureTestingModule({ imports: [ProvidesErrorHandler, HelloWorldModule] });
        (0, matchers_1.expect)(test_bed_1.TestBed.inject(core_1.ErrorHandler)).toEqual(jasmine.any(CustomErrorHandler));
    });
    it('should throw errors in CD', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                ngOnInit() {
                    // this should throw because this.name is undefined
                    this.name.hello = 'hello';
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        (0, matchers_1.expect)(() => {
            const fixture = test_bed_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
        }).toThrowError();
    });
    // TODO(FW-1245): properly fix issue where errors in listeners aren't thrown and don't cause
    // tests to fail. This is an issue in both View Engine and Ivy, and may require a breaking
    // change to completely fix (since simple re-throwing breaks handlers in ngrx, etc).
    xit('should throw errors in listeners', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '<button (click)="onClick()">Click me</button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                onClick() {
                    // this should throw because this.name is undefined
                    this.name.hello = 'hello';
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        const fixture = test_bed_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(() => {
            const button = fixture.nativeElement.querySelector('button');
            button.click();
        }).toThrowError();
    });
    it('should allow both the declaration and import of a component into the testing module', () => {
        // This test validates that a component (Outer) which is both declared and imported
        // (via its module) in the testing module behaves correctly. That is:
        //
        // 1) the component should be compiled in the scope of its original module.
        //
        // This condition is tested by having the component (Outer) use another component
        // (Inner) within its template. Thus, if it's compiled in the correct scope then the
        // text 'Inner' from the template of (Inner) should appear in the result.
        //
        // 2) the component should be available in the TestingModule scope.
        //
        // This condition is tested by attempting to use the component (Outer) inside a test
        // fixture component (Fixture) which is declared in the testing module only.
        let Inner = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner',
                    template: 'Inner',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Inner = _classThis = class {
            };
            __setFunctionName(_classThis, "Inner");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Inner = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Inner = _classThis;
        })();
        let Outer = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'outer',
                    template: '<inner></inner>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Outer = _classThis = class {
            };
            __setFunctionName(_classThis, "Outer");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Outer = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Outer = _classThis;
        })();
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [Inner, Outer],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let Fixture = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<outer></outer>',
                    selector: 'fixture',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Fixture = _classThis = class {
            };
            __setFunctionName(_classThis, "Fixture");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Fixture = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Fixture = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            declarations: [Outer, Fixture],
            imports: [Module],
        });
        const fixture = test_bed_1.TestBed.createComponent(Fixture);
        // The Outer component should have its template stamped out, and that template should
        // include a correct instance of the Inner component with the 'Inner' text from its
        // template.
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<outer><inner>Inner</inner></outer>');
    });
    describe('checking types before compiling them', () => {
        let MyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'my-dir',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir = _classThis = class {
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule = _classThis;
        })();
        // [decorator, type, overrideFn]
        const cases = [
            ['Component', MyDir, 'overrideComponent'],
            ['NgModule', MyDir, 'overrideModule'],
            ['Pipe', MyModule, 'overridePipe'],
            ['Directive', MyModule, 'overrideDirective'],
        ];
        cases.forEach(([decorator, type, overrideFn]) => {
            it(`should throw an error in case invalid type is used in ${overrideFn} function`, () => {
                test_bed_1.TestBed.configureTestingModule({ declarations: [MyDir] });
                (0, matchers_1.expect)(() => {
                    test_bed_1.TestBed[overrideFn](type, {});
                    test_bed_1.TestBed.createComponent(type);
                }).toThrowError(new RegExp(`class doesn't have @${decorator} decorator`, 'g'));
            });
        });
    });
    describe('defer blocks', () => {
        /**
         * Function returns a class that represents AOT-compiled version of the following Component:
         *
         * @Component({
         *       *  imports: [...],
         *  selector: '...',
         *  template: '...',
         * })
         * class ComponentClass {}
         *
         * This is needed to closer match the behavior of AOT pre-compiled components (compiled
         * outside of TestBed) for cases when defer blocks are used.
         */
        const getAOTCompiledComponent = (selector, dependencies = [], deferrableDependencies = []) => {
            class ComponentClass {
            }
            ComponentClass.ɵfac = () => new ComponentClass();
            ComponentClass.ɵcmp = (0, core_1.ɵɵdefineComponent)({
                type: ComponentClass,
                selectors: [[selector]],
                decls: 2,
                vars: 0,
                dependencies,
                consts: [['dir']],
                template: (rf, ctx) => {
                    if (rf & 1) {
                        (0, core_1.ɵɵelementStart)(0, 'div', 0);
                        (0, core_1.ɵɵtext)(1, `${selector} cmp!`);
                        (0, core_1.ɵɵelementEnd)();
                    }
                },
            });
            (0, metadata_1.setClassMetadataAsync)(ComponentClass, function () {
                const promises = deferrableDependencies.map(
                // Emulates a dynamic import, e.g. `import('./cmp-a').then(m => m.CmpA)`
                (dep) => new Promise((resolve) => setTimeout(() => resolve(dep))));
                return promises;
            }, function (...deferrableSymbols) {
                (0, core_1.ɵsetClassMetadata)(ComponentClass, [
                    {
                        type: core_1.Component,
                        args: [
                            {
                                selector,
                                imports: [...dependencies, ...deferrableSymbols],
                                template: `<div>root cmp!</div>`,
                            },
                        ],
                    },
                ], null, null);
            });
            return ComponentClass;
        };
        it('should handle async metadata on root and nested components', () => __awaiter(void 0, void 0, void 0, function* () {
            let CmpA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-a',
                        template: 'CmpA!',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpA = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpA = _classThis;
            })();
            const NestedAotComponent = getAOTCompiledComponent('nested-cmp', [], [CmpA]);
            const RootAotComponent = getAOTCompiledComponent('root', [], [NestedAotComponent]);
            test_bed_1.TestBed.configureTestingModule({ imports: [RootAotComponent] });
            test_bed_1.TestBed.overrideComponent(RootAotComponent, {
                set: { template: `Override of a root template! <nested-cmp />` },
            });
            test_bed_1.TestBed.overrideComponent(NestedAotComponent, {
                set: { template: `Override of a nested template! <cmp-a />` },
            });
            yield test_bed_1.TestBed.compileComponents();
            const fixture = test_bed_1.TestBed.createComponent(RootAotComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Override of a root template! Override of a nested template! CmpA!');
        }));
        it('should override providers on dependencies of dynamically loaded components', () => __awaiter(void 0, void 0, void 0, function* () {
            function timer(delay) {
                return new Promise((resolve) => {
                    setTimeout(() => resolve(), delay);
                });
            }
            let ImportantService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ImportantService = _classThis = class {
                    constructor() {
                        this.value = 'original';
                    }
                };
                __setFunctionName(_classThis, "ImportantService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ImportantService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ImportantService = _classThis;
            })();
            let ThisModuleProvidesService = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [ImportantService],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ThisModuleProvidesService = _classThis = class {
                };
                __setFunctionName(_classThis, "ThisModuleProvidesService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ThisModuleProvidesService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ThisModuleProvidesService = _classThis;
            })();
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        imports: [ThisModuleProvidesService],
                        template: '<h1>{{value}}</h1>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.service = (0, core_1.inject)(ImportantService);
                        this.value = this.service.value;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        imports: [ChildCmp],
                        template: `
          @defer (when true) {
            <child />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            const deferrableDependencies = [ChildCmp];
            (0, metadata_1.setClassMetadataAsync)(ParentCmp, function () {
                const promises = deferrableDependencies.map(
                // Emulates a dynamic import, e.g. `import('./cmp-a').then(m => m.CmpA)`
                (dep) => new Promise((resolve) => setTimeout(() => resolve(dep))));
                return promises;
            }, function (...deferrableSymbols) {
                (0, core_1.ɵsetClassMetadata)(ParentCmp, [
                    {
                        type: core_1.Component,
                        args: [
                            {
                                selector: 'parent',
                                imports: [...deferrableSymbols],
                                template: `<div>root cmp!</div>`,
                            },
                        ],
                    },
                ], null, null);
            });
            // Set `PLATFORM_ID` to a browser platform value to trigger defer loading
            // while running tests in Node.
            const COMMON_PROVIDERS = [{ provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID }];
            test_bed_1.TestBed.configureTestingModule({ imports: [ParentCmp], providers: [COMMON_PROVIDERS] });
            test_bed_1.TestBed.overrideProvider(ImportantService, { useValue: { value: 'overridden' } });
            yield test_bed_1.TestBed.compileComponents();
            const fixture = test_bed_1.TestBed.createComponent(ParentCmp);
            fixture.detectChanges();
            yield timer(10);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('overridden');
        }));
        it('should allow import overrides on components with async metadata', () => __awaiter(void 0, void 0, void 0, function* () {
            const NestedAotComponent = getAOTCompiledComponent('nested-cmp', [], []);
            const RootAotComponent = getAOTCompiledComponent('root', [], []);
            test_bed_1.TestBed.configureTestingModule({ imports: [RootAotComponent] });
            test_bed_1.TestBed.overrideComponent(RootAotComponent, {
                set: {
                    // Adding an import that was not present originally
                    imports: [NestedAotComponent],
                    template: `Override of a root template! <nested-cmp />`,
                },
            });
            yield test_bed_1.TestBed.compileComponents();
            const fixture = test_bed_1.TestBed.createComponent(RootAotComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Override of a root template! nested-cmp cmp!');
        }));
    });
    describe('AOT pre-compiled components', () => {
        /**
         * Function returns a class that represents AOT-compiled version of the following Component:
         *
         * @Component({
         *  standalone: true|false,
         *  imports: [...],  // for standalone only
         *  selector: 'comp',
         *  templateUrl: './template.ng.html',
         *  styleUrls: ['./style.css']
         * })
         * class ComponentClass {}
         *
         * This is needed to closer match the behavior of AOT pre-compiled components (compiled
         * outside of TestBed) without changing TestBed state and/or Component metadata to compile
         * them via TestBed with external resources.
         */
        const getAOTCompiledComponent = (standalone = false, dependencies = []) => {
            class ComponentClass {
            }
            ComponentClass.ɵfac = () => new ComponentClass();
            ComponentClass.ɵcmp = (0, core_1.ɵɵdefineComponent)({
                standalone,
                type: ComponentClass,
                selectors: [['comp']],
                decls: 2,
                vars: 0,
                dependencies,
                consts: [['dir']],
                template: (rf, ctx) => {
                    if (rf & 1) {
                        (0, core_1.ɵɵelementStart)(0, 'div', 0);
                        (0, core_1.ɵɵtext)(1, 'Some template');
                        (0, core_1.ɵɵelementEnd)();
                    }
                },
                styles: ['body { margin: 0; }'],
            });
            (0, core_1.ɵsetClassMetadata)(ComponentClass, [
                {
                    type: core_1.Component,
                    args: [
                        {
                            standalone,
                            imports: dependencies,
                            selector: 'comp',
                            templateUrl: './template.ng.html',
                            styleUrls: ['./style.css'],
                        },
                    ],
                },
            ], null, null);
            return ComponentClass;
        };
        it('should allow to override a provider used in a dependency of a standalone component', () => {
            const A = new core_1.InjectionToken('A');
            let SomeDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        providers: [{ provide: A, useValue: 'A' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDir = _classThis = class {
                    constructor(tokenA, elementRef) {
                        this.tokenA = tokenA;
                        this.elementRef = elementRef;
                    }
                    ngAfterViewInit() {
                        this.elementRef.nativeElement.innerHTML = this.tokenA;
                    }
                };
                __setFunctionName(_classThis, "SomeDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDir = _classThis;
            })();
            const SomeComponent = getAOTCompiledComponent(true, [SomeDir]);
            test_bed_1.TestBed.configureTestingModule({ imports: [SomeComponent] });
            test_bed_1.TestBed.overrideProvider(A, { useValue: 'Overridden A' });
            const fixture = test_bed_1.TestBed.createComponent(SomeComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Overridden A');
        });
        it('should have an ability to override template', () => {
            const SomeComponent = getAOTCompiledComponent();
            test_bed_1.TestBed.configureTestingModule({ declarations: [SomeComponent] });
            test_bed_1.TestBed.overrideTemplateUsingTestingModule(SomeComponent, 'Template override');
            const fixture = test_bed_1.TestBed.createComponent(SomeComponent);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('Template override');
        });
        it('should have an ability to override template with empty string', () => {
            const SomeComponent = getAOTCompiledComponent();
            test_bed_1.TestBed.configureTestingModule({ declarations: [SomeComponent] });
            test_bed_1.TestBed.overrideTemplateUsingTestingModule(SomeComponent, '');
            const fixture = test_bed_1.TestBed.createComponent(SomeComponent);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('');
        });
        it('should allow component in both in declarations and imports', () => {
            const SomeComponent = getAOTCompiledComponent();
            // This is an AOT compiled module which declares (but does not export) SomeComponent.
            class ModuleClass {
            }
            ModuleClass.ɵmod = (0, core_1.ɵɵdefineNgModule)({
                type: ModuleClass,
                declarations: [SomeComponent],
            });
            let TestFixture = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp></comp>',
                        selector: 'fixture',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestFixture = _classThis = class {
                };
                __setFunctionName(_classThis, "TestFixture");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestFixture = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestFixture = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({
                // Here, SomeComponent is both declared, and then the module which declares it is
                // also imported. This used to be a duplicate declaration error, but is now interpreted
                // to mean:
                // 1) Compile (or reuse) SomeComponent in the context of its original NgModule
                // 2) Make SomeComponent available in the scope of the testing module, even if it wasn't
                //    originally exported from its NgModule.
                //
                // This allows TestFixture to use SomeComponent, which is asserted below.
                declarations: [SomeComponent, TestFixture],
                imports: [ModuleClass],
            });
            const fixture = test_bed_1.TestBed.createComponent(TestFixture);
            // The regex avoids any issues with styling attributes.
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toMatch(/<comp[^>]*><div[^>]*>Some template<\/div><\/comp>/);
        });
    });
    describe('resetting ng defs', () => {
        it('should restore ng defs to their initial states', () => {
            let SomePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'somePipe',
                        pure: true,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomePipe = _classThis = class {
                    transform(value) {
                        return `transformed ${value}`;
                    }
                };
                __setFunctionName(_classThis, "SomePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomePipe = _classThis;
            })();
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'someDirective',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                    constructor() {
                        this.someProp = 'hello';
                    }
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: 'someText',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeComponent] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
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
            test_bed_1.TestBed.configureTestingModule({ imports: [SomeModule] });
            // adding Pipe and Directive via metadata override
            test_bed_1.TestBed.overrideModule(SomeModule, {
                set: { declarations: [SomeComponent, SomePipe, SomeDirective] },
            });
            test_bed_1.TestBed.overrideComponent(SomeComponent, {
                set: { template: `<span someDirective>{{'hello' | somePipe}}</span>` },
            });
            test_bed_1.TestBed.createComponent(SomeComponent);
            const cmpDefBeforeReset = SomeComponent.ɵcmp;
            (0, matchers_1.expect)(cmpDefBeforeReset.pipeDefs().length).toEqual(1);
            (0, matchers_1.expect)(cmpDefBeforeReset.directiveDefs().length).toEqual(2); // directive + component
            const scopeBeforeReset = deps_tracker_1.depsTracker.getNgModuleScope(SomeModule);
            (0, matchers_1.expect)(scopeBeforeReset.compilation.pipes.size).toEqual(1);
            (0, matchers_1.expect)(scopeBeforeReset.compilation.directives.size).toEqual(2);
            test_bed_1.TestBed.resetTestingModule();
            const cmpDefAfterReset = SomeComponent.ɵcmp;
            (0, matchers_1.expect)(cmpDefAfterReset.pipeDefs).toBe(null);
            (0, matchers_1.expect)(cmpDefAfterReset.directiveDefs).toBe(null);
            const scopeAfterReset = deps_tracker_1.depsTracker.getNgModuleScope(SomeModule);
            (0, matchers_1.expect)(scopeAfterReset).toEqual({
                compilation: {
                    pipes: new Set(),
                    directives: new Set([SomeComponent]),
                },
                exported: {
                    pipes: new Set(),
                    directives: new Set(),
                },
            });
        });
        it('should cleanup ng defs for classes with no ng annotations (in case of inheritance)', () => {
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someDirective',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            class ComponentWithNoAnnotations extends SomeComponent {
            }
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'some-directive',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            class DirectiveWithNoAnnotations extends SomeDirective {
            }
            let SomePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'some-pipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomePipe = _classThis = class {
                };
                __setFunctionName(_classThis, "SomePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomePipe = _classThis;
            })();
            class PipeWithNoAnnotations extends SomePipe {
            }
            test_bed_1.TestBed.configureTestingModule({
                declarations: [
                    ComponentWithNoAnnotations,
                    DirectiveWithNoAnnotations,
                    PipeWithNoAnnotations,
                ],
            });
            test_bed_1.TestBed.createComponent(ComponentWithNoAnnotations);
            (0, matchers_1.expect)(ComponentWithNoAnnotations.hasOwnProperty('ɵcmp')).toBeTruthy();
            (0, matchers_1.expect)(SomeComponent.hasOwnProperty('ɵcmp')).toBeTruthy();
            (0, matchers_1.expect)(DirectiveWithNoAnnotations.hasOwnProperty('ɵdir')).toBeTruthy();
            (0, matchers_1.expect)(SomeDirective.hasOwnProperty('ɵdir')).toBeTruthy();
            (0, matchers_1.expect)(PipeWithNoAnnotations.hasOwnProperty('ɵpipe')).toBeTruthy();
            (0, matchers_1.expect)(SomePipe.hasOwnProperty('ɵpipe')).toBeTruthy();
            test_bed_1.TestBed.resetTestingModule();
            // ng defs should be removed from classes with no annotations
            (0, matchers_1.expect)(ComponentWithNoAnnotations.hasOwnProperty('ɵcmp')).toBeFalsy();
            (0, matchers_1.expect)(DirectiveWithNoAnnotations.hasOwnProperty('ɵdir')).toBeFalsy();
            (0, matchers_1.expect)(PipeWithNoAnnotations.hasOwnProperty('ɵpipe')).toBeFalsy();
            // ng defs should be preserved on super types
            (0, matchers_1.expect)(SomeComponent.hasOwnProperty('ɵcmp')).toBeTruthy();
            (0, matchers_1.expect)(SomeDirective.hasOwnProperty('ɵdir')).toBeTruthy();
            (0, matchers_1.expect)(SomePipe.hasOwnProperty('ɵpipe')).toBeTruthy();
        });
        it('should cleanup scopes (configured via `TestBed.configureTestingModule`) between tests', () => {
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: 'Child comp',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: '<child></child>',
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
            // Case #1: `RootCmp` and `ChildCmp` are both included in the `declarations` field of
            // the testing module, so `ChildCmp` is in the scope of `RootCmp`.
            test_bed_1.TestBed.configureTestingModule({
                declarations: [RootCmp, ChildCmp],
            });
            let fixture = test_bed_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            let childCmpInstance = fixture.debugElement.query(platform_browser_1.By.directive(ChildCmp));
            (0, matchers_1.expect)(childCmpInstance.componentInstance).toBeInstanceOf(ChildCmp);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Child comp');
            test_bed_1.TestBed.resetTestingModule();
            const spy = spyOn(console, 'error');
            // Case #2: the `TestBed.configureTestingModule` was not invoked, thus the `ChildCmp`
            // should not be available in the `RootCmp` scope and no child content should be
            // rendered.
            fixture = test_bed_1.TestBed.createComponent(RootCmp);
            // also an error should be logged to the user informing them that
            // the child component is not part of the module
            (0, matchers_1.expect)(spy).toHaveBeenCalledTimes(1);
            fixture.detectChanges();
            childCmpInstance = fixture.debugElement.query(platform_browser_1.By.directive(ChildCmp));
            (0, matchers_1.expect)(childCmpInstance).toBeNull();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
            test_bed_1.TestBed.resetTestingModule();
            // Case #3: `ChildCmp` is included in the `declarations` field, but `RootCmp` is not,
            // so `ChildCmp` is NOT in the scope of `RootCmp` component.
            test_bed_1.TestBed.configureTestingModule({
                declarations: [ChildCmp],
            });
            fixture = test_bed_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            childCmpInstance = fixture.debugElement.query(platform_browser_1.By.directive(ChildCmp));
            (0, matchers_1.expect)(childCmpInstance).toBeNull();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
        });
        it('should clean up overridden providers for modules that are imported more than once', () => {
            let Token = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Token = _classThis = class {
                    constructor() {
                        this.name = 'real';
                    }
                };
                __setFunctionName(_classThis, "Token");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Token = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Token = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [Token],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module = _classThis = class {
                };
                __setFunctionName(_classThis, "Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({ imports: [Module, Module] });
            test_bed_1.TestBed.overrideProvider(Token, { useValue: { name: 'fake' } });
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(Token).name).toEqual('fake');
            test_bed_1.TestBed.resetTestingModule();
            // The providers for the module should have been restored to the original array, with
            // no trace of the overridden providers.
            (0, matchers_1.expect)(Module.ɵinj.providers).toEqual([Token]);
        });
        it('should clean up overridden providers on components whose modules are compiled more than once', () => __awaiter(void 0, void 0, void 0, function* () {
            let SomeInjectable = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeInjectable = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeInjectable");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeInjectable = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeInjectable = _classThis;
            })();
            let ComponentWithProvider = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        providers: [SomeInjectable],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentWithProvider = _classThis = class {
                    constructor(injectable) {
                        this.injectable = injectable;
                    }
                };
                __setFunctionName(_classThis, "ComponentWithProvider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentWithProvider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentWithProvider = _classThis;
            })();
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [ComponentWithProvider] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyModule = _classThis;
            })();
            test_bed_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const originalResolver = ComponentWithProvider.ɵcmp.providersResolver;
            test_bed_1.TestBed.overrideProvider(SomeInjectable, { useValue: { id: 'fake' } });
            const compiler = test_bed_1.TestBed.inject(core_1.Compiler);
            yield compiler.compileModuleAsync(MyModule);
            compiler.compileModuleSync(MyModule);
            test_bed_1.TestBed.resetTestingModule();
            (0, matchers_1.expect)(ComponentWithProvider.ɵcmp.providersResolver).toEqual(originalResolver);
        }));
    });
    describe('overrides provider', () => {
        it('with empty provider object', () => {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            test_bed_1.TestBed.overrideProvider(Service, {});
            // Should be able to get a Service instance because it has no dependencies that can't be
            // resolved
            (0, matchers_1.expect)(test_bed_1.TestBed.inject(Service)).toBeDefined();
        });
    });
    it('should handle provider overrides when module imports are provided as a function', () => {
        class InjectedString {
        }
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{injectedString.value}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor(injectedString) {
                    this.injectedString = injectedString;
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
        let DependencyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DependencyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "DependencyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DependencyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DependencyModule = _classThis;
        })();
        // We need to write the compiler output manually here,
        // because it depends on code generated by ngcc.
        class TestingModule {
        }
        TestingModule.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: TestingModule });
        TestingModule.ɵinj = (0, core_1.ɵɵdefineInjector)({ imports: [DependencyModule] });
        (0, core_1.ɵɵsetNgModuleScope)(TestingModule, { imports: () => [DependencyModule] });
        test_bed_1.TestBed.configureTestingModule({
            imports: [TestingModule],
            declarations: [AppComponent],
            providers: [{ provide: InjectedString, useValue: { value: 'initial' } }],
        }).compileComponents();
        test_bed_1.TestBed.overrideProvider(InjectedString, { useValue: { value: 'changed' } }).compileComponents();
        const fixture = test_bed_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('changed');
    });
    describe('TestBed.inject', () => {
        describe('injection flags', () => {
            it('should be able to optionally inject a token', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN, undefined, { optional: true })).toBeNull();
                (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN, undefined, { optional: true })).toBeNull();
            });
            it('should include `null` into the result type when the optional flag is used', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                const flags = { optional: true };
                let result = test_bed_1.TestBed.inject(TOKEN, undefined, flags);
                (0, matchers_1.expect)(result).toBe(null);
                // Verify that `null` can be a valid value (from typing standpoint),
                // the line below would fail a type check in case the result doesn't
                // have `null` in the type.
                result = null;
            });
            it('should be able to use skipSelf injection', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                test_bed_1.TestBed.configureTestingModule({
                    providers: [{ provide: TOKEN, useValue: 'from TestBed' }],
                });
                (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN)).toBe('from TestBed');
                (0, matchers_1.expect)(test_bed_1.TestBed.inject(TOKEN, undefined, { skipSelf: true, optional: true })).toBeNull();
            });
        });
    });
    it('should be able to call Testbed.runInInjectionContext in tests', () => {
        const expectedValue = 'testValue';
        let SomeInjectable = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeInjectable = _classThis = class {
                constructor() {
                    this.instanceValue = expectedValue;
                }
            };
            __setFunctionName(_classThis, "SomeInjectable");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeInjectable = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeInjectable = _classThis;
        })();
        function functionThatUsesInject() {
            return (0, core_1.inject)(SomeInjectable).instanceValue;
        }
        (0, matchers_1.expect)(test_bed_1.TestBed.runInInjectionContext(functionThatUsesInject)).toEqual(expectedValue);
    });
});
describe('TestBed defer block behavior', () => {
    beforeEach(() => {
        test_bed_1.TestBed.resetTestingModule();
    });
    it('should default defer block behavior to playthrough', () => {
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.getDeferBlockBehavior()).toBe(testing_1.DeferBlockBehavior.Playthrough);
    });
    it('should be able to configure defer block behavior', () => {
        test_bed_1.TestBed.configureTestingModule({ deferBlockBehavior: testing_1.DeferBlockBehavior.Manual });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.getDeferBlockBehavior()).toBe(testing_1.DeferBlockBehavior.Manual);
    });
    it('should reset the defer block behavior back to the default when TestBed is reset', () => {
        test_bed_1.TestBed.configureTestingModule({ deferBlockBehavior: testing_1.DeferBlockBehavior.Manual });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.getDeferBlockBehavior()).toBe(testing_1.DeferBlockBehavior.Manual);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.getDeferBlockBehavior()).toBe(testing_1.DeferBlockBehavior.Playthrough);
    });
});
describe('TestBed module teardown', () => {
    beforeEach(() => {
        test_bed_1.TestBed.resetTestingModule();
    });
    it('should tear down the test module by default', () => {
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldTearDownTestingModule()).toBe(true);
    });
    it('should be able to configure the teardown behavior', () => {
        test_bed_1.TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldTearDownTestingModule()).toBe(false);
    });
    it('should reset the teardown behavior back to the default when TestBed is reset', () => {
        test_bed_1.TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldTearDownTestingModule()).toBe(false);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldTearDownTestingModule()).toBe(true);
    });
    it('should destroy test module providers when test module teardown is enabled', () => {
        SimpleService.ngOnDestroyCalls = 0;
        test_bed_1.TestBed.configureTestingModule({
            providers: [SimpleService],
            declarations: [GreetingCmp],
            teardown: { destroyAfterEach: true },
        });
        test_bed_1.TestBed.createComponent(GreetingCmp);
        (0, matchers_1.expect)(SimpleService.ngOnDestroyCalls).toBe(0);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(SimpleService.ngOnDestroyCalls).toBe(1);
    });
    it('should not error on mocked and partially-implemented `DOCUMENT`', () => {
        SimpleService.ngOnDestroyCalls = 0;
        test_bed_1.TestBed.configureTestingModule({
            providers: [SimpleService, { provide: core_1.DOCUMENT, useValue: {} }],
            teardown: { destroyAfterEach: true },
        });
        test_bed_1.TestBed.inject(SimpleService);
        (0, matchers_1.expect)(SimpleService.ngOnDestroyCalls).toBe(0);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(SimpleService.ngOnDestroyCalls).toBe(1);
    });
    it('should remove the fixture root element from the DOM when module teardown is enabled', () => {
        test_bed_1.TestBed.configureTestingModule({
            declarations: [SimpleCmp],
            teardown: { destroyAfterEach: true },
        });
        const fixture = test_bed_1.TestBed.createComponent(SimpleCmp);
        const fixtureDocument = fixture.nativeElement.ownerDocument;
        (0, matchers_1.expect)(fixtureDocument.body.contains(fixture.nativeElement)).toBe(true);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(fixtureDocument.body.contains(fixture.nativeElement)).toBe(false);
    });
    it('should re-throw errors that were thrown during fixture cleanup', () => {
        let ThrowsOnDestroy = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ThrowsOnDestroy = _classThis = class {
                ngOnDestroy() {
                    throw Error('oh no');
                }
            };
            __setFunctionName(_classThis, "ThrowsOnDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ThrowsOnDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ThrowsOnDestroy = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            declarations: [ThrowsOnDestroy],
            teardown: { destroyAfterEach: true },
        });
        test_bed_1.TestBed.createComponent(ThrowsOnDestroy);
        const spy = spyOn(console, 'error');
        (0, matchers_1.expect)(() => test_bed_1.TestBed.resetTestingModule()).toThrowError('1 component threw errors during cleanup');
        (0, matchers_1.expect)(spy).toHaveBeenCalledTimes(1);
    });
    it('should not interrupt fixture destruction if an error is thrown', () => {
        let ThrowsOnDestroy = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ThrowsOnDestroy = _classThis = class {
                ngOnDestroy() {
                    throw Error('oh no');
                }
            };
            __setFunctionName(_classThis, "ThrowsOnDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ThrowsOnDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ThrowsOnDestroy = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            declarations: [ThrowsOnDestroy],
            teardown: { destroyAfterEach: true },
        });
        for (let i = 0; i < 3; i++) {
            test_bed_1.TestBed.createComponent(ThrowsOnDestroy);
        }
        const spy = spyOn(console, 'error');
        (0, matchers_1.expect)(() => test_bed_1.TestBed.resetTestingModule()).toThrowError('3 components threw errors during cleanup');
        (0, matchers_1.expect)(spy).toHaveBeenCalledTimes(3);
    });
    it('should re-throw errors that were thrown during module teardown by default', () => {
        let ThrowsOnDestroy = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ThrowsOnDestroy = _classThis = class {
                ngOnDestroy() {
                    throw Error('oh no');
                }
            };
            __setFunctionName(_classThis, "ThrowsOnDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ThrowsOnDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ThrowsOnDestroy = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(_service) { }
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
        test_bed_1.TestBed.configureTestingModule({
            providers: [ThrowsOnDestroy],
            declarations: [App],
            teardown: { destroyAfterEach: true },
        });
        test_bed_1.TestBed.createComponent(App);
        (0, matchers_1.expect)(() => test_bed_1.TestBed.resetTestingModule()).toThrowError('oh no');
    });
    it('should be able to opt out of rethrowing of errors coming from module teardown', () => {
        let ThrowsOnDestroy = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ThrowsOnDestroy = _classThis = class {
                ngOnDestroy() {
                    throw Error('oh no');
                }
            };
            __setFunctionName(_classThis, "ThrowsOnDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ThrowsOnDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ThrowsOnDestroy = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(_service) { }
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
        test_bed_1.TestBed.configureTestingModule({
            providers: [ThrowsOnDestroy],
            declarations: [App],
            teardown: { destroyAfterEach: true, rethrowErrors: false },
        });
        test_bed_1.TestBed.createComponent(App);
        const spy = spyOn(console, 'error');
        (0, matchers_1.expect)(() => test_bed_1.TestBed.resetTestingModule()).not.toThrow();
        (0, matchers_1.expect)(spy).toHaveBeenCalledTimes(1);
    });
    it('should remove the styles associated with a test component when the test module is torn down', () => {
        let StyledComp1 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<span>Hello</span>',
                    styles: [`span {color: hotpink;}`],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StyledComp1 = _classThis = class {
            };
            __setFunctionName(_classThis, "StyledComp1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StyledComp1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StyledComp1 = _classThis;
        })();
        let StyledComp2 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div>Hello</div>',
                    styles: [`div {color: red;}`],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StyledComp2 = _classThis = class {
            };
            __setFunctionName(_classThis, "StyledComp2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StyledComp2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StyledComp2 = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            declarations: [StyledComp1, StyledComp2],
            teardown: { destroyAfterEach: true },
        });
        const fixtures = [test_bed_1.TestBed.createComponent(StyledComp1), test_bed_1.TestBed.createComponent(StyledComp2)];
        const fixtureDocument = fixtures[0].nativeElement.ownerDocument;
        const styleCountBefore = fixtureDocument.querySelectorAll('style').length;
        // Note that we can only assert that the behavior works as expected by checking that the
        // number of stylesheets has decreased. We can't expect that they'll be zero, because there
        // may by stylesheets leaking in from other tests that don't use the module teardown
        // behavior.
        (0, matchers_1.expect)(styleCountBefore).toBeGreaterThan(0);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(fixtureDocument.querySelectorAll('style').length).toBeLessThan(styleCountBefore);
    });
    it('should remove the fixture root element from the DOM when module teardown is enabled', () => {
        test_bed_1.TestBed.configureTestingModule({
            declarations: [SimpleCmp],
            teardown: { destroyAfterEach: true },
        });
        const fixture = test_bed_1.TestBed.createComponent(SimpleCmp);
        const fixtureDocument = fixture.nativeElement.ownerDocument;
        (0, matchers_1.expect)(fixtureDocument.body.contains(fixture.nativeElement)).toBe(true);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(fixtureDocument.body.contains(fixture.nativeElement)).toBe(false);
    });
    it('should rethrow errors based on the default teardown behavior', () => {
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldRethrowTeardownErrors()).toBe(test_bed_common_1.TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT);
    });
    it('should rethrow errors if the option is omitted and test teardown is enabled', () => {
        test_bed_1.TestBed.configureTestingModule({ teardown: { destroyAfterEach: true } });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldRethrowTeardownErrors()).toBe(true);
    });
    it('should not rethrow errors if the option is omitted and test teardown is disabled', () => {
        test_bed_1.TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldRethrowTeardownErrors()).toBe(false);
    });
    it('should rethrow errors if the option is enabled, but teardown is disabled', () => {
        test_bed_1.TestBed.configureTestingModule({ teardown: { destroyAfterEach: false, rethrowErrors: true } });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldRethrowTeardownErrors()).toBe(true);
    });
    it('should not rethrow errors if the option is disabled, but teardown is enabled', () => {
        test_bed_1.TestBed.configureTestingModule({ teardown: { destroyAfterEach: true, rethrowErrors: false } });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldRethrowTeardownErrors()).toBe(false);
    });
});
describe('TestBed module `errorOnUnknownElements`', () => {
    beforeEach(() => {
        test_bed_1.TestBed.resetTestingModule();
    });
    it('should not throw based on the default behavior', () => {
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownElements()).toBe(test_bed_common_1.THROW_ON_UNKNOWN_ELEMENTS_DEFAULT);
    });
    it('should not throw if the option is omitted', () => {
        test_bed_1.TestBed.configureTestingModule({});
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownElements()).toBe(false);
    });
    it('should be able to configure the option', () => {
        test_bed_1.TestBed.configureTestingModule({ errorOnUnknownElements: true });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownElements()).toBe(true);
    });
    it('should reset the option back to the default when TestBed is reset', () => {
        test_bed_1.TestBed.configureTestingModule({ errorOnUnknownElements: true });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownElements()).toBe(true);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownElements()).toBe(false);
    });
});
describe('TestBed module `errorOnUnknownProperties`', () => {
    beforeEach(() => {
        test_bed_1.TestBed.resetTestingModule();
    });
    it('should not throw based on the default behavior', () => {
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownProperties()).toBe(test_bed_common_1.THROW_ON_UNKNOWN_PROPERTIES_DEFAULT);
    });
    it('should not throw if the option is omitted', () => {
        test_bed_1.TestBed.configureTestingModule({});
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownProperties()).toBe(false);
    });
    it('should be able to configure the option', () => {
        test_bed_1.TestBed.configureTestingModule({ errorOnUnknownProperties: true });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownProperties()).toBe(true);
    });
    it('should reset the option back to the default when TestBed is reset', () => {
        test_bed_1.TestBed.configureTestingModule({ errorOnUnknownProperties: true });
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownProperties()).toBe(true);
        test_bed_1.TestBed.resetTestingModule();
        (0, matchers_1.expect)(test_bed_1.TestBedImpl.INSTANCE.shouldThrowErrorOnUnknownProperties()).toBe(false);
    });
});
