"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    let de;
    let comp;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({ declarations: [app_component_1.AppComponent] }).compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should create component', () => expect(comp).toBeDefined());
    it('should have expected <h1> text', () => {
        fixture.detectChanges();
        const h1 = de.nativeElement;
        expect(h1.textContent).toMatch(/angular/i, '<h1> should say something about "Angular"');
    });
});
