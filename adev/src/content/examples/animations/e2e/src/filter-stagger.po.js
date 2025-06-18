"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = getPage;
exports.getComponentContainer = getComponentContainer;
exports.getHeroesList = getHeroesList;
exports.getInput = getInput;
const protractor_1 = require("protractor");
const util_1 = require("./util");
function getPage() {
    return protractor_1.by.css('app-hero-list-page');
}
function getComponentContainer() {
    const findContainer = () => protractor_1.by.css('ul');
    return (0, util_1.locate)(getPage(), findContainer());
}
function getHeroesList() {
    return getComponentContainer().all(protractor_1.by.css('li'));
}
function getInput() {
    const input = () => protractor_1.by.css('input');
    return (0, util_1.locate)(getPage(), input());
}
