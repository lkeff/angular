"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGES = void 0;
const lang_html_1 = require("@codemirror/lang-html");
const lang_angular_1 = require("@codemirror/lang-angular");
const lang_css_1 = require("@codemirror/lang-css");
const lang_sass_1 = require("@codemirror/lang-sass");
const lang_javascript_1 = require("@codemirror/lang-javascript");
const component_ts_syntax_1 = require("../utils/component-ts-syntax");
exports.LANGUAGES = {
    'component.ts': (0, component_ts_syntax_1.angularComponent)(),
    'main.ts': (0, component_ts_syntax_1.angularComponent)(),
    html: (0, lang_angular_1.angular)({ base: (0, lang_html_1.html)() }),
    svg: (0, lang_html_1.html)(),
    ts: (0, lang_javascript_1.javascript)({ typescript: true }),
    css: (0, lang_css_1.css)(),
    sass: (0, lang_sass_1.sass)(),
    scss: (0, lang_sass_1.sass)(),
    json: (0, lang_javascript_1.javascript)(),
};
