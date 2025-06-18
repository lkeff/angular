"use strict";
/*!
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
const navigation_list_component_1 = require("./navigation-list.component");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const core_1 = require("@angular/core");
const services_1 = require("../../services");
const navigationItems = [
    {
        label: 'Introduction',
        path: 'guide',
        level: 1,
    },
    {
        label: 'Getting Started',
        level: 1,
        children: [
            { label: 'What is Angular?', path: 'guide/what-is-angular', level: 2 },
            { label: 'Setup', path: 'guide/setup', level: 2 },
        ],
    },
];
describe('NavigationList', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [navigation_list_component_1.NavigationList],
            providers: [
                (0, router_1.provideRouter)([]),
                { provide: services_1.NavigationState, useClass: FakeNavigationListState },
                (0, core_1.provideZonelessChangeDetection)(),
            ],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(navigation_list_component_1.NavigationList);
        fixture.componentRef.setInput('navigationItems', []);
        component = fixture.componentInstance;
    }));
    it('should display provided navigation structure', () => {
        fixture.componentRef.setInput('navigationItems', [...navigationItems]);
        fixture.detectChanges();
        const links = fixture.debugElement.queryAll(platform_browser_1.By.css('a'));
        const nonClickableItem = fixture.debugElement.queryAll(platform_browser_1.By.css('.docs-secondary-nav-header'));
        expect(links.length).toBe(3);
        expect(nonClickableItem.length).toBe(1);
    });
    it('should append `docs-navigation-list-dropdown` when isDropdownView is true', () => {
        fixture.componentRef.setInput('isDropdownView', true);
        fixture.detectChanges();
        const ulElement = fixture.debugElement.query(platform_browser_1.By.css('ul.docs-navigation-list-dropdown'));
        expect(ulElement).toBeTruthy();
    });
    it('should not append `docs-navigation-list-dropdown` when isDropdownView is false', () => {
        fixture.componentRef.setInput('isDropdownView', false);
        fixture.detectChanges();
        const ulElement = fixture.debugElement.query(platform_browser_1.By.css('ul.docs-navigation-list-dropdown'));
        expect(ulElement).toBeFalsy();
    });
    it('should emit linkClicked when user clicked on link', () => {
        const emitClickOnLinkSpy = spyOn(component, 'emitClickOnLink');
        fixture.componentRef.setInput('navigationItems', [...navigationItems]);
        fixture.detectChanges(true);
        const guideLink = fixture.debugElement.query(platform_browser_1.By.css('a[href="/guide"]'));
        guideLink.nativeElement.click();
        expect(emitClickOnLinkSpy).toHaveBeenCalledTimes(1);
    });
    it(`should not call navigationState.toggleItem() when item's level is equal to 1 and is not neither expandable or collapsable level`, () => {
        const navigationState = testing_1.TestBed.inject(services_1.NavigationState);
        const toggleItemSpy = spyOn(navigationState, 'toggleItem');
        const itemToToggle = navigationItems[1];
        component.toggle(itemToToggle);
        expect(toggleItemSpy).not.toHaveBeenCalled();
    });
    it(`should call navigationState.toggleItem() when item's level is expandable`, () => {
        const navigationState = testing_1.TestBed.inject(services_1.NavigationState);
        const toggleItemSpy = spyOn(navigationState, 'toggleItem');
        const itemToToggle = navigationItems[1];
        fixture.componentRef.setInput('expandableLevel', 1);
        component.toggle(itemToToggle);
        expect(toggleItemSpy).toHaveBeenCalledOnceWith(itemToToggle);
    });
    it(`should call navigationState.toggleItem() when item's level is collapsable`, () => {
        const navigationState = testing_1.TestBed.inject(services_1.NavigationState);
        const toggleItemSpy = spyOn(navigationState, 'toggleItem');
        const itemToToggle = navigationItems[1].children[1];
        fixture.componentRef.setInput('collapsableLevel', 2);
        component.toggle(itemToToggle);
        expect(toggleItemSpy).toHaveBeenCalledOnceWith(itemToToggle);
    });
    it('should display only items to provided level (Level 1)', () => {
        fixture.componentRef.setInput('navigationItems', [...navigationItems]);
        fixture.componentRef.setInput('displayItemsToLevel', 1);
        fixture.detectChanges(true);
        const items = fixture.debugElement.queryAll(platform_browser_1.By.css('li.docs-faceted-list-item'));
        expect(items.length).toBe(2);
        expect(items[0].nativeElement.innerText).toBe(navigationItems[0].label);
        expect(items[1].nativeElement.innerText).toBe(navigationItems[1].label);
    });
    it('should display all items (Level 2)', () => {
        fixture.componentRef.setInput('navigationItems', [...navigationItems]);
        fixture.componentRef.setInput('displayItemsToLevel', 2);
        fixture.detectChanges(true);
        const items = fixture.debugElement.queryAll(platform_browser_1.By.css('li.docs-faceted-list-item'));
        expect(items.length).toBe(4);
        expect(items[0].nativeElement.innerText).toBe(navigationItems[0].label);
        expect(items[1].nativeElement.innerText.startsWith(navigationItems[1].label)).toBeTrue();
        const secondItemChildren = navigationItems[1].children || [];
        expect(items[2].nativeElement.innerText).toBe(secondItemChildren[0].label);
        expect(items[3].nativeElement.innerText).toBe(secondItemChildren[1].label);
    });
});
class FakeNavigationListState {
    constructor() {
        this.isOpened = (0, core_1.signal)(true);
        this.activeNavigationItem = (0, core_1.signal)(navigationItems.at(1));
    }
    toggleItem(item) { }
}
