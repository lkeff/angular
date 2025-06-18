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
const docs_1 = require("@angular/docs");
const testing_2 = require("@angular/router/testing");
const footer_component_1 = require("./footer.component");
describe('Footer', () => {
    let component;
    let fixture;
    const fakeWindow = {
        location: {
            origin: 'example-origin',
        },
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [footer_component_1.Footer, testing_2.RouterTestingModule],
            providers: [
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
            ],
        });
        fixture = testing_1.TestBed.createComponent(footer_component_1.Footer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
