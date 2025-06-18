"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponent = getComponent;
exports.getToggleButton = getToggleButton;
exports.getComponentSection = getComponentSection;
const protractor_1 = require("protractor");
const util_1 = require("./util");
function getComponent() {
    return protractor_1.by.css('app-querying');
}
function getToggleButton() {
    const toggleButton = () => protractor_1.by.className('toggle');
    return (0, util_1.locate)(getComponent(), toggleButton());
}
function getComponentSection() {
    const findSection = () => protractor_1.by.css('section');
    return (0, util_1.locate)(getComponent(), findSection());
}
