"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
// #docregion
const testing_1 = require("@angular/core/testing");
const banner_component_1 = require("./banner.component");
describe('BannerComponent (inline template)', () => {
    // #docregion setup
    let component;
    let fixture;
    let h1;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [banner_component_1.BannerComponent],
        });
        fixture = testing_1.TestBed.createComponent(banner_component_1.BannerComponent);
        component = fixture.componentInstance; // BannerComponent test instance
        h1 = fixture.nativeElement.querySelector('h1');
    });
    // #enddocregion setup
    // #docregion test-w-o-detect-changes
    it('no title in the DOM after createComponent()', () => {
        expect(h1.textContent).toEqual('');
    });
    // #enddocregion test-w-o-detect-changes
    // #docregion expect-h1-default-v1
    it('should display original title', () => {
        // #enddocregion expect-h1-default-v1
        fixture.detectChanges();
        // #docregion expect-h1-default-v1
        expect(h1.textContent).toContain(component.title);
    });
    // #enddocregion expect-h1-default-v1
    // #docregion expect-h1-default
    it('should display original title after detectChanges()', () => {
        fixture.detectChanges();
        expect(h1.textContent).toContain(component.title);
    });
    // #enddocregion expect-h1-default
    // #docregion after-change
    it('should display a different test title', () => {
        component.title = 'Test Title';
        fixture.detectChanges();
        expect(h1.textContent).toContain('Test Title');
    });
    // #enddocregion after-change
});
