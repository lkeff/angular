"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTranslationMessage = serializeTranslationMessage;
const message_serializer_1 = require("../message_serialization/message_serializer");
const target_message_renderer_1 = require("../message_serialization/target_message_renderer");
const translation_utils_1 = require("./translation_utils");
/**
 * Serialize the given `element` into a parsed translation using the given `serializer`.
 */
function serializeTranslationMessage(element, config) {
    const { rootNodes, errors: parseErrors } = (0, translation_utils_1.parseInnerRange)(element);
    try {
        const serializer = new message_serializer_1.MessageSerializer(new target_message_renderer_1.TargetMessageRenderer(), config);
        const translation = serializer.serialize(rootNodes);
        return { translation, parseErrors, serializeErrors: [] };
    }
    catch (e) {
        return { translation: null, parseErrors, serializeErrors: [e] };
    }
}
