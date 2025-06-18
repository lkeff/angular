"use strict";
// For more examples:
//   https://github.com/angular/angular/blob/main/packages/router/test/integration.spec.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const testing_1 = require("@angular/common/testing");
const testing_2 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const testing_3 = require("../testing");
const about_component_1 = require("./about/about.component");
const app_component_1 = require("./app.component");
const dashboard_component_1 = require("./dashboard/dashboard.component");
const test_hero_service_1 = require("./model/testing/test-hero.service");
const twain_service_1 = require("./twain/twain.service");
let comp;
let fixture;
let page;
let router;
let location;
describe('AppComponent & router testing', () => {
    beforeEach((0, testing_2.waitForAsync)(() => {
        testing_2.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            providers: [
                { provide: test_hero_service_1.HeroService, useClass: test_hero_service_1.TestHeroService },
                model_1.UserService,
                twain_service_1.TwainService,
                (0, http_1.provideHttpClient)(),
                (0, testing_1.provideLocationMocks)(),
                (0, router_1.provideRouter)([
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'about', component: about_component_1.AboutComponent },
                    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
                ]),
            ],
        })).compileComponents();
    }));
    it('should navigate to "Dashboard" immediately', (0, testing_2.fakeAsync)(() => {
        createComponent();
        (0, testing_2.tick)(); // wait for async data to arrive
        expectPathToBe('/dashboard', 'after initialNavigation()');
        expectElementOf(dashboard_component_1.DashboardComponent);
    }));
    it('should navigate to "About" on click', (0, testing_2.fakeAsync)(() => {
        createComponent();
        (0, testing_3.click)(page.aboutLinkDe);
        // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom
        advance();
        expectPathToBe('/about');
        expectElementOf(about_component_1.AboutComponent);
    }));
    it('should navigate to "About" w/ browser location URL change', (0, testing_2.fakeAsync)(() => {
        createComponent();
        location.simulateHashChange('/about');
        advance();
        expectPathToBe('/about');
        expectElementOf(about_component_1.AboutComponent);
    }));
    // Can't navigate to lazy loaded modules with this technique
    xit('should navigate to "Heroes" on click (not working yet)', (0, testing_2.fakeAsync)(() => {
        createComponent();
        page.heroesLinkDe.nativeElement.click();
        advance();
        expectPathToBe('/heroes');
    }));
});
///////////////
const hero_list_component_1 = require("./hero/hero-list.component");
const app_config_1 = require("./app.config");
const hero_routes_1 = __importDefault(require("./hero/hero.routes"));
const model_1 = require("./model");
const http_1 = require("@angular/common/http");
///////// Can't get lazy loaded Heroes to work yet
xdescribe('AppComponent & Lazy Loading (not working yet)', () => {
    beforeEach((0, testing_2.waitForAsync)(() => {
        testing_2.TestBed.configureTestingModule(app_config_1.appConfig).compileComponents();
    }));
    beforeEach((0, testing_2.fakeAsync)(() => {
        createComponent();
        router.resetConfig([{ path: 'heroes', loadChildren: () => hero_routes_1.default }]);
    }));
    it('should navigate to "Heroes" on click', (0, testing_2.waitForAsync)(() => {
        page.heroesLinkDe.nativeElement.click();
        advance();
        expectPathToBe('/heroes');
        expectElementOf(hero_list_component_1.HeroListComponent);
    }));
    it('can navigate to "Heroes" w/ browser location URL change', (0, testing_2.fakeAsync)(() => {
        location.go('/heroes');
        advance();
        expectPathToBe('/heroes');
        expectElementOf(hero_list_component_1.HeroListComponent);
    }));
});
////// Helpers /////////
/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance() {
    (0, testing_2.tick)(); // wait while navigating
    fixture.detectChanges(); // update view
    (0, testing_2.tick)(); // wait for async data to arrive
}
function createComponent() {
    fixture = testing_2.TestBed.createComponent(app_component_1.AppComponent);
    comp = fixture.componentInstance;
    const injector = fixture.debugElement.injector;
    location = injector.get(common_1.Location);
    router = injector.get(router_1.Router);
    router.initialNavigation();
    spyOn(injector.get(twain_service_1.TwainService), 'getQuote')
        // fake fast async observable
        .and.returnValue((0, testing_3.asyncData)('Test Quote'));
    advance();
    page = new Page();
}
class Page {
    constructor() {
        const links = fixture.debugElement.queryAll(platform_browser_1.By.directive(router_1.RouterLink));
        this.aboutLinkDe = links[2];
        this.dashboardLinkDe = links[0];
        this.heroesLinkDe = links[1];
        // for debugging
        this.comp = comp;
        this.fixture = fixture;
        this.router = router;
    }
}
function expectPathToBe(path, expectationFailOutput) {
    expect(location.path())
        .withContext(expectationFailOutput || 'location.path()')
        .toEqual(path);
}
function expectElementOf(type) {
    const el = fixture.debugElement.query(platform_browser_1.By.directive(type));
    expect(el).withContext(`expected an element for ${type.name}`).toBeTruthy();
    return el;
}
