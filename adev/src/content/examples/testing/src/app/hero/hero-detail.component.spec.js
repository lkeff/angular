"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const testing_3 = require("@angular/router/testing");
const testing_4 = require("../../testing");
const shared_1 = require("../shared/shared");
const hero_detail_component_1 = require("./hero-detail.component");
const hero_detail_service_1 = require("./hero-detail.service");
const hero_list_component_1 = require("./hero-list.component");
////// Testing Vars //////
let component;
let harness;
let page;
////// Tests //////
describe('HeroDetailComponent', () => {
    describe('with HeroModule setup', heroModuleSetup);
    describe('when override its provided HeroDetailService', overrideSetup);
    describe('with FormsModule setup', formsModuleSetup);
    describe('with SharedModule setup', sharedModuleSetup);
});
///////////////////
const testHero = (0, test_hero_service_1.getTestHeroes)()[0];
function overrideSetup() {
    // #docregion hds-spy
    class HeroDetailServiceSpy {
        constructor() {
            this.testHero = Object.assign({}, testHero);
            /* emit cloned test hero */
            this.getHero = jasmine
                .createSpy('getHero')
                .and.callFake(() => (0, testing_4.asyncData)(Object.assign({}, this.testHero)));
            /* emit clone of test hero, with changes merged in */
            this.saveHero = jasmine
                .createSpy('saveHero')
                .and.callFake((hero) => (0, testing_4.asyncData)(Object.assign(this.testHero, hero)));
        }
    }
    // #enddocregion hds-spy
    // #docregion setup-override
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [hero_detail_component_1.HeroDetailComponent, hero_list_component_1.HeroListComponent],
            providers: [
                (0, router_1.provideRouter)([
                    { path: 'heroes', component: hero_list_component_1.HeroListComponent },
                    { path: 'heroes/:id', component: hero_detail_component_1.HeroDetailComponent },
                ]),
                http_1.HttpClient,
                http_1.HttpHandler,
                // HeroDetailService at this level is IRRELEVANT!
                { provide: hero_detail_service_1.HeroDetailService, useValue: {} },
            ],
        }))
            // #docregion override-component-method
            .overrideComponent(hero_detail_component_1.HeroDetailComponent, {
            set: { providers: [{ provide: hero_detail_service_1.HeroDetailService, useClass: HeroDetailServiceSpy }] },
        })
            // #enddocregion override-component-method
            .compileComponents();
    }));
    // #enddocregion setup-override
    // #docregion override-tests
    let hdsSpy;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        harness = yield testing_3.RouterTestingHarness.create();
        component = yield harness.navigateByUrl(`/heroes/${testHero.id}`, hero_detail_component_1.HeroDetailComponent);
        page = new Page();
        // get the component's injected HeroDetailServiceSpy
        hdsSpy = harness.routeDebugElement.injector.get(hero_detail_service_1.HeroDetailService);
        harness.detectChanges();
    }));
    it('should have called `getHero`', () => {
        expect(hdsSpy.getHero.calls.count())
            .withContext('getHero called once')
            .toBe(1, 'getHero called once');
    });
    it("should display stub hero's name", () => {
        expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
    });
    it('should save stub hero change', (0, testing_2.fakeAsync)(() => {
        const origName = hdsSpy.testHero.name;
        const newName = 'New Name';
        page.nameInput.value = newName;
        page.nameInput.dispatchEvent(new Event('input')); // tell Angular
        expect(component.hero.name).withContext('component hero has new name').toBe(newName);
        expect(hdsSpy.testHero.name).withContext('service hero unchanged before save').toBe(origName);
        (0, testing_4.click)(page.saveBtn);
        expect(hdsSpy.saveHero.calls.count()).withContext('saveHero called once').toBe(1);
        (0, testing_2.tick)(); // wait for async save to complete
        expect(hdsSpy.testHero.name).withContext('service hero has new name after save').toBe(newName);
        expect(testing_2.TestBed.inject(router_1.Router).url).toEqual('/heroes');
    }));
}
// #enddocregion override-tests
////////////////////
const test_hero_service_1 = require("../model/testing/test-hero.service");
const firstHero = (0, test_hero_service_1.getTestHeroes)()[0];
function heroModuleSetup() {
    // #docregion setup-hero-module
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [hero_detail_component_1.HeroDetailComponent, hero_list_component_1.HeroListComponent],
            providers: [
                (0, router_1.provideRouter)([
                    { path: 'heroes/:id', component: hero_detail_component_1.HeroDetailComponent },
                    { path: 'heroes', component: hero_list_component_1.HeroListComponent },
                ]),
                (0, http_1.provideHttpClient)(),
                (0, testing_1.provideHttpClientTesting)(),
            ],
        })).compileComponents();
    }));
    // #enddocregion setup-hero-module
    // #docregion route-good-id
    describe('when navigate to existing hero', () => {
        let expectedHero;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            expectedHero = firstHero;
            yield createComponent(expectedHero.id);
        }));
        // #docregion selected-tests
        it("should display that hero's name", () => {
            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
        // #enddocregion route-good-id
        it('should navigate when click cancel', () => {
            (0, testing_4.click)(page.cancelBtn);
            expect(testing_2.TestBed.inject(router_1.Router).url).toEqual(`/heroes/${expectedHero.id}`);
        });
        it('should save when click save but not navigate immediately', () => {
            (0, testing_4.click)(page.saveBtn);
            expect(testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne({ method: 'PUT', url: 'api/heroes' }));
            expect(testing_2.TestBed.inject(router_1.Router).url).toEqual('/heroes/41');
        });
        it('should navigate when click save and save resolves', (0, testing_2.fakeAsync)(() => {
            (0, testing_4.click)(page.saveBtn);
            (0, testing_2.tick)(); // wait for async save to complete
            expect(testing_2.TestBed.inject(router_1.Router).url).toEqual('/heroes/41');
        }));
        // #docregion title-case-pipe
        it('should convert hero name to Title Case', () => __awaiter(this, void 0, void 0, function* () {
            harness.fixture.autoDetectChanges();
            // get the name's input and display elements from the DOM
            const hostElement = harness.routeNativeElement;
            const nameInput = hostElement.querySelector('input');
            const nameDisplay = hostElement.querySelector('span');
            // simulate user entering a new name into the input box
            nameInput.value = 'quick BROWN  fOx';
            // Dispatch a DOM event so that Angular learns of input value change.
            nameInput.dispatchEvent(new Event('input'));
            // Wait for Angular to update the display binding through the title pipe
            yield harness.fixture.whenStable();
            expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
        }));
        // #enddocregion selected-tests
        // #enddocregion title-case-pipe
    });
    // #docregion route-bad-id
    describe('when navigate to non-existent hero id', () => {
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            yield createComponent(999);
        }));
        it('should try to navigate back to hero list', () => {
            expect(testing_2.TestBed.inject(router_1.Router).url).toEqual('/heroes');
        });
    });
    // #enddocregion route-bad-id
}
/////////////////////
const forms_1 = require("@angular/forms");
const title_case_pipe_1 = require("../shared/title-case.pipe");
const app_config_1 = require("../app.config");
function formsModuleSetup() {
    // #docregion setup-forms-module
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [forms_1.FormsModule, hero_detail_component_1.HeroDetailComponent, title_case_pipe_1.TitleCasePipe],
            providers: [
                (0, http_1.provideHttpClient)(),
                (0, testing_1.provideHttpClientTesting)(),
                (0, router_1.provideRouter)([{ path: 'heroes/:id', component: hero_detail_component_1.HeroDetailComponent }]),
            ],
        })).compileComponents();
    }));
    // #enddocregion setup-forms-module
    it("should display 1st hero's name", () => __awaiter(this, void 0, void 0, function* () {
        const expectedHero = firstHero;
        yield createComponent(expectedHero.id).then(() => {
            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
    }));
}
///////////////////////
function sharedModuleSetup() {
    // #docregion setup-shared-module
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [hero_detail_component_1.HeroDetailComponent, shared_1.sharedImports],
            providers: [
                (0, router_1.provideRouter)([{ path: 'heroes/:id', component: hero_detail_component_1.HeroDetailComponent }]),
                (0, http_1.provideHttpClient)(),
                (0, testing_1.provideHttpClientTesting)(),
            ],
        })).compileComponents();
    }));
    // #enddocregion setup-shared-module
    it("should display 1st hero's name", () => __awaiter(this, void 0, void 0, function* () {
        const expectedHero = firstHero;
        yield createComponent(expectedHero.id).then(() => {
            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
    }));
}
/////////// Helpers /////
/** Create the HeroDetailComponent, initialize it, set test variables  */
// #docregion create-component
function createComponent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        harness = yield testing_3.RouterTestingHarness.create();
        component = yield harness.navigateByUrl(`/heroes/${id}`, hero_detail_component_1.HeroDetailComponent);
        page = new Page();
        const request = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne(`api/heroes/?id=${id}`);
        const hero = (0, test_hero_service_1.getTestHeroes)().find((h) => h.id === Number(id));
        request.flush(hero ? [hero] : []);
        harness.detectChanges();
    });
}
// #enddocregion create-component
// #docregion page
class Page {
    // getter properties wait to query the DOM until called.
    get buttons() {
        return this.queryAll('button');
    }
    get saveBtn() {
        return this.buttons[0];
    }
    get cancelBtn() {
        return this.buttons[1];
    }
    get nameDisplay() {
        return this.query('span');
    }
    get nameInput() {
        return this.query('input');
    }
    //// query helpers ////
    query(selector) {
        return harness.routeNativeElement.querySelector(selector);
    }
    queryAll(selector) {
        return harness.routeNativeElement.querySelectorAll(selector);
    }
}
// #enddocregion page
