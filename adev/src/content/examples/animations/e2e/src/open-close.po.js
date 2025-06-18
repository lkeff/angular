"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = getPage;
exports.getComponent = getComponent;
exports.getToggleButton = getToggleButton;
exports.getLoggingCheckbox = getLoggingCheckbox;
exports.getComponentContainer = getComponentContainer;
const protractor_1 = require("protractor");
const util_1 = require("./util");
function getPage() {
    return protractor_1.by.css('app-open-close-page');
}
function getComponent() {
    return protractor_1.by.css('app-open-close');
}
function getToggleButton() {
    const toggleButton = () => protractor_1.by.buttonText('Toggle Open/Close');
    return (0, util_1.locate)(getComponent(), toggleButton());
}
function getLoggingCheckbox() {
    const loggingCheckbox = () => protractor_1.by.css('section > input[type="checkbox"]');
    return (0, util_1.locate)(getPage(), loggingCheckbox());
}
function getComponentContainer() {
    const findContainer = () => protractor_1.by.css('div');
    return (0, util_1.locate)(getComponent(), findContainer());
}
