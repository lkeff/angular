"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_html_parser_1 = require("../../src/i18n/i18n_html_parser");
const translation_bundle_1 = require("../../src/i18n/translation_bundle");
const html_parser_1 = require("../../src/ml_parser/html_parser");
describe('I18N html parser', () => {
    // https://github.com/angular/angular/issues/14322
    it('should parse the translations only once', () => {
        const transBundle = new translation_bundle_1.TranslationBundle({}, null, () => 'id');
        spyOn(translation_bundle_1.TranslationBundle, 'load').and.returnValue(transBundle);
        const htmlParser = new html_parser_1.HtmlParser();
        const i18nHtmlParser = new i18n_html_parser_1.I18NHtmlParser(htmlParser, 'translations');
        expect(translation_bundle_1.TranslationBundle.load).toHaveBeenCalledTimes(1);
        i18nHtmlParser.parse('source', 'url');
        i18nHtmlParser.parse('source', 'url');
        expect(translation_bundle_1.TranslationBundle.load).toHaveBeenCalledTimes(1);
    });
});
