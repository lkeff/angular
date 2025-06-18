"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
const testing_1 = require("@angular/core/testing");
const top_level_banner_component_1 = require("./top-level-banner.component");
const providers_1 = require("../../providers");
describe('TopLevelBannerComponent', () => {
    let component;
    let fixture;
    let mockLocalStorage;
    const EXAMPLE_TEXT = 'Click Here';
    const EXAMPLE_LINK = 'https://example.com';
    const EXAMPLE_ID = 'banner-id';
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        mockLocalStorage = jasmine.createSpyObj('Storage', ['getItem', 'setItem']);
        fixture = testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: providers_1.LOCAL_STORAGE, useValue: mockLocalStorage },
                { provide: providers_1.WINDOW, useValue: { location: { origin: '' } } },
            ],
        }).createComponent(top_level_banner_component_1.TopLevelBannerComponent);
        fixture.componentRef.setInput('text', EXAMPLE_TEXT);
        fixture.componentRef.setInput('id', EXAMPLE_ID);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should render an anchor element when link is provided', () => {
        fixture.componentRef.setInput('text', EXAMPLE_TEXT);
        fixture.componentRef.setInput('link', EXAMPLE_LINK);
        fixture.detectChanges();
        const bannerElement = fixture.nativeElement.querySelector('a.docs-top-level-banner');
        expect(bannerElement).toBeTruthy();
        expect(bannerElement.getAttribute('href')).toBe(EXAMPLE_LINK);
        expect(bannerElement.textContent).toContain(EXAMPLE_TEXT);
    });
    it('should render a div element when link is not provided', () => {
        const EXAMPLE_TEXT = 'No Link Available';
        fixture.componentRef.setInput('text', EXAMPLE_TEXT);
        fixture.detectChanges();
        const bannerElement = fixture.nativeElement.querySelector('div.docs-top-level-banner');
        expect(bannerElement).toBeTruthy();
        expect(bannerElement.textContent).toContain(EXAMPLE_TEXT);
    });
    it('should correctly render the text input', () => {
        const EXAMPLE_TEXT = 'Lorem ipsum dolor...';
        fixture.componentRef.setInput('text', EXAMPLE_TEXT);
        fixture.detectChanges();
        const bannerElement = fixture.nativeElement.querySelector('.docs-top-level-banner-cta');
        expect(bannerElement).toBeTruthy();
        expect(bannerElement.textContent).toBe(EXAMPLE_TEXT);
    });
    it('should set hasClosed to true if the banner was closed before', () => {
        mockLocalStorage.getItem.and.returnValue('true');
        component.ngOnInit();
        expect(component.hasClosed()).toBeTrue();
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith(`${top_level_banner_component_1.STORAGE_KEY_PREFIX}${EXAMPLE_ID}`);
    });
    it('should set hasClosed to false if the banner was not closed before', () => {
        mockLocalStorage.getItem.and.returnValue('false');
        component.ngOnInit();
        expect(component.hasClosed()).toBeFalse();
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith(`${top_level_banner_component_1.STORAGE_KEY_PREFIX}${EXAMPLE_ID}`);
    });
    it('should set hasClosed to false if accessing localStorage throws an error', () => {
        mockLocalStorage.getItem.and.throwError('Local storage error');
        component.ngOnInit();
        expect(component.hasClosed()).toBeFalse();
    });
    it('should set the banner as closed in localStorage and update hasClosed', () => {
        component.close();
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(`${top_level_banner_component_1.STORAGE_KEY_PREFIX}${EXAMPLE_ID}`, 'true');
        expect(component.hasClosed()).toBeTrue();
    });
});
