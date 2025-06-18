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
exports.getMemberName = getMemberName;
const typescript_1 = __importDefault(require("typescript"));
function getMemberName(member) {
    if (member.name === undefined) {
        return null;
    }
    if (typescript_1.default.isIdentifier(member.name) || typescript_1.default.isStringLiteralLike(member.name)) {
        return member.name.text;
    }
    if (typescript_1.default.isPrivateIdentifier(member.name)) {
        return `#${member.name.text}`;
    }
    return null;
}
