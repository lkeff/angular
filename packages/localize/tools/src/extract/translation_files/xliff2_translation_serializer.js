"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xliff2TranslationSerializer = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
const format_options_1 = require("./format_options");
const icu_parsing_1 = require("./icu_parsing");
const utils_1 = require("./utils");
const xml_file_1 = require("./xml_file");
/** This is the maximum number of characters that can appear in a legacy XLIFF 2.0 message id. */
const MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH = 20;
/**
 * A translation serializer that can write translations in XLIFF 2 format.
 *
 * https://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * @see Xliff2TranslationParser
 * @publicApi used by CLI
 */
class Xliff2TranslationSerializer {
    constructor(sourceLocale, basePath, useLegacyIds, formatOptions = {}, fs = (0, localize_1.getFileSystem)()) {
        this.sourceLocale = sourceLocale;
        this.basePath = basePath;
        this.useLegacyIds = useLegacyIds;
        this.formatOptions = formatOptions;
        this.fs = fs;
        this.currentPlaceholderId = 0;
        (0, format_options_1.validateOptions)('Xliff1TranslationSerializer', [['xml:space', ['preserve']]], formatOptions);
    }
    serialize(messages) {
        const messageGroups = (0, utils_1.consolidateMessages)(messages, (message) => this.getMessageId(message));
        const xml = new xml_file_1.XmlFile();
        xml.startTag('xliff', {
            'version': '2.0',
            'xmlns': 'urn:oasis:names:tc:xliff:document:2.0',
            'srcLang': this.sourceLocale,
        });
        // NOTE: the `original` property is set to the legacy `ng.template` value for backward
        // compatibility.
        // We could compute the file from the `message.location` property, but there could
        // be multiple values for this in the collection of `messages`. In that case we would probably
        // need to change the serializer to output a new `<file>` element for each collection of
        // messages that come from a particular original file, and the translation file parsers may
        // not
        xml.startTag('file', Object.assign({ 'id': 'ngi18n', 'original': 'ng.template' }, this.formatOptions));
        for (const duplicateMessages of messageGroups) {
            const message = duplicateMessages[0];
            const id = this.getMessageId(message);
            xml.startTag('unit', { id });
            const messagesWithLocations = duplicateMessages.filter(utils_1.hasLocation);
            if (message.meaning || message.description || messagesWithLocations.length) {
                xml.startTag('notes');
                // Write all the locations
                for (const { location: { file, start, end }, } of messagesWithLocations) {
                    const endLineString = end !== undefined && end.line !== start.line ? `,${end.line + 1}` : '';
                    this.serializeNote(xml, 'location', `${this.fs.relative(this.basePath, file)}:${start.line + 1}${endLineString}`);
                }
                if (message.description) {
                    this.serializeNote(xml, 'description', message.description);
                }
                if (message.meaning) {
                    this.serializeNote(xml, 'meaning', message.meaning);
                }
                xml.endTag('notes');
            }
            xml.startTag('segment');
            xml.startTag('source', {}, { preserveWhitespace: true });
            this.serializeMessage(xml, message);
            xml.endTag('source', { preserveWhitespace: false });
            xml.endTag('segment');
            xml.endTag('unit');
        }
        xml.endTag('file');
        xml.endTag('xliff');
        return xml.toString();
    }
    serializeMessage(xml, message) {
        this.currentPlaceholderId = 0;
        const length = message.messageParts.length - 1;
        for (let i = 0; i < length; i++) {
            this.serializeTextPart(xml, message.messageParts[i]);
            const name = message.placeholderNames[i];
            const associatedMessageId = message.associatedMessageIds && message.associatedMessageIds[name];
            this.serializePlaceholder(xml, name, message.substitutionLocations, associatedMessageId);
        }
        this.serializeTextPart(xml, message.messageParts[length]);
    }
    serializeTextPart(xml, text) {
        const pieces = (0, icu_parsing_1.extractIcuPlaceholders)(text);
        const length = pieces.length - 1;
        for (let i = 0; i < length; i += 2) {
            xml.text(pieces[i]);
            this.serializePlaceholder(xml, pieces[i + 1], undefined, undefined);
        }
        xml.text(pieces[length]);
    }
    serializePlaceholder(xml, placeholderName, substitutionLocations, associatedMessageId) {
        var _a, _b;
        const text = (_a = substitutionLocations === null || substitutionLocations === void 0 ? void 0 : substitutionLocations[placeholderName]) === null || _a === void 0 ? void 0 : _a.text;
        if (placeholderName.startsWith('START_')) {
            // Replace the `START` with `CLOSE` and strip off any `_1` ids from the end.
            const closingPlaceholderName = placeholderName
                .replace(/^START/, 'CLOSE')
                .replace(/_\d+$/, '');
            const closingText = (_b = substitutionLocations === null || substitutionLocations === void 0 ? void 0 : substitutionLocations[closingPlaceholderName]) === null || _b === void 0 ? void 0 : _b.text;
            const attrs = {
                id: `${this.currentPlaceholderId++}`,
                equivStart: placeholderName,
                equivEnd: closingPlaceholderName,
            };
            const type = getTypeForPlaceholder(placeholderName);
            if (type !== null) {
                attrs['type'] = type;
            }
            if (text !== undefined) {
                attrs['dispStart'] = text;
            }
            if (closingText !== undefined) {
                attrs['dispEnd'] = closingText;
            }
            xml.startTag('pc', attrs);
        }
        else if (placeholderName.startsWith('CLOSE_')) {
            xml.endTag('pc');
        }
        else {
            const attrs = {
                id: `${this.currentPlaceholderId++}`,
                equiv: placeholderName,
            };
            const type = getTypeForPlaceholder(placeholderName);
            if (type !== null) {
                attrs['type'] = type;
            }
            if (text !== undefined) {
                attrs['disp'] = text;
            }
            if (associatedMessageId !== undefined) {
                attrs['subFlows'] = associatedMessageId;
            }
            xml.startTag('ph', attrs, { selfClosing: true });
        }
    }
    serializeNote(xml, name, value) {
        xml.startTag('note', { category: name }, { preserveWhitespace: true });
        xml.text(value);
        xml.endTag('note', { preserveWhitespace: false });
    }
    /**
     * Get the id for the given `message`.
     *
     * If there was a custom id provided, use that.
     *
     * If we have requested legacy message ids, then try to return the appropriate id
     * from the list of legacy ids that were extracted.
     *
     * Otherwise return the canonical message id.
     *
     * An Xliff 2.0 legacy message id is a 64 bit number encoded as a decimal string, which will have
     * at most 20 digits, since 2^65-1 = 36,893,488,147,419,103,231. This digest is based on:
     * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/GoogleJsMessageIdGenerator.java
     */
    getMessageId(message) {
        return (message.customId ||
            (this.useLegacyIds &&
                message.legacyIds !== undefined &&
                message.legacyIds.find((id) => id.length <= MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH && !/[^0-9]/.test(id))) ||
            message.id);
    }
}
exports.Xliff2TranslationSerializer = Xliff2TranslationSerializer;
/**
 * Compute the value of the `type` attribute from the `placeholder` name.
 *
 * If the tag is not known but starts with `TAG_`, `START_TAG_` or `CLOSE_TAG_` then the type is
 * `other`. Certain formatting tags (e.g. bold, italic, etc) have type `fmt`. Line-breaks, images
 * and links are special cases.
 */
function getTypeForPlaceholder(placeholder) {
    const tag = placeholder.replace(/^(START_|CLOSE_)/, '').replace(/_\d+$/, '');
    switch (tag) {
        case 'BOLD_TEXT':
        case 'EMPHASISED_TEXT':
        case 'ITALIC_TEXT':
        case 'LINE_BREAK':
        case 'STRIKETHROUGH_TEXT':
        case 'UNDERLINED_TEXT':
            return 'fmt';
        case 'TAG_IMG':
            return 'image';
        case 'LINK':
            return 'link';
        default:
            return /^(START_|CLOSE_)/.test(placeholder) ? 'other' : null;
    }
}
