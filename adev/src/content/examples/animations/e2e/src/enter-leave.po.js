"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = getPage;
exports.getComponent = getComponent;
exports.getComponentContainer = getComponentContainer;
exports.getHeroesList = getHeroesList;
const protractor_1 = require("protractor");
const util_1 = require("./util");
function getPage() {
    return protractor_1.by.css('app-hero-list-enter-leave-page');
}
function getComponent() {
    return protractor_1.by.css('app-hero-list-enter-leave');
}
function getComponentContainer() {
    const findContainer = () => protractor_1.by.css('ul');
    return (0, util_1.locate)(getComponent(), findContainer());
}
function getHeroesList() {
    return getComponentContainer().all(protractor_1.by.css('li'));
}
