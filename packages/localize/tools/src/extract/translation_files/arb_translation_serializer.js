"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbTranslationSerializer = void 0;
const utils_1 = require("./utils");
/**
 * A translation serializer that can render JSON formatted as an Application Resource Bundle (ARB).
 *
 * See https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification
 *
 * ```json
 * {
 *   "@@locale": "en-US",
 *   "message-id": "Target message string",
 *   "@message-id": {
 *     "type": "text",
 *     "description": "Some description text",
 *     "x-locations": [
 *       {
 *         "start": {"line": 23, "column": 145},
 *         "end": {"line": 24, "column": 53},
 *         "file": "some/file.ts"
 *       },
 *       ...
 *     ]
 *   },
 *   ...
 * }
 * ```
 */
class ArbTranslationSerializer {
    constructor(sourceLocale, basePath, fs) {
        this.sourceLocale = sourceLocale;
        this.basePath = basePath;
        this.fs = fs;
    }
    serialize(messages) {
        const messageGroups = (0, utils_1.consolidateMessages)(messages, (message) => getMessageId(message));
        let output = `{\n  "@@locale": ${JSON.stringify(this.sourceLocale)}`;
        for (const duplicateMessages of messageGroups) {
            const message = duplicateMessages[0];
            const id = getMessageId(message);
            output += this.serializeMessage(id, message);
            output += this.serializeMeta(id, message.description, message.meaning, duplicateMessages.filter(utils_1.hasLocation).map((m) => m.location));
        }
        output += '\n}';
        return output;
    }
    serializeMessage(id, message) {
        return `,\n  ${JSON.stringify(id)}: ${JSON.stringify(message.text)}`;
    }
    serializeMeta(id, description, meaning, locations) {
        const meta = [];
        if (description) {
            meta.push(`\n    "description": ${JSON.stringify(description)}`);
        }
        if (meaning) {
            meta.push(`\n    "x-meaning": ${JSON.stringify(meaning)}`);
        }
        if (locations.length > 0) {
            let locationStr = `\n    "x-locations": [`;
            for (let i = 0; i < locations.length; i++) {
                locationStr += (i > 0 ? ',\n' : '\n') + this.serializeLocation(locations[i]);
            }
            locationStr += '\n    ]';
            meta.push(locationStr);
        }
        return meta.length > 0 ? `,\n  ${JSON.stringify('@' + id)}: {${meta.join(',')}\n  }` : '';
    }
    serializeLocation({ file, start, end }) {
        return [
            `      {`,
            `        "file": ${JSON.stringify(this.fs.relative(this.basePath, file))},`,
            `        "start": { "line": "${start.line}", "column": "${start.column}" },`,
            `        "end": { "line": "${end.line}", "column": "${end.column}" }`,
            `      }`,
        ].join('\n');
    }
}
exports.ArbTranslationSerializer = ArbTranslationSerializer;
function getMessageId(message) {
    return message.customId || message.id;
}
