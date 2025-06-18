"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const app_component_1 = require("./app.component");
const app_config_1 = require("./app.config");
const model_1 = require("./model");
// #docregion component-stubs
let BannerStubComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ selector: 'app-banner', template: '' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BannerStubComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "BannerStubComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BannerStubComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BannerStubComponent = _classThis;
})();
let RouterOutletStubComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ selector: 'router-outlet', template: '' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouterOutletStubComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "RouterOutletStubComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterOutletStubComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterOutletStubComponent = _classThis;
})();
let WelcomeStubComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ selector: 'app-welcome', template: '' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WelcomeStubComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "WelcomeStubComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WelcomeStubComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WelcomeStubComponent = _classThis;
})();
// #enddocregion component-stubs
let comp;
let fixture;
describe('AppComponent & TestModule', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        // #docregion testbed-stubs
        testing_1.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [
                app_component_1.AppComponent,
                BannerStubComponent,
                router_1.RouterLink,
                RouterOutletStubComponent,
                WelcomeStubComponent,
            ],
            providers: [(0, router_1.provideRouter)([]), model_1.UserService],
        }))
            // #enddocregion testbed-stubs
            .compileComponents()
            .then(() => {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        // #docregion no-errors-schema, mixed-setup
        testing_1.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [
                app_component_1.AppComponent,
                // #enddocregion no-errors-schema
                BannerStubComponent,
                // #docregion no-errors-schema
                router_1.RouterLink,
            ],
            providers: [(0, router_1.provideRouter)([]), model_1.UserService],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        }))
            // #enddocregion no-errors-schema, mixed-setup
            .compileComponents()
            .then(() => {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
function tests() {
    let routerLinks;
    let linkDes;
    // #docregion test-setup
    beforeEach(() => {
        fixture.detectChanges(); // trigger initial data binding
        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement.queryAll(platform_browser_1.By.directive(router_1.RouterLink));
        // get attached link directive instances
        // using each DebugElement's injector
        routerLinks = linkDes.map((de) => de.injector.get(router_1.RouterLink));
    });
    // #enddocregion test-setup
    it('can instantiate the component', () => {
        expect(comp).not.toBeNull();
    });
    // #docregion tests
    it('can get RouterLinks from template', () => {
        expect(routerLinks.length).withContext('should have 3 routerLinks').toBe(3);
        expect(routerLinks[0].href).toBe('/dashboard');
        expect(routerLinks[1].href).toBe('/heroes');
        expect(routerLinks[2].href).toBe('/about');
    });
    it('can click Heroes link in template', (0, testing_1.fakeAsync)(() => {
        const heroesLinkDe = linkDes[1]; // heroes link DebugElement
        testing_1.TestBed.inject(router_1.Router).resetConfig([{ path: '**', children: [] }]);
        heroesLinkDe.triggerEventHandler('click', { button: 0 });
        (0, testing_1.tick)();
        fixture.detectChanges();
        expect(testing_1.TestBed.inject(router_1.Router).url).toBe('/heroes');
    }));
    // #enddocregion tests
}
