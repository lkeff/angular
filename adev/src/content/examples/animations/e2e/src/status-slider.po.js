"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = getPage;
exports.getComponent = getComponent;
exports.getToggleButton = getToggleButton;
exports.getComponentContainer = getComponentContainer;
const protractor_1 = require("protractor");
const util_1 = require("./util");
function getPage() {
    return protractor_1.by.css('app-status-slider-page');
}
function getComponent() {
    return protractor_1.by.css('app-status-slider');
}
function getToggleButton() {
    const toggleButton = () => protractor_1.by.buttonText('Toggle Status');
    return (0, util_1.locate)(getComponent(), toggleButton());
}
function getComponentContainer() {
    const findContainer = () => protractor_1.by.css('div');
    return (0, util_1.locate)(getComponent(), findContainer());
}
