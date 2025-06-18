"use strict";
/*!
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
const testing_1 = require("@angular/core/testing");
const api_items_section_component_1 = __importDefault(require("./api-items-section.component"));
const api_item_type_1 = require("../interfaces/api-item-type");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
describe('ApiItemsSection', () => {
    let component;
    let fixture;
    const fakeGroup = {
        title: 'Group',
        id: 'group',
        items: [
            {
                title: 'Fake Deprecated Title',
                itemType: api_item_type_1.ApiItemType.CONST,
                url: 'api/fakeDeprecatedTitle',
                deprecated: { version: undefined },
                developerPreview: undefined,
                experimental: undefined,
                stable: undefined,
            },
            {
                title: 'Fake Standard Title',
                itemType: api_item_type_1.ApiItemType.DIRECTIVE,
                url: 'api/fakeTitle',
                deprecated: undefined,
                developerPreview: undefined,
                experimental: undefined,
                stable: undefined,
            },
        ],
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [api_items_section_component_1.default],
            providers: [(0, router_1.provideRouter)([])],
        });
        fixture = testing_1.TestBed.createComponent(api_items_section_component_1.default);
        component = fixture.componentInstance;
    });
    it('should render list of all APIs of provided group', () => {
        fixture.componentRef.setInput('group', fakeGroup);
        fixture.detectChanges();
        const apis = fixture.debugElement.queryAll(platform_browser_1.By.css('.adev-api-items-section-grid li'));
        expect(apis.length).toBe(2);
    });
    it('should display deprecated icon for deprecated API', () => {
        var _a;
        fixture.componentRef.setInput('group', fakeGroup);
        fixture.detectChanges();
        const deprecatedApiIcons = fixture.debugElement.queryAll(platform_browser_1.By.css('.adev-api-items-section-grid li .adev-item-attribute'));
        const deprecatedApiTitle = (_a = deprecatedApiIcons[0].parent) === null || _a === void 0 ? void 0 : _a.query(platform_browser_1.By.css('.adev-item-title'));
        expect(deprecatedApiIcons.length).toBe(1);
        expect(deprecatedApiIcons[0]).toBeTruthy();
        expect(deprecatedApiTitle === null || deprecatedApiTitle === void 0 ? void 0 : deprecatedApiTitle.nativeElement.innerText).toBe('Fake Deprecated Title');
    });
});
