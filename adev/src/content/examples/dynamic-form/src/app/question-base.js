"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBase = void 0;
// #docregion
class QuestionBase {
    constructor(options = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.options = options.options || [];
    }
}
exports.QuestionBase = QuestionBase;
