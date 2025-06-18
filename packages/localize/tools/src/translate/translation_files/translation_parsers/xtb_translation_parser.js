"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XtbTranslationParser = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const path_1 = require("path");
const diagnostics_1 = require("../../../diagnostics");
const base_visitor_1 = require("../base_visitor");
const serialize_translation_message_1 = require("./serialize_translation_message");
const translation_utils_1 = require("./translation_utils");
/**
 * A translation parser that can load XTB files.
 *
 * http://cldr.unicode.org/development/development-process/design-proposals/xmb
 *
 * @see XmbTranslationSerializer
 * @publicApi used by CLI
 */
class XtbTranslationParser {
    analyze(filePath, contents) {
        const extension = (0, path_1.extname)(filePath);
        if (extension !== '.xtb' && extension !== '.xmb') {
            const diagnostics = new diagnostics_1.Diagnostics();
            diagnostics.warn('Must have xtb or xmb extension.');
            return { canParse: false, diagnostics };
        }
        return (0, translation_utils_1.canParseXml)(filePath, contents, 'translationbundle', {});
    }
    parse(filePath, contents, hint) {
        return this.extractBundle(hint);
    }
    extractBundle({ element, errors }) {
        const langAttr = element.attrs.find((attr) => attr.name === 'lang');
        const bundle = {
            locale: langAttr && langAttr.value,
            translations: {},
            diagnostics: new diagnostics_1.Diagnostics(),
        };
        errors.forEach((e) => (0, translation_utils_1.addParseError)(bundle.diagnostics, e));
        const bundleVisitor = new XtbVisitor();
        (0, compiler_1.visitAll)(bundleVisitor, element.children, bundle);
        return bundle;
    }
}
exports.XtbTranslationParser = XtbTranslationParser;
class XtbVisitor extends base_visitor_1.BaseVisitor {
    visitElement(element, bundle) {
        switch (element.name) {
            case 'translation':
                // Error if no `id` attribute
                const id = (0, translation_utils_1.getAttribute)(element, 'id');
                if (id === undefined) {
                    (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Missing required "id" attribute on <translation> element.`, compiler_1.ParseErrorLevel.ERROR);
                    return;
                }
                // Error if there is already a translation with the same id
                if (bundle.translations[id] !== undefined) {
                    (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Duplicated translations for message "${id}"`, compiler_1.ParseErrorLevel.ERROR);
                    return;
                }
                const { translation, parseErrors, serializeErrors } = (0, serialize_translation_message_1.serializeTranslationMessage)(element, {
                    inlineElements: [],
                    placeholder: { elementName: 'ph', nameAttribute: 'name' },
                });
                if (parseErrors.length) {
                    // We only want to warn (not error) if there were problems parsing the translation for
                    // XTB formatted files. See https://github.com/angular/angular/issues/14046.
                    bundle.diagnostics.warn(computeParseWarning(id, parseErrors));
                }
                else if (translation !== null) {
                    // Only store the translation if there were no parse errors
                    bundle.translations[id] = translation;
                }
                (0, translation_utils_1.addErrorsToBundle)(bundle, serializeErrors);
                break;
            default:
                (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Unexpected <${element.name}> tag.`, compiler_1.ParseErrorLevel.ERROR);
        }
    }
}
function computeParseWarning(id, errors) {
    const msg = errors.map((e) => e.toString()).join('\n');
    return (`Could not parse message with id "${id}" - perhaps it has an unrecognised ICU format?\n` + msg);
}
