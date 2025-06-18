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
const api_item_label_component_1 = __importDefault(require("./api-item-label.component"));
const api_item_type_1 = require("../interfaces/api-item-type");
describe('ApiItemLabel', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [api_item_label_component_1.default],
        });
        fixture = testing_1.TestBed.createComponent(api_item_label_component_1.default);
        component = fixture.componentInstance;
    });
    it('should by default display short label for Class', () => {
        fixture.componentRef.setInput('type', api_item_type_1.ApiItemType.CLASS);
        fixture.componentRef.setInput('mode', 'short');
        fixture.detectChanges();
        const label = fixture.nativeElement.innerText;
        expect(label).toBe('C');
    });
    it('should display short label for Class', () => {
        fixture.componentRef.setInput('type', api_item_type_1.ApiItemType.CLASS);
        fixture.detectChanges();
        const label = fixture.nativeElement.innerText;
        expect(label).toBe('C');
    });
});
