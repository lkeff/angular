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
const select_component_1 = require("./select.component");
const core_1 = require("@angular/core");
describe('Select', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [select_component_1.Select],
            providers: [(0, core_1.provideZonelessChangeDetection)()],
        });
        fixture = testing_1.TestBed.createComponent(select_component_1.Select);
        component = fixture.componentInstance;
        // Sets the required inputs
        fixture.componentRef.setInput('selectId', 'id');
        fixture.componentRef.setInput('name', 'name');
        fixture.componentRef.setInput('options', []);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
