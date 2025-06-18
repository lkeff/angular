"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_1 = require("../../../src/diagnostics");
const legacy_message_id_migration_serializer_1 = require("../../../src/extract/translation_files/legacy_message_id_migration_serializer");
const mock_message_1 = require("./mock_message");
// Doesn't need to run in each file system since it doesn't interact with the file system.
describe('LegacyMessageIdMigrationSerializer', () => {
    let serializer;
    beforeEach(() => {
        serializer = new legacy_message_id_migration_serializer_1.LegacyMessageIdMigrationSerializer(new diagnostics_1.Diagnostics());
    });
    it('should convert a set of parsed messages into a migration mapping file', () => {
        const messages = [
            (0, mock_message_1.mockMessage)('one', [], [], { legacyIds: ['legacy-one', 'other-legacy-one'] }),
            (0, mock_message_1.mockMessage)('two', [], [], { legacyIds: ['legacy-two'] }),
            (0, mock_message_1.mockMessage)('three', [], [], { legacyIds: ['legacy-three', 'other-legacy-three'] }),
        ];
        const output = serializer.serialize(messages);
        expect(output.split('\n')).toEqual([
            '{',
            '  "legacy-one": "one",',
            '  "other-legacy-one": "one",',
            '  "legacy-two": "two",',
            '  "legacy-three": "three",',
            '  "other-legacy-three": "three"',
            '}',
        ]);
    });
    it('should not include messages that have a custom ID', () => {
        const messages = [
            (0, mock_message_1.mockMessage)('one', [], [], { legacyIds: ['legacy-one'] }),
            (0, mock_message_1.mockMessage)('two', [], [], { legacyIds: ['legacy-two'], customId: 'custom-two' }),
            (0, mock_message_1.mockMessage)('three', [], [], { legacyIds: ['legacy-three'] }),
        ];
        const output = serializer.serialize(messages);
        expect(output.split('\n')).toEqual([
            '{',
            '  "legacy-one": "one",',
            '  "legacy-three": "three"',
            '}',
        ]);
    });
    it('should not include messages that do not have legacy IDs', () => {
        const messages = [
            (0, mock_message_1.mockMessage)('one', [], [], { legacyIds: ['legacy-one'] }),
            (0, mock_message_1.mockMessage)('two', [], [], {}),
            (0, mock_message_1.mockMessage)('three', [], [], { legacyIds: ['legacy-three'] }),
        ];
        const output = serializer.serialize(messages);
        expect(output.split('\n')).toEqual([
            '{',
            '  "legacy-one": "one",',
            '  "legacy-three": "three"',
            '}',
        ]);
    });
    it('should produce an empty file if none of the messages need to be migrated', () => {
        const messages = [
            (0, mock_message_1.mockMessage)('one', [], [], { legacyIds: ['legacy-one'], customId: 'custom-one' }),
            (0, mock_message_1.mockMessage)('two', [], [], {}),
            (0, mock_message_1.mockMessage)('three', [], [], { legacyIds: [] }),
        ];
        const output = serializer.serialize(messages);
        expect(output).toBe('{}');
    });
});
