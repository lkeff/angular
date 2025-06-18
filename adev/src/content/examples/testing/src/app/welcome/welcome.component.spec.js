"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
const testing_1 = require("@angular/core/testing");
const user_service_1 = require("../model/user.service");
const welcome_component_1 = require("./welcome.component");
// #docregion mock-user-service
class MockUserService {
    constructor() {
        this.isLoggedIn = true;
        this.user = { name: 'Test User' };
    }
}
// #enddocregion mock-user-service
describe('WelcomeComponent', () => {
    let comp;
    let fixture;
    let componentUserService; // the actually injected service
    let userService; // the TestBed injected service
    let el; // the DOM element with the welcome message
    // #docregion setup
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(welcome_component_1.WelcomeComponent);
        fixture.autoDetectChanges();
        comp = fixture.componentInstance;
        // #docregion injected-service
        // UserService actually injected into the component
        userService = fixture.debugElement.injector.get(user_service_1.UserService);
        // #enddocregion injected-service
        componentUserService = userService;
        // #docregion inject-from-testbed
        // UserService from the root injector
        userService = testing_1.TestBed.inject(user_service_1.UserService);
        // #enddocregion inject-from-testbed
        //  get the "welcome" element by CSS selector (e.g., by class name)
        el = fixture.nativeElement.querySelector('.welcome');
    });
    // #enddocregion setup
    // #docregion tests
    it('should welcome the user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.whenStable();
        const content = el.textContent;
        expect(content).withContext('"Welcome ..."').toContain('Welcome');
        expect(content).withContext('expected name').toContain('Test User');
    }));
    it('should welcome "Bubba"', () => __awaiter(void 0, void 0, void 0, function* () {
        userService.user.set({ name: 'Bubba' }); // welcome message hasn't been shown yet
        yield fixture.whenStable();
        expect(el.textContent).toContain('Bubba');
    }));
    it('should request login if not logged in', () => __awaiter(void 0, void 0, void 0, function* () {
        userService.isLoggedIn.set(false); // welcome message hasn't been shown yet
        yield fixture.whenStable();
        const content = el.textContent;
        expect(content).withContext('not welcomed').not.toContain('Welcome');
        expect(content)
            .withContext('"log in"')
            .toMatch(/log in/i);
    }));
    // #enddocregion tests
    it("should inject the component's UserService instance", (0, testing_1.inject)([user_service_1.UserService], (service) => {
        expect(service).toBe(componentUserService);
    }));
    it('TestBed and Component UserService should be the same', () => {
        expect(userService).toBe(componentUserService);
    });
});
