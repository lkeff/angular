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
const search_dialog_component_1 = require("./search-dialog.component");
const providers_1 = require("../../providers");
const services_1 = require("../../services");
const index_1 = require("../../testing/index");
const platform_browser_1 = require("@angular/platform-browser");
const algolia_icon_component_1 = require("../algolia-icon/algolia-icon.component");
const testing_2 = require("@angular/router/testing");
const router_1 = require("@angular/router");
const core_1 = require("@angular/core");
describe('SearchDialog', () => {
    let fixture;
    const searchResults = jasmine.createSpy();
    const fakeWindow = new index_1.FakeEventTarget();
    let search;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        searchResults.and.returnValue([]);
        testing_1.TestBed.configureTestingModule({
            imports: [search_dialog_component_1.SearchDialog, testing_2.RouterTestingModule],
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                { provide: providers_1.ENVIRONMENT, useValue: { algolia: { index: 'fakeIndex' } } },
                { provide: services_1.ALGOLIA_CLIENT, useValue: { search: searchResults } },
                { provide: providers_1.WINDOW, useValue: fakeWindow },
            ],
        });
        fixture = testing_1.TestBed.createComponent(search_dialog_component_1.SearchDialog);
        fixture.detectChanges();
        search = testing_1.TestBed.inject(services_1.Search);
    }));
    it('should navigate to active item when user pressed Enter', () => __awaiter(void 0, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(router_1.Router);
        const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
        search.searchQuery.set('fakeQuery');
        searchResults.and.returnValue(Promise.resolve({ results: [{ hits: fakeSearchResults }] }));
        // Fire the request
        testing_1.TestBed.inject(core_1.ApplicationRef).tick();
        // Wait for the resource to resolve
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        fakeWindow.dispatchEvent(new KeyboardEvent('keydown', {
            code: 'Enter',
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true,
        }));
        expect(navigateByUrlSpy).toHaveBeenCalledOnceWith('fakeUrl1#h1');
    }));
    it('should always display algolia logo', () => {
        const algoliaIcon = fixture.debugElement.query(platform_browser_1.By.directive(algolia_icon_component_1.AlgoliaIcon));
        expect(algoliaIcon).toBeTruthy();
    });
    it('should display `No results found` message when there are no results for provided query', () => __awaiter(void 0, void 0, void 0, function* () {
        search.searchQuery.set('fakeQuery');
        searchResults.and.returnValue(Promise.resolve({ results: [{ hits: [] }] }));
        // Fire the request
        testing_1.TestBed.inject(core_1.ApplicationRef).tick();
        // Wait for the resource to resolve
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        const noResultsContainer = fixture.debugElement.query(platform_browser_1.By.css('.docs-search-results__no-results'));
        expect(noResultsContainer).toBeTruthy();
    }));
    it('should display `Start typing to see results` message when there are no provided query', () => {
        searchResults.and.returnValue(undefined);
        fixture.detectChanges();
        const startTypingContainer = fixture.debugElement.query(platform_browser_1.By.css('.docs-search-results__start-typing'));
        expect(startTypingContainer).toBeTruthy();
    });
    it('should display list of the search results when results exist', () => __awaiter(void 0, void 0, void 0, function* () {
        search.searchQuery.set('fakeQuery');
        searchResults.and.returnValue(Promise.resolve({ results: [{ hits: fakeSearchResults }] }));
        // Fire the request
        testing_1.TestBed.inject(core_1.ApplicationRef).tick();
        // Wait for the resource to resolve
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        const resultListContainer = fixture.debugElement.query(platform_browser_1.By.css('ul.docs-search-results'));
        const resultItems = fixture.debugElement.queryAll(platform_browser_1.By.css('ul.docs-search-results li a'));
        expect(resultListContainer).toBeTruthy();
        expect(resultItems.length).toBe(2);
        expect(resultItems[0].nativeElement.href).toBe(`${window.origin}/fakeUrl1#h1`);
        expect(resultItems[1].nativeElement.href).toBe(`${window.origin}/fakeUrl2#h1`);
    }));
    it('should close search dialog when user clicked outside `.docs-search-container`', () => {
        const dialogContainer = fixture.debugElement.query(platform_browser_1.By.css('dialog'));
        const closeSearchDialogSpy = spyOn(fixture.componentInstance, 'closeSearchDialog');
        dialogContainer.nativeElement.click();
        expect(closeSearchDialogSpy).toHaveBeenCalled();
    });
});
const fakeSearchResults = [
    {
        'url': 'https://angular.dev/fakeUrl1#h1',
        'hierarchy': {
            'lvl0': 'FakeLvl0',
            'lvl1': 'FakeLvl1',
            'lvl2': 'FakeLvl2',
            'lvl3': null,
            'lvl4': null,
            'lvl5': null,
            'lvl6': null,
        },
        'objectID': 'fakeObjectId1',
        _snippetResult: {},
        type: '',
        content: null,
    },
    {
        'url': 'https://angular.dev/fakeUrl2#h1',
        'hierarchy': {
            'lvl0': 'FakeLvl0',
            'lvl1': 'FakeLvl1',
            'lvl2': 'FakeLvl2',
            'lvl3': null,
            'lvl4': null,
            'lvl5': null,
            'lvl6': null,
        },
        'objectID': 'fakeObjectId2',
        type: '',
        content: null,
        _snippetResult: {},
    },
];
