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
const preview_error_component_1 = require("./preview-error.component");
describe('PreviewError', () => {
    let fixture;
    let component;
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(preview_error_component_1.PreviewError);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
