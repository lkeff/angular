"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xliff1TranslationParser = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../../diagnostics");
const base_visitor_1 = require("../base_visitor");
const serialize_translation_message_1 = require("./serialize_translation_message");
const translation_utils_1 = require("./translation_utils");
/**
 * A translation parser that can load XLIFF 1.2 files.
 *
 * https://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
 * https://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
 *
 * @see Xliff1TranslationSerializer
 * @publicApi used by CLI
 */
class Xliff1TranslationParser {
    analyze(filePath, contents) {
        return (0, translation_utils_1.canParseXml)(filePath, contents, 'xliff', { version: '1.2' });
    }
    parse(filePath, contents, hint) {
        return this.extractBundle(hint);
    }
    extractBundle({ element, errors }) {
        const diagnostics = new diagnostics_1.Diagnostics();
        errors.forEach((e) => (0, translation_utils_1.addParseError)(diagnostics, e));
        if (element.children.length === 0) {
            (0, translation_utils_1.addParseDiagnostic)(diagnostics, element.sourceSpan, 'Missing expected <file> element', compiler_1.ParseErrorLevel.WARNING);
            return { locale: undefined, translations: {}, diagnostics };
        }
        const files = element.children.filter((0, translation_utils_1.isNamedElement)('file'));
        if (files.length === 0) {
            (0, translation_utils_1.addParseDiagnostic)(diagnostics, element.sourceSpan, 'No <file> elements found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
        }
        else if (files.length > 1) {
            (0, translation_utils_1.addParseDiagnostic)(diagnostics, files[1].sourceSpan, 'More than one <file> element found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
        }
        const bundle = { locale: undefined, translations: {}, diagnostics };
        const translationVisitor = new XliffTranslationVisitor();
        const localesFound = new Set();
        for (const file of files) {
            const locale = (0, translation_utils_1.getAttribute)(file, 'target-language');
            if (locale !== undefined) {
                localesFound.add(locale);
                bundle.locale = locale;
            }
            (0, compiler_1.visitAll)(translationVisitor, file.children, bundle);
        }
        if (localesFound.size > 1) {
            (0, translation_utils_1.addParseDiagnostic)(diagnostics, element.sourceSpan, `More than one locale found in translation file: ${JSON.stringify(Array.from(localesFound))}. Using "${bundle.locale}"`, compiler_1.ParseErrorLevel.WARNING);
        }
        return bundle;
    }
}
exports.Xliff1TranslationParser = Xliff1TranslationParser;
class XliffTranslationVisitor extends base_visitor_1.BaseVisitor {
    visitElement(element, bundle) {
        if (element.name === 'trans-unit') {
            this.visitTransUnitElement(element, bundle);
        }
        else {
            (0, compiler_1.visitAll)(this, element.children, bundle);
        }
    }
    visitTransUnitElement(element, bundle) {
        // Error if no `id` attribute
        const id = (0, translation_utils_1.getAttribute)(element, 'id');
        if (id === undefined) {
            (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Missing required "id" attribute on <trans-unit> element.`, compiler_1.ParseErrorLevel.ERROR);
            return;
        }
        // Error if there is already a translation with the same id
        if (bundle.translations[id] !== undefined) {
            (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Duplicated translations for message "${id}"`, compiler_1.ParseErrorLevel.ERROR);
            return;
        }
        let targetMessage = element.children.find((0, translation_utils_1.isNamedElement)('target'));
        if (targetMessage === undefined) {
            // Warn if there is no `<target>` child element
            (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, 'Missing <target> element', compiler_1.ParseErrorLevel.WARNING);
            // Fallback to the `<source>` element if available.
            targetMessage = element.children.find((0, translation_utils_1.isNamedElement)('source'));
            if (targetMessage === undefined) {
                // Error if there is neither `<target>` nor `<source>`.
                (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, 'Missing required element: one of <target> or <source> is required', compiler_1.ParseErrorLevel.ERROR);
                return;
            }
        }
        const { translation, parseErrors, serializeErrors } = (0, serialize_translation_message_1.serializeTranslationMessage)(targetMessage, {
            inlineElements: ['g', 'bx', 'ex', 'bpt', 'ept', 'ph', 'it', 'mrk'],
            placeholder: { elementName: 'x', nameAttribute: 'id' },
        });
        if (translation !== null) {
            bundle.translations[id] = translation;
        }
        (0, translation_utils_1.addErrorsToBundle)(bundle, parseErrors);
        (0, translation_utils_1.addErrorsToBundle)(bundle, serializeErrors);
    }
}
