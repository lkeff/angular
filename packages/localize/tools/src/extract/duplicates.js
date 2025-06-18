"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateMessages = checkDuplicateMessages;
const diagnostics_1 = require("../diagnostics");
const source_file_utils_1 = require("../source_file_utils");
/**
 * Check each of the given `messages` to find those that have the same id but different message
 * text. Add diagnostics messages for each of these duplicate messages to the given `diagnostics`
 * object (as necessary).
 */
function checkDuplicateMessages(fs, messages, duplicateMessageHandling, basePath) {
    const diagnostics = new diagnostics_1.Diagnostics();
    if (duplicateMessageHandling === 'ignore')
        return diagnostics;
    const messageMap = new Map();
    for (const message of messages) {
        if (messageMap.has(message.id)) {
            messageMap.get(message.id).push(message);
        }
        else {
            messageMap.set(message.id, [message]);
        }
    }
    for (const duplicates of messageMap.values()) {
        if (duplicates.length <= 1)
            continue;
        if (duplicates.every((message) => message.text === duplicates[0].text))
            continue;
        const diagnosticMessage = `Duplicate messages with id "${duplicates[0].id}":\n` +
            duplicates.map((message) => serializeMessage(fs, basePath, message)).join('\n');
        diagnostics.add(duplicateMessageHandling, diagnosticMessage);
    }
    return diagnostics;
}
/**
 * Serialize the given `message` object into a string.
 */
function serializeMessage(fs, basePath, message) {
    if (message.location === undefined) {
        return `   - "${message.text}"`;
    }
    else {
        const locationFile = fs.relative(basePath, message.location.file);
        const locationPosition = (0, source_file_utils_1.serializeLocationPosition)(message.location);
        return `   - "${message.text}" : ${locationFile}:${locationPosition}`;
    }
}
