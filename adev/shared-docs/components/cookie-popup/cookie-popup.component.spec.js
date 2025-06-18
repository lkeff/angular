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
const cookie_popup_component_1 = require("./cookie-popup.component");
const index_1 = require("../../providers/index");
const index_2 = require("../../testing/index");
const core_1 = require("@angular/core");
describe('CookiePopup', () => {
    let fixture;
    let mockLocalStorage = new index_2.MockLocalStorage();
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [cookie_popup_component_1.CookiePopup],
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                {
                    provide: index_1.LOCAL_STORAGE,
                    useValue: mockLocalStorage,
                },
            ],
        });
    });
    it('should make the popup visible by default', () => {
        initComponent(false);
        expect(getCookiesPopup()).not.toBeNull();
    });
    it('should hide the cookies popup if the user has already accepted cookies', () => {
        initComponent(true);
        expect(getCookiesPopup()).toBeNull();
    });
    it('should hide the cookies popup', () => {
        initComponent(false);
        accept();
        fixture.detectChanges();
        expect(getCookiesPopup()).toBeNull();
    });
    it('should store the user confirmation', () => {
        initComponent(false);
        expect(mockLocalStorage.getItem(cookie_popup_component_1.STORAGE_KEY)).toBeNull();
        accept();
        expect(mockLocalStorage.getItem(cookie_popup_component_1.STORAGE_KEY)).toBe('true');
    });
    // Helpers
    function getCookiesPopup() {
        return fixture.nativeElement.querySelector('.docs-cookies-popup');
    }
    function accept() {
        var _a;
        (_a = fixture.nativeElement
            .querySelector('button[text="Ok, Got it"]')) === null || _a === void 0 ? void 0 : _a.click();
    }
    function initComponent(cookiesAccepted) {
        mockLocalStorage.setItem(cookie_popup_component_1.STORAGE_KEY, cookiesAccepted ? 'true' : null);
        fixture = testing_1.TestBed.createComponent(cookie_popup_component_1.CookiePopup);
        fixture.detectChanges();
    }
});
