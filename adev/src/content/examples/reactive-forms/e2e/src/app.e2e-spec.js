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
describe('Reactive forms', () => {
    const nameEditor = (0, protractor_1.element)(protractor_1.by.css('app-name-editor'));
    const profileEditor = (0, protractor_1.element)(protractor_1.by.css('app-profile-editor'));
    const nameEditorButton = (0, protractor_1.element)(protractor_1.by.cssContainingText('app-root > nav > button', 'Name Editor'));
    const profileEditorButton = (0, protractor_1.element)(protractor_1.by.cssContainingText('app-root > nav > button', 'Profile Editor'));
    beforeAll(() => protractor_1.browser.get(''));
    describe('Name Editor', () => {
        const nameInput = nameEditor.element(protractor_1.by.css('input'));
        const updateButton = nameEditor.element(protractor_1.by.buttonText('Update Name'));
        const nameText = 'John Smith';
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield nameEditorButton.click();
        }));
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield nameInput.clear();
        }));
        it('should update the name value when the name control is updated', () => __awaiter(void 0, void 0, void 0, function* () {
            yield nameInput.sendKeys(nameText);
            const value = yield nameInput.getAttribute('value');
            expect(value).toBe(nameText);
        }));
        it('should update the name control when the Update Name button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
            yield nameInput.sendKeys(nameText);
            const value1 = yield nameInput.getAttribute('value');
            expect(value1).toBe(nameText);
            yield updateButton.click();
            const value2 = yield nameInput.getAttribute('value');
            expect(value2).toBe('Nancy');
        }));
        it('should update the displayed control value when the name control updated', () => __awaiter(void 0, void 0, void 0, function* () {
            yield nameInput.sendKeys(nameText);
            const valueElement = nameEditor.element(protractor_1.by.cssContainingText('p', 'Value:'));
            const nameValueElement = yield valueElement.getText();
            const nameValue = nameValueElement.toString().replace('Value: ', '');
            expect(nameValue).toBe(nameText);
        }));
    });
    describe('Profile Editor', () => {
        const firstNameInput = getInput('firstName');
        const streetInput = getInput('street');
        const addAliasButton = (0, protractor_1.element)(protractor_1.by.buttonText('+ Add another alias'));
        const updateButton = profileEditor.element(protractor_1.by.buttonText('Update Profile'));
        const profile = {
            firstName: 'John',
            lastName: 'Smith',
            street: '345 South Lane',
            city: 'Northtown',
            state: 'XX',
            zip: 12345,
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield profileEditorButton.click();
        }));
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield protractor_1.browser.get('');
            yield profileEditorButton.click();
        }));
        it('should be invalid by default', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield profileEditor.getText()).toContain('Form Status: INVALID');
        }));
        it('should be valid if the First Name is filled in', () => __awaiter(void 0, void 0, void 0, function* () {
            yield firstNameInput.clear();
            yield firstNameInput.sendKeys('John Smith');
            expect(yield profileEditor.getText()).toContain('Form Status: VALID');
        }));
        it('should update the name when the button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
            yield firstNameInput.clear();
            yield streetInput.clear();
            yield firstNameInput.sendKeys('John');
            yield streetInput.sendKeys('345 Smith Lane');
            const firstNameInitial = yield firstNameInput.getAttribute('value');
            const streetNameInitial = yield streetInput.getAttribute('value');
            expect(firstNameInitial).toBe('John');
            expect(streetNameInitial).toBe('345 Smith Lane');
            yield updateButton.click();
            const nameValue = yield firstNameInput.getAttribute('value');
            const streetValue = yield streetInput.getAttribute('value');
            expect(nameValue).toBe('Nancy');
            expect(streetValue).toBe('123 Drew Street');
        }));
        it('should add an alias field when the Add Alias button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
            yield addAliasButton.click();
            const aliasInputs = profileEditor.all(protractor_1.by.cssContainingText('label', 'Alias'));
            expect(yield aliasInputs.count()).toBe(2);
        }));
        it('should update the displayed form value when form inputs are updated', () => __awaiter(void 0, void 0, void 0, function* () {
            const aliasText = 'Johnny';
            yield Promise.all(Object.keys(profile).map((key) => getInput(key).sendKeys(`${profile[key]}`)));
            const aliasInput = profileEditor.all(protractor_1.by.css('#alias-0'));
            yield aliasInput.sendKeys(aliasText);
            const formValueElement = profileEditor.all(protractor_1.by.cssContainingText('p', 'Form Value:'));
            const formValue = yield formValueElement.getText();
            const formJson = JSON.parse(formValue.toString().replace('Form Value:', ''));
            expect(profile['firstName']).toBe(formJson.firstName);
            expect(profile['lastName']).toBe(formJson.lastName);
            expect(formJson.aliases[0]).toBe(aliasText);
        }));
    });
    function getInput(key) {
        return (0, protractor_1.element)(protractor_1.by.css(`input[formcontrolname=${key}`));
    }
});
