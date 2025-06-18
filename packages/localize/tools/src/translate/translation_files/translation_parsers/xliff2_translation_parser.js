"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xliff2TranslationParser = void 0;
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
 * A translation parser that can load translations from XLIFF 2 files.
 *
 * https://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * @see Xliff2TranslationSerializer
 * @publicApi used by CLI
 */
class Xliff2TranslationParser {
    analyze(filePath, contents) {
        return (0, translation_utils_1.canParseXml)(filePath, contents, 'xliff', { version: '2.0' });
    }
    parse(filePath, contents, hint) {
        return this.extractBundle(hint);
    }
    extractBundle({ element, errors }) {
        const diagnostics = new diagnostics_1.Diagnostics();
        errors.forEach((e) => (0, translation_utils_1.addParseError)(diagnostics, e));
        const locale = (0, translation_utils_1.getAttribute)(element, 'trgLang');
        const files = element.children.filter(isFileElement);
        if (files.length === 0) {
            (0, translation_utils_1.addParseDiagnostic)(diagnostics, element.sourceSpan, 'No <file> elements found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
        }
        else if (files.length > 1) {
            (0, translation_utils_1.addParseDiagnostic)(diagnostics, files[1].sourceSpan, 'More than one <file> element found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
        }
        const bundle = { locale, translations: {}, diagnostics };
        const translationVisitor = new Xliff2TranslationVisitor();
        for (const file of files) {
            (0, compiler_1.visitAll)(translationVisitor, file.children, { bundle });
        }
        return bundle;
    }
}
exports.Xliff2TranslationParser = Xliff2TranslationParser;
class Xliff2TranslationVisitor extends base_visitor_1.BaseVisitor {
    visitElement(element, { bundle, unit }) {
        if (element.name === 'unit') {
            this.visitUnitElement(element, bundle);
        }
        else if (element.name === 'segment') {
            this.visitSegmentElement(element, bundle, unit);
        }
        else {
            (0, compiler_1.visitAll)(this, element.children, { bundle, unit });
        }
    }
    visitUnitElement(element, bundle) {
        // Error if no `id` attribute
        const externalId = (0, translation_utils_1.getAttribute)(element, 'id');
        if (externalId === undefined) {
            (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Missing required "id" attribute on <trans-unit> element.`, compiler_1.ParseErrorLevel.ERROR);
            return;
        }
        // Error if there is already a translation with the same id
        if (bundle.translations[externalId] !== undefined) {
            (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, `Duplicated translations for message "${externalId}"`, compiler_1.ParseErrorLevel.ERROR);
            return;
        }
        (0, compiler_1.visitAll)(this, element.children, { bundle, unit: externalId });
    }
    visitSegmentElement(element, bundle, unit) {
        // A `<segment>` element must be below a `<unit>` element
        if (unit === undefined) {
            (0, translation_utils_1.addParseDiagnostic)(bundle.diagnostics, element.sourceSpan, 'Invalid <segment> element: should be a child of a <unit> element.', compiler_1.ParseErrorLevel.ERROR);
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
            inlineElements: ['cp', 'sc', 'ec', 'mrk', 'sm', 'em'],
            placeholder: { elementName: 'ph', nameAttribute: 'equiv', bodyAttribute: 'disp' },
            placeholderContainer: {
                elementName: 'pc',
                startAttribute: 'equivStart',
                endAttribute: 'equivEnd',
            },
        });
        if (translation !== null) {
            bundle.translations[unit] = translation;
        }
        (0, translation_utils_1.addErrorsToBundle)(bundle, parseErrors);
        (0, translation_utils_1.addErrorsToBundle)(bundle, serializeErrors);
    }
}
function isFileElement(node) {
    return node instanceof compiler_1.Element && node.name === 'file';
}
