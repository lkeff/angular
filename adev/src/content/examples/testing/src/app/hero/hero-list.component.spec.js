"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const testing_2 = require("../../testing");
const hero_service_1 = require("../model/hero.service");
const test_hero_service_1 = require("../model/testing/test-hero.service");
const hero_list_component_1 = require("./hero-list.component");
const highlight_directive_1 = require("../shared/highlight.directive");
const app_config_1 = require("../app.config");
const HEROES = (0, test_hero_service_1.getTestHeroes)();
let comp;
let fixture;
let page;
/////// Tests //////
describe('HeroListComponent', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        (0, testing_2.addMatchers)();
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        testing_1.TestBed.configureTestingModule(Object.assign({}, app_config_1.appConfig, {
            providers: [
                { provide: hero_service_1.HeroService, useClass: test_hero_service_1.TestHeroService },
                { provide: router_1.Router, useValue: routerSpy },
            ],
        }))
            .compileComponents()
            .then(createComponent);
    }));
    it('should display heroes', () => {
        expect(page.heroRows.length).toBeGreaterThan(0);
    });
    it('1st hero should match 1st test hero', () => {
        const expectedHero = HEROES[0];
        const actualHero = page.heroRows[0].textContent;
        expect(actualHero).withContext('hero.id').toContain(expectedHero.id.toString());
        expect(actualHero).withContext('hero.name').toContain(expectedHero.name);
    });
    it('should select hero on click', (0, testing_1.fakeAsync)(() => {
        const expectedHero = HEROES[1];
        const btn = page.heroRows[1].querySelector('button');
        btn.dispatchEvent(new Event('click'));
        (0, testing_1.tick)();
        // `.toEqual` because selectedHero is clone of expectedHero; see FakeHeroService
        expect(comp.selectedHero).toEqual(expectedHero);
    }));
    it('should navigate to selected hero detail on click', (0, testing_1.fakeAsync)(() => {
        const expectedHero = HEROES[1];
        const btn = page.heroRows[1].querySelector('button');
        btn.dispatchEvent(new Event('click'));
        (0, testing_1.tick)();
        // should have navigated
        expect(page.navSpy.calls.any()).withContext('navigate called').toBe(true);
        // composed hero detail will be URL like 'heroes/42'
        // expect link array with the route path and hero id
        // first argument to router.navigate is link array
        const navArgs = page.navSpy.calls.first().args[0];
        expect(navArgs[0]).withContext('nav to heroes detail URL').toContain('heroes');
        expect(navArgs[1]).withContext('expected hero.id').toBe(expectedHero.id);
    }));
    it('should find `HighlightDirective` with `By.directive', () => {
        // #docregion by
        // Can find DebugElement either by css selector or by directive
        const h2 = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        const directive = fixture.debugElement.query(platform_browser_1.By.directive(highlight_directive_1.HighlightDirective));
        // #enddocregion by
        expect(h2).toBe(directive);
    });
    it('should color header with `HighlightDirective`', () => {
        const h2 = page.highlightDe.nativeElement;
        const bgColor = h2.style.backgroundColor;
        // different browsers report color values differently
        const isExpectedColor = bgColor === 'gold' || bgColor === 'rgb(255, 215, 0)';
        expect(isExpectedColor).withContext('backgroundColor').toBe(true);
    });
    it("the `HighlightDirective` is among the element's providers", () => {
        expect(page.highlightDe.providerTokens)
            .withContext('HighlightDirective')
            .toContain(highlight_directive_1.HighlightDirective);
    });
});
/////////// Helpers /////
/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = testing_1.TestBed.createComponent(hero_list_component_1.HeroListComponent);
    comp = fixture.componentInstance;
    // change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        // got the heroes and updated component
        // change detection updates the view
        fixture.detectChanges();
        page = new Page();
    });
}
class Page {
    constructor() {
        const heroRowNodes = fixture.nativeElement.querySelectorAll('li');
        this.heroRows = Array.from(heroRowNodes);
        // Find the first element with an attached HighlightDirective
        this.highlightDe = fixture.debugElement.query(platform_browser_1.By.directive(highlight_directive_1.HighlightDirective));
        // Get the component's injected router navigation spy
        const routerSpy = fixture.debugElement.injector.get(router_1.Router);
        this.navSpy = routerSpy.navigate;
    }
}
