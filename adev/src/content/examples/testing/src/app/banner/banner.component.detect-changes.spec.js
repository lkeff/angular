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
// #docregion
// #docregion import-ComponentFixtureAutoDetect
const testing_1 = require("@angular/core/testing");
// #enddocregion import-ComponentFixtureAutoDetect
const testing_2 = require("@angular/core/testing");
const banner_component_1 = require("./banner.component");
describe('BannerComponent (AutoChangeDetect)', () => {
    let comp;
    let fixture;
    let h1;
    beforeEach(() => {
        // #docregion auto-detect
        testing_2.TestBed.configureTestingModule({
            providers: [{ provide: testing_1.ComponentFixtureAutoDetect, useValue: true }],
        });
        // #enddocregion auto-detect
        fixture = testing_2.TestBed.createComponent(banner_component_1.BannerComponent);
        comp = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector('h1');
    });
    // #docregion auto-detect-tests
    it('should display original title', () => {
        // Hooray! No `fixture.detectChanges()` needed
        expect(h1.textContent).toContain(comp.title);
    });
    it('should still see original title after comp.title change', () => __awaiter(void 0, void 0, void 0, function* () {
        const oldTitle = comp.title;
        const newTitle = 'Test Title';
        comp.title.set(newTitle);
        // Displayed title is old because Angular didn't yet run change detection
        expect(h1.textContent).toContain(oldTitle);
        yield fixture.whenStable();
        expect(h1.textContent).toContain(newTitle);
    }));
    it('should display updated title after detectChanges', () => {
        comp.title.set('Test Title');
        fixture.detectChanges(); // detect changes explicitly
        expect(h1.textContent).toContain(comp.title);
    });
    // #enddocregion auto-detect-tests
});
