"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const common_1 = require("@angular/common");
const theme_service_1 = require("./theme_service");
const window_provider_1 = require("../application-providers/window_provider");
function configureTestingModuleWithWindowMock(mock) {
    testing_1.TestBed.configureTestingModule({
        providers: [
            {
                provide: window_provider_1.WINDOW,
                useValue: mock,
            },
            theme_service_1.ThemeService,
        ],
    });
}
function mockSystemTheme(initialTheme = 'light') {
    // Set the initial theme.
    let currMediaString = `(prefers-color-scheme: ${initialTheme})`;
    let matchMediaListener = null;
    return {
        /** Alter the system theme */
        switchTheme: (theme) => {
            currMediaString = `(prefers-color-scheme: ${theme})`;
            if (matchMediaListener) {
                matchMediaListener();
            }
        },
        /** matchMedia mock  */
        matchMedia: (mediaString) => ({
            matches: mediaString === currMediaString,
            addEventListener: (e, cb) => {
                matchMediaListener = cb;
            },
        }),
    };
}
describe('ThemeService', () => {
    it(`should enable light mode, if it's the preferred/system one`, () => {
        configureTestingModuleWithWindowMock({
            matchMedia: mockSystemTheme('light').matchMedia,
        });
        const service = testing_1.TestBed.inject(theme_service_1.ThemeService);
        const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
        expect(service.currentTheme()).toEqual('light-theme');
        expect(doc.documentElement.classList.contains('light-theme')).toBeTrue();
    });
    it(`should enable dark mode, if it's the preferred/system one`, () => {
        configureTestingModuleWithWindowMock({
            matchMedia: mockSystemTheme('dark').matchMedia,
        });
        const service = testing_1.TestBed.inject(theme_service_1.ThemeService);
        const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
        expect(service.currentTheme()).toEqual('dark-theme');
        expect(doc.documentElement.classList.contains('dark-theme')).toBeTrue();
    });
    it('should toggle dark mode', () => {
        configureTestingModuleWithWindowMock({
            matchMedia: mockSystemTheme('light').matchMedia,
        });
        const service = testing_1.TestBed.inject(theme_service_1.ThemeService);
        // Toggle dark mode.
        service.toggleDarkMode(true);
        const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
        expect(service.currentTheme()).toEqual('dark-theme');
        expect(doc.documentElement.classList.contains('dark-theme')).toBeTrue();
    });
    it('should update the theme automatically, if the system one changes', () => {
        const { switchTheme, matchMedia } = mockSystemTheme('light');
        configureTestingModuleWithWindowMock({ matchMedia });
        const service = testing_1.TestBed.inject(theme_service_1.ThemeService);
        // Initialize the watcher.
        service.initializeThemeWatcher();
        const docClassList = testing_1.TestBed.inject(common_1.DOCUMENT).documentElement.classList;
        expect(service.currentTheme()).toEqual('light-theme');
        expect(docClassList.contains('light-theme')).toBeTrue();
        // This should simulate a system theme change, as if the user did it on OS level.
        switchTheme('dark');
        expect(service.currentTheme()).toEqual('dark-theme');
        expect(docClassList.contains('dark-theme')).toBeTrue();
    });
});
