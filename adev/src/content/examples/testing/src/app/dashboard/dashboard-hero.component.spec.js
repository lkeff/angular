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
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("../../testing");
const app_config_1 = require("../app.config");
const dashboard_hero_component_1 = require("./dashboard-hero.component");
beforeEach(testing_2.addMatchers);
describe('DashboardHeroComponent when tested directly', () => {
    let comp;
    let expectedHero;
    let fixture;
    let heroDe;
    let heroEl;
    beforeEach(() => {
        // #docregion setup, config-testbed
        testing_1.TestBed.configureTestingModule({
            providers: app_config_1.appProviders,
        });
        // #enddocregion setup, config-testbed
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // #docregion setup
        fixture = testing_1.TestBed.createComponent(dashboard_hero_component_1.DashboardHeroComponent);
        fixture.autoDetectChanges();
        comp = fixture.componentInstance;
        // find the hero's DebugElement and element
        heroDe = fixture.debugElement.query(platform_browser_1.By.css('.hero'));
        heroEl = heroDe.nativeElement;
        // mock the hero supplied by the parent component
        expectedHero = { id: 42, name: 'Test Name' };
        // simulate the parent setting the input property with that hero
        fixture.componentRef.setInput('hero', expectedHero);
        // wait for initial data binding
        yield fixture.whenStable();
        // #enddocregion setup
    }));
    // #docregion name-test
    it('should display hero name in uppercase', () => {
        const expectedPipedName = expectedHero.name.toUpperCase();
        expect(heroEl.textContent).toContain(expectedPipedName);
    });
    // #enddocregion name-test
    // #docregion click-test
    it('should raise selected event when clicked (triggerEventHandler)', () => {
        let selectedHero;
        comp.selected.subscribe((hero) => (selectedHero = hero));
        // #docregion trigger-event-handler
        heroDe.triggerEventHandler('click');
        // #enddocregion trigger-event-handler
        expect(selectedHero).toBe(expectedHero);
    });
    // #enddocregion click-test
    // #docregion click-test-2
    it('should raise selected event when clicked (element.click)', () => {
        let selectedHero;
        comp.selected.subscribe((hero) => (selectedHero = hero));
        heroEl.click();
        expect(selectedHero).toBe(expectedHero);
    });
    // #enddocregion click-test-2
    // #docregion click-test-3
    it('should raise selected event when clicked (click helper with DebugElement)', () => {
        let selectedHero;
        comp.selected.subscribe((hero) => (selectedHero = hero));
        (0, testing_2.click)(heroDe); // click helper with DebugElement
        expect(selectedHero).toBe(expectedHero);
    });
    // #enddocregion click-test-3
    it('should raise selected event when clicked (click helper with native element)', () => {
        let selectedHero;
        comp.selected.subscribe((hero) => (selectedHero = hero));
        (0, testing_2.click)(heroEl); // click helper with native element
        expect(selectedHero).toBe(expectedHero);
    });
});
//////////////////
describe('DashboardHeroComponent when inside a test host', () => {
    let testHost;
    let fixture;
    let heroEl;
    beforeEach((0, testing_1.waitForAsync)(() => {
        // #docregion test-host-setup
        testing_1.TestBed.configureTestingModule({
            providers: app_config_1.appProviders,
            imports: [dashboard_hero_component_1.DashboardHeroComponent, TestHostComponent],
        })
            // #enddocregion test-host-setup
            .compileComponents();
    }));
    beforeEach(() => {
        // #docregion test-host-setup
        // create TestHostComponent instead of DashboardHeroComponent
        fixture = testing_1.TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        heroEl = fixture.nativeElement.querySelector('.hero');
        fixture.detectChanges(); // trigger initial data binding
        // #enddocregion test-host-setup
    });
    // #docregion test-host-tests
    it('should display hero name', () => {
        const expectedPipedName = testHost.hero.name.toUpperCase();
        expect(heroEl.textContent).toContain(expectedPipedName);
    });
    it('should raise selected event when clicked', () => {
        (0, testing_2.click)(heroEl);
        // selected hero should be the same data bound hero
        expect(testHost.selectedHero).toBe(testHost.hero);
    });
    // #enddocregion test-host-tests
});
////// Test Host Component //////
const core_1 = require("@angular/core");
// #docregion test-host
let TestHostComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            imports: [dashboard_hero_component_1.DashboardHeroComponent],
            template: ` <dashboard-hero [hero]="hero" (selected)="onSelected($event)"> </dashboard-hero>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestHostComponent = _classThis = class {
        constructor() {
            this.hero = { id: 42, name: 'Test Name' };
        }
        onSelected(hero) {
            this.selectedHero = hero;
        }
    };
    __setFunctionName(_classThis, "TestHostComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestHostComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestHostComponent = _classThis;
})();
// #enddocregion test-host
