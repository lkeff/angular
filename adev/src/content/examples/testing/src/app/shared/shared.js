"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedImports = void 0;
const forms_1 = require("@angular/forms");
const highlight_directive_1 = require("./highlight.directive");
const title_case_pipe_1 = require("./title-case.pipe");
const common_1 = require("@angular/common");
exports.sharedImports = [forms_1.FormsModule, highlight_directive_1.HighlightDirective, title_case_pipe_1.TitleCasePipe, common_1.NgIf, common_1.NgFor];
