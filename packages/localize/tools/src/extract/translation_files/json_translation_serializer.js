"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleJsonTranslationSerializer = void 0;
const utils_1 = require("./utils");
/**
 * This is a semi-public bespoke serialization format that is used for testing and sometimes as a
 * format for storing translations that will be inlined at runtime.
 *
 * @see SimpleJsonTranslationParser
 */
class SimpleJsonTranslationSerializer {
    constructor(sourceLocale) {
        this.sourceLocale = sourceLocale;
    }
    serialize(messages) {
        const fileObj = { locale: this.sourceLocale, translations: {} };
        for (const [message] of (0, utils_1.consolidateMessages)(messages, (message) => message.id)) {
            fileObj.translations[message.id] = message.text;
        }
        return JSON.stringify(fileObj, null, 2);
    }
}
exports.SimpleJsonTranslationSerializer = SimpleJsonTranslationSerializer;
