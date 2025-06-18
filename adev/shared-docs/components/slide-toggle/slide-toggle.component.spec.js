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
const slide_toggle_component_1 = require("./slide-toggle.component");
const core_1 = require("@angular/core");
describe('SlideToggle', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [slide_toggle_component_1.SlideToggle],
            providers: [(0, core_1.provideZonelessChangeDetection)()],
        });
        fixture = testing_1.TestBed.createComponent(slide_toggle_component_1.SlideToggle);
        fixture.componentRef.setInput('buttonId', 'id');
        fixture.componentRef.setInput('label', 'foo');
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should toggle the value when clicked', () => {
        expect(component['checked']()).toBeFalse();
        const buttonElement = fixture.nativeElement.querySelector('input');
        buttonElement.click();
        expect(component['checked']()).toBeTrue();
    });
    it('should call onChange and onTouched when toggled', () => {
        const onChangeSpy = jasmine.createSpy('onChangeSpy');
        const onTouchedSpy = jasmine.createSpy('onTouchedSpy');
        component.registerOnChange(onChangeSpy);
        component.registerOnTouched(onTouchedSpy);
        component.toggle();
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy).toHaveBeenCalledWith(true);
        expect(onTouchedSpy).toHaveBeenCalled();
    });
    it('should set active class for button when is checked', () => {
        component.writeValue(true);
        fixture.detectChanges();
        const buttonElement = fixture.nativeElement.querySelector('input');
        expect(buttonElement.classList.contains('docs-toggle-active')).toBeTrue();
        component.writeValue(false);
        fixture.detectChanges();
        expect(buttonElement.classList.contains('docs-toggle-active')).toBeFalse();
    });
});
