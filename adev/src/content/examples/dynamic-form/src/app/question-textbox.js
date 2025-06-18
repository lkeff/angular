"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextboxQuestion = void 0;
// #docregion
const question_base_1 = require("./question-base");
class TextboxQuestion extends question_base_1.QuestionBase {
    constructor() {
        super(...arguments);
        this.controlType = 'textbox';
    }
}
exports.TextboxQuestion = TextboxQuestion;
