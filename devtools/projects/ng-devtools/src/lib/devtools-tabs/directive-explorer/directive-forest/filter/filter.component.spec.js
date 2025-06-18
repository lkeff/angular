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
const platform_browser_1 = require("@angular/platform-browser");
const filter_component_1 = require("./filter.component");
describe('FilterComponent', () => {
    let component;
    let fixture;
    const getMatchesCountEl = () => fixture.debugElement.query(platform_browser_1.By.css('.matches-count'));
    const emitFilterEvent = (filter) => component.emitFilter({ target: { value: filter } });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [filter_component_1.FilterComponent],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(filter_component_1.FilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should render if there is a single text match', () => {
        expect(getMatchesCountEl()).toBeFalsy();
        fixture.componentRef.setInput('matchesCount', 1);
        fixture.detectChanges();
        expect(getMatchesCountEl().nativeElement.innerText).toEqual('1 match');
    });
    it('should render if there is are multiple text matches', () => {
        expect(getMatchesCountEl()).toBeFalsy();
        fixture.componentRef.setInput('matchesCount', 5);
        fixture.detectChanges();
        expect(getMatchesCountEl().nativeElement.innerText).toEqual('5 matches');
    });
    it('should render selected match', () => {
        expect(getMatchesCountEl()).toBeFalsy();
        fixture.componentRef.setInput('matchesCount', 5);
        fixture.componentRef.setInput('currentMatch', 2);
        fixture.detectChanges();
        expect(getMatchesCountEl().nativeElement.innerText).toEqual('2 of 5');
    });
    it('should emit a filter function that returns null, if no match', () => {
        component.filter.subscribe((filterFn) => {
            const match = filterFn('Foo Bar');
            expect(match).toBeFalsy();
        });
        emitFilterEvent('Baz');
    });
    it('should emit a filter function that returns match indices, if there is a match', () => {
        component.filter.subscribe((filterFn) => {
            const match = filterFn('Foo Bar');
            expect(match).toBeTruthy();
            expect(match === null || match === void 0 ? void 0 : match.startIdx).toEqual(4);
            expect(match === null || match === void 0 ? void 0 : match.endIdx).toEqual(7);
        });
        emitFilterEvent('Bar');
    });
    it('should emit a filter function that returns match indices, if there is a full match', () => {
        component.filter.subscribe((filterFn) => {
            const match = filterFn('Foo Bar');
            expect(match).toBeTruthy();
            expect(match === null || match === void 0 ? void 0 : match.startIdx).toEqual(0);
            expect(match === null || match === void 0 ? void 0 : match.endIdx).toEqual(7);
        });
        emitFilterEvent('Foo Bar');
    });
    it('should emit a filter function that returns match indices, if there is a match (case insensitive)', () => {
        component.filter.subscribe((filterFn) => {
            const match = filterFn('Foo Bar Baz');
            expect(match).toBeTruthy();
            expect(match === null || match === void 0 ? void 0 : match.startIdx).toEqual(4);
            expect(match === null || match === void 0 ? void 0 : match.endIdx).toEqual(7);
        });
        emitFilterEvent('bar');
    });
});
