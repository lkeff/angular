"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_component_1 = require("./dashboard.component");
const testing_1 = require("../../testing");
const test_hero_service_1 = require("../model/testing/test-hero.service");
class FakeRouter {
    navigateByUrl(url) {
        return url;
    }
}
describe('DashboardComponent class only', () => {
    let comp;
    let heroService;
    let router;
    beforeEach(() => {
        (0, testing_1.addMatchers)();
        router = new FakeRouter();
        heroService = new test_hero_service_1.TestHeroService();
        comp = new dashboard_component_1.DashboardComponent(router, heroService);
    });
    it('should NOT have heroes before calling OnInit', () => {
        expect(comp.heroes.length).withContext('should not have heroes before OnInit').toBe(0);
    });
    it('should NOT have heroes immediately after OnInit', () => {
        comp.ngOnInit(); // ngOnInit -> getHeroes
        expect(comp.heroes.length)
            .withContext('should not have heroes until service promise resolves')
            .toBe(0);
    });
    it('should HAVE heroes after HeroService gets them', (done) => {
        comp.ngOnInit(); // ngOnInit -> getHeroes
        heroService.lastResult // the one from getHeroes
            .subscribe({
            next: () => {
                // throw new Error('deliberate error'); // see it fail gracefully
                expect(comp.heroes.length)
                    .withContext('should have heroes after service promise resolves')
                    .toBeGreaterThan(0);
                done();
            },
            error: done.fail,
        });
    });
    it('should tell ROUTER to navigate by hero id', () => {
        const hero = { id: 42, name: 'Abbracadabra' };
        const spy = spyOn(router, 'navigateByUrl');
        comp.gotoDetail(hero);
        const navArgs = spy.calls.mostRecent().args[0];
        expect(navArgs).withContext('should nav to HeroDetail for Hero 42').toBe('/heroes/42');
    });
});
