"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fr_1 = __importDefault(require("../../locales/fr"));
const ro_1 = __importDefault(require("../../locales/ro"));
const sr_1 = __importDefault(require("../../locales/sr"));
const zgh_1 = __importDefault(require("../../locales/zgh"));
const localization_1 = require("../../src/i18n/localization");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
describe('l10n', () => {
    beforeAll(() => {
        (0, core_1.ɵregisterLocaleData)(ro_1.default);
        (0, core_1.ɵregisterLocaleData)(sr_1.default);
        (0, core_1.ɵregisterLocaleData)(zgh_1.default);
        (0, core_1.ɵregisterLocaleData)(fr_1.default);
    });
    afterAll(() => (0, core_1.ɵunregisterLocaleData)());
    describe('NgLocalization', () => {
        function roTests() {
            it('should return plural cases for the provided locale', (0, testing_1.inject)([localization_1.NgLocalization], (l10n) => {
                expect(l10n.getPluralCategory(0)).toEqual('few');
                expect(l10n.getPluralCategory(1)).toEqual('one');
                expect(l10n.getPluralCategory(1212)).toEqual('few');
                expect(l10n.getPluralCategory(1223)).toEqual('other');
            }));
        }
        describe('ro', () => {
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: core_1.LOCALE_ID, useValue: 'ro' }],
                });
            });
            roTests();
        });
        function srTests() {
            it('should return plural cases for the provided locale', (0, testing_1.inject)([localization_1.NgLocalization], (l10n) => {
                expect(l10n.getPluralCategory(1)).toEqual('one');
                expect(l10n.getPluralCategory(2.1)).toEqual('one');
                expect(l10n.getPluralCategory(3)).toEqual('few');
                expect(l10n.getPluralCategory(0.2)).toEqual('few');
                expect(l10n.getPluralCategory(2.11)).toEqual('other');
                expect(l10n.getPluralCategory(2.12)).toEqual('other');
            }));
        }
        describe('sr', () => {
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: core_1.LOCALE_ID, useValue: 'sr' }],
                });
            });
            srTests();
        });
    });
    describe('NgLocaleLocalization', () => {
        it('should return the correct values for the "en" locale', () => {
            const l10n = new localization_1.NgLocaleLocalization('en-US');
            expect(l10n.getPluralCategory(0)).toEqual('other');
            expect(l10n.getPluralCategory(1)).toEqual('one');
            expect(l10n.getPluralCategory(2)).toEqual('other');
        });
        it('should return the correct values for the "ro" locale', () => {
            const l10n = new localization_1.NgLocaleLocalization('ro');
            expect(l10n.getPluralCategory(0)).toEqual('few');
            expect(l10n.getPluralCategory(1)).toEqual('one');
            expect(l10n.getPluralCategory(2)).toEqual('few');
            expect(l10n.getPluralCategory(12)).toEqual('few');
            expect(l10n.getPluralCategory(23)).toEqual('other');
            expect(l10n.getPluralCategory(1212)).toEqual('few');
            expect(l10n.getPluralCategory(1223)).toEqual('other');
        });
        it('should return the correct values for the "sr" locale', () => {
            const l10n = new localization_1.NgLocaleLocalization('sr');
            expect(l10n.getPluralCategory(1)).toEqual('one');
            expect(l10n.getPluralCategory(31)).toEqual('one');
            expect(l10n.getPluralCategory(0.1)).toEqual('one');
            expect(l10n.getPluralCategory(1.1)).toEqual('one');
            expect(l10n.getPluralCategory(2.1)).toEqual('one');
            expect(l10n.getPluralCategory(3)).toEqual('few');
            expect(l10n.getPluralCategory(33)).toEqual('few');
            expect(l10n.getPluralCategory(0.2)).toEqual('few');
            expect(l10n.getPluralCategory(0.3)).toEqual('few');
            expect(l10n.getPluralCategory(0.4)).toEqual('few');
            expect(l10n.getPluralCategory(2.2)).toEqual('few');
            expect(l10n.getPluralCategory(2.11)).toEqual('other');
            expect(l10n.getPluralCategory(2.12)).toEqual('other');
            expect(l10n.getPluralCategory(2.13)).toEqual('other');
            expect(l10n.getPluralCategory(2.14)).toEqual('other');
            expect(l10n.getPluralCategory(2.15)).toEqual('other');
            expect(l10n.getPluralCategory(0)).toEqual('other');
            expect(l10n.getPluralCategory(5)).toEqual('other');
            expect(l10n.getPluralCategory(10)).toEqual('other');
            expect(l10n.getPluralCategory(35)).toEqual('other');
            expect(l10n.getPluralCategory(37)).toEqual('other');
            expect(l10n.getPluralCategory(40)).toEqual('other');
            expect(l10n.getPluralCategory(0.0)).toEqual('other');
            expect(l10n.getPluralCategory(0.5)).toEqual('other');
            expect(l10n.getPluralCategory(0.6)).toEqual('other');
            expect(l10n.getPluralCategory(2)).toEqual('few');
            expect(l10n.getPluralCategory(2.1)).toEqual('one');
            expect(l10n.getPluralCategory(2.2)).toEqual('few');
            expect(l10n.getPluralCategory(2.3)).toEqual('few');
            expect(l10n.getPluralCategory(2.4)).toEqual('few');
            expect(l10n.getPluralCategory(2.5)).toEqual('other');
            expect(l10n.getPluralCategory(20)).toEqual('other');
            expect(l10n.getPluralCategory(21)).toEqual('one');
            expect(l10n.getPluralCategory(22)).toEqual('few');
            expect(l10n.getPluralCategory(23)).toEqual('few');
            expect(l10n.getPluralCategory(24)).toEqual('few');
            expect(l10n.getPluralCategory(25)).toEqual('other');
        });
        it('should return the default value for a locale with no rule', () => {
            const l10n = new localization_1.NgLocaleLocalization('zgh');
            expect(l10n.getPluralCategory(0)).toEqual('other');
            expect(l10n.getPluralCategory(1)).toEqual('other');
            expect(l10n.getPluralCategory(3)).toEqual('other');
            expect(l10n.getPluralCategory(5)).toEqual('other');
            expect(l10n.getPluralCategory(10)).toEqual('other');
        });
    });
    describe('getPluralCategory', () => {
        it('should return plural category', () => {
            const l10n = new localization_1.NgLocaleLocalization('fr');
            expect((0, localization_1.getPluralCategory)(0, ['one', 'other'], l10n)).toEqual('one');
            expect((0, localization_1.getPluralCategory)(1, ['one', 'other'], l10n)).toEqual('one');
            expect((0, localization_1.getPluralCategory)(5, ['one', 'other'], l10n)).toEqual('other');
        });
        it('should return discrete cases', () => {
            const l10n = new localization_1.NgLocaleLocalization('fr');
            expect((0, localization_1.getPluralCategory)(0, ['one', 'other', '=0'], l10n)).toEqual('=0');
            expect((0, localization_1.getPluralCategory)(1, ['one', 'other'], l10n)).toEqual('one');
            expect((0, localization_1.getPluralCategory)(5, ['one', 'other', '=5'], l10n)).toEqual('=5');
            expect((0, localization_1.getPluralCategory)(6, ['one', 'other', '=5'], l10n)).toEqual('other');
        });
        it('should fallback to other when the case is not present', () => {
            const l10n = new localization_1.NgLocaleLocalization('ro');
            expect((0, localization_1.getPluralCategory)(1, ['one', 'other'], l10n)).toEqual('one');
            // 2 -> 'few'
            expect((0, localization_1.getPluralCategory)(2, ['one', 'other'], l10n)).toEqual('other');
        });
        describe('errors', () => {
            it('should report an error when the "other" category is not present', () => {
                expect(() => {
                    const l10n = new localization_1.NgLocaleLocalization('ro');
                    // 2 -> 'few'
                    (0, localization_1.getPluralCategory)(2, ['one'], l10n);
                }).toThrowError('NG02308: No plural message found for value "2"');
            });
        });
    });
});
