"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18NHtmlParser = void 0;
const core_1 = require("../core");
const defaults_1 = require("../ml_parser/defaults");
const parser_1 = require("../ml_parser/parser");
const digest_1 = require("./digest");
const extractor_merger_1 = require("./extractor_merger");
const xliff_1 = require("./serializers/xliff");
const xliff2_1 = require("./serializers/xliff2");
const xmb_1 = require("./serializers/xmb");
const xtb_1 = require("./serializers/xtb");
const translation_bundle_1 = require("./translation_bundle");
class I18NHtmlParser {
    constructor(_htmlParser, translations, translationsFormat, missingTranslation = core_1.MissingTranslationStrategy.Warning, console) {
        this._htmlParser = _htmlParser;
        if (translations) {
            const serializer = createSerializer(translationsFormat);
            this._translationBundle = translation_bundle_1.TranslationBundle.load(translations, 'i18n', serializer, missingTranslation, console);
        }
        else {
            this._translationBundle = new translation_bundle_1.TranslationBundle({}, null, digest_1.digest, undefined, missingTranslation, console);
        }
    }
    parse(source, url, options = {}) {
        const interpolationConfig = options.interpolationConfig || defaults_1.DEFAULT_INTERPOLATION_CONFIG;
        const parseResult = this._htmlParser.parse(source, url, Object.assign({ interpolationConfig }, options));
        if (parseResult.errors.length) {
            return new parser_1.ParseTreeResult(parseResult.rootNodes, parseResult.errors);
        }
        return (0, extractor_merger_1.mergeTranslations)(parseResult.rootNodes, this._translationBundle, interpolationConfig, [], {});
    }
}
exports.I18NHtmlParser = I18NHtmlParser;
function createSerializer(format) {
    format = (format || 'xlf').toLowerCase();
    switch (format) {
        case 'xmb':
            return new xmb_1.Xmb();
        case 'xtb':
            return new xtb_1.Xtb();
        case 'xliff2':
        case 'xlf2':
            return new xliff2_1.Xliff2();
        case 'xliff':
        case 'xlf':
        default:
            return new xliff_1.Xliff();
    }
}
