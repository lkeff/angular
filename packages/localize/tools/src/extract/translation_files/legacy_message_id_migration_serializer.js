"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyMessageIdMigrationSerializer = void 0;
/**
 * A translation serializer that generates the mapping file for the legacy message ID migration.
 * The file is used by the `localize-migrate` script to migrate existing translation files from
 * the legacy message IDs to the canonical ones.
 */
class LegacyMessageIdMigrationSerializer {
    constructor(_diagnostics) {
        this._diagnostics = _diagnostics;
    }
    serialize(messages) {
        let hasMessages = false;
        const mapping = messages.reduce((output, message) => {
            if (shouldMigrate(message)) {
                for (const legacyId of message.legacyIds) {
                    if (output.hasOwnProperty(legacyId)) {
                        this._diagnostics.warn(`Detected duplicate legacy ID ${legacyId}.`);
                    }
                    output[legacyId] = message.id;
                    hasMessages = true;
                }
            }
            return output;
        }, {});
        if (!hasMessages) {
            this._diagnostics.warn('Could not find any legacy message IDs in source files while generating ' +
                'the legacy message migration file.');
        }
        return JSON.stringify(mapping, null, 2);
    }
}
exports.LegacyMessageIdMigrationSerializer = LegacyMessageIdMigrationSerializer;
/** Returns true if a message needs to be migrated. */
function shouldMigrate(message) {
    return !message.customId && !!message.legacyIds && message.legacyIds.length > 0;
}
