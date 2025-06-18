"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const api_reference_list_component_1 = __importStar(require("./api-reference-list.component"));
const api_reference_manager_service_1 = require("./api-reference-manager.service");
const core_1 = require("@angular/core");
const api_item_type_1 = require("../interfaces/api-item-type");
const testing_2 = require("@angular/router/testing");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const platform_browser_1 = require("@angular/platform-browser");
const docs_1 = require("@angular/docs");
describe('ApiReferenceList', () => {
    let component;
    let fixture;
    let fakeItem1 = {
        'title': 'fakeItem1',
        'url': 'api/animations/fakeItem1',
        'itemType': api_item_type_1.ApiItemType.FUNCTION,
        'deprecated': undefined,
        'developerPreview': undefined,
        'experimental': undefined,
        'stable': { version: undefined },
    };
    let fakeItem2 = {
        'title': 'fakeItem2',
        'url': 'api/animations/fakeItem2',
        'itemType': api_item_type_1.ApiItemType.CLASS,
        'deprecated': undefined,
        'developerPreview': undefined,
        'experimental': undefined,
        'stable': { version: undefined },
    };
    let fakeDeprecatedFeaturedItem = {
        'title': 'fakeItemDeprecated',
        'url': 'api/animations/fakeItemDeprecated',
        'itemType': api_item_type_1.ApiItemType.INTERFACE,
        'deprecated': { version: undefined },
        'developerPreview': undefined,
        'experimental': undefined,
        'stable': undefined,
    };
    let fakeDeveloperPreviewItem = {
        'title': 'fakeItemDeveloperPreview',
        'url': 'api/animations/fakeItemDeveloperPreview',
        'itemType': api_item_type_1.ApiItemType.INTERFACE,
        'deprecated': undefined,
        'developerPreview': { version: undefined },
        'experimental': undefined,
        'stable': undefined,
    };
    let fakeExperimentalItem = {
        'title': 'fakeItemExperimental',
        'url': 'api/animations/fakeItemExperimental',
        'itemType': api_item_type_1.ApiItemType.INTERFACE,
        'deprecated': undefined,
        'developerPreview': undefined,
        'experimental': { version: undefined },
        'stable': undefined,
    };
    const fakeApiReferenceManager = {
        apiGroups: (0, core_1.signal)([
            {
                title: 'Fake Group',
                items: [
                    fakeItem1,
                    fakeItem2,
                    fakeDeprecatedFeaturedItem,
                    fakeDeveloperPreviewItem,
                    fakeExperimentalItem,
                ],
                isFeatured: false,
            },
        ]),
        featuredGroup: (0, core_1.signal)({
            title: 'Featured Group',
            items: [],
            isFeatured: true,
        }),
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [api_reference_list_component_1.default],
            providers: [
                { provide: api_reference_manager_service_1.ApiReferenceManager, useValue: fakeApiReferenceManager },
                (0, router_1.provideRouter)([{ path: 'api', component: api_reference_list_component_1.default }]),
            ],
        });
        fixture = testing_1.TestBed.createComponent(api_reference_list_component_1.default);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display only items which contains provided query when query is not empty', () => {
        fixture.componentRef.setInput('query', 'Item1');
        fixture.detectChanges();
        expect(component.filteredGroups()[0].items).toEqual([fakeItem1]);
    });
    it('should display only class items when user selects Class in the Type select', () => {
        fixture.componentRef.setInput('type', api_item_type_1.ApiItemType.CLASS);
        fixture.detectChanges();
        expect(component.type()).toEqual(api_item_type_1.ApiItemType.CLASS);
        expect(component.filteredGroups()[0].items).toEqual([fakeItem2]);
    });
    it('should set selected type when provided type is different than selected', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(component.type()).toBe(api_reference_list_component_1.ALL_TYPES_KEY);
        component.setItemType(api_item_type_1.ApiItemType.BLOCK);
        yield testing_2.RouterTestingHarness.create(`/api?type=${api_item_type_1.ApiItemType.BLOCK}`);
        expect(component.type()).toBe(api_item_type_1.ApiItemType.BLOCK);
    }));
    it('should reset selected type when provided type is equal to selected', () => __awaiter(void 0, void 0, void 0, function* () {
        component.setItemType(api_item_type_1.ApiItemType.BLOCK);
        const harness = yield testing_2.RouterTestingHarness.create(`/api?type=${api_item_type_1.ApiItemType.BLOCK}`);
        expect(component.type()).toBe(api_item_type_1.ApiItemType.BLOCK);
        component.setItemType(api_item_type_1.ApiItemType.BLOCK);
        harness.navigateByUrl(`/api`);
        expect(component.type()).toBe(api_reference_list_component_1.ALL_TYPES_KEY);
    }));
    it('should set the value of the queryParam equal to the query text field', () => __awaiter(void 0, void 0, void 0, function* () {
        const location = testing_1.TestBed.inject(common_1.Location);
        const textField = fixture.debugElement.query(platform_browser_1.By.directive(docs_1.TextField));
        textField.componentInstance.setValue('item1');
        yield fixture.whenStable();
        expect(location.path()).toBe(`?query=item1`);
    }));
    it('should keep the values of existing queryParams and set new queryParam equal to given value', () => __awaiter(void 0, void 0, void 0, function* () {
        const location = testing_1.TestBed.inject(common_1.Location);
        const textField = fixture.debugElement.query(platform_browser_1.By.directive(docs_1.TextField));
        textField.componentInstance.setValue('item1');
        yield fixture.whenStable();
        expect(location.path()).toBe(`?query=item1`);
        component.setItemType(api_item_type_1.ApiItemType.BLOCK);
        yield fixture.whenStable();
        expect(location.path()).toBe(`?query=item1&type=${api_item_type_1.ApiItemType.BLOCK}`);
        fixture.componentRef.setInput('status', api_reference_list_component_1.STATUSES.experimental);
        yield fixture.whenStable();
        expect(location.path()).toBe(`?query=item1&type=${api_item_type_1.ApiItemType.BLOCK}&status=${api_reference_list_component_1.STATUSES.experimental}`);
    }));
    it('should display all items when query and type and status are undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        fixture.componentRef.setInput('query', undefined);
        fixture.componentRef.setInput('type', undefined);
        fixture.componentRef.setInput('status', undefined);
        yield fixture.whenStable();
        expect(component.filteredGroups()[0].items).toEqual([
            fakeItem1,
            fakeItem2,
            fakeDeveloperPreviewItem,
            fakeExperimentalItem,
        ]);
    }));
    it('should not display deprecated and developer-preview and experimental items when status is set to stable', () => {
        fixture.componentRef.setInput('status', api_reference_list_component_1.STATUSES.stable);
        fixture.detectChanges();
        expect(component.filteredGroups()[0].items).toEqual([fakeItem1, fakeItem2]);
    });
    it('should only display deprecated items when status is set to deprecated', () => {
        fixture.componentRef.setInput('status', api_reference_list_component_1.STATUSES.deprecated);
        fixture.detectChanges();
        expect(component.filteredGroups()[0].items).toEqual([fakeDeprecatedFeaturedItem]);
    });
    it('should only display developer-preview items when status is set to developer-preview', () => {
        fixture.componentRef.setInput('status', api_reference_list_component_1.STATUSES.developerPreview);
        fixture.detectChanges();
        expect(component.filteredGroups()[0].items).toEqual([fakeDeveloperPreviewItem]);
    });
    it('should only display experimental items when status is set to experimental', () => {
        fixture.componentRef.setInput('status', api_reference_list_component_1.STATUSES.experimental);
        fixture.detectChanges();
        expect(component.filteredGroups()[0].items).toEqual([fakeExperimentalItem]);
    });
});
