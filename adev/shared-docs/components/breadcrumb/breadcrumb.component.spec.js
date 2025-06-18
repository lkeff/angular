"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const breadcrumb_component_1 = require("./breadcrumb.component");
const services_1 = require("../../services");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const core_1 = require("@angular/core");
describe('Breadcrumb', () => {
    let fixture;
    let navigationStateSpy;
    beforeEach(() => {
        navigationStateSpy = jasmine.createSpyObj('NavigationState', ['activeNavigationItem']);
        testing_1.TestBed.configureTestingModule({
            imports: [breadcrumb_component_1.Breadcrumb, testing_2.RouterTestingModule],
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                {
                    provide: services_1.NavigationState,
                    useValue: navigationStateSpy,
                },
            ],
        });
        fixture = testing_1.TestBed.createComponent(breadcrumb_component_1.Breadcrumb);
    });
    it('should display proper breadcrumb structure based on navigation state', () => {
        navigationStateSpy.activeNavigationItem.and.returnValue(item);
        fixture.detectChanges();
        const breadcrumbs = fixture.debugElement.queryAll(platform_browser_1.By.css('.docs-breadcrumb span'));
        expect(breadcrumbs.length).toBe(2);
        expect(breadcrumbs[0].nativeElement.innerText).toEqual('Grandparent');
        expect(breadcrumbs[1].nativeElement.innerText).toEqual('Parent');
    });
    it('should display breadcrumb links when navigation item has got path', () => {
        navigationStateSpy.activeNavigationItem.and.returnValue(exampleItemWithPath);
        fixture.detectChanges();
        const breadcrumbs = fixture.debugElement.queryAll(platform_browser_1.By.css('.docs-breadcrumb a'));
        expect(breadcrumbs.length).toBe(1);
        expect(breadcrumbs[0].nativeElement.innerText).toEqual('Parent');
        expect(breadcrumbs[0].nativeElement.href).toEqual(`${window.origin}/example`);
    });
});
const grandparent = {
    label: 'Grandparent',
};
const parent = {
    label: 'Parent',
    parent: grandparent,
};
const item = {
    label: 'Active Item',
    parent: parent,
};
const parentWithPath = {
    label: 'Parent',
    path: '/example',
};
const exampleItemWithPath = {
    label: 'Active Item',
    parent: parentWithPath,
};
