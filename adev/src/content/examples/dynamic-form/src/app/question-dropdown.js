"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownQuestion = void 0;
// #docregion
const question_base_1 = require("./question-base");
class DropdownQuestion extends question_base_1.QuestionBase {
    constructor() {
        super(...arguments);
        this.controlType = 'dropdown';
    }
}
exports.DropdownQuestion = DropdownQuestion;
