"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
        }).compileComponents();
    }));
    it('should create the app', (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should render title', (0, testing_1.waitForAsync)(() => {
        var _a;
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect((_a = compiled.querySelector('h1')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('Forms Overview');
    }));
});
