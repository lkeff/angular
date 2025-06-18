"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const utils_1 = require("../../shared/utils");
const favorite_color_component_1 = require("./favorite-color.component");
describe('Favorite Color Component', () => {
    let component;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [favorite_color_component_1.FavoriteColorReactiveComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(favorite_color_component_1.FavoriteColorReactiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // #docregion view-to-model
    it('should update the value of the input field', () => {
        const input = fixture.nativeElement.querySelector('input');
        const event = (0, utils_1.createNewEvent)('input');
        input.value = 'Red';
        input.dispatchEvent(event);
        expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
    });
    // #enddocregion view-to-model
    // #docregion model-to-view
    it('should update the value in the control', () => {
        component.favoriteColorControl.setValue('Blue');
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('Blue');
    });
    // #enddocregion model-to-view
});
