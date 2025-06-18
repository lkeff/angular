"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #enddocregion import-debug-element
// #docregion v1
const testing_1 = require("@angular/core/testing");
// #enddocregion v1
// #docregion import-by
const platform_browser_1 = require("@angular/platform-browser");
// #enddocregion import-by
const banner_initial_component_1 = require("./banner-initial.component");
/*
// #docregion v1
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
// #enddocregion v1
*/
describe('BannerComponent (initial CLI generated)', () => {
    // #docregion v1
    let component;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({ imports: [banner_initial_component_1.BannerComponent] }).compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(banner_initial_component_1.BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeDefined();
    });
});
// #enddocregion v1
// #docregion v2
describe('BannerComponent (minimal)', () => {
    it('should create', () => {
        // #docregion configureTestingModule
        testing_1.TestBed.configureTestingModule({ imports: [banner_initial_component_1.BannerComponent] });
        // #enddocregion configureTestingModule
        // #docregion createComponent
        const fixture = testing_1.TestBed.createComponent(banner_initial_component_1.BannerComponent);
        // #enddocregion createComponent
        // #docregion componentInstance
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
        // #enddocregion componentInstance
    });
});
// #enddocregion v2
// #docregion v3
describe('BannerComponent (with beforeEach)', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ imports: [banner_initial_component_1.BannerComponent] });
        fixture = testing_1.TestBed.createComponent(banner_initial_component_1.BannerComponent);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        expect(component).toBeDefined();
    });
    // #enddocregion v3
    // #docregion v4-test-2
    it('should contain "banner works!"', () => {
        const bannerElement = fixture.nativeElement;
        expect(bannerElement.textContent).toContain('banner works!');
    });
    // #enddocregion v4-test-2
    // #docregion v4-test-3
    it('should have <p> with "banner works!"', () => {
        // #docregion nativeElement
        const bannerElement = fixture.nativeElement;
        // #enddocregion nativeElement
        const p = bannerElement.querySelector('p');
        expect(p.textContent).toEqual('banner works!');
    });
    // #enddocregion v4-test-3
    // #docregion v4-test-4
    it('should find the <p> with fixture.debugElement.nativeElement', () => {
        // #docregion debugElement-nativeElement
        const bannerDe = fixture.debugElement;
        const bannerEl = bannerDe.nativeElement;
        // #enddocregion debugElement-nativeElement
        const p = bannerEl.querySelector('p');
        expect(p.textContent).toEqual('banner works!');
    });
    // #enddocregion v4-test-4
    // #docregion v4-test-5
    it('should find the <p> with fixture.debugElement.query(By.css)', () => {
        const bannerDe = fixture.debugElement;
        const paragraphDe = bannerDe.query(platform_browser_1.By.css('p'));
        const p = paragraphDe.nativeElement;
        expect(p.textContent).toEqual('banner works!');
    });
    // #enddocregion v4-test-5
    // #docregion v3
});
// #enddocregion v3
