"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextUpdate = exports.Replacement = void 0;
exports.applyTextUpdates = applyTextUpdates;
const magic_string_1 = __importDefault(require("magic-string"));
/** A text replacement for the given file. */
class Replacement {
    constructor(projectFile, update) {
        this.projectFile = projectFile;
        this.update = update;
    }
}
exports.Replacement = Replacement;
/** An isolated text update that may be applied to a file. */
class TextUpdate {
    constructor(data) {
        this.data = data;
    }
}
exports.TextUpdate = TextUpdate;
/** Helper that applies updates to the given text. */
function applyTextUpdates(input, updates) {
    const res = new magic_string_1.default(input);
    for (const update of updates) {
        res.remove(update.data.position, update.data.end);
        res.appendLeft(update.data.position, update.data.toInsert);
    }
    return res.toString();
}
