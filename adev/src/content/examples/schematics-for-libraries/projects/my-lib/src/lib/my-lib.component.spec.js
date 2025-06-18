"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const my_lib_component_1 = require("./my-lib.component");
describe('MyLibComponent', () => {
    let component;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({ declarations: [my_lib_component_1.MyLibComponent] }).compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(my_lib_component_1.MyLibComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
