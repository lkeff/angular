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
const protractor_1 = require("protractor");
// THESE TESTS ARE INCOMPLETE
describe('Form Validation Tests', () => {
    beforeAll(() => protractor_1.browser.get(''));
    describe('Template-driven form', () => {
        beforeAll(() => {
            getPage('app-actor-form-template');
        });
        tests('Template-Driven Form');
        bobTests();
        asyncValidationTests();
        crossValidationTests();
    });
    describe('Reactive form', () => {
        beforeAll(() => {
            getPage('app-actor-form-reactive');
        });
        tests('Reactive Form');
        bobTests();
        asyncValidationTests();
        crossValidationTests();
    });
});
//////////
const testName = 'Test Name';
let page;
function getPage(sectionTag) {
    const section = (0, protractor_1.element)(protractor_1.by.css(sectionTag));
    const buttons = section.all(protractor_1.by.css('button'));
    page = {
        section,
        form: section.element(protractor_1.by.css('form')),
        title: section.element(protractor_1.by.css('h2')),
        nameInput: section.element(protractor_1.by.css('#name')),
        roleInput: section.element(protractor_1.by.css('#role')),
        skillSelect: section.element(protractor_1.by.css('#skill')),
        skillOption: section.element(protractor_1.by.css('#skill option')),
        errorMessages: section.all(protractor_1.by.css('div.alert')),
        actorFormButtons: buttons,
        actorSubmitted: section.element(protractor_1.by.css('.submitted-message')),
        roleErrors: section.element(protractor_1.by.css('.role-errors')),
        crossValidationErrorMessage: section.element(protractor_1.by.css('.cross-validation-error-message')),
    };
}
function tests(title) {
    it('should display correct title', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield page.title.getText()).toContain(title);
    }));
    it('should not display submitted message before submit', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield page.actorSubmitted.isElementPresent(protractor_1.by.css('p'))).toBe(false);
    }));
    it('should have form buttons', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield page.actorFormButtons.count()).toEqual(2);
    }));
    it('should have error at start', () => __awaiter(this, void 0, void 0, function* () {
        yield expectFormIsInvalid();
    }));
    // it('showForm', () => {
    //   page.form.getInnerHtml().then(html => console.log(html));
    // });
    it('should have disabled submit button', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield page.actorFormButtons.get(0).isEnabled()).toBe(false);
    }));
    it('resetting name to valid name should clear errors', () => __awaiter(this, void 0, void 0, function* () {
        const ele = page.nameInput;
        expect(yield ele.isPresent()).toBe(true, 'nameInput should exist');
        yield ele.clear();
        yield ele.sendKeys(testName);
        yield expectFormIsValid();
    }));
    it('should produce "required" error after clearing name', () => __awaiter(this, void 0, void 0, function* () {
        yield page.nameInput.clear();
        // await page.roleInput.click(); // to blur ... didn't work
        yield page.nameInput.sendKeys('x', protractor_1.protractor.Key.BACK_SPACE); // ugh!
        expect(yield page.form.getAttribute('class')).toMatch('ng-invalid');
        expect(yield page.errorMessages.get(0).getText()).toContain('required');
    }));
    it('should produce "at least 4 characters" error when name="x"', () => __awaiter(this, void 0, void 0, function* () {
        yield page.nameInput.clear();
        yield page.nameInput.sendKeys('x'); // too short
        yield expectFormIsInvalid();
        expect(yield page.errorMessages.get(0).getText()).toContain('at least 4 characters');
    }));
    it('resetting name to valid name again should clear errors', () => __awaiter(this, void 0, void 0, function* () {
        yield page.nameInput.sendKeys(testName);
        yield expectFormIsValid();
    }));
    it('should have enabled submit button', () => __awaiter(this, void 0, void 0, function* () {
        const submitBtn = page.actorFormButtons.get(0);
        expect(yield submitBtn.isEnabled()).toBe(true);
    }));
    it('should hide form after submit', () => __awaiter(this, void 0, void 0, function* () {
        yield page.actorFormButtons.get(0).click();
        expect(yield page.actorFormButtons.get(0).isDisplayed()).toBe(false);
    }));
    it('submitted form should be displayed', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield page.actorSubmitted.isElementPresent(protractor_1.by.css('p'))).toBe(true);
    }));
    it('submitted form should have new actor name', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield page.actorSubmitted.getText()).toContain(testName);
    }));
    it('clicking edit button should reveal form again', () => __awaiter(this, void 0, void 0, function* () {
        const newFormBtn = page.actorSubmitted.element(protractor_1.by.css('button'));
        yield newFormBtn.click();
        expect(yield page.actorSubmitted.isElementPresent(protractor_1.by.css('p'))).toBe(false, 'submitted hidden again');
        expect(yield page.title.isDisplayed()).toBe(true, 'can see form title');
    }));
}
function expectFormIsValid() {
    return __awaiter(this, void 0, void 0, function* () {
        expect(yield page.form.getAttribute('class')).toMatch('ng-valid');
    });
}
function expectFormIsInvalid() {
    return __awaiter(this, void 0, void 0, function* () {
        expect(yield page.form.getAttribute('class')).toMatch('ng-invalid');
    });
}
function triggerRoleValidation() {
    return __awaiter(this, void 0, void 0, function* () {
        // role has updateOn set to 'blur', click outside of the input to trigger the blur event
        yield (0, protractor_1.element)(protractor_1.by.css('app-root')).click();
    });
}
function waitForAlterEgoValidation() {
    return __awaiter(this, void 0, void 0, function* () {
        // role async validation will be performed in 400ms
        yield protractor_1.browser.sleep(400);
    });
}
function bobTests() {
    const emsg = 'Name cannot be Bob.';
    it('should produce "no bob" error after setting name to "Bobby"', () => __awaiter(this, void 0, void 0, function* () {
        // Re-populate select element
        yield page.skillSelect.click();
        yield page.skillOption.click();
        yield page.nameInput.clear();
        yield page.nameInput.sendKeys('Bobby');
        yield expectFormIsInvalid();
        expect(yield page.errorMessages.get(0).getText()).toBe(emsg);
    }));
    it('should be ok again with valid name', () => __awaiter(this, void 0, void 0, function* () {
        yield page.nameInput.clear();
        yield page.nameInput.sendKeys(testName);
        yield expectFormIsValid();
    }));
}
function asyncValidationTests() {
    const emsg = 'Role is already taken.';
    it(`should produce "${emsg}" error after setting role to Eric`, () => __awaiter(this, void 0, void 0, function* () {
        yield page.roleInput.clear();
        yield page.roleInput.sendKeys('Eric');
        yield triggerRoleValidation();
        yield waitForAlterEgoValidation();
        yield expectFormIsInvalid();
        expect(yield page.roleErrors.getText()).toBe(emsg);
    }));
    it('should be ok again with different values', () => __awaiter(this, void 0, void 0, function* () {
        yield page.roleInput.clear();
        yield page.roleInput.sendKeys('John');
        yield triggerRoleValidation();
        yield waitForAlterEgoValidation();
        yield expectFormIsValid();
        expect(yield page.roleErrors.isPresent()).toBe(false);
    }));
}
function crossValidationTests() {
    const emsg = 'Name cannot match role.';
    it(`should produce "${emsg}" error after setting name and role to the same value`, () => __awaiter(this, void 0, void 0, function* () {
        yield page.nameInput.clear();
        yield page.nameInput.sendKeys('Romeo');
        yield page.roleInput.clear();
        yield page.roleInput.sendKeys('Romeo');
        yield triggerRoleValidation();
        yield waitForAlterEgoValidation();
        yield expectFormIsInvalid();
        expect(yield page.crossValidationErrorMessage.getText()).toBe(emsg);
    }));
    it('should be ok again with different values', () => __awaiter(this, void 0, void 0, function* () {
        yield page.nameInput.clear();
        yield page.nameInput.sendKeys('Romeo');
        yield page.roleInput.clear();
        yield page.roleInput.sendKeys('Juliet');
        yield triggerRoleValidation();
        yield waitForAlterEgoValidation();
        yield expectFormIsValid();
        expect(yield page.crossValidationErrorMessage.isPresent()).toBe(false);
    }));
}
