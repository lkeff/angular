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
const table_of_contents_component_1 = require("./table-of-contents.component");
const testing_2 = require("@angular/router/testing");
const index_1 = require("../../interfaces/index");
const index_2 = require("../../services/index");
const index_3 = require("../../providers/index");
const core_1 = require("@angular/core");
describe('TableOfContents', () => {
    let component;
    let fixture;
    const items = [
        {
            title: 'Heading 2',
            id: 'item-heading-2',
            level: index_1.TableOfContentsLevel.H2,
        },
        {
            title: 'First Heading 3',
            id: 'first-item-heading-3',
            level: index_1.TableOfContentsLevel.H3,
        },
        {
            title: 'Second Heading 3',
            id: 'second-item-heading-3',
            level: index_1.TableOfContentsLevel.H3,
        },
    ];
    const fakeWindow = {
        addEventListener: () => { },
        removeEventListener: () => { },
    };
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [table_of_contents_component_1.TableOfContents, testing_2.RouterTestingModule],
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                {
                    provide: index_3.WINDOW,
                    useValue: fakeWindow,
                },
            ],
        }).compileComponents();
        const tableOfContentsLoaderSpy = testing_1.TestBed.inject(index_2.TableOfContentsLoader);
        spyOn(tableOfContentsLoaderSpy, 'buildTableOfContent').and.returnValue();
        tableOfContentsLoaderSpy.tableOfContentItems.set(items);
        fixture = testing_1.TestBed.createComponent(table_of_contents_component_1.TableOfContents);
        fixture.componentRef.setInput('contentSourceElement', document.createElement('div'));
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call scrollToTop when user click on Back to the top button', () => {
        const spy = spyOn(component, 'scrollToTop');
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(spy).toHaveBeenCalledOnceWith();
    });
    it('should render items when tableOfContentItems has value', () => {
        fixture.detectChanges();
        const renderedItems = fixture.nativeElement.querySelectorAll('li');
        expect(renderedItems.length).toBe(3);
        expect(component.tableOfContentItems().length).toBe(3);
    });
    it('should append level class to element', () => {
        fixture.detectChanges();
        const h2Items = fixture.nativeElement.querySelectorAll('li.docs-toc-item-h2');
        const h3Items = fixture.nativeElement.querySelectorAll('li.docs-toc-item-h3');
        expect(h2Items.length).toBe(1);
        expect(h3Items.length).toBe(2);
    });
    it('should append active class when item is active', () => {
        fixture.detectChanges();
        const activeItem = fixture.nativeElement.querySelector('.docs-faceted-list-item-active');
        expect(activeItem).toBeDefined();
    });
});
