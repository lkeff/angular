"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const model_1 = require("../model");
const twain_service_1 = require("../twain/twain.service");
const about_component_1 = require("./about.component");
let fixture;
describe('AboutComponent (highlightDirective)', () => {
    // #docregion tests
    beforeEach(() => {
        fixture = testing_1.TestBed.configureTestingModule({
            imports: [about_component_1.AboutComponent],
            providers: [(0, http_1.provideHttpClient)(), twain_service_1.TwainService, model_1.UserService],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        }).createComponent(about_component_1.AboutComponent);
        fixture.detectChanges(); // initial binding
    });
    it('should have skyblue <h2>', () => {
        const h2 = fixture.nativeElement.querySelector('h2');
        const bgColor = h2.style.backgroundColor;
        expect(bgColor).toBe('skyblue');
    });
    // #enddocregion tests
});
