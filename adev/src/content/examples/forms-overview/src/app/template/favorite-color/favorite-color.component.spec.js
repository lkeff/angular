"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const utils_1 = require("../../shared/utils");
const favorite_color_component_1 = require("./favorite-color.component");
describe('FavoriteColorComponent', () => {
    let component;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [favorite_color_component_1.FavoriteColorTemplateComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(favorite_color_component_1.FavoriteColorTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // #docregion model-to-view
    it('should update the favorite color on the input field', (0, testing_1.fakeAsync)(() => {
        component.favoriteColor = 'Blue';
        fixture.detectChanges();
        (0, testing_1.tick)();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('Blue');
    }));
    // #enddocregion model-to-view
    // #docregion view-to-model
    it('should update the favorite color in the component', (0, testing_1.fakeAsync)(() => {
        const input = fixture.nativeElement.querySelector('input');
        const event = (0, utils_1.createNewEvent)('input');
        input.value = 'Red';
        input.dispatchEvent(event);
        fixture.detectChanges();
        expect(component.favoriteColor).toEqual('Red');
    }));
    // #enddocregion view-to-model
});
