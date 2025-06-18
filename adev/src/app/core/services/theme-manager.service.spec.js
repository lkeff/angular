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
const theme_manager_service_1 = require("./theme-manager.service");
const docs_1 = require("@angular/docs");
describe('ThemeManager', () => {
    let service;
    let localStorageSpy;
    beforeEach(() => {
        localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);
        localStorageSpy.getItem.and.returnValue(null);
        localStorageSpy.setItem.and.returnValue();
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: docs_1.LOCAL_STORAGE,
                    useValue: localStorageSpy,
                },
            ],
        });
    });
    it('should set theme based on device preferences (auto) when user did not set theme manually', () => {
        localStorageSpy.getItem.and.returnValue(null);
        service = testing_1.TestBed.inject(theme_manager_service_1.ThemeManager);
        expect(service.theme()).toBe('auto');
    });
    it('should set theme based on stored user preferences (dark) when user already set theme manually', () => {
        localStorageSpy.getItem.and.returnValue('dark');
        service = testing_1.TestBed.inject(theme_manager_service_1.ThemeManager);
        expect(service.theme()).toBe('dark');
    });
    it('should set theme based on stored user preferences (light) when user already set theme manually', () => {
        localStorageSpy.getItem.and.returnValue('light');
        service = testing_1.TestBed.inject(theme_manager_service_1.ThemeManager);
        expect(service.theme()).toBe('light');
    });
    it('should set theme based on stored user preferences (auto) when user already set theme manually', () => {
        localStorageSpy.getItem.and.returnValue('auto');
        service = testing_1.TestBed.inject(theme_manager_service_1.ThemeManager);
        expect(service.theme()).toBe('auto');
    });
});
