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
const text_field_component_1 = require("./text-field.component");
const core_1 = require("@angular/core");
describe('TextField', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [text_field_component_1.TextField],
            providers: [(0, core_1.provideZonelessChangeDetection)()],
        });
        fixture = testing_1.TestBed.createComponent(text_field_component_1.TextField);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
