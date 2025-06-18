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
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/common/http/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const testing_3 = require("@angular/router/testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const testing_4 = require("../../testing");
const hero_service_1 = require("../model/hero.service");
const test_heroes_1 = require("../model/testing/test-heroes");
const dashboard_component_1 = require("./dashboard.component");
const app_config_1 = require("../app.config");
const hero_detail_component_1 = require("../hero/hero-detail.component");
beforeEach(testing_4.addMatchers);
let comp;
let harness;
////////  Deep  ////////////////
describe('DashboardComponent (deep)', () => {
    compileAndCreate();
    tests(clickForDeep);
    function clickForDeep() {
        // get first <div class="hero">
        const heroEl = harness.routeNativeElement.querySelector('.hero');
        (0, testing_4.click)(heroEl);
        return (0, rxjs_1.firstValueFrom)(testing_2.TestBed.inject(router_1.Router).events.pipe((0, operators_1.filter)((e) => e instanceof router_1.NavigationEnd)));
    }
});
////////  Shallow ////////////////
describe('DashboardComponent (shallow)', () => {
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [dashboard_component_1.DashboardComponent, hero_detail_component_1.HeroDetailComponent],
            providers: [(0, router_1.provideRouter)([{ path: 'heroes/:id', component: hero_detail_component_1.HeroDetailComponent }])],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        }));
    });
    compileAndCreate();
    tests(clickForShallow);
    function clickForShallow() {
        // get first <dashboard-hero> DebugElement
        const heroDe = harness.routeDebugElement.query(platform_browser_1.By.css('dashboard-hero'));
        heroDe.triggerEventHandler('selected', comp.heroes[0]);
        return Promise.resolve();
    }
});
/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        // #docregion router-harness
        testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            imports: [dashboard_component_1.DashboardComponent],
            providers: [
                (0, router_1.provideRouter)([{ path: '**', component: dashboard_component_1.DashboardComponent }]),
                (0, http_1.provideHttpClient)(),
                (0, testing_1.provideHttpClientTesting)(),
                hero_service_1.HeroService,
            ],
        }));
        harness = yield testing_3.RouterTestingHarness.create();
        comp = yield harness.navigateByUrl('/', dashboard_component_1.DashboardComponent);
        testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('api/heroes').flush((0, test_heroes_1.getTestHeroes)());
        // #enddocregion router-harness
    }));
}
/**
 * The (almost) same tests for both.
 * Only change: the way that the first hero is clicked
 */
function tests(heroClick) {
    describe('after get dashboard heroes', () => {
        let router;
        // Trigger component so it gets heroes and binds to them
        beforeEach((0, testing_2.waitForAsync)(() => {
            router = testing_2.TestBed.inject(router_1.Router);
            harness.detectChanges(); // runs ngOnInit -> getHeroes
        }));
        it('should HAVE heroes', () => {
            expect(comp.heroes.length)
                .withContext('should have heroes after service promise resolves')
                .toBeGreaterThan(0);
        });
        it('should DISPLAY heroes', () => {
            // Find and examine the displayed heroes
            // Look for them in the DOM by css class
            const heroes = harness.routeNativeElement.querySelectorAll('dashboard-hero');
            expect(heroes.length).withContext('should display 4 heroes').toBe(4);
        });
        // #docregion navigate-test
        it('should tell navigate when hero clicked', () => __awaiter(this, void 0, void 0, function* () {
            yield heroClick(); // trigger click on first inner <div class="hero">
            // expecting to navigate to id of the component's first hero
            const id = comp.heroes[0].id;
            expect(testing_2.TestBed.inject(router_1.Router).url)
                .withContext('should nav to HeroDetail for first hero')
                .toEqual(`/heroes/${id}`);
        }));
        // #enddocregion navigate-test
    });
}
