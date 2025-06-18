"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
// #docregion
const testing_1 = require("@angular/core/testing");
// #enddocregion
const app_initial_component_1 = require("./app-initial.component");
/*
// #docregion
import { AppComponent } from './app.component';

describe('AppComponent', () => {
// #enddocregion
*/
describe('AppComponent (initial CLI version)', () => {
    // #docregion
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [app_initial_component_1.AppComponent],
        }).compileComponents();
    }));
    it('should create the app', (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(app_initial_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    }));
    it("should have as title 'app'", (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(app_initial_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('app');
    }));
    it('should render title', (0, testing_1.waitForAsync)(() => {
        var _a;
        const fixture = testing_1.TestBed.createComponent(app_initial_component_1.AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect((_a = compiled.querySelector('h1')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('Welcome to app!');
    }));
});
describe('AppComponent (initial CLI version - as it should be)', () => {
    let app;
    let de;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [app_initial_component_1.AppComponent],
        });
        fixture = testing_1.TestBed.createComponent(app_initial_component_1.AppComponent);
        app = fixture.componentInstance;
        de = fixture.debugElement;
    });
    it('should create the app', () => {
        expect(app).toBeDefined();
    });
    it("should have as title 'app'", () => {
        expect(app.title).toEqual('app');
    });
    it('should render title in an h1 tag', () => {
        fixture.detectChanges();
        expect(de.nativeElement.querySelector('h1').textContent).toContain('Welcome to app!');
    });
});
