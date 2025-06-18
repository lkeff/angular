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
const platform_1 = require("@angular/cdk/platform");
const browser_styles_service_1 = require("./browser_styles_service");
function configureTestingModuleWithPlatformMock(mock) {
    testing_1.TestBed.configureTestingModule({
        providers: [
            {
                provide: platform_1.Platform,
                useValue: mock,
            },
        ],
    });
}
function checkForBrowserSpecificStyles(browser) {
    const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
    // Keep in sync with the service.
    return {
        hasClass: doc.body.classList.contains(browser + '-ui'),
        hasStylesheet: !!doc.head.querySelector(`link[href="./styles/${browser}.css"]`),
    };
}
describe('BrowserStylesService', () => {
    it('should initialize browser-specific styles for Chrome', () => {
        configureTestingModuleWithPlatformMock({
            BLINK: true,
        });
        const service = testing_1.TestBed.inject(browser_styles_service_1.BrowserStylesService);
        service.initBrowserSpecificStyles();
        const { hasClass, hasStylesheet } = checkForBrowserSpecificStyles('chrome');
        expect(hasClass).toBeTrue();
        expect(hasStylesheet).toBeTrue();
    });
    it('should initialize browser-specific styles for Firefox', () => {
        configureTestingModuleWithPlatformMock({
            FIREFOX: true,
        });
        const service = testing_1.TestBed.inject(browser_styles_service_1.BrowserStylesService);
        service.initBrowserSpecificStyles();
        const { hasClass, hasStylesheet } = checkForBrowserSpecificStyles('firefox');
        expect(hasClass).toBeTrue();
        expect(hasStylesheet).toBeTrue();
    });
    it('should default to Chrome UI, if the browser is not supported', () => {
        configureTestingModuleWithPlatformMock({
            WEBKIT: true,
        });
        const service = testing_1.TestBed.inject(browser_styles_service_1.BrowserStylesService);
        service.initBrowserSpecificStyles();
        const { hasClass, hasStylesheet } = checkForBrowserSpecificStyles('chrome');
        expect(hasClass).toBeTrue();
        expect(hasStylesheet).toBeTrue();
    });
});
