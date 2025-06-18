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
exports.locate = locate;
exports.sleepFor = sleepFor;
exports.getLinkById = getLinkById;
const protractor_1 = require("protractor");
/**
 *
 * locate(finder1, finder2) => element(finder1).element(finder2).element(finderN);
 */
function locate(locator, ...locators) {
    return locators.reduce((current, next) => current.element(next), (0, protractor_1.element)(locator));
}
function sleepFor() {
    return __awaiter(this, arguments, void 0, function* (time = 1000) {
        return yield protractor_1.browser.sleep(time);
    });
}
function getLinkById(id) {
    return (0, protractor_1.element)(protractor_1.by.css(`a[id=${id}]`));
}
