"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const app_component_1 = require("./app.component");
describe('app component', () => {
    it('should properly query for greet components', () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.greets().length).toBe(2);
    });
});
