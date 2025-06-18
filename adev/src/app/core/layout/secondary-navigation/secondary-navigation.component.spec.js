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
const secondary_navigation_component_1 = require("./secondary-navigation.component");
const docs_1 = require("@angular/docs");
describe('SecondaryNavigation', () => {
    let component;
    let fixture;
    const fakeWindow = {
        location: {
            origin: 'example-origin',
        },
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [secondary_navigation_component_1.SecondaryNavigation],
            providers: [
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
            ],
        });
        fixture = testing_1.TestBed.createComponent(secondary_navigation_component_1.SecondaryNavigation);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
