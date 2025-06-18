"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = getPage;
exports.getComponent = getComponent;
exports.getToggleButton = getToggleButton;
exports.getToggleAnimationsButton = getToggleAnimationsButton;
exports.getComponentContainer = getComponentContainer;
const protractor_1 = require("protractor");
const util_1 = require("./util");
function getPage() {
    return protractor_1.by.css('app-toggle-animations-child-page');
}
function getComponent() {
    return protractor_1.by.css('app-open-close-toggle');
}
function getToggleButton() {
    const toggleButton = () => protractor_1.by.buttonText('Toggle Open/Closed');
    return (0, util_1.locate)(getComponent(), toggleButton());
}
function getToggleAnimationsButton() {
    const toggleAnimationsButton = () => protractor_1.by.buttonText('Toggle Animations');
    return (0, util_1.locate)(getComponent(), toggleAnimationsButton());
}
function getComponentContainer() {
    const findContainer = () => protractor_1.by.css('div');
    return (0, util_1.locate)(getComponent()).all(findContainer()).get(0);
}
