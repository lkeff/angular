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
const navigation_component_1 = require("./navigation.component");
const testing_2 = require("@angular/router/testing");
const platform_browser_1 = require("@angular/platform-browser");
const pages_1 = require("../../enums/pages");
const theme_manager_service_1 = require("../../services/theme-manager.service");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const version_manager_service_1 = require("../../services/version-manager.service");
const docs_1 = require("@angular/docs");
describe('Navigation', () => {
    let component;
    let fixture;
    const fakeThemeManager = {
        theme: (0, core_1.signal)('dark'),
        setTheme: (theme) => { },
        themeChanged$: (0, rxjs_1.of)(),
    };
    const fakeVersionManager = {
        currentDocsVersion: (0, core_1.signal)('v17'),
        versions: (0, core_1.signal)([]),
    };
    const fakeWindow = {};
    const fakeSearch = {};
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [navigation_component_1.Navigation, testing_2.RouterTestingModule],
            providers: [
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
                {
                    provide: docs_1.Search,
                    useValue: fakeSearch,
                },
            ],
        }).compileComponents();
        testing_1.TestBed.overrideProvider(theme_manager_service_1.ThemeManager, { useValue: fakeThemeManager });
        testing_1.TestBed.overrideProvider(version_manager_service_1.VersionManager, { useValue: fakeVersionManager });
        fixture = testing_1.TestBed.createComponent(navigation_component_1.Navigation);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should append active class to DOCS_ROUTE when DOCS_ROUTE is active', () => {
        var _a;
        component.activeRouteItem.set(pages_1.PagePrefix.DOCS);
        fixture.detectChanges();
        const docsLink = (_a = fixture.debugElement.query(platform_browser_1.By.css('a[href="/docs"]')).parent) === null || _a === void 0 ? void 0 : _a.nativeElement;
        expect(docsLink).toHaveClass('adev-nav-item--active');
    });
    it('should not have active class when activeRouteItem is null', () => {
        component.activeRouteItem.set(null);
        fixture.detectChanges();
        const docsLink = fixture.debugElement.query(platform_browser_1.By.css('a[href="/docs"]')).nativeElement;
        const referenceLink = fixture.debugElement.query(platform_browser_1.By.css('a[href="/reference"]')).nativeElement;
        expect(docsLink).not.toHaveClass('adev-nav-item--active');
        expect(referenceLink).not.toHaveClass('adev-nav-item--active');
    });
    it('should call themeManager.setTheme(dark) when user tries to set dark theme', () => {
        const openThemePickerButton = fixture.debugElement.query(platform_browser_1.By.css('button[aria-label^="Open theme picker"]')).nativeElement;
        const setThemeSpy = spyOn(fakeThemeManager, 'setTheme');
        openThemePickerButton.click();
        fixture.detectChanges();
        const setDarkModeButton = fixture.debugElement.query(platform_browser_1.By.css('button[aria-label="Set dark theme"]')).nativeElement;
        setDarkModeButton.click();
        expect(setThemeSpy).toHaveBeenCalledOnceWith('dark');
    });
});
