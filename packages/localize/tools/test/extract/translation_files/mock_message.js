"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMessage = mockMessage;
exports.location = location;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
/**
 * This helper is used to create `ParsedMessage` objects to be rendered in the
 * `TranslationSerializer` tests.
 */
function mockMessage(id, messageParts, placeholderNames, options) {
    let text = messageParts[0];
    for (let i = 1; i < messageParts.length; i++) {
        text += `{$${placeholderNames[i - 1]}}${messageParts[i]}`;
    }
    return Object.assign(Object.assign({ substitutions: [] }, options), { id: options.customId || id, // customId trumps id
        text,
        messageParts,
        placeholderNames });
}
function location(file, startLine, startCol, endLine, endCol) {
    return {
        file: (0, file_system_1.absoluteFrom)(file),
        start: { line: startLine, column: startCol },
        end: { line: endLine, column: endCol },
    };
}
